import { Metadata } from 'next'
import { ProductCard } from '@/components/products/product-card'
import { productsApi } from '@/lib/api/client'
import { PRODUCT_CONFIG } from '@/lib/constants'
import { getProductImageByFlavor } from '@/lib/product-images'

export const metadata: Metadata = {
  title: 'Shop Beef Chips',
  description: 'Shop our premium Hawaiian beef chips in 4 delicious flavors. High protein, keto-friendly snacks made with Aloha.',
}

async function getProducts() {
  try {
    const products = await productsApi.getAll()
    return products
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // Return mock products with real images if API fails
    return PRODUCT_CONFIG.flavors.map((flavor, index) => ({
      id: String(index + 1),
      title: `Chyler's ${flavor.name} Beef Chips`,
      handle: `${flavor.slug}-beef-chips`,
      vendor: "Chyler's Hawaiian Beef Chips",
      product_type: 'Beef Chips',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: [flavor.slug, flavor.badge?.toLowerCase().replace(' ', '-') || ''].filter(Boolean),
      variants: [{
        id: `${index + 1}-1`,
        product_id: String(index + 1),
        title: '1 Pack',
        price: '13.99',
        sku: `${flavor.id.toUpperCase()}-1`,
        position: 1,
        inventory_policy: 'deny',
        option1: '1 Pack',
        available: true,
        requires_shipping: true,
        taxable: true,
        weight_unit: 'oz',
      }],
      images: [{
        id: String(index + 1),
        src: getProductImageByFlavor(flavor.slug),
        alt: `${flavor.name} Beef Chips`,
        position: 1,
      }],
      options: [],
      flavor: flavor.name,
      pack_sizes: ['1 Pack', '3 Pack', '6 Pack', '15 Pack'],
      nutrition_info: PRODUCT_CONFIG.nutrition,
      is_award_winning: flavor.badge === 'Award Winning',
      is_bestseller: flavor.id === 'original',
    }))
  }
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Shop Beef Chips</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Discover the perfect snack that satisfies your cravings without the guilt. Our premium 
            Hawaiian beef chips deliver an irresistible crunch packed with 18g of protein and only 
            3g of carbs per serving. Choose from four mouthwatering flavors, each handcrafted in 
            small batches using our time-honored roasting process. Whether you're fueling your 
            active lifestyle or simply treating yourself to something special, every bite brings 
            you the authentic taste of Hawaii.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">High Protein Powerhouse</h3>
              <p className="text-muted-foreground">
                With 18g of premium beef protein per serving, our chips deliver more protein 
                than three eggs! Perfect for post-workout recovery, afternoon energy boosts, 
                or satisfying those between-meal cravings while supporting your fitness goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Keto & Paleo Friendly</h3>
              <p className="text-muted-foreground">
                Only 3g of carbs and zero sugar per serving make our beef chips the ideal 
                snack for low-carb lifestyles. Naturally gluten-free with no fillers or 
                artificial ingredients – just pure, wholesome nutrition that fits your diet.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Made Fresh in Hawaii</h3>
              <p className="text-muted-foreground">
                Every batch is handcrafted in our Waipahu facility using traditional methods 
                passed down through generations. When you order, we make it fresh – ensuring 
                maximum flavor and that perfect crispy texture in every single bag.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}