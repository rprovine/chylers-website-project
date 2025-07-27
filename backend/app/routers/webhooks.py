from fastapi import APIRouter, Request, Response, Depends, HTTPException
from sqlalchemy.orm import Session
import json
from ..database import get_db
from ..models.webhook import WebhookEvent
from ..services.shopify_client import shopify_client
from ..services.email import send_order_confirmation_email
from ..config import settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/webhooks", tags=["webhooks"])


@router.post("/shopify/orders/create")
async def handle_order_created(
    request: Request,
    db: Session = Depends(get_db)
):
    """Handle Shopify order created webhook"""
    # Verify webhook
    body = await request.body()
    hmac_header = request.headers.get("X-Shopify-Hmac-Sha256", "")
    
    if not await shopify_client.verify_webhook(body, hmac_header):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")
    
    try:
        order_data = json.loads(body)
        
        # Store webhook event
        webhook_event = WebhookEvent(
            source="shopify",
            event_type="order.created",
            event_id=f"order_{order_data['id']}",
            payload=order_data,
            headers=dict(request.headers)
        )
        db.add(webhook_event)
        
        # Send order confirmation email
        if order_data.get("email"):
            await send_order_confirmation_email(
                order_data["email"],
                {
                    "order_number": order_data["name"],
                    "total_price": order_data["total_price"],
                    "line_items": order_data.get("line_items", [])
                }
            )
        
        webhook_event.processed = True
        db.commit()
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Error processing order webhook: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to process webhook")


@router.post("/shopify/customers/create")
async def handle_customer_created(
    request: Request,
    db: Session = Depends(get_db)
):
    """Handle Shopify customer created webhook"""
    body = await request.body()
    hmac_header = request.headers.get("X-Shopify-Hmac-Sha256", "")
    
    if not await shopify_client.verify_webhook(body, hmac_header):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")
    
    try:
        customer_data = json.loads(body)
        
        # Store webhook event
        webhook_event = WebhookEvent(
            source="shopify",
            event_type="customer.created",
            event_id=f"customer_{customer_data['id']}",
            payload=customer_data,
            headers=dict(request.headers),
            processed=True
        )
        db.add(webhook_event)
        db.commit()
        
        return {"status": "success"}
        
    except Exception as e:
        logger.error(f"Error processing customer webhook: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to process webhook")


@router.post("/shopify/carts/update")
async def handle_cart_update(
    request: Request,
    db: Session = Depends(get_db)
):
    """Handle Shopify cart update webhook"""
    body = await request.body()
    hmac_header = request.headers.get("X-Shopify-Hmac-Sha256", "")
    
    if not await shopify_client.verify_webhook(body, hmac_header):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")
    
    # Process abandoned cart logic here
    return {"status": "success"}