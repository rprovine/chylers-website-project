import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/product-card'
import { TESTIMONIALS, PRODUCT_CONFIG } from '@/lib/constants'
import { ArrowRight, Star, Truck, Clock, MapPin, Award } from 'lucide-react'

async function getFeaturedProducts() {
  // TODO: Replace with actual API call
  return [
    {
      id: '1',
      title: "Chyler's Original Beef Chips",
      handle: 'original-beef-chips',
      vendor: "Chyler's Hawaiian Beef Chips",
      product_type: 'Beef Chips',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: ['original', 'bestseller'],
      variants: [{
        id: '1',
        product_id: '1',
        title: '1 Pack',
        price: '13.99',
        sku: 'ORIG-1',
        position: 1,
        inventory_policy: 'deny',
        option1: '1 Pack',
        available: true,
        requires_shipping: true,
        taxable: true,
        weight_unit: 'oz',
      }],
      images: [{
        id: '1',
        src: 'https://images.unsplash.com/photo-1629385969100-bff45d848476?w=800',
        alt: 'Original Beef Chips',
        position: 1,
      }],
      options: [],
      flavor: 'Original',
      pack_sizes: ['1 Pack', '3 Pack', '6 Pack', '15 Pack'],
      nutrition_info: PRODUCT_CONFIG.nutrition,
      is_award_winning: false,
      is_bestseller: true,
    },
    {
      id: '2',
      title: "Chyler's Roasted Garlic Beef Chips",
      handle: 'roasted-garlic-beef-chips',
      vendor: "Chyler's Hawaiian Beef Chips",
      product_type: 'Beef Chips',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: ['roasted-garlic', 'award-winning'],
      variants: [{
        id: '2',
        product_id: '2',
        title: '1 Pack',
        price: '13.99',
        sku: 'GARLIC-1',
        position: 1,
        inventory_policy: 'deny',
        option1: '1 Pack',
        available: true,
        requires_shipping: true,
        taxable: true,
        weight_unit: 'oz',
      }],
      images: [{
        id: '2',
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        alt: 'Roasted Garlic Beef Chips',
        position: 1,
      }],
      options: [],
      flavor: 'Roasted Garlic',
      pack_sizes: ['1 Pack', '3 Pack', '6 Pack', '15 Pack'],
      nutrition_info: PRODUCT_CONFIG.nutrition,
      is_award_winning: true,
      is_bestseller: false,
    },
  ]
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1606914469633-bd39206ea739?w=1920"
            alt="Hawaiian landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              It's Not Jerky,<br />It's Like a Chip!
            </h1>
            <p className="text-xl mb-8">
              Premium Hawaiian beef chips made with Aloha since 2004. 
              High protein, keto-friendly, and irresistibly delicious.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur" asChild>
                <Link href="/about-us">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-8 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Award Winning</span>
              <span className="text-sm text-muted-foreground">Roasted Garlic Flavor</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Free Shipping</span>
              <span className="text-sm text-muted-foreground">On orders over $49</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Since 2004</span>
              <span className="text-sm text-muted-foreground">Family owned & operated</span>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <span className="font-semibold">Made in Hawaii</span>
              <span className="text-sm text-muted-foreground">With Aloha certification</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">
              Try our most popular flavors - perfect for any occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {/* Add placeholder cards for other flavors */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2">
              <div className="bg-secondary/20 rounded-lg p-8 h-full flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl font-bold mb-4">All 4 Flavors Available</h3>
                <p className="text-muted-foreground mb-6">
                  Original • Cracked Pepper • Spicy • Roasted Garlic
                </p>
                <Button asChild>
                  <Link href="/shop">View All Products</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                A Happy Accident Turned Family Legacy
              </h2>
              <p className="text-lg mb-4">
                In 2004, what started as a kitchen mishap turned into Hawaii's favorite beef chip. 
                Named after our daughter Chyler (pronounced Shy-Ler), our premium beef chips have 
                been bringing the taste of aloha to snack lovers everywhere.
              </p>
              <p className="text-lg mb-6">
                Each batch is carefully crafted in our Kapolei facility, using only the finest 
                ingredients to create that perfect crispy texture that's "not jerky, it's like a chip!"
              </p>
              <Button asChild>
                <Link href="/about-us">
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1613482184972-f9c1022d0928?w=800"
                alt="Chyler's story"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="text-sm">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Taste the Aloha?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of happy customers enjoying our premium beef chips
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white hover:bg-white/20" asChild>
              <Link href="/where-to-buy">Find in Stores</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}