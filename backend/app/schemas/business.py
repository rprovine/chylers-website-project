from pydantic import BaseModel, HttpUrl
from typing import List, Dict, Optional
from datetime import datetime


class SocialMediaLinkBase(BaseModel):
    platform: str
    url: HttpUrl
    username: Optional[str] = None
    is_active: bool = True
    display_order: int = 0


class SocialMediaLink(SocialMediaLinkBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class BusinessInfoResponse(BaseModel):
    company_name: str
    address: str
    phone: str
    email: str
    hours: Dict[str, str]
    will_call_location: str
    will_call_hours: str
    certifications: List[str]
    about_us: str
    story: Optional[str] = None
    mission: Optional[str] = None
    values: List[str] = []
    founded_year: int
    social_media_links: List[SocialMediaLink] = []
    
    # Additional computed fields
    is_open_now: bool = False
    next_open_time: Optional[str] = None
    
    class Config:
        from_attributes = True