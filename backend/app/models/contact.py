from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from ..database import Base
import enum


class InquiryType(str, enum.Enum):
    GENERAL = "general"
    ORDER = "order"
    PRODUCT = "product"
    WHOLESALE = "wholesale"
    PARTNERSHIP = "partnership"
    SUPPORT = "support"


class ContactInquiry(Base):
    __tablename__ = "contact_inquiries"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String)
    subject = Column(String)
    message = Column(Text, nullable=False)
    inquiry_type = Column(Enum(InquiryType), default=InquiryType.GENERAL)
    order_number = Column(String)  # For order-related inquiries
    is_resolved = Column(Integer, default=0)
    resolved_at = Column(DateTime(timezone=True))
    resolved_by = Column(String)
    admin_notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())