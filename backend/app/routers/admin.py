from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
from ..database import get_db
from ..models import User, ContactInquiry, WebhookEvent
from ..utils.auth import get_current_admin_user
from ..services.shopify_client import shopify_client
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/admin", tags=["admin"])


@router.get("/stats")
async def get_admin_stats(
    current_admin = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get admin dashboard statistics"""
    # Get user stats
    total_users = db.query(User).count()
    active_users = db.query(User).filter(User.is_active == True).count()
    
    # Get contact inquiry stats
    total_inquiries = db.query(ContactInquiry).count()
    unresolved_inquiries = db.query(ContactInquiry).filter(
        ContactInquiry.is_resolved == False
    ).count()
    
    # Get recent webhook events
    recent_webhooks = db.query(WebhookEvent).filter(
        WebhookEvent.created_at >= datetime.utcnow() - timedelta(days=7)
    ).count()
    
    # Get Shopify stats
    try:
        # Get order count from Shopify
        orders_response = await shopify_client.http_client.get(
            "/orders/count.json",
            params={"status": "any"}
        )
        total_orders = orders_response.json()["count"]
        
        # Get customer count
        customers_response = await shopify_client.http_client.get("/customers/count.json")
        total_customers = customers_response.json()["count"]
        
        # Get product count
        products_response = await shopify_client.http_client.get("/products/count.json")
        total_products = products_response.json()["count"]
        
    except Exception as e:
        logger.error(f"Error fetching Shopify stats: {e}")
        total_orders = 0
        total_customers = 0
        total_products = 0
    
    return {
        "users": {
            "total": total_users,
            "active": active_users
        },
        "inquiries": {
            "total": total_inquiries,
            "unresolved": unresolved_inquiries
        },
        "shopify": {
            "orders": total_orders,
            "customers": total_customers,
            "products": total_products
        },
        "webhooks": {
            "recent": recent_webhooks
        }
    }


@router.get("/users")
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    is_active: Optional[bool] = None,
    current_admin = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Get all users (admin only)"""
    query = db.query(User)
    
    if is_active is not None:
        query = query.filter(User.is_active == is_active)
    
    users = query.offset(skip).limit(limit).all()
    return users


@router.put("/users/{user_id}/toggle-active")
async def toggle_user_active(
    user_id: int,
    current_admin = Depends(get_current_admin_user),
    db: Session = Depends(get_db)
):
    """Toggle user active status (admin only)"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = not user.is_active
    db.commit()
    
    return {"message": f"User {'activated' if user.is_active else 'deactivated'} successfully"}


@router.get("/orders")
async def get_all_orders(
    status: Optional[str] = None,
    limit: int = 50,
    current_admin = Depends(get_current_admin_user)
):
    """Get all orders from Shopify (admin only)"""
    try:
        orders = await shopify_client.get_orders(status=status)
        return {"orders": orders[:limit]}
    except Exception as e:
        logger.error(f"Error fetching orders: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")


@router.post("/sync-products")
async def sync_products(
    current_admin = Depends(get_current_admin_user)
):
    """Manually sync products from Shopify (admin only)"""
    try:
        products = await shopify_client.get_products(limit=250)
        return {
            "message": "Products synced successfully",
            "count": len(products)
        }
    except Exception as e:
        logger.error(f"Error syncing products: {e}")
        raise HTTPException(status_code=500, detail="Failed to sync products")