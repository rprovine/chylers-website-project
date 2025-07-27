from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime
from decimal import Decimal


class CartItemBase(BaseModel):
    shopify_variant_id: str
    quantity: int = 1
    properties: Optional[Dict[str, Any]] = None


class CartItemCreate(CartItemBase):
    pass


class CartItem(CartItemBase):
    id: int
    cart_id: int
    shopify_product_id: str
    product_title: str
    variant_title: Optional[str] = None
    sku: Optional[str] = None
    price: Decimal
    line_total: Decimal
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class CartBase(BaseModel):
    discount_codes: List[str] = []


class CartCreate(CartBase):
    items: List[CartItemCreate] = []


class CartUpdate(BaseModel):
    discount_codes: Optional[List[str]] = None


class Cart(CartBase):
    id: int
    session_id: str
    user_id: Optional[int] = None
    shopify_checkout_id: Optional[str] = None
    shopify_checkout_token: Optional[str] = None
    checkout_url: Optional[str] = None
    total_amount: Decimal
    subtotal: Decimal
    tax_amount: Decimal
    shipping_amount: Decimal
    discount_amount: Decimal
    is_active: bool
    expires_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[CartItem] = []
    
    # Computed fields
    items_count: int = 0
    is_free_shipping_eligible: bool = False
    
    class Config:
        from_attributes = True


class AddToCartRequest(BaseModel):
    variant_id: str
    quantity: int = 1
    properties: Optional[Dict[str, Any]] = None


class UpdateCartItemRequest(BaseModel):
    quantity: int


class ApplyDiscountRequest(BaseModel):
    discount_code: str


class ShippingRateRequest(BaseModel):
    address1: str
    city: str
    province: str
    province_code: str
    country: str = "US"
    country_code: str = "US"
    zip: str