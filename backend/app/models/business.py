from sqlalchemy import Column, Integer, String, Text, Boolean, JSON, DateTime
from sqlalchemy.sql import func
from ..database import Base


class BusinessInfo(Base):
    __tablename__ = "business_info"
    
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, default="Chyler's Hawaiian Beef Chips")
    address = Column(String, default="91-1085 Lexington Street, Kapolei, HI 96707")
    phone = Column(String, default="1-800-484-1663")
    email = Column(String, default="BeefChips@chylers.com")
    hours = Column(JSON, default={
        "monday": "8:00 AM - 5:00 PM HST",
        "tuesday": "8:00 AM - 5:00 PM HST",
        "wednesday": "8:00 AM - 5:00 PM HST",
        "thursday": "8:00 AM - 5:00 PM HST",
        "friday": "8:00 AM - 5:00 PM HST",
        "saturday": "Closed",
        "sunday": "Closed"
    })
    will_call_location = Column(String, default="Kapolei Kitchen Factory Outlet")
    will_call_hours = Column(String, default="Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time")
    certifications = Column(JSON, default=["Made in Hawaii with Aloha"])
    about_us = Column(Text, default="""Founded in 2004 and named after our daughter Chyler, we've been crafting premium Hawaiian beef chips with aloha. Our award-winning Roasted Garlic flavor is just one of four delicious options we offer, each made with care in our Kapolei facility.""")
    story = Column(Text)
    mission = Column(Text)
    values = Column(JSON, default=[])
    founded_year = Column(Integer, default=2004)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class SocialMediaLink(Base):
    __tablename__ = "social_media_links"
    
    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, nullable=False)  # instagram, facebook, tiktok, etc.
    url = Column(String, nullable=False)
    username = Column(String)
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())