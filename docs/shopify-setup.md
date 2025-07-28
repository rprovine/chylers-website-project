# Shopify Integration Setup Guide

This guide will help you set up the Shopify integration for Chyler's Hawaiian Beef Chips website.

## Prerequisites

- Shopify store: https://chylers.myshopify.com (based on the store URL you provided)
- Admin access to the Shopify store
- Shopify Partners account (optional, for development)

## Step 1: Create a Private App in Shopify

1. Log in to your Shopify Admin at https://chylers.myshopify.com/admin

2. Navigate to **Settings** → **Apps and sales channels**

3. Click on **Develop apps** (you may need to enable this first)

4. Click **Create an app** and give it a name like "Chyler's Website Integration"

5. Configure the API scopes (permissions) your app needs:
   - `read_products` - Read product information
   - `write_products` - Update product information
   - `read_inventory` - Check inventory levels
   - `read_orders` - View orders
   - `write_orders` - Create/update orders
   - `read_customers` - View customer data
   - `write_customers` - Create/update customers
   - `read_checkouts` - Access checkout information
   - `write_checkouts` - Create checkouts

6. Install the app to generate API credentials

## Step 2: Get Your API Credentials

After installing the app, you'll receive:
- **API Key**: Your app's public identifier
- **API Secret Key**: Keep this secure
- **Access Token**: Used to authenticate API requests

## Step 3: Configure the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Edit your `.env` file with the Shopify credentials:
   ```env
   # Shopify Configuration
   SHOPIFY_STORE_NAME=chylers
   SHOPIFY_API_KEY=your-api-key-here
   SHOPIFY_API_SECRET=your-api-secret-here
   SHOPIFY_ACCESS_TOKEN=your-access-token-here
   SHOPIFY_API_VERSION=2024-01
   ```

## Step 4: Set Up Products in Shopify

Ensure your products are set up in Shopify with:

1. **Product Structure**:
   - Title: "Chyler's [Flavor] Beef Chips"
   - Product Type: "Beef Chips"
   - Vendor: "Chyler's Hawaiian Beef Chips"

2. **Variants for each product**:
   - 1 Pack (1.5 oz) - $13.99
   - 3 Pack - $39.99 (save ~5%)
   - 6 Pack - $74.99 (save ~10%)
   - 15 Pack - $174.99 (save ~15%)

3. **Product Tags**:
   - Flavor tags: "original", "cracked-pepper", "spicy", "roasted-garlic"
   - Special tags: "bestseller" (for Original), "award-winning" (for Roasted Garlic)

4. **SEO Settings**:
   - URL handles: "original-beef-chips", "cracked-pepper-beef-chips", etc.

## Step 5: Sync Products

Once configured, the backend will automatically sync products from Shopify. You can test this by:

1. Start the backend:
   ```bash
   cd backend
   source venv/bin/activate
   python -m uvicorn app.main:app --reload
   ```

2. Check the API documentation at http://localhost:8000/docs

3. Test the products endpoint: http://localhost:8000/api/v1/products

## Step 6: Configure Webhooks (Optional)

For real-time updates, set up webhooks in Shopify:

1. In your Shopify app settings, go to **Webhooks**

2. Add webhooks for:
   - `products/create`
   - `products/update`
   - `products/delete`
   - `orders/create`
   - `inventory_levels/update`

3. Set the webhook URL to your backend endpoint:
   - Development: `https://your-ngrok-url.ngrok.io/api/v1/webhooks/shopify`
   - Production: `https://your-domain.com/api/v1/webhooks/shopify`

## Step 7: Test the Integration

1. Create a test product in Shopify
2. Check if it appears in your API: http://localhost:8000/api/v1/products
3. Try adding it to cart through the frontend
4. Test the checkout flow

## Troubleshooting

### Common Issues:

1. **401 Unauthorized Error**:
   - Check your access token is correct
   - Ensure the app has the required permissions

2. **Products Not Showing**:
   - Verify products are published in Shopify
   - Check product visibility settings
   - Ensure products have inventory

3. **Checkout Issues**:
   - Verify Shopify checkout settings
   - Check shipping zones are configured
   - Ensure payment gateway is set up

## Additional Resources

- [Shopify API Documentation](https://shopify.dev/docs/api/admin-rest)
- [Shopify Python API Library](https://github.com/Shopify/shopify_python_api)
- [Webhook Configuration Guide](https://shopify.dev/docs/apps/webhooks)

## Support

For Shopify-specific issues:
- Shopify Support: https://help.shopify.com
- Shopify Community: https://community.shopify.com

For integration issues:
- Email: BeefChips@chylers.com