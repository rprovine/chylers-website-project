import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, ShoppingBag, Clock, Phone } from 'lucide-react'
import { BUSINESS_INFO, SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Where to Buy',
  description: 'Find Chyler\'s Hawaiian Beef Chips at our Kapolei location or online. Will-call pickup available.',
}

export default function WhereToBuyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
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
                      Hawaii customers can save on shipping by picking up their orders directly from our facility.
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
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <p className="text-muted-foreground">
                Interactive map would go here showing {BUSINESS_INFO.address}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}