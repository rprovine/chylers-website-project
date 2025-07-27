from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime, timedelta
import uuid
from ..database import get_db
from ..models.cart import CartSession, CartItem
from ..models.user import User
from ..schemas.cart import (
    Cart, CartCreate, AddToCartRequest, 
    UpdateCartItemRequest, ApplyDiscountRequest,
    ShippingRateRequest
)
from ..services.shopify_client import shopify_client
from ..utils.auth import get_current_active_user
from ..config import settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/cart", tags=["cart"])


def get_or_create_cart_session(
    request: Request,
    response: Response,
    db: Session,
    user: Optional[User] = None
) -> CartSession:
    """Get existing cart session or create new one"""
    session_id = request.cookies.get("cart_session_id")
    
    if session_id:
        cart = db.query(CartSession).filter(
            CartSession.session_id == session_id,
            CartSession.is_active == True
        ).first()
        
        if cart:
            # Update user if logged in
            if user and not cart.user_id:
                cart.user_id = user.id
                db.commit()
            return cart
    
    # Create new cart session
    new_session_id = str(uuid.uuid4())
    cart = CartSession(
        session_id=new_session_id,
        user_id=user.id if user else None,
        expires_at=datetime.utcnow() + timedelta(days=30),
        is_active=True
    )
    db.add(cart)
    db.commit()
    db.refresh(cart)
    
    # Set cookie
    response.set_cookie(
        key="cart_session_id",
        value=new_session_id,
        max_age=30 * 24 * 60 * 60,  # 30 days
        httponly=True,
        samesite="lax"
    )
    
    return cart


@router.get("/", response_model=Cart)
async def get_cart(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
) -> Cart:
    """Get current cart"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    # Calculate totals
    subtotal = sum(item.line_total for item in cart.items)
    cart.subtotal = subtotal
    cart.total_amount = subtotal + cart.tax_amount + cart.shipping_amount - cart.discount_amount
    
    # Check free shipping eligibility
    is_free_shipping = subtotal >= settings.FREE_SHIPPING_THRESHOLD
    
    db.commit()
    
    cart_response = Cart.from_orm(cart)
    cart_response.items_count = sum(item.quantity for item in cart.items)
    cart_response.is_free_shipping_eligible = is_free_shipping
    
    return cart_response


@router.post("/items", response_model=Cart)
async def add_to_cart(
    item_data: AddToCartRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
) -> Cart:
    """Add item to cart"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    try:
        # Get variant details from Shopify
        variant_response = await shopify_client.http_client.get(
            f"/variants/{item_data.variant_id}.json"
        )
        variant = variant_response.json()["variant"]
        
        # Get product details
        product_response = await shopify_client.http_client.get(
            f"/products/{variant['product_id']}.json"
        )
        product = product_response.json()["product"]
        
        # Check if item already in cart
        existing_item = db.query(CartItem).filter(
            CartItem.cart_id == cart.id,
            CartItem.shopify_variant_id == str(item_data.variant_id)
        ).first()
        
        if existing_item:
            # Update quantity
            existing_item.quantity += item_data.quantity
            existing_item.line_total = existing_item.price * existing_item.quantity
        else:
            # Add new item
            cart_item = CartItem(
                cart_id=cart.id,
                shopify_product_id=str(variant["product_id"]),
                shopify_variant_id=str(variant["id"]),
                product_title=product["title"],
                variant_title=variant["title"],
                sku=variant.get("sku"),
                quantity=item_data.quantity,
                price=float(variant["price"]),
                line_total=float(variant["price"]) * item_data.quantity,
                image_url=product["images"][0]["src"] if product.get("images") else None,
                properties=item_data.properties or {}
            )
            db.add(cart_item)
        
        # Create or update Shopify checkout if needed
        if not cart.shopify_checkout_id:
            checkout_data = await shopify_client.create_checkout([{
                "variant_id": item_data.variant_id,
                "quantity": item_data.quantity,
                "properties": item_data.properties
            }])
            cart.shopify_checkout_id = checkout_data["id"]
            cart.shopify_checkout_token = checkout_data["token"]
            cart.checkout_url = checkout_data["web_url"]
        else:
            # Update existing checkout
            line_items = []
            for cart_item in cart.items:
                line_items.append({
                    "variant_id": cart_item.shopify_variant_id,
                    "quantity": cart_item.quantity,
                    "properties": cart_item.properties
                })
            
            checkout_data = await shopify_client.update_checkout(
                cart.shopify_checkout_token,
                {"line_items": line_items}
            )
        
        db.commit()
        
        return await get_cart(request, response, db, current_user)
        
    except Exception as e:
        logger.error(f"Error adding to cart: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to add item to cart")


@router.put("/items/{item_id}", response_model=Cart)
async def update_cart_item(
    item_id: int,
    update_data: UpdateCartItemRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
) -> Cart:
    """Update cart item quantity"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    cart_item = db.query(CartItem).filter(
        CartItem.id == item_id,
        CartItem.cart_id == cart.id
    ).first()
    
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found")
    
    if update_data.quantity <= 0:
        # Remove item
        db.delete(cart_item)
    else:
        # Update quantity
        cart_item.quantity = update_data.quantity
        cart_item.line_total = cart_item.price * cart_item.quantity
    
    # Update Shopify checkout
    if cart.shopify_checkout_id:
        line_items = []
        for item in cart.items:
            if item.id != item_id or update_data.quantity > 0:
                line_items.append({
                    "variant_id": item.shopify_variant_id,
                    "quantity": item.quantity if item.id != item_id else update_data.quantity,
                    "properties": item.properties
                })
        
        try:
            await shopify_client.update_checkout(
                cart.shopify_checkout_token,
                {"line_items": line_items}
            )
        except Exception as e:
            logger.error(f"Error updating Shopify checkout: {e}")
    
    db.commit()
    
    return await get_cart(request, response, db, current_user)


@router.delete("/items/{item_id}", response_model=Cart)
async def remove_from_cart(
    item_id: int,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
) -> Cart:
    """Remove item from cart"""
    return await update_cart_item(
        item_id,
        UpdateCartItemRequest(quantity=0),
        request,
        response,
        db,
        current_user
    )


@router.delete("/", status_code=204)
async def clear_cart(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
):
    """Clear all items from cart"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    # Delete all items
    db.query(CartItem).filter(CartItem.cart_id == cart.id).delete()
    
    # Reset cart
    cart.shopify_checkout_id = None
    cart.shopify_checkout_token = None
    cart.checkout_url = None
    cart.total_amount = 0
    cart.subtotal = 0
    cart.tax_amount = 0
    cart.shipping_amount = 0
    cart.discount_amount = 0
    cart.discount_codes = []
    
    db.commit()


@router.post("/discount", response_model=Cart)
async def apply_discount_code(
    discount_data: ApplyDiscountRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
) -> Cart:
    """Apply discount code to cart"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    if not cart.shopify_checkout_id:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    try:
        # Apply discount to Shopify checkout
        checkout_data = await shopify_client.update_checkout(
            cart.shopify_checkout_token,
            {"discount_code": discount_data.discount_code}
        )
        
        # Update cart with discount info
        cart.discount_codes = [discount_data.discount_code]
        cart.discount_amount = float(checkout_data.get("total_discounts", "0"))
        
        db.commit()
        
        return await get_cart(request, response, db, current_user)
        
    except Exception as e:
        logger.error(f"Error applying discount: {e}")
        raise HTTPException(status_code=400, detail="Invalid discount code")


@router.post("/shipping-rates")
async def calculate_shipping_rates(
    shipping_data: ShippingRateRequest,
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
):
    """Calculate shipping rates for address"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    if not cart.shopify_checkout_id:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    try:
        # Calculate shipping rates
        shipping_rates = await shopify_client.calculate_shipping(
            cart.shopify_checkout_token,
            {
                "address1": shipping_data.address1,
                "city": shipping_data.city,
                "province": shipping_data.province,
                "province_code": shipping_data.province_code,
                "country": shipping_data.country,
                "country_code": shipping_data.country_code,
                "zip": shipping_data.zip
            }
        )
        
        # Check if free shipping applies
        if cart.subtotal >= settings.FREE_SHIPPING_THRESHOLD:
            shipping_rates.insert(0, {
                "id": "free-shipping",
                "title": "Free Shipping (Order over $49)",
                "price": "0.00",
                "code": "FREE",
                "source": "chylers-api"
            })
        
        # Add will-call option for Hawaii addresses
        if shipping_data.province_code == "HI":
            shipping_rates.append({
                "id": "will-call",
                "title": "Will Call Pickup - Kapolei Kitchen Factory Outlet",
                "price": "0.00",
                "code": "WILLCALL",
                "source": "chylers-api",
                "delivery_category": "pickup"
            })
        
        return {"shipping_rates": shipping_rates}
        
    except Exception as e:
        logger.error(f"Error calculating shipping: {e}")
        raise HTTPException(status_code=500, detail="Failed to calculate shipping rates")


@router.get("/checkout-url")
async def get_checkout_url(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_active_user)
):
    """Get Shopify checkout URL"""
    cart = get_or_create_cart_session(request, response, db, current_user)
    
    if not cart.checkout_url:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    return {"checkout_url": cart.checkout_url}