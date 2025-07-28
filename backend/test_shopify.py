#!/usr/bin/env python3
"""
Test script to verify Shopify connection and fetch products
"""

import asyncio
import os
import sys
from dotenv import load_dotenv

# Add the app directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

async def test_shopify_connection():
    """Test connection to Shopify and fetch products"""
    try:
        from app.services.shopify_client import ShopifyClient
        from app.config import settings
        
        print("🔌 Testing Shopify Connection...")
        print(f"Store URL: https://{settings.SHOPIFY_STORE_NAME}.myshopify.com")
        print("-" * 50)
        
        # Initialize client
        client = ShopifyClient()
        
        # Test 1: Fetch products
        print("\n📦 Fetching products...")
        products = await client.get_products(limit=10)
        
        if products:
            print(f"✅ Found {len(products)} products:")
            for product in products:
                print(f"  - {product['title']} (ID: {product['id']})")
                if 'variants' in product:
                    print(f"    Variants: {len(product['variants'])}")
                    for variant in product['variants'][:2]:  # Show first 2 variants
                        print(f"      • {variant['title']}: ${variant['price']}")
        else:
            print("❌ No products found. Please add products to your Shopify store.")
        
        # Test 2: Check shipping zones
        print("\n🚚 Checking shipping zones...")
        try:
            zones = await client.get_shipping_zones()
            print(f"✅ Found {len(zones)} shipping zones")
        except Exception as e:
            print(f"⚠️  Could not fetch shipping zones: {str(e)}")
        
        # Close client
        await client.close()
        
        print("\n✅ Shopify connection test completed successfully!")
        
    except ImportError as e:
        print(f"❌ Import Error: {str(e)}")
        print("Make sure you're in the virtual environment and dependencies are installed.")
        print("Run: source venv/bin/activate && pip install -r requirements.txt")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        print("\nTroubleshooting:")
        print("1. Check your .env file has the correct Shopify credentials")
        print("2. Verify your Shopify app has the required permissions")
        print("3. Ensure your store name is correct (without .myshopify.com)")


if __name__ == "__main__":
    print("Chyler's Hawaiian Beef Chips - Shopify Integration Test")
    print("=" * 50)
    asyncio.run(test_shopify_connection())