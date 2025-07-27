from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from ..models.contact import InquiryType


class ContactInquiryBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str
    inquiry_type: InquiryType = InquiryType.GENERAL
    order_number: Optional[str] = None


class ContactInquiryCreate(ContactInquiryBase):
    pass


class ContactInquiry(ContactInquiryBase):
    id: int
    is_resolved: bool = False
    resolved_at: Optional[datetime] = None
    resolved_by: Optional[str] = None
    admin_notes: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class ContactInquiryUpdate(BaseModel):
    is_resolved: Optional[bool] = None
    admin_notes: Optional[str] = None