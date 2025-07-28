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
                but very fortunate recipe mistake. In 2004, as concerned parents, we were 
                experimenting in our home kitchen, trying to create a healthier beef jerky 
                that our daughter Chyler would actually enjoy eating. We wanted to boost 
                her protein intake without the tough, chewy texture that often turns kids 
                away from traditional jerky.
              </p>
              <p className="text-lg mb-4">
                After countless attempts and one fateful batch that stayed in the oven 
                just a bit too long, we discovered something magical. The thin slices of 
                beef had transformed into light, crispy chips with an incredible crunch. 
                When our family gathered around the kitchen table for the taste test, 
                their eyes lit up. The unanimous reaction: 
                <span className="font-semibold italic"> "It's not jerky, it's like a chip!"</span> 
                In that moment, we knew we had stumbled upon something truly special.
              </p>
              <p className="text-lg mb-4">
                What started as a simple desire to nourish our daughter became a passion 
                for sharing this accidental discovery with the world. We named our company 
                after Chyler (pronounced Shy-Ler), whose wellbeing inspired this journey 
                and whose enthusiasm continues to motivate us every day.
              </p>
              <p className="text-lg">
                Today, every bag of Hawaiian Beef Chips carries forward that same spirit 
                of family, innovation, and the deep-rooted aloha that makes Hawaii so special. 
                We've grown from our small kitchen to a dedicated facility in Waipahu, but 
                we still make each batch with the same care and attention as that first 
                accidental masterpiece.
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
                We partner with trusted American ranchers who share our commitment to quality. 
                Each cut is hand-selected from premium top round beef, ensuring optimal 
                marbling and flavor. We never use fillers, preservatives, or artificial 
                ingredients – just pure, wholesome beef that meets our exacting standards 
                for texture and taste.
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
                Our signature spice blends are the heart of what makes Chyler's unique. 
                Developed through years of experimentation and refined by countless taste 
                tests, each blend perfectly complements the natural beef flavor without 
                overpowering it. From the subtle warmth of our Original to the bold kick 
                of our Spicy variety, every recipe is a closely guarded family secret.
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
                This is where the magic happens. Our proprietary slow-roasting process 
                transforms thin slices of seasoned beef into light, crispy chips. Temperature 
                and timing are carefully controlled to achieve that distinctive crunch while 
                locking in all the savory flavors. It's a delicate balance that took years 
                to perfect – too little time and they're chewy, too much and they're brittle. 
                We've mastered the sweet spot that delivers consistent perfection in every batch.
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
                as "Made in Hawaii with Aloha" (MIHA). This prestigious certification 
                represents our commitment to supporting local agriculture and economy.
              </p>
              <p className="text-lg mb-8">
                Every batch is handcrafted in our Waipahu facility, where we combine 
                traditional Hawaiian values with modern food production techniques to 
                create a truly unique snack that embodies the spirit of our islands.
              </p>
              
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Image
                    src="https://chylers.com/cdn/shop/files/unnamed2.jpg"
                    alt="Made in Hawaii with Aloha - Official Certification"
                    width={200}
                    height={80}
                    className="h-24 w-auto"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-semibold text-lg mb-1">Officially Certified</p>
                    <p className="text-muted-foreground">
                      Hawaii Department of Agriculture<br />
                      Supporting local jobs and economy since 2004
                    </p>
                  </div>
                </div>
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

      {/* Made in Hawaii Badge Callout */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-8 shadow-sm">
            <Image
              src="https://chylers.com/cdn/shop/files/unnamed2.jpg"
              alt="Made in Hawaii with Aloha"
              width={220}
              height={88}
              className="h-24 w-auto flex-shrink-0"
            />
            <p className="text-center md:text-left text-lg font-medium max-w-2xl">
              Every flavor is certified Made in Hawaii with Aloha – your guarantee of 
              authentic Hawaiian quality and our commitment to supporting local communities.
            </p>
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
          <h2 className="text-3xl font-bold text-center mb-4">Our Journey</h2>
          <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            From a simple kitchen experiment to Hawaii's beloved beef chip brand, every milestone 
            in our journey has been guided by family values, quality craftsmanship, and the spirit of aloha.
          </p>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 hidden lg:block" />
            
            <div className="space-y-12 relative">
              {/* 2004 - The Beginning */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 lg:text-right">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2004
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">The Happy Accident</h3>
                    <p className="text-muted-foreground mb-3">
                      In our small Oahu kitchen, what started as an attempt to make healthier beef 
                      jerky for our daughter Chyler became something extraordinary. The batch that 
                      stayed in the oven "too long" emerged as crispy, flavorful chips.
                    </p>
                    <p className="text-sm italic text-muted-foreground">
                      "Mom, Dad, it's not jerky, it's like a chip!" - Chyler, age 8
                    </p>
                  </div>
                </div>
                <div className="lg:flex-1 order-first lg:order-last">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">👨‍👩‍👧</span>
                  </div>
                </div>
              </div>

              {/* 2005 - First Sales */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:flex-1">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏪</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2005
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">First Local Success</h3>
                    <p className="text-muted-foreground mb-3">
                      Word spread quickly through our Kapolei neighborhood. Friends and family couldn't 
                      get enough of our beef chips. We started selling at local farmers markets and 
                      small stores, often selling out within hours.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      First retail partner: Kapolei Marketplace
                    </p>
                  </div>
                </div>
              </div>

              {/* 2008 - Award Recognition */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 lg:text-right">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2008
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Award-Winning Excellence</h3>
                    <p className="text-muted-foreground mb-3">
                      Our Roasted Garlic flavor wins "Best New Snack Product" at the Hawaii Food 
                      Manufacturers Association showcase. This recognition validated our unique approach 
                      and opened doors to larger retail opportunities across the islands.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      🏆 First of many awards to come
                    </p>
                  </div>
                </div>
                <div className="lg:flex-1 order-first lg:order-last">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏆</span>
                  </div>
                </div>
              </div>

              {/* 2010 - New Facility */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:flex-1">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🏭</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2010
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Growing Our Roots</h3>
                    <p className="text-muted-foreground mb-3">
                      Moved from our home kitchen to our first commercial facility in Kapolei. This 
                      allowed us to scale production while maintaining our handcrafted quality. We 
                      hired our first employees - all local residents who shared our passion.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      Created 12 local jobs in our community
                    </p>
                  </div>
                </div>
              </div>

              {/* 2015 - Going Digital */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 lg:text-right">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2015
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Digital Expansion</h3>
                    <p className="text-muted-foreground mb-3">
                      Launched our e-commerce website and joined Amazon Marketplace. For the first time, 
                      mainland customers could enjoy authentic Hawaiian Beef Chips. Orders poured in from 
                      homesick Hawaiians and curious snack enthusiasts nationwide.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      First day online: 200+ orders from 38 states
                    </p>
                  </div>
                </div>
                <div className="lg:flex-1 order-first lg:order-last">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🌐</span>
                  </div>
                </div>
              </div>

              {/* 2020 - Pandemic Pivot */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="lg:flex-1">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">💪</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -left-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2020
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">Resilience & Innovation</h3>
                    <p className="text-muted-foreground mb-3">
                      When tourism halted, we pivoted to support our local community. Introduced 
                      contactless Will-Call pickup, donated thousands of bags to healthcare workers, 
                      and kept all employees working. Our ohana grew stronger together.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      10,000+ bags donated to frontline heroes
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 - New Chapter */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 lg:text-right">
                  <div className="bg-white rounded-xl shadow-md p-6 relative">
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-lg shadow-lg">
                      2024
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-primary">New Home, Same Heart</h3>
                    <p className="text-muted-foreground mb-3">
                      Relocated to our expanded Waipahu facility to meet growing demand. This move 
                      allows us to triple production capacity while adding new flavors in development. 
                      Still family-owned, still handcrafted with the same aloha spirit.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      Exciting new flavors coming soon!
                    </p>
                  </div>
                </div>
                <div className="lg:flex-1 order-first lg:order-last">
                  <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                </div>
              </div>

              {/* Today and Beyond */}
              <div className="flex flex-col items-center mt-12">
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl shadow-lg p-8 max-w-2xl text-center">
                  <div className="text-3xl font-bold mb-4">Today & Beyond</div>
                  <p className="text-lg mb-4">
                    Twenty years later, we're still that family business born from a kitchen mistake. 
                    We've grown from selling to neighbors to shipping worldwide, but our mission remains 
                    unchanged: sharing the taste of aloha through every crispy, delicious bite.
                  </p>
                  <p className="text-sm italic">
                    "The best is yet to come. Mahalo for being part of our journey!" - Cal & Autumn
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