export const SITE_CONFIG = {
  name: "Chyler's Hawaiian Beef Chips",
  description: "Premium Hawaiian beef chips made with Aloha since 2004",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chylers.com',
  ogImage: '/og-image.jpg',
  links: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://www.facebook.com/chylers',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/chylers/',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://www.tiktok.com/@beefchips',
    amazon: process.env.NEXT_PUBLIC_AMAZON_STORE_URL || 'https://www.amazon.com/stores/chylers',
  },
}

export const BUSINESS_INFO = {
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '1-800-484-1663',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'BeefChips@chylers.com',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '94-300 Farrington Hwy, #C03, Waipahu, HI 96797',
  hours: {
    weekdays: 'Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time',
    weekends: 'Closed',
  },
  willCall: {
    location: 'Waipahu Factory Outlet',
    hours: 'Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time',
  },
}

export const PRODUCT_CONFIG = {
  flavors: [
    { id: 'original', name: 'Original', slug: 'original' },
    { id: 'cracked-pepper', name: 'Cracked Pepper', slug: 'cracked-pepper' },
    { id: 'spicy', name: 'Spicy', slug: 'spicy' },
    { id: 'roasted-garlic', name: 'Roasted Garlic', slug: 'roasted-garlic', badge: 'Award Winning' },
  ],
  packSizes: [
    { id: '1-pack', name: '1 Pack', quantity: 1, basePrice: 13.99 },
    { id: '3-pack', name: '3 Pack', quantity: 3, discount: 0.05 },
    { id: '6-pack', name: '6 Pack', quantity: 6, discount: 0.10 },
    { id: '15-pack', name: '15 Pack', quantity: 15, discount: 0.15 },
  ],
  nutrition: {
    serving_size: '1.5 oz',
    protein: '18g',
    carbs: '3g',
    fat: '5g',
    calories: '120',
    keto_friendly: true,
    gluten_free: true,
    features: ['Keto Friendly', 'Low Carb', 'High Protein', 'Gluten Free'],
  },
}

export const SHIPPING_CONFIG = {
  freeThreshold: 49,
  standardRate: 7.99,
  expeditedRate: 15.99,
  willCallAvailable: true,
}

export const NAVIGATION = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Where to Buy', href: '/where-to-buy' },
    { name: 'Contact', href: '/contact' },
  ],
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Beef Chips', href: '/shop?category=beef-chips' },
    { name: 'Merchandise', href: '/shop?category=merchandise' },
  ],
  customer: [
    { name: 'My Account', href: '/account' },
    { name: 'Order History', href: '/account/orders' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Returns/Refund Policy', href: '/returns-policy' },
  ],
  company: [
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact', href: '/contact' },
    { name: 'Where to Buy', href: '/where-to-buy' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
}

export const TESTIMONIALS = [
  {
    id: 1,
    content: "Best beef chips I've ever had! The Roasted Garlic flavor is absolutely amazing.",
    author: "Sarah K.",
    location: "Honolulu, HI",
    rating: 5,
  },
  {
    id: 2,
    content: "Perfect keto snack! High protein and low carb. I order the 15-pack every month.",
    author: "Mike T.",
    location: "Los Angeles, CA",
    rating: 5,
  },
  {
    id: 3,
    content: "Love supporting local Hawaii businesses. The quality is outstanding!",
    author: "Lisa M.",
    location: "Kapolei, HI",
    rating: 5,
  },
]

export const FAQ = [
  {
    question: "What makes Chyler's beef chips different from beef jerky?",
    answer: "Our beef chips are thinly sliced and crisped to perfection, creating a chip-like texture that's completely different from traditional jerky. It's not jerky, it's like a chip!",
  },
  {
    question: "Are your products keto-friendly?",
    answer: "Yes! All our beef chips are keto-friendly with 18g of protein and only 3g of carbs per serving.",
  },
  {
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free domestic shipping on all orders over $49.",
  },
  {
    question: "Can I pick up my order in person?",
    answer: "Yes! Hawaii customers can choose Will Call pickup at our Waipahu Factory Outlet during business hours (Monday-Friday, 8:00 AM to 5:00 PM Hawaii Time).",
  },
  {
    question: "Where else can I buy your products?",
    answer: "Besides our website, you can find Chyler's Hawaiian Beef Chips on our Amazon storefront.",
  },
]