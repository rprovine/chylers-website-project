# Chyler's Hawaiian Beef Chips - Frontend

Modern Next.js 14 e-commerce frontend for Chyler's Hawaiian Beef Chips.

## Features

- 🌺 Hawaiian-inspired design with modern aesthetics
- 🛍️ Complete e-commerce functionality
- 📱 Mobile-first responsive design
- ⚡ Optimized performance with Next.js 14 App Router
- 🔐 JWT authentication with secure user management
- 🛒 Advanced shopping cart with pack size selection
- 🚚 Smart shipping calculator (free over $49)
- 🏝️ Will-call pickup option for Hawaii customers
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui
- 📊 State management with Zustand
- 🔄 Data fetching with React Query

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **State**: Zustand
- **Forms**: React Hook Form with Zod
- **API Client**: Axios with React Query
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   ├── layout/      # Layout components
│   ├── products/    # Product components
│   └── cart/        # Cart components
├── lib/             # Utilities and configurations
├── hooks/           # Custom React hooks
├── store/           # Zustand stores
├── types/           # TypeScript types
└── styles/          # Global styles
```

## Key Features

### Product Showcase
- 4 flavors: Original, Cracked Pepper, Spicy, Roasted Garlic (Award-winning)
- Multiple pack sizes with bulk discounts
- High-quality product images
- Nutritional information display

### Shopping Experience
- Real-time cart updates
- Pack size selection
- Free shipping progress indicator
- Discount code support
- Guest checkout option

### Local Support
- Will-call pickup for Hawaii customers
- Business hours display
- Contact form with inquiry types
- Location and directions

### Performance
- Image optimization with Next.js Image
- Code splitting and lazy loading
- SEO optimization
- Core Web Vitals optimized

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Environment Variables

Required environment variables for production:

```
NEXT_PUBLIC_API_URL=https://api.chylers.com/api/v1
NEXT_PUBLIC_SITE_URL=https://chylers.com
NEXT_PUBLIC_BUSINESS_PHONE=1-800-484-1663
NEXT_PUBLIC_BUSINESS_EMAIL=BeefChips@chylers.com
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/chylersbeefchips
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/chylersbeefchips
NEXT_PUBLIC_TIKTOK_URL=https://tiktok.com/@chylersbeefchips
NEXT_PUBLIC_AMAZON_STORE_URL=https://www.amazon.com/stores/chylers
```

## Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Component names in PascalCase
- Utility functions in camelCase

### Component Structure
```tsx
// components/example-component.tsx
'use client' // Only if needed

import { ComponentProps } from '@/types'

interface ExampleComponentProps {
  // Props definition
}

export function ExampleComponent({ prop }: ExampleComponentProps) {
  // Component logic
  return (
    // JSX
  )
}
```

### State Management
- Use Zustand for global state (auth, cart)
- Use React Hook Form for forms
- Use React Query for server state

## License

© 2024 Chyler's Hawaiian Beef Chips. All rights reserved.