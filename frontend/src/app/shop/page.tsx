import { Metadata } from 'next'
import { ProductCard } from '@/components/products/product-card'
import { productsApi } from '@/lib/api/client'

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
    // Return empty array if API fails
    return []
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