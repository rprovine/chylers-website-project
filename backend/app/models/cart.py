from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base
import uuid


class CartSession(Base):
    __tablename__ = "cart_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    shopify_checkout_id = Column(String, nullable=True)
    shopify_checkout_token = Column(String, nullable=True)
    checkout_url = Column(String, nullable=True)
    total_amount = Column(Float, default=0.0)
    subtotal = Column(Float, default=0.0)
    tax_amount = Column(Float, default=0.0)
    shipping_amount = Column(Float, default=0.0)
    discount_amount = Column(Float, default=0.0)
    discount_codes = Column(JSON, default=list)
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", backref="cart_sessions")
    items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base):
    __tablename__ = "cart_items"
    
    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("cart_sessions.id"), nullable=False)
    shopify_product_id = Column(String, nullable=False)
    shopify_variant_id = Column(String, nullable=False)
    product_title = Column(String)
    variant_title = Column(String)
    sku = Column(String)
    quantity = Column(Integer, default=1)
    price = Column(Float)
    line_total = Column(Float)
    image_url = Column(String)
    properties = Column(JSON, default=dict)  # Custom line item properties
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    cart = relationship("CartSession", back_populates="items")