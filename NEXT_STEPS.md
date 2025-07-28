# Next Steps for Chyler's Website

## 🔐 1. Set Up Shopify Integration

Your Shopify store is at: **https://chylers.myshopify.com**

### Quick Setup:

1. **Get Shopify Credentials**:
   ```bash
   # Log in to your Shopify admin:
   # https://chylers.myshopify.com/admin
   
   # Navigate to:
   # Settings → Apps and sales channels → Develop apps
   ```

2. **Configure Backend**:
   ```bash
   cd backend
   # Copy the example Shopify config
   cp .env.shopify .env
   # Edit .env with your actual credentials
   ```

3. **Test the Connection**:
   ```bash
   cd backend
   source venv/bin/activate
   python test_shopify.py
   ```

## 🗄️ 2. Set Up Database

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Create Database**:
   ```bash
   createdb chylers_db
   ```

3. **Run Migrations**:
   ```bash
   cd backend
   source venv/bin/activate
   alembic upgrade head
   ```

## 🚀 3. Start Development

```bash
# From project root
./start-dev.sh
```

This starts:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📦 4. Configure Products in Shopify

Ensure each product in Shopify has:

1. **Product Information**:
   - Title: "Chyler's [Flavor] Beef Chips"
   - Type: "Beef Chips"
   - Vendor: "Chyler's Hawaiian Beef Chips"

2. **Variants** (for each product):
   | Size | Price | SKU |
   |------|-------|-----|
   | 1 Pack (1.5 oz) | $13.99 | [FLAVOR]-1 |
   | 3 Pack | $39.99 | [FLAVOR]-3 |
   | 6 Pack | $74.99 | [FLAVOR]-6 |
   | 15 Pack | $174.99 | [FLAVOR]-15 |

3. **Tags**:
   - Flavor: "original", "cracked-pepper", "spicy", "roasted-garlic"
   - Special: "bestseller", "award-winning"

4. **Images**: Upload product photos for each flavor

## 🚢 5. Configure Shipping

In Shopify Admin → Settings → Shipping:

1. **Shipping Zones**:
   - Hawaii (local)
   - United States (mainland)
   - International

2. **Shipping Rates**:
   - Standard: $7.99
   - Free shipping: Orders over $49
   - Will-call pickup: Free (Kapolei location)

## 💳 6. Set Up Payment Processing

In Shopify Admin → Settings → Payments:
- Enable Shopify Payments or your preferred gateway
- Configure tax settings for Hawaii

## 🌐 7. Deploy to Production

### Backend (Render.com):
```bash
# The backend is Docker-ready
# Push to GitHub and connect to Render
```

### Frontend (Already on Vercel):
- Update environment variables in Vercel dashboard
- Set `NEXT_PUBLIC_API_URL` to your production backend URL

## 📧 8. Configure Email (Optional)

For order confirmations and contact form:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

## 🔍 9. SEO & Analytics

1. **Google Analytics**: Add tracking ID to frontend `.env`
2. **Google Search Console**: Verify domain ownership
3. **Sitemap**: Already configured at `/sitemap.xml`

## 📱 10. Test Everything

- [ ] Products load from Shopify
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Will-call pickup option
- [ ] Free shipping over $49
- [ ] Contact form
- [ ] Mobile responsiveness

## Need Help?

- **Shopify Setup**: See `docs/shopify-setup.md`
- **API Documentation**: http://localhost:8000/docs
- **Support**: BeefChips@chylers.com

---

Ready to start? Begin with step 1 - setting up your Shopify credentials! 🌺