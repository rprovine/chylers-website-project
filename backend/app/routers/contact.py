from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from typing import List, Optional
from ..database import get_db
from ..models.contact import ContactInquiry
from ..schemas.contact import (
    ContactInquiry as ContactInquirySchema,
    ContactInquiryCreate,
    ContactInquiryUpdate
)
from ..utils.auth import get_current_admin_user
from ..services.email import send_contact_inquiry_notification
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/contact", tags=["contact"])


@router.post("/", response_model=ContactInquirySchema)
async def create_contact_inquiry(
    inquiry_data: ContactInquiryCreate,
    db: Session = Depends(get_db)
):
    """Submit a contact inquiry"""
    inquiry = ContactInquiry(**inquiry_data.dict())
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    
    # Send notification email
    try:
        await send_contact_inquiry_notification(inquiry_data.dict())
    except Exception as e:
        logger.error(f"Failed to send contact notification: {e}")
    
    return inquiry


@router.get("/", response_model=List[ContactInquirySchema])
async def get_contact_inquiries(
    skip: int = 0,
    limit: int = 100,
    is_resolved: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin_user)
):
    """Get all contact inquiries (admin only)"""
    query = db.query(ContactInquiry)
    
    if is_resolved is not None:
        query = query.filter(ContactInquiry.is_resolved == is_resolved)
    
    inquiries = query.order_by(ContactInquiry.created_at.desc()).offset(skip).limit(limit).all()
    return inquiries


@router.put("/{inquiry_id}", response_model=ContactInquirySchema)
async def update_contact_inquiry(
    inquiry_id: int,
    update_data: ContactInquiryUpdate,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin_user)
):
    """Update contact inquiry status (admin only)"""
    inquiry = db.query(ContactInquiry).filter(ContactInquiry.id == inquiry_id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    
    if update_data.is_resolved is not None:
        inquiry.is_resolved = update_data.is_resolved
        if update_data.is_resolved:
            inquiry.resolved_at = func.now()
            inquiry.resolved_by = current_admin.email
    
    if update_data.admin_notes is not None:
        inquiry.admin_notes = update_data.admin_notes
    
    db.commit()
    db.refresh(inquiry)
    
    return inquiry