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
              Experience the revolutionary crunch of Hawaii's original beef chips. Handcrafted 
              in small batches with 100% premium U.S. beef and our secret blend of island spices, 
              each crispy bite delivers 18g of protein with only 3g of carbs. Perfect for keto 
              lifestyles, post-workout fuel, or whenever you crave that satisfying crunch.
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
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From our classic Original to our award-winning Roasted Garlic, each flavor is 
              meticulously crafted using time-honored techniques passed down through generations. 
              Every batch is slow oven-roasted to achieve that perfect crispy texture that makes 
              our beef chips impossible to put down. Discover your favorite or try them all!
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
              <p className="text-lg mb-8">
                Each batch is handcrafted in our Waipahu facility using 100% premium U.S. beef, 
                our secret blend of spices, and a unique slow oven-roasting process that creates 
                the perfect crispy texture.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button asChild size="lg">
                  <Link href="/about-us">
                    Read Our Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <div className="flex items-center gap-3 px-4 py-2 bg-white/50 rounded-lg">
                  <Image
                    src="https://chylers.com/cdn/shop/files/unnamed2.jpg"
                    alt="Made in Hawaii with Aloha"
                    width={100}
                    height={40}
                    className="h-12 w-auto"
                  />
                  <p className="text-sm font-medium text-muted-foreground">
                    Proudly certified by the<br />
                    Hawaii Department of Agriculture
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
                  We're proud to be officially certified by the Hawaii Department of Agriculture 
                  as "Made in Hawaii with Aloha." This prestigious certification isn't just a badge – 
                  it's our promise to maintain the highest standards of quality while supporting our 
                  local economy. Every purchase helps sustain Hawaiian jobs, supports local suppliers, 
                  and preserves the authentic flavors of our islands.
                </p>
                <p className="text-lg">
                  When you choose Chyler's, you're joining a movement that celebrates Hawaiian 
                  craftsmanship and entrepreneurship. From sourcing to packaging, we prioritize 
                  local partnerships and sustainable practices. Your support helps us continue 
                  our mission of sharing the true taste of aloha with the world, one crispy 
                  bite at a time.
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
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 lg:gap-12 items-center max-w-4xl mx-auto">
            <div className="flex justify-center">
              <Image
                src="https://chylers.com/cdn/shop/files/mihf-logo-bw.png?v=1724561775&width=550"
                alt="MIHF Partner"
                width={250}
                height={125}
                className="h-20 sm:h-28 md:h-32 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="https://chylers.com/cdn/shop/files/SSE_Logo_FINAL-bw.png?v=1724562607&width=550"
                alt="SSE Partner"
                width={250}
                height={125}
                className="h-20 sm:h-28 md:h-32 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="https://chylers.com/cdn/shop/files/MIH-logo.jpg?v=1724562658&width=550"
                alt="MIH Partner"
                width={250}
                height={125}
                className="h-20 sm:h-28 md:h-32 w-auto grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
          <p className="text-center text-muted-foreground mt-8 max-w-3xl mx-auto">
            We're honored to collaborate with these distinguished organizations that champion 
            Hawaiian businesses and foster economic growth across our islands. Together, we're 
            building a stronger, more sustainable Hawaii by promoting local entrepreneurship, 
            preserving cultural heritage, and creating opportunities for future generations. 
            These partnerships enable us to reach new markets while staying true to our 
            island roots and values.
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

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">What makes Chyler's different from beef jerky?</h3>
              <p className="text-muted-foreground">
                While beef jerky is chewy and tough, our beef chips are light, crispy, and crunchy – 
                just like a potato chip! Our unique slow-roasting process creates a completely different 
                texture that's easier to eat and more satisfying. Plus, with 18g of protein per serving, 
                you're getting serious nutrition in every delicious bite. As we say, "It's not jerky, 
                it's like a chip!"
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">How should I store my beef chips?</h3>
              <p className="text-muted-foreground">
                For maximum freshness and crunch, store your unopened bags in a cool, dry place. 
                Once opened, we recommend enjoying them within 3-5 days (though most customers 
                tell us a bag rarely lasts that long!). For extended freshness, you can transfer 
                them to an airtight container. Avoid humid environments as moisture is the enemy 
                of that perfect crispy texture.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Are your beef chips really keto-friendly?</h3>
              <p className="text-muted-foreground">
                Absolutely! With only 3g of carbs and zero sugar per serving, our beef chips are 
                perfect for keto, paleo, and low-carb lifestyles. They're also naturally gluten-free 
                with no fillers or artificial ingredients. Many of our customers are fitness enthusiasts 
                and athletes who rely on our chips for clean, convenient protein that fits their macros.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Do you ship to the mainland United States?</h3>
              <p className="text-muted-foreground">
                Yes! We ship nationwide with free shipping on orders over $49. Orders typically arrive 
                within 5-7 business days to the mainland. We also offer expedited shipping options for 
                those who can't wait to taste the aloha. Hawaii residents can save on shipping with 
                our Will-Call pickup option at our Waipahu facility.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Which flavor should I try first?</h3>
              <p className="text-muted-foreground">
                That's like asking us to pick a favorite child! Our Original flavor is perfect for 
                purists who love the natural beef taste. Cracked Pepper adds a bold, peppery kick. 
                Spicy brings the heat for adventurous snackers. And our award-winning Roasted Garlic 
                is a fan favorite with its savory, aromatic flavor. Can't decide? Try our variety pack 
                to sample all four!
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