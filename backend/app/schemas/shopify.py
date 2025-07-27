from pydantic import BaseModel, HttpUrl, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from decimal import Decimal


class ShopifyImage(BaseModel):
    id: str
    src: HttpUrl
    alt: Optional[str] = None
    position: int = 1
    width: Optional[int] = None
    height: Optional[int] = None


class ShopifyVariant(BaseModel):
    id: str
    product_id: str
    title: str
    price: Decimal
    sku: Optional[str] = None
    position: int = 1
    inventory_policy: str = "deny"
    compare_at_price: Optional[Decimal] = None
    option1: Optional[str] = None  # Pack size
    option2: Optional[str] = None  # Flavor
    option3: Optional[str] = None
    barcode: Optional[str] = None
    grams: Optional[int] = None
    weight: Optional[float] = None
    weight_unit: str = "oz"
    inventory_quantity: Optional[int] = None
    available: bool = True
    image_id: Optional[str] = None
    requires_shipping: bool = True
    taxable: bool = True


class ShopifyProduct(BaseModel):
    id: str
    title: str
    handle: str
    body_html: Optional[str] = None
    vendor: str = "Chyler's Hawaiian Beef Chips"
    product_type: str = "Beef Chips"
    created_at: datetime
    updated_at: datetime
    published_at: Optional[datetime] = None
    tags: List[str] = []
    variants: List[ShopifyVariant] = []
    images: List[ShopifyImage] = []
    options: List[Dict[str, Any]] = []
    
    # Custom fields for our beef chips
    flavor: Optional[str] = None
    pack_sizes: List[str] = []
    nutrition_info: Optional[Dict[str, Any]] = None
    is_award_winning: bool = False
    is_bestseller: bool = False


class ShopifyCollection(BaseModel):
    id: str
    title: str
    handle: str
    body_html: Optional[str] = None
    published_at: Optional[datetime] = None
    sort_order: str = "best-selling"
    products_count: int = 0
    image: Optional[ShopifyImage] = None


class ShopifyAddress(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    address1: Optional[str] = None
    address2: Optional[str] = None
    city: Optional[str] = None
    province: Optional[str] = None
    province_code: Optional[str] = None
    country: Optional[str] = None
    country_code: Optional[str] = None
    zip: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None


class ShopifyLineItem(BaseModel):
    variant_id: str
    quantity: int = 1
    properties: Optional[Dict[str, Any]] = None
    
    # Populated after creation
    id: Optional[str] = None
    product_id: Optional[str] = None
    title: Optional[str] = None
    variant_title: Optional[str] = None
    sku: Optional[str] = None
    vendor: Optional[str] = None
    price: Optional[Decimal] = None
    requires_shipping: Optional[bool] = True
    taxable: Optional[bool] = True
    gift_card: Optional[bool] = False
    name: Optional[str] = None
    total_discount: Optional[Decimal] = None
    fulfillment_status: Optional[str] = None


class ShopifyShippingLine(BaseModel):
    id: Optional[str] = None
    title: str
    price: Decimal
    code: str
    source: Optional[str] = None
    phone: Optional[str] = None
    delivery_category: Optional[str] = None
    carrier_identifier: Optional[str] = None
    discounted_price: Optional[Decimal] = None


class ShopifyCheckout(BaseModel):
    id: Optional[str] = None
    token: Optional[str] = None
    cart_token: Optional[str] = None
    email: Optional[EmailStr] = None
    gateway: Optional[str] = None
    buyer_accepts_marketing: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    landing_site: Optional[str] = None
    note: Optional[str] = None
    note_attributes: List[Dict[str, str]] = []
    referring_site: Optional[str] = None
    shipping_lines: List[ShopifyShippingLine] = []
    subtotal_price: Optional[Decimal] = None
    total_price: Optional[Decimal] = None
    total_tax: Optional[Decimal] = None
    currency: str = "USD"
    completed_at: Optional[datetime] = None
    closed_at: Optional[datetime] = None
    line_items: List[ShopifyLineItem] = []
    shipping_address: Optional[ShopifyAddress] = None
    billing_address: Optional[ShopifyAddress] = None
    web_url: Optional[HttpUrl] = None


class ShopifyCustomer(BaseModel):
    id: Optional[str] = None
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    verified_email: bool = False
    accepts_marketing: bool = False
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    orders_count: int = 0
    state: str = "enabled"
    total_spent: Decimal = Decimal("0.00")
    last_order_id: Optional[str] = None
    note: Optional[str] = None
    tax_exempt: bool = False
    tags: List[str] = []
    currency: str = "USD"
    addresses: List[ShopifyAddress] = []
    default_address: Optional[ShopifyAddress] = None


class ShopifyOrder(BaseModel):
    id: str
    order_number: int
    name: str  # Like "#1001"
    email: Optional[EmailStr] = None
    created_at: datetime
    updated_at: datetime
    cancelled_at: Optional[datetime] = None
    closed_at: Optional[datetime] = None
    processed_at: Optional[datetime] = None
    customer: Optional[ShopifyCustomer] = None
    billing_address: Optional[ShopifyAddress] = None
    shipping_address: Optional[ShopifyAddress] = None
    currency: str = "USD"
    total_price: Decimal
    subtotal_price: Decimal
    total_tax: Decimal
    total_discounts: Decimal
    total_shipping_price_set: Optional[Dict[str, Any]] = None
    line_items: List[ShopifyLineItem] = []
    shipping_lines: List[ShopifyShippingLine] = []
    fulfillment_status: Optional[str] = None
    financial_status: Optional[str] = None
    confirmed: bool = True
    buyer_accepts_marketing: bool = False
    cancel_reason: Optional[str] = None
    cancelled_at: Optional[datetime] = None
    note: Optional[str] = None
    note_attributes: List[Dict[str, str]] = []
    tags: List[str] = []
    discount_codes: List[Dict[str, Any]] = []
    
    # Will-call specific
    is_will_call: bool = False
    pickup_location: Optional[str] = None
    pickup_date: Optional[datetime] = None
    pickup_confirmed: bool = False