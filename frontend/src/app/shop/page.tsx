import { Metadata } from 'next'
import { ProductCard } from '@/components/products/product-card'
import { PRODUCT_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Shop Beef Chips',
  description: 'Shop our premium Hawaiian beef chips in 4 delicious flavors. High protein, keto-friendly snacks made with Aloha.',
}

async function getProducts() {
  // TODO: Replace with actual API call
  const flavors = PRODUCT_CONFIG.flavors
  
  return flavors.map((flavor, index) => ({
    id: String(index + 1),
    title: `Chyler's ${flavor.name} Beef Chips`,
    handle: `${flavor.slug}-beef-chips`,
    vendor: "Chyler's Hawaiian Beef Chips",
    product_type: 'Beef Chips',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    tags: [flavor.slug, flavor.badge?.toLowerCase().replace(' ', '-') || ''].filter(Boolean),
    variants: PRODUCT_CONFIG.packSizes.map((size, idx) => ({
      id: `${index + 1}-${idx + 1}`,
      product_id: String(index + 1),
      title: size.name,
      price: String((size.basePrice || 13.99) * size.quantity * (1 - (size.discount || 0))),
      sku: `${flavor.id.toUpperCase()}-${size.quantity}`,
      position: idx + 1,
      inventory_policy: 'deny',
      option1: size.name,
      available: true,
      requires_shipping: true,
      taxable: true,
      weight_unit: 'oz',
    })),
    images: [{
      id: String(index + 1),
      src: `https://images.unsplash.com/photo-${index % 2 === 0 ? '1629385969100-bff45d848476' : '1558618666-fcd25c85cd64'}?w=800`,
      alt: `${flavor.name} Beef Chips`,
      position: 1,
    }],
    options: [{
      id: '1',
      name: 'Size',
      position: 1,
      values: PRODUCT_CONFIG.packSizes.map(s => s.name),
    }],
    flavor: flavor.name,
    pack_sizes: PRODUCT_CONFIG.packSizes.map(s => s.name),
    nutrition_info: PRODUCT_CONFIG.nutrition,
    is_award_winning: flavor.badge === 'Award Winning',
    is_bestseller: flavor.id === 'original',
  }))
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Shop Beef Chips</h1>
          <p className="text-lg text-muted-foreground">
            Premium Hawaiian beef chips in 4 delicious flavors. Made with Aloha since 2004.
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
              <h3 className="text-xl font-semibold mb-2">High Protein</h3>
              <p className="text-muted-foreground">
                18g of protein per serving to fuel your day
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Keto Friendly</h3>
              <p className="text-muted-foreground">
                Only 3g carbs per serving - perfect for low-carb diets
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Made in Hawaii</h3>
              <p className="text-muted-foreground">
                Locally produced in Kapolei with authentic island flavor
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}