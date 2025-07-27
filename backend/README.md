# Chyler's Hawaiian Beef Chips - Backend API

FastAPI backend integrated with Shopify for Chyler's Hawaiian Beef Chips e-commerce platform.

## Features

- 🛍️ Full Shopify integration (products, cart, checkout, orders)
- 🔐 JWT authentication with user management
- 🛒 Session-based shopping cart with Shopify checkout
- 📦 Order tracking and webhooks
- 📧 Email notifications
- 🏝️ Will-call pickup option for Hawaii customers
- 💳 Free shipping on orders over $49
- 👤 Customer profiles with order history
- 📞 Contact form with business hours
- 🔧 Admin dashboard endpoints

## Tech Stack

- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with passlib
- **Caching**: Redis
- **E-commerce**: Shopify API
- **Email**: SMTP with aiosmtplib
- **Deployment**: Docker on Render.com

## Setup

1. **Clone and install dependencies:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Set up database:**
```bash
# Create PostgreSQL database
createdb chylers_db

# Run migrations
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

4. **Configure Shopify webhooks:**
   - Order created: `/api/v1/webhooks/shopify/orders/create`
   - Customer created: `/api/v1/webhooks/shopify/customers/create`
   - Cart updated: `/api/v1/webhooks/shopify/carts/update`

## Development

```bash
# Run development server
uvicorn app.main:app --reload

# API documentation available at:
# http://localhost:8000/docs
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/password-reset` - Request password reset

### Products
- `GET /api/v1/products` - List products
- `GET /api/v1/products/featured` - Get featured products
- `GET /api/v1/products/{handle}` - Get product details
- `GET /api/v1/products/collections` - List collections

### Cart
- `GET /api/v1/cart` - Get current cart
- `POST /api/v1/cart/items` - Add to cart
- `PUT /api/v1/cart/items/{id}` - Update cart item
- `DELETE /api/v1/cart/items/{id}` - Remove from cart
- `POST /api/v1/cart/discount` - Apply discount code
- `POST /api/v1/cart/shipping-rates` - Calculate shipping
- `GET /api/v1/cart/checkout-url` - Get Shopify checkout URL

### Orders
- `GET /api/v1/orders` - Get user's orders
- `GET /api/v1/orders/{id}` - Get order details

### Contact & Business
- `POST /api/v1/contact` - Submit contact inquiry
- `GET /api/v1/business/info` - Get business information
- `GET /api/v1/business/social-media` - Get social media links

### Admin (requires admin role)
- `GET /api/v1/admin/stats` - Dashboard statistics
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/orders` - List all orders
- `POST /api/v1/admin/sync-products` - Sync products from Shopify

## Deployment

1. **Deploy to Render.com:**
```bash
# Commit your changes
git add .
git commit -m "Initial backend setup"

# Connect to Render and deploy
# The render.yaml file contains all configuration
```

2. **Environment variables to set on Render:**
   - `DATABASE_URL` (auto-generated)
   - `REDIS_URL` (auto-generated)
   - `SECRET_KEY` (generate secure key)
   - `SHOPIFY_STORE_NAME`
   - `SHOPIFY_API_KEY`
   - `SHOPIFY_API_SECRET`
   - `SHOPIFY_ACCESS_TOKEN`
   - `SHOPIFY_WEBHOOK_SECRET`
   - `SMTP_USERNAME`
   - `SMTP_PASSWORD`

## Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app tests/
```

## Business Information

- **Founded**: 2004
- **Location**: 91-1085 Lexington Street, Kapolei, HI 96707
- **Phone**: 1-800-484-1663
- **Email**: BeefChips@chylers.com
- **Hours**: Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time
- **Flavors**: Original, Cracked Pepper, Spicy, Roasted Garlic (Award-winning)
- **Pack Sizes**: 1-pack (1.5 OZ), 3-pack, 6-pack, 15-pack

## License

© 2024 Chyler's Hawaiian Beef Chips. All rights reserved.