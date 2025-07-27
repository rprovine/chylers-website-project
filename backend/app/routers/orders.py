from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from ..utils.auth import get_current_active_user
from ..models.user import User
from ..services.shopify_client import shopify_client
from ..schemas.shopify import ShopifyOrder
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/orders", tags=["orders"])


@router.get("/", response_model=List[ShopifyOrder])
async def get_orders(
    status: Optional[str] = None,
    limit: int = 50,
    current_user: User = Depends(get_current_active_user)
) -> List[ShopifyOrder]:
    """Get user's orders"""
    if not current_user.shopify_customer_id:
        return []
    
    try:
        orders = await shopify_client.get_orders(
            customer_id=current_user.shopify_customer_id,
            status=status
        )
        
        # Transform orders
        result = []
        for order in orders[:limit]:
            # Check if it's a will-call order
            is_will_call = False
            pickup_location = None
            
            for attr in order.get("note_attributes", []):
                if attr.get("name") == "fulfillment_type" and attr.get("value") == "will_call":
                    is_will_call = True
                elif attr.get("name") == "pickup_location":
                    pickup_location = attr.get("value")
            
            shopify_order = ShopifyOrder(**order)
            shopify_order.is_will_call = is_will_call
            shopify_order.pickup_location = pickup_location
            
            result.append(shopify_order)
        
        return result
        
    except Exception as e:
        logger.error(f"Error fetching orders: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")


@router.get("/{order_id}", response_model=ShopifyOrder)
async def get_order(
    order_id: str,
    current_user: User = Depends(get_current_active_user)
) -> ShopifyOrder:
    """Get specific order details"""
    try:
        order = await shopify_client.get_order(order_id)
        
        # Verify order belongs to user
        if order.get("customer", {}).get("id") != current_user.shopify_customer_id:
            raise HTTPException(status_code=403, detail="Order not found")
        
        # Check if it's a will-call order
        is_will_call = False
        pickup_location = None
        
        for attr in order.get("note_attributes", []):
            if attr.get("name") == "fulfillment_type" and attr.get("value") == "will_call":
                is_will_call = True
            elif attr.get("name") == "pickup_location":
                pickup_location = attr.get("value")
        
        shopify_order = ShopifyOrder(**order)
        shopify_order.is_will_call = is_will_call
        shopify_order.pickup_location = pickup_location
        
        return shopify_order
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching order: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch order")