import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, ShoppingBag, Clock, Phone } from 'lucide-react'
import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants'
import { PRODUCT_IMAGES } from '@/lib/product-images'

export const metadata: Metadata = {
  title: 'Where to Buy',
  description: 'Find Chyler\'s Hawaiian Beef Chips at our Waipahu location or online. Will-call pickup available.',
}

export default function WhereToBuyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header with Product Image */}
      <section className="relative bg-gray-50 py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src={PRODUCT_IMAGES.collection}
            alt="Chyler's Hawaiian Beef Chips Collection"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Where to Buy</h1>
          <p className="text-lg text-muted-foreground">
            Get your favorite Hawaiian beef chips directly from us or through our retail partners
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Will Call Pickup */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Will-Call Pickup</h2>
                    <p className="text-muted-foreground mb-4">
                      Skip the shipping fees and experience true Hawaiian hospitality at our Waipahu 
                      facility! Will-call pickup is perfect for local customers who want their beef 
                      chips fresh from our kitchen. Plus, you'll get to meet our friendly team and 
                      maybe even catch a glimpse of the roasting process in action. Many customers 
                      tell us the aroma alone makes the trip worthwhile!
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          {BUSINESS_INFO.willCall.location}<br />
                          {BUSINESS_INFO.address}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">Pickup Hours</h3>
                        <p className="text-muted-foreground">
                          {BUSINESS_INFO.willCall.hours}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-1">How it Works</h3>
                        <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                          <li>Place your order online and select "Will-Call Pickup"</li>
                          <li>Wait for confirmation email that your order is ready</li>
                          <li>Bring your order confirmation to our facility</li>
                          <li>Pick up your fresh beef chips!</li>
                        </ol>
                      </div>
                    </div>
                    
                    <Button asChild className="mt-6">
                      <Link href="/shop">Shop Now for Pickup</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Shopping */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <ShoppingBag className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Shop Online</h2>
                    <p className="text-muted-foreground mb-6">
                      Can't make it to our location? We ship nationwide with free shipping on orders over $49!
                    </p>
                    
                    <div className="space-y-4">
                      {/* Our Website */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Chylers.com</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Shop our full selection with exclusive online deals
                        </p>
                        <Button asChild size="sm">
                          <Link href="/shop">Shop Now</Link>
                        </Button>
                      </div>
                      
                      {/* Amazon */}
                      <div className="border rounded-lg p-4">
                        <h3 className="font-semibold mb-2">Amazon</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Prime shipping available for select items
                        </p>
                        <Button asChild size="sm" variant="outline">
                          <Link href={SITE_CONFIG.links.amazon} target="_blank" rel="noopener noreferrer">
                            Shop on Amazon
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                  <p className="text-muted-foreground mb-4">
                    Have questions about where to find our products? We're here to help!
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-muted-foreground">{BUSINESS_INFO.phone}</p>
                      <p className="text-sm text-muted-foreground">{BUSINESS_INFO.hours.weekdays}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.049518961!2d-158.00919!3d21.394889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006e76e88f1311%3A0x5c7d8e7c7e7e7e7e!2s94-300%20Farrington%20Hwy%20%23C03%2C%20Waipahu%2C%20HI%2096797!5e0!3m2!1sen!2sus!4v1635959293851!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Chyler's Hawaiian Beef Chips Location"
                className="w-full"
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://www.google.com/maps/place/94-300+Farrington+Hwy+%23C03,+Waipahu,+HI+96797"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Get Directions on Google Maps
              </a>
            </div>
          </div>

          {/* Product Display */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Available Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCT_IMAGES.allProducts.map((image, index) => {
                const flavors = ['Original', 'Cracked Pepper', 'Spicy', 'Roasted Garlic']
                return (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={image}
                      alt={`${flavors[index]} Hawaiian Beef Chips`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}