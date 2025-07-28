# Chyler's Hawaiian Beef Chips - Website Project

Full-stack e-commerce website for Chyler's Hawaiian Beef Chips, a premium Hawaiian snack company established in 2004.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/rprovine/chylers-website-project.git
cd chylers-website-project

# Start development environment
./start-dev.sh
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Project Overview

This repository contains the complete website implementation for Chyler's Hawaiian Beef Chips, featuring:

- 🥩 **Premium Beef Chips**: 4 flavors (Original, Cracked Pepper, Spicy, Award-winning Roasted Garlic)
- 📦 **Multiple Pack Sizes**: 1-pack (1.5 OZ), 3-pack, 6-pack, 15-pack options
- 🛍️ **Shopify Integration**: Full e-commerce functionality
- 🏝️ **Local Hawaii Support**: Will-call pickup at Kapolei Kitchen Factory Outlet
- 🚚 **Smart Shipping**: Free shipping on orders over $49
- 🥇 **Made in Hawaii**: Certified with Aloha

## Tech Stack

### Backend (FastAPI)
- Python 3.11+ with FastAPI
- PostgreSQL database with SQLAlchemy
- Shopify API integration
- JWT authentication
- Redis caching (optional)
- Docker deployment ready

### Frontend (Next.js 14)
- Next.js 14 with TypeScript
- Tailwind CSS with shadcn/ui
- Zustand state management
- React Query for data fetching
- Responsive design

## Repository Structure

```
chylers-website-project/
├── backend/          # FastAPI backend with Shopify integration
├── frontend/         # Next.js frontend
├── start-dev.sh      # Development start script
└── README.md         # This file
```

## Business Information

- **Founded**: 2004 (Named after daughter Chyler)
- **Location**: 91-1085 Lexington Street, Kapolei, HI 96707
- **Phone**: 1-800-484-1663
- **Email**: BeefChips@chylers.com
- **Hours**: Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time

## Key Features

- **High Protein**: 18g per serving
- **Keto-Friendly**: Low carb snack option
- **Award-Winning**: Roasted Garlic flavor
- **Made in Hawaii**: Locally produced with Aloha certification
- **Amazon Available**: Cross-platform sales support

## Getting Started

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure your environment variables
uvicorn app.main:app --reload
```

### Frontend Setup (Coming Soon)
```bash
cd frontend
npm install
npm run dev
```

## Deployment

The project is configured for deployment on:
- **Backend**: Render.com (with Docker)
- **Frontend**: Vercel
- **Database**: PostgreSQL on Render
- **Cache**: Redis on Render

## Contributing

This is a private commercial project for Chyler's Hawaiian Beef Chips.

## License

© 2024 Chyler's Hawaiian Beef Chips. All rights reserved.

---

🌺 Made with Aloha in Hawaii 🌺