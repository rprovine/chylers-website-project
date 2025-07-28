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
          alt="Hawaii landscape"
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

      {/* The Beginning */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">A Happy Kitchen Accident</h2>
            <p className="text-lg mb-4">
              In 2004, what started as an accidental recipe mistake in our family kitchen 
              turned into something extraordinary. While experimenting with traditional 
              beef jerky recipes, we accidentally created something entirely different - 
              a crispy, chip-like beef snack that was unlike anything else on the market.
            </p>
            <p className="text-lg mb-4">
              The unique texture and incredible flavor were an instant hit with family 
              and friends. We knew we had discovered something special, and Chyler's 
              Hawaiian Beef Chips was born.
            </p>
          </div>
        </div>
      </section>

      {/* Why Chyler */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src={PRODUCT_IMAGES.varietyPack.primary}
                alt="Family photo"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Why "Chyler's"?</h2>
              <p className="text-lg mb-4">
                We named our company after our daughter Chyler (pronounced Shy-Ler), 
                who was our biggest inspiration and taste tester from day one. Her 
                enthusiasm and joy for our beef chips reminded us why we started this 
                journey - to share something we love with the people we care about.
              </p>
              <p className="text-lg mb-4">
                Every bag of Chyler's Hawaiian Beef Chips carries that same spirit of 
                family, love, and the aloha that makes Hawaii so special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌺</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Made with Aloha</h3>
              <p className="text-muted-foreground">
                Every batch is crafted with the spirit of aloha - love, compassion, 
                and respect for our customers and community.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏝️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Pride</h3>
              <p className="text-muted-foreground">
                Proudly made in Kapolei, Hawaii, supporting local jobs and contributing 
                to our island economy.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on quality, using only premium ingredients to create 
                the perfect crispy texture and flavor.
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
                  <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                  <p className="text-muted-foreground">
                    Accidental recipe discovery leads to the creation of Chyler's Hawaiian Beef Chips
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  2008
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Award Winner</h3>
                  <p className="text-muted-foreground">
                    Our Roasted Garlic flavor wins its first award for taste and innovation
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  2015
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Expansion</h3>
                  <p className="text-muted-foreground">
                    Launch online sales and expand to Amazon marketplace
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  Today
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Growing Strong</h3>
                  <p className="text-muted-foreground">
                    Continuing to share the taste of aloha with customers worldwide
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