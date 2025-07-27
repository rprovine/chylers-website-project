import shopify
from typing import List, Dict, Optional, Any
from ..config import settings
import httpx
from datetime import datetime


class ShopifyClient:
    def __init__(self):
        self.shop_url = f"https://{settings.SHOPIFY_STORE_NAME}.myshopify.com"
        self.api_version = settings.SHOPIFY_API_VERSION
        self.access_token = settings.SHOPIFY_ACCESS_TOKEN
        
        # Initialize Shopify session
        self.session = shopify.Session(
            self.shop_url,
            self.api_version,
            self.access_token
        )
        shopify.ShopifyResource.activate_session(self.session)
        
        # HTTP client for custom requests
        self.http_client = httpx.AsyncClient(
            base_url=f"{self.shop_url}/admin/api/{self.api_version}",
            headers={
                "X-Shopify-Access-Token": self.access_token,
                "Content-Type": "application/json"
            }
        )
    
    async def get_products(self, limit: int = 50, collection_id: Optional[str] = None) -> List[Dict]:
        """Get products from Shopify store"""
        params = {"limit": limit}
        if collection_id:
            params["collection_id"] = collection_id
            
        response = await self.http_client.get("/products.json", params=params)
        response.raise_for_status()
        return response.json()["products"]
    
    async def get_product(self, product_id: str) -> Dict:
        """Get single product by ID"""
        response = await self.http_client.get(f"/products/{product_id}.json")
        response.raise_for_status()
        return response.json()["product"]
    
    async def get_product_by_handle(self, handle: str) -> Optional[Dict]:
        """Get product by handle/slug"""
        response = await self.http_client.get(f"/products.json?handle={handle}")
        response.raise_for_status()
        products = response.json()["products"]
        return products[0] if products else None
    
    async def create_checkout(self, line_items: List[Dict]) -> Dict:
        """Create a new checkout"""
        checkout_data = {
            "checkout": {
                "line_items": line_items,
                "shipping_address": {},
                "note_attributes": [
                    {"name": "source", "value": "chylers-api"}
                ]
            }
        }
        
        response = await self.http_client.post("/checkouts.json", json=checkout_data)
        response.raise_for_status()
        return response.json()["checkout"]
    
    async def update_checkout(self, checkout_token: str, updates: Dict) -> Dict:
        """Update existing checkout"""
        response = await self.http_client.put(
            f"/checkouts/{checkout_token}.json",
            json={"checkout": updates}
        )
        response.raise_for_status()
        return response.json()["checkout"]
    
    async def create_customer(self, customer_data: Dict) -> Dict:
        """Create a new customer"""
        response = await self.http_client.post(
            "/customers.json",
            json={"customer": customer_data}
        )
        response.raise_for_status()
        return response.json()["customer"]
    
    async def get_customer(self, customer_id: str) -> Dict:
        """Get customer by ID"""
        response = await self.http_client.get(f"/customers/{customer_id}.json")
        response.raise_for_status()
        return response.json()["customer"]
    
    async def search_customers(self, email: str) -> List[Dict]:
        """Search customers by email"""
        response = await self.http_client.get(
            "/customers/search.json",
            params={"query": f"email:{email}"}
        )
        response.raise_for_status()
        return response.json()["customers"]
    
    async def get_orders(self, customer_id: Optional[str] = None, status: Optional[str] = None) -> List[Dict]:
        """Get orders with optional filters"""
        params = {}
        if customer_id:
            params["customer_id"] = customer_id
        if status:
            params["status"] = status
            
        response = await self.http_client.get("/orders.json", params=params)
        response.raise_for_status()
        return response.json()["orders"]
    
    async def get_order(self, order_id: str) -> Dict:
        """Get single order by ID"""
        response = await self.http_client.get(f"/orders/{order_id}.json")
        response.raise_for_status()
        return response.json()["order"]
    
    async def create_draft_order(self, draft_order_data: Dict) -> Dict:
        """Create a draft order for will-call or special orders"""
        response = await self.http_client.post(
            "/draft_orders.json",
            json={"draft_order": draft_order_data}
        )
        response.raise_for_status()
        return response.json()["draft_order"]
    
    async def get_shipping_zones(self) -> List[Dict]:
        """Get shipping zones and rates"""
        response = await self.http_client.get("/shipping_zones.json")
        response.raise_for_status()
        return response.json()["shipping_zones"]
    
    async def calculate_shipping(self, checkout_token: str, shipping_address: Dict) -> List[Dict]:
        """Calculate shipping rates for a checkout"""
        response = await self.http_client.put(
            f"/checkouts/{checkout_token}.json",
            json={"checkout": {"shipping_address": shipping_address}}
        )
        response.raise_for_status()
        
        # Get shipping rates
        rates_response = await self.http_client.get(
            f"/checkouts/{checkout_token}/shipping_rates.json"
        )
        rates_response.raise_for_status()
        return rates_response.json()["shipping_rates"]
    
    async def verify_webhook(self, data: bytes, hmac_header: str) -> bool:
        """Verify Shopify webhook signature"""
        import hmac
        import hashlib
        import base64
        
        if not settings.SHOPIFY_WEBHOOK_SECRET:
            return False
            
        calculated_hmac = base64.b64encode(
            hmac.new(
                settings.SHOPIFY_WEBHOOK_SECRET.encode('utf-8'),
                data,
                digestmod=hashlib.sha256
            ).digest()
        ).decode()
        
        return hmac.compare_digest(calculated_hmac, hmac_header)
    
    async def close(self):
        """Close HTTP client"""
        await self.http_client.aclose()


shopify_client = ShopifyClient()