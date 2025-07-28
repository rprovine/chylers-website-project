// Product images from the actual Chyler's website
export const PRODUCT_IMAGES = {
  // Hero and general images
  hero: 'https://chylers.com/cdn/shop/files/Chylers-Hero-ThreeFlavors2-60.jpg',
  collection: 'https://chylers.com/cdn/shop/collections/hawaiian-beef-chips-631974.jpg',
  
  // Individual product images by flavor
  original: {
    primary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-original-199172.jpg',
    secondary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-original-757042.jpg',
  },
  crackedPepper: {
    primary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-cracked-pepper-271267.jpg',
    secondary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-cracked-pepper-647024.jpg',
  },
  spicy: {
    primary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-spicy-146525.jpg',
    secondary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-spicy-907643.jpg',
  },
  roastedGarlic: {
    primary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-roasted-garlic-756083.jpg',
    secondary: 'https://chylers.com/cdn/shop/files/hawaiian-beef-chips-original-with-roasted-garlic-711636.jpg',
  },
  varietyPack: {
    primary: 'https://chylers.com/cdn/shop/files/chylers-beef-chips-variety-pack-4-bags-905870.jpg',
  }
}

// Helper function to get product image by flavor
export function getProductImageByFlavor(flavor: string): string {
  const flavorMap: Record<string, string> = {
    'original': PRODUCT_IMAGES.original.primary,
    'cracked-pepper': PRODUCT_IMAGES.crackedPepper.primary,
    'spicy': PRODUCT_IMAGES.spicy.primary,
    'roasted-garlic': PRODUCT_IMAGES.roastedGarlic.primary,
  }
  
  const flavorKey = flavor.toLowerCase().replace(' ', '-')
  return flavorMap[flavorKey] || PRODUCT_IMAGES.original.primary
}