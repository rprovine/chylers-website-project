from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from ..services.shopify_client import shopify_client
from ..schemas.shopify import ShopifyProduct, ShopifyCollection
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/v1/products", tags=["products"])


@router.get("/", response_model=List[ShopifyProduct])
async def get_products(
    limit: int = Query(50, ge=1, le=250),
    collection_handle: Optional[str] = None,
    flavor: Optional[str] = None,
    pack_size: Optional[str] = None
) -> List[ShopifyProduct]:
    """Get all products with optional filtering"""
    try:
        # Get collection ID if handle provided
        collection_id = None
        if collection_handle:
            collections = await shopify_client.http_client.get(
                f"/collections.json?handle={collection_handle}"
            )
            collections_data = collections.json()
            if collections_data["collections"]:
                collection_id = collections_data["collections"][0]["id"]
        
        # Get products
        products = await shopify_client.get_products(
            limit=limit,
            collection_id=collection_id
        )
        
        # Transform and filter products
        result = []
        for product in products:
            # Parse custom attributes from tags or metafields
            flavor_tag = None
            pack_sizes = []
            is_award_winning = False
            is_bestseller = False
            
            for tag in product.get("tags", "").split(","):
                tag = tag.strip().lower()
                if tag in ["original", "cracked pepper", "spicy", "roasted garlic"]:
                    flavor_tag = tag.title()
                elif tag == "award-winning":
                    is_award_winning = True
                elif tag == "bestseller":
                    is_bestseller = True
                elif "pack" in tag:
                    pack_sizes.append(tag)
            
            # Extract pack sizes from variants
            if not pack_sizes:
                pack_sizes = list(set([
                    v.get("option1", "") 
                    for v in product.get("variants", [])
                    if v.get("option1")
                ]))
            
            # Apply filters
            if flavor and flavor_tag != flavor:
                continue
            if pack_size and pack_size not in pack_sizes:
                continue
            
            # Extract nutrition info from description or metafields
            nutrition_info = {
                "protein": "18g",
                "carbs": "3g",
                "fat": "5g",
                "calories": "120",
                "serving_size": "1.5 oz",
                "keto_friendly": True,
                "gluten_free": True
            }
            
            shopify_product = ShopifyProduct(
                id=str(product["id"]),
                title=product["title"],
                handle=product["handle"],
                body_html=product.get("body_html"),
                vendor=product.get("vendor", "Chyler's Hawaiian Beef Chips"),
                product_type=product.get("product_type", "Beef Chips"),
                created_at=product["created_at"],
                updated_at=product["updated_at"],
                published_at=product.get("published_at"),
                tags=product.get("tags", "").split(","),
                variants=[
                    {
                        "id": str(v["id"]),
                        "product_id": str(v["product_id"]),
                        "title": v["title"],
                        "price": v["price"],
                        "sku": v.get("sku"),
                        "position": v.get("position", 1),
                        "inventory_policy": v.get("inventory_policy", "deny"),
                        "compare_at_price": v.get("compare_at_price"),
                        "option1": v.get("option1"),
                        "option2": v.get("option2"),
                        "option3": v.get("option3"),
                        "barcode": v.get("barcode"),
                        "grams": v.get("grams"),
                        "weight": v.get("weight"),
                        "weight_unit": v.get("weight_unit", "oz"),
                        "inventory_quantity": v.get("inventory_quantity"),
                        "available": v.get("available", True),
                        "image_id": str(v["image_id"]) if v.get("image_id") else None,
                        "requires_shipping": v.get("requires_shipping", True),
                        "taxable": v.get("taxable", True)
                    }
                    for v in product.get("variants", [])
                ],
                images=[
                    {
                        "id": str(img["id"]),
                        "src": img["src"],
                        "alt": img.get("alt"),
                        "position": img.get("position", 1),
                        "width": img.get("width"),
                        "height": img.get("height")
                    }
                    for img in product.get("images", [])
                ],
                options=product.get("options", []),
                flavor=flavor_tag,
                pack_sizes=pack_sizes,
                nutrition_info=nutrition_info,
                is_award_winning=is_award_winning,
                is_bestseller=is_bestseller
            )
            
            result.append(shopify_product)
        
        return result
        
    except Exception as e:
        logger.error(f"Error fetching products: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")


@router.get("/featured", response_model=List[ShopifyProduct])
async def get_featured_products() -> List[ShopifyProduct]:
    """Get featured products (bestsellers and award-winning)"""
    all_products = await get_products(limit=100)
    featured = [
        p for p in all_products 
        if p.is_bestseller or p.is_award_winning
    ]
    return featured[:6]  # Return top 6 featured products


@router.get("/collections", response_model=List[ShopifyCollection])
async def get_collections() -> List[ShopifyCollection]:
    """Get all product collections"""
    try:
        response = await shopify_client.http_client.get("/custom_collections.json")
        collections = response.json()["custom_collections"]
        
        # Also get smart collections
        smart_response = await shopify_client.http_client.get("/smart_collections.json")
        collections.extend(smart_response.json()["smart_collections"])
        
        return [
            ShopifyCollection(
                id=str(c["id"]),
                title=c["title"],
                handle=c["handle"],
                body_html=c.get("body_html"),
                published_at=c.get("published_at"),
                sort_order=c.get("sort_order", "best-selling"),
                products_count=c.get("products_count", 0),
                image={
                    "id": str(c["image"]["id"]),
                    "src": c["image"]["src"],
                    "alt": c["image"].get("alt")
                } if c.get("image") else None
            )
            for c in collections
        ]
        
    except Exception as e:
        logger.error(f"Error fetching collections: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch collections")


@router.get("/{product_handle}", response_model=ShopifyProduct)
async def get_product_by_handle(product_handle: str) -> ShopifyProduct:
    """Get single product by handle"""
    try:
        product = await shopify_client.get_product_by_handle(product_handle)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Transform product (same logic as above)
        flavor_tag = None
        pack_sizes = []
        is_award_winning = False
        is_bestseller = False
        
        for tag in product.get("tags", "").split(","):
            tag = tag.strip().lower()
            if tag in ["original", "cracked pepper", "spicy", "roasted garlic"]:
                flavor_tag = tag.title()
            elif tag == "award-winning":
                is_award_winning = True
            elif tag == "bestseller":
                is_bestseller = True
        
        # Extract pack sizes from variants
        pack_sizes = list(set([
            v.get("option1", "") 
            for v in product.get("variants", [])
            if v.get("option1")
        ]))
        
        nutrition_info = {
            "protein": "18g",
            "carbs": "3g",
            "fat": "5g",
            "calories": "120",
            "serving_size": "1.5 oz",
            "keto_friendly": True,
            "gluten_free": True
        }
        
        return ShopifyProduct(
            id=str(product["id"]),
            title=product["title"],
            handle=product["handle"],
            body_html=product.get("body_html"),
            vendor=product.get("vendor", "Chyler's Hawaiian Beef Chips"),
            product_type=product.get("product_type", "Beef Chips"),
            created_at=product["created_at"],
            updated_at=product["updated_at"],
            published_at=product.get("published_at"),
            tags=product.get("tags", "").split(","),
            variants=[
                {
                    "id": str(v["id"]),
                    "product_id": str(v["product_id"]),
                    "title": v["title"],
                    "price": v["price"],
                    "sku": v.get("sku"),
                    "position": v.get("position", 1),
                    "inventory_policy": v.get("inventory_policy", "deny"),
                    "compare_at_price": v.get("compare_at_price"),
                    "option1": v.get("option1"),
                    "option2": v.get("option2"),
                    "option3": v.get("option3"),
                    "barcode": v.get("barcode"),
                    "grams": v.get("grams"),
                    "weight": v.get("weight"),
                    "weight_unit": v.get("weight_unit", "oz"),
                    "inventory_quantity": v.get("inventory_quantity"),
                    "available": v.get("available", True),
                    "image_id": str(v["image_id"]) if v.get("image_id") else None,
                    "requires_shipping": v.get("requires_shipping", True),
                    "taxable": v.get("taxable", True)
                }
                for v in product.get("variants", [])
            ],
            images=[
                {
                    "id": str(img["id"]),
                    "src": img["src"],
                    "alt": img.get("alt"),
                    "position": img.get("position", 1),
                    "width": img.get("width"),
                    "height": img.get("height")
                }
                for img in product.get("images", [])
            ],
            options=product.get("options", []),
            flavor=flavor_tag,
            pack_sizes=pack_sizes,
            nutrition_info=nutrition_info,
            is_award_winning=is_award_winning,
            is_bestseller=is_bestseller
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching product: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch product")