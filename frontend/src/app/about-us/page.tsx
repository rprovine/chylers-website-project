import { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PRODUCT_IMAGES } from '@/lib/product-images'

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn the story of Chyler's Hawaiian Beef Chips - a family business creating premium beef chips in Hawaii since 2004.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src={PRODUCT_IMAGES.hero}
          alt="Chyler's Hawaiian Beef Chips Products"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl">A Hawaiian family business since 2004</p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Meet Cal & Autumn</h2>
              <p className="text-lg mb-4">
                Believe it or not, Hawaiian Beef Chips® are all the result of an un-planned 
                but very fortunate recipe mistake. In 2004, we were trying to make beef jerky 
                to encourage our daughter to eat more protein, but what came out was something 
                entirely different.
              </p>
              <p className="text-lg mb-4">
                When our family tasted it, their reaction was unanimous: 
                <span className="font-semibold italic"> "It's not jerky, it's like a chip!"</span> 
                We knew we had discovered something special.
              </p>
              <p className="text-lg">
                Named after our daughter Chyler (pronounced Shy-Ler), every bag of our 
                Hawaiian Beef Chips carries that same spirit of family, love, and the 
                aloha that makes Hawaii so special.
              </p>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://chylers.com/cdn/shop/files/chyler-3y3-circle.jpg"
                alt="Cal, Autumn, and Chyler - Founders of Chyler's Hawaiian Beef Chips"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="relative h-16 flex items-center justify-center">
          <Image
            src="https://cdn.shopify.com/s/files/1/0660/6130/4054/files/divider.png"
            alt="Decorative divider"
            width={200}
            height={20}
            className="opacity-30"
          />
        </div>
      </div>

      {/* Production Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Handcrafted with Care</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="https://chylers.com/cdn/shop/files/apic1.png"
                  alt="Premium U.S. Beef"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Premium U.S. Beef</h3>
              <p className="text-muted-foreground">
                We start with only the finest cuts of 100% premium U.S. beef, 
                carefully selected for quality and flavor.
              </p>
            </div>
            <div>
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="https://chylers.com/cdn/shop/files/spices1.jpg"
                  alt="Secret Blend of Spices"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secret Blend of Spices</h3>
              <p className="text-muted-foreground">
                Each flavor uses our proprietary blend of spices, perfected over 
                years to create the perfect taste profile.
              </p>
            </div>
            <div>
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src="https://chylers.com/cdn/shop/files/2.jpg"
                  alt="Unique Chip Texture"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Slow Oven-Roasted</h3>
              <p className="text-muted-foreground">
                Our unique slow oven-roasting process creates that perfect crispy, 
                chip-like texture that sets us apart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hawaiian Heritage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="https://chylers.com/cdn/shop/files/1.jpg"
                alt="Hawaiian Heritage"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Made in Hawaii with Aloha</h2>
              <p className="text-lg mb-4">
                We're proud to be certified by the Hawaii Department of Agriculture 
                as "Made in Hawaii with Aloha" (MIHA). This certification represents 
                our commitment to supporting local agriculture and economy.
              </p>
              <p className="text-lg mb-6">
                Every batch is handcrafted in our Waipahu facility, where we combine 
                traditional Hawaiian values with modern food production techniques to 
                create a truly unique snack.
              </p>
              <div className="relative h-24 w-48">
                <Image
                  src="https://chylers.com/cdn/shop/files/unnamed2.jpg"
                  alt="Made in Hawaii with Aloha Certification"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Four Amazing Flavors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={PRODUCT_IMAGES.original.primary}
                  alt="Original Hawaiian Beef Chips"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-semibold">Original</h3>
              <p className="text-sm text-muted-foreground">Our classic flavor</p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={PRODUCT_IMAGES.crackedPepper.primary}
                  alt="Cracked Pepper Hawaiian Beef Chips"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-semibold">Cracked Pepper</h3>
              <p className="text-sm text-muted-foreground">Bold pepper taste</p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={PRODUCT_IMAGES.spicy.primary}
                  alt="Spicy Hawaiian Beef Chips"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-semibold">Spicy</h3>
              <p className="text-sm text-muted-foreground">For heat lovers</p>
            </div>
            <div className="text-center">
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={PRODUCT_IMAGES.roastedGarlic.primary}
                  alt="Roasted Garlic Hawaiian Beef Chips"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-semibold">Roasted Garlic</h3>
              <p className="text-sm text-muted-foreground">Award winning flavor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commitment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🥩</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground">
                100% premium U.S. beef with no fillers, no preservatives, and no compromises.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌺</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hawaiian Heritage</h3>
              <p className="text-muted-foreground">
                Proudly made in Hawaii with Aloha, supporting local jobs and our island community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍👩‍👧</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Family Owned</h3>
              <p className="text-muted-foreground">
                A family business dedicated to sharing our accidental discovery with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  2004
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Happy Accident</h3>
                  <p className="text-muted-foreground">
                    A failed attempt at making beef jerky for our daughter turns into the discovery 
                    of Hawaiian Beef Chips. "It's not jerky, it's like a chip!"
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  2008
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Award Recognition</h3>
                  <p className="text-muted-foreground">
                    Our Roasted Garlic flavor wins its first award, validating our unique approach 
                    to beef chips.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  2015
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Going National</h3>
                  <p className="text-muted-foreground">
                    Launch of online sales and expansion to Amazon, bringing Hawaiian Beef Chips 
                    to customers across the mainland.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  Today
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sharing Aloha Worldwide</h3>
                  <p className="text-muted-foreground">
                    Continuing to handcraft every batch with the same care and quality that 
                    started in our family kitchen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Experience the Taste of Aloha</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Try our award-winning beef chips and taste the difference that family pride makes
          </p>
          <Button size="lg" asChild>
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}