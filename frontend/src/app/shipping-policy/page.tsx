import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { Truck, Clock, MapPin, Package } from 'lucide-react'
import { SHIPPING_CONFIG, BUSINESS_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description: 'Learn about our shipping rates, delivery times, and will-call pickup options for Chyler\'s Hawaiian Beef Chips.',
}

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-lg text-muted-foreground">
            Fast, reliable shipping from Hawaii to your door
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Shipping Rates */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Shipping Rates</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Domestic Shipping (United States)</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Standard Shipping</span>
                          <span className="font-semibold">${SHIPPING_CONFIG.standardRate}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Expedited Shipping</span>
                          <span className="font-semibold">${SHIPPING_CONFIG.expeditedRate}</span>
                        </li>
                        <li className="flex justify-between text-primary">
                          <span>Free Shipping</span>
                          <span className="font-semibold">Orders over ${SHIPPING_CONFIG.freeThreshold}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm">
                        <strong>Free Shipping Special:</strong> All domestic orders over ${SHIPPING_CONFIG.freeThreshold} ship free via standard shipping!
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-2">International Shipping</h3>
                      <p className="text-muted-foreground">
                        International shipping rates are calculated at checkout based on destination and package weight. 
                        Please note that international customers are responsible for any customs fees or import duties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Times */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Delivery Times</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Processing Time</h3>
                      <p className="text-muted-foreground">
                        All orders are processed within 1-2 business days (Monday-Friday, excluding holidays). 
                        Orders placed after 2:00 PM HST will be processed the next business day.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Estimated Delivery Times</h3>
                      <p className="text-muted-foreground mb-3">
                        After processing, estimated delivery times are:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li><strong>Hawaii:</strong> 1-2 business days</li>
                        <li><strong>West Coast:</strong> 3-5 business days</li>
                        <li><strong>Central US:</strong> 4-6 business days</li>
                        <li><strong>East Coast:</strong> 5-7 business days</li>
                        <li><strong>International:</strong> 7-21 business days</li>
                      </ul>
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic">
                      Note: Delivery times are estimates and may vary due to carrier delays or weather conditions.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Will-Call Pickup */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Will-Call Pickup (Hawaii Only)</h2>
                  
                  <p className="text-muted-foreground mb-4">
                    Save on shipping by picking up your order directly from our Kapolei facility!
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1">Pickup Location</h3>
                      <p className="text-muted-foreground">
                        {BUSINESS_INFO.willCall.location}<br />
                        {BUSINESS_INFO.address}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Pickup Hours</h3>
                      <p className="text-muted-foreground">{BUSINESS_INFO.willCall.hours}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">How to Order for Pickup</h3>
                      <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                        <li>Select "Will-Call Pickup" at checkout</li>
                        <li>Complete your order</li>
                        <li>Wait for email confirmation (usually within 24 hours)</li>
                        <li>Bring your order confirmation for pickup</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Tracking */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
                  
                  <p className="text-muted-foreground mb-4">
                    Once your order ships, you'll receive a confirmation email with tracking information. 
                    You can use this tracking number to monitor your package's journey to your door.
                  </p>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Need Help with Your Order?</h3>
                    <p className="text-muted-foreground mb-2">Contact our customer service team:</p>
                    <p className="text-sm">
                      <strong>Phone:</strong> {BUSINESS_INFO.phone}<br />
                      <strong>Email:</strong> <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">{BUSINESS_INFO.email}</a><br />
                      <strong>Hours:</strong> {BUSINESS_INFO.hours.weekdays}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            
            <h3 className="text-xl font-semibold mb-2">Shipping Restrictions</h3>
            <p className="text-muted-foreground mb-4">
              We currently ship to all 50 US states and select international destinations. 
              Some restrictions may apply to certain international locations.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Damaged or Lost Packages</h3>
            <p className="text-muted-foreground mb-4">
              If your package arrives damaged or is lost in transit, please contact us immediately. 
              We'll work with the carrier to resolve the issue and ensure you receive your order.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Incorrect Address</h3>
            <p className="text-muted-foreground">
              Please double-check your shipping address before completing your order. 
              We cannot be responsible for packages delivered to incorrect addresses provided by customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}