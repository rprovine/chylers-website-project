'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/products/product-card'
import { productsApi } from '@/lib/api/client'
import { ReviewsSection } from '@/components/reviews/reviews-section'
import { PRODUCT_IMAGES, getProductImageByFlavor } from '@/lib/product-images'
import { PRODUCT_CONFIG } from '@/lib/constants'
import { ArrowRight, Truck, Clock, MapPin, Award } from 'lucide-react'
import toast from 'react-hot-toast'

async function getFeaturedProducts() {
  try {
    const products = await productsApi.getFeatured()
    return products.slice(0, 2) // Show only 2 featured products
  } catch (error) {
    console.error('Failed to fetch featured products:', error)
    // Return mock featured products with real images if API fails
    const featuredFlavors = [
      PRODUCT_CONFIG.flavors.find(f => f.id === 'original'),
      PRODUCT_CONFIG.flavors.find(f => f.id === 'roasted-garlic')
    ].filter(Boolean)
    
    return featuredFlavors.map((flavor, index) => ({
      id: String(index + 1),
      title: `Chyler's ${flavor!.name} Beef Chips`,
      handle: `${flavor!.slug}-beef-chips`,
      vendor: "Chyler's Hawaiian Beef Chips",
      product_type: 'Beef Chips',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: [flavor!.slug, flavor!.badge?.toLowerCase().replace(' ', '-') || ''].filter(Boolean),
      variants: [{
        id: `${index + 1}-1`,
        product_id: String(index + 1),
        title: '1 Pack',
        price: '13.99',
        sku: `${flavor!.id.toUpperCase()}-1`,
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
        src: getProductImageByFlavor(flavor!.slug),
        alt: `${flavor!.name} Beef Chips`,
        position: 1,
      }],
      options: [],
      flavor: flavor!.name,
      pack_sizes: ['1 Pack', '3 Pack', '6 Pack', '15 Pack'],
      nutrition_info: PRODUCT_CONFIG.nutrition,
      is_award_winning: flavor!.badge === 'Award Winning',
      is_bestseller: flavor!.id === 'original',
    }))
  }
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load featured products on mount
  useEffect(() => {
    getFeaturedProducts().then(setFeaturedProducts)
  }, [])

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // TODO: Implement newsletter API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      toast.success('Welcome to our ohana! Check your email for your 10% off code.')
      setEmail('')
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={PRODUCT_IMAGES.hero}
            alt="Chyler's Hawaiian Beef Chips - Three Flavors"
            fill
            className="object-cover object-center"
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

      {/* Product Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Four Amazing Flavors</h2>
            <p className="text-lg text-muted-foreground">
              Each flavor carefully crafted to deliver the perfect crispy crunch
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {PRODUCT_IMAGES.allProducts.map((image, index) => {
              const flavors = ['Original', 'Cracked Pepper', 'Spicy', 'Roasted Garlic']
              return (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${flavors[index]} Hawaiian Beef Chips`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="mt-2 text-center font-medium">{flavors[index]}</p>
                </div>
              )
            })}
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
                In 2004, Cal and Autumn were trying to make beef jerky to encourage their 
                daughter Chyler to eat more protein. What came out was something entirely 
                different - a crispy, chip-like snack that had everyone saying 
                <span className="font-semibold italic"> "It's not jerky, it's like a chip!"</span>
              </p>
              <p className="text-lg mb-6">
                Each batch is handcrafted in our Waipahu facility using 100% premium U.S. beef, 
                our secret blend of spices, and a unique slow oven-roasting process that creates 
                the perfect crispy texture.
              </p>
              <div className="flex flex-col gap-6">
                <Button asChild className="w-fit">
                  <Link href="/about-us">
                    Read Our Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-4">
                  <Image
                    src="https://chylers.com/cdn/shop/files/unnamed2.jpg"
                    alt="Made in Hawaii with Aloha Certification"
                    width={180}
                    height={72}
                    className="h-20 w-auto"
                  />
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Proudly certified by the Hawaii Department of Agriculture
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://chylers.com/cdn/shop/files/chyler-3y3-circle.jpg"
                alt="Cal, Autumn, and Chyler - Founders of Chyler's Hawaiian Beef Chips"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Made in Hawaii Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Certified Made in Hawaii with Aloha
                </h2>
                <p className="text-lg mb-4">
                  We're proud to be officially certified by the Hawaii Department of Agriculture. 
                  This certification represents our commitment to supporting local agriculture, 
                  creating jobs in our community, and sharing the true spirit of aloha with every 
                  bag of beef chips we make.
                </p>
                <p className="text-lg">
                  When you choose Chyler's, you're not just getting a delicious snack – you're 
                  supporting a local Hawaiian business that gives back to our island community.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://chylers.com/cdn/shop/files/unnamed2.jpg"
                  alt="Made in Hawaii with Aloha - Official Certification"
                  width={300}
                  height={120}
                  className="h-32 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Partners Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 items-center max-w-3xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0660/6130/4054/files/MIHF_logo.png"
                alt="MIHF Partner"
                width={150}
                height={80}
                className="h-16 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0660/6130/4054/files/SSE_Logo.png"
                alt="SSE Partner"
                width={150}
                height={80}
                className="h-16 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0660/6130/4054/files/MIH_logo.png"
                alt="MIH Partner"
                width={150}
                height={80}
                className="h-16 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
            Proud to partner with organizations that support Hawaiian businesses and promote 
            local economic growth.
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be the first to know about new flavors, exclusive deals, and special offers. 
                Join our ohana and get 10% off your first order!
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={isSubmitting}
                />
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              
              <p className="text-sm text-muted-foreground mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
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