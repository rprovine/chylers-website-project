from pydantic_settings import BaseSettings
from typing import Optional
import secrets


class Settings(BaseSettings):
    APP_NAME: str = "Chyler's Hawaiian Beef Chips API"
    VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    DATABASE_URL: str
    REDIS_URL: Optional[str] = None
    
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    CORS_ORIGINS: list[str] = ["http://localhost:3000", "https://chylers.com"]
    
    # Shopify Configuration
    SHOPIFY_STORE_NAME: str
    SHOPIFY_API_KEY: str
    SHOPIFY_API_SECRET: str
    SHOPIFY_ACCESS_TOKEN: str
    SHOPIFY_API_VERSION: str = "2024-01"
    SHOPIFY_WEBHOOK_SECRET: Optional[str] = None
    
    # Stripe Configuration (for additional payment processing)
    STRIPE_SECRET_KEY: Optional[str] = None
    STRIPE_WEBHOOK_SECRET: Optional[str] = None
    
    SMTP_HOST: Optional[str] = None
    SMTP_PORT: Optional[int] = 587
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    SMTP_FROM_EMAIL: str = "BeefChips@chylers.com"
    SMTP_FROM_NAME: str = "Chyler's Hawaiian Beef Chips"
    
    FREE_SHIPPING_THRESHOLD: float = 49.00
    STANDARD_SHIPPING_RATE: float = 7.99
    EXPEDITED_SHIPPING_RATE: float = 15.99
    
    BUSINESS_ADDRESS: str = "94-300 Farrington Hwy, #C03, Waipahu, HI 96797"
    BUSINESS_PHONE: str = "1-800-484-1663"
    BUSINESS_EMAIL: str = "BeefChips@chylers.com"
    BUSINESS_HOURS: str = "Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time"
    
    WILL_CALL_LOCATION: str = "Waipahu Factory Outlet"
    WILL_CALL_HOURS: str = "Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time"
    
    AMAZON_STOREFRONT_URL: Optional[str] = None
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()