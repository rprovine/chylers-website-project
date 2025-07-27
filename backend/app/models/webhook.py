from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from ..database import Base


class WebhookEvent(Base):
    __tablename__ = "webhook_events"
    
    id = Column(Integer, primary_key=True, index=True)
    source = Column(String, nullable=False)  # 'shopify', 'stripe', etc.
    event_type = Column(String, nullable=False)  # 'order.created', 'customer.created', etc.
    event_id = Column(String, unique=True, index=True)
    payload = Column(JSON, nullable=False)
    headers = Column(JSON)
    processed = Column(Boolean, default=False)
    processed_at = Column(DateTime(timezone=True))
    error_message = Column(Text)
    retry_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())