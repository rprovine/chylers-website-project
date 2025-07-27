from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import pytz
from ..database import get_db
from ..models.business import BusinessInfo, SocialMediaLink
from ..schemas.business import BusinessInfoResponse, SocialMediaLink as SocialMediaLinkSchema
from ..utils.auth import get_current_admin_user
from ..config import settings

router = APIRouter(prefix="/api/v1/business", tags=["business"])


def is_business_open() -> tuple[bool, str]:
    """Check if business is currently open in Hawaii time"""
    hawaii_tz = pytz.timezone('Pacific/Honolulu')
    current_time = datetime.now(hawaii_tz)
    current_day = current_time.strftime('%A').lower()
    current_hour = current_time.hour
    
    # Business hours: Monday-Friday, 8:00 AM to 5:00 PM
    if current_day in ['saturday', 'sunday']:
        return False, "Monday 8:00 AM HST"
    
    if current_hour < 8:
        return False, "Today 8:00 AM HST"
    elif current_hour >= 17:
        if current_day == 'friday':
            return False, "Monday 8:00 AM HST"
        else:
            return False, "Tomorrow 8:00 AM HST"
    
    return True, ""


@router.get("/info", response_model=BusinessInfoResponse)
async def get_business_info(db: Session = Depends(get_db)):
    """Get business information"""
    # Get or create business info
    business_info = db.query(BusinessInfo).first()
    if not business_info:
        business_info = BusinessInfo()
        db.add(business_info)
        db.commit()
        db.refresh(business_info)
    
    # Get social media links
    social_links = db.query(SocialMediaLink).filter(
        SocialMediaLink.is_active == True
    ).order_by(SocialMediaLink.display_order).all()
    
    # Check if open
    is_open, next_open = is_business_open()
    
    response = BusinessInfoResponse.from_orm(business_info)
    response.social_media_links = social_links
    response.is_open_now = is_open
    response.next_open_time = next_open if not is_open else None
    
    return response


@router.get("/social-media", response_model=List[SocialMediaLinkSchema])
async def get_social_media_links(db: Session = Depends(get_db)):
    """Get active social media links"""
    links = db.query(SocialMediaLink).filter(
        SocialMediaLink.is_active == True
    ).order_by(SocialMediaLink.display_order).all()
    
    return links


@router.post("/social-media", response_model=SocialMediaLinkSchema)
async def add_social_media_link(
    link_data: SocialMediaLinkSchema,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin_user)
):
    """Add social media link (admin only)"""
    link = SocialMediaLink(**link_data.dict(exclude={'id', 'created_at', 'updated_at'}))
    db.add(link)
    db.commit()
    db.refresh(link)
    
    return link


@router.put("/info")
async def update_business_info(
    updates: dict,
    db: Session = Depends(get_db),
    current_admin = Depends(get_current_admin_user)
):
    """Update business information (admin only)"""
    business_info = db.query(BusinessInfo).first()
    if not business_info:
        business_info = BusinessInfo()
        db.add(business_info)
    
    # Update fields
    for key, value in updates.items():
        if hasattr(business_info, key):
            setattr(business_info, key, value)
    
    db.commit()
    
    return {"message": "Business information updated successfully"}