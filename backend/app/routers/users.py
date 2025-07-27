from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any
from ..database import get_db
from ..models.user import User
from ..schemas.user import User as UserSchema, UserUpdate
from ..utils.auth import get_current_active_user, get_password_hash
from ..services.shopify_client import shopify_client
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/users", tags=["users"])


@router.get("/me", response_model=UserSchema)
async def get_current_user(
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Get current user profile"""
    return current_user


@router.put("/me", response_model=UserSchema)
async def update_current_user(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
) -> Any:
    """Update current user profile"""
    # Update local user
    if user_update.email:
        current_user.email = user_update.email
    if user_update.first_name is not None:
        current_user.first_name = user_update.first_name
    if user_update.last_name is not None:
        current_user.last_name = user_update.last_name
    if user_update.phone is not None:
        current_user.phone = user_update.phone
    
    # Update Shopify customer if linked
    if current_user.shopify_customer_id:
        try:
            shopify_updates = {}
            if user_update.email:
                shopify_updates["email"] = user_update.email
            if user_update.first_name is not None:
                shopify_updates["first_name"] = user_update.first_name
            if user_update.last_name is not None:
                shopify_updates["last_name"] = user_update.last_name
            if user_update.phone is not None:
                shopify_updates["phone"] = user_update.phone
            
            await shopify_client.http_client.put(
                f"/customers/{current_user.shopify_customer_id}.json",
                json={"customer": shopify_updates}
            )
        except Exception as e:
            logger.error(f"Failed to update Shopify customer: {e}")
    
    db.commit()
    db.refresh(current_user)
    
    return current_user


@router.get("/orders")
async def get_user_orders(
    current_user: User = Depends(get_current_active_user)
):
    """Get current user's order history from Shopify"""
    if not current_user.shopify_customer_id:
        return {"orders": []}
    
    try:
        orders = await shopify_client.get_orders(
            customer_id=current_user.shopify_customer_id
        )
        return {"orders": orders}
    except Exception as e:
        logger.error(f"Failed to fetch orders: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")