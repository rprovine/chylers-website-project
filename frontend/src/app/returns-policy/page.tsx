import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { RotateCcw, AlertCircle, Package, Mail } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Returns & Refund Policy',
  description: 'Learn about our return policy, refund process, and satisfaction guarantee for Chyler\'s Hawaiian Beef Chips.',
}

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Returns & Refund Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your satisfaction is our top priority
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Satisfaction Guarantee */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">100% Satisfaction Guarantee</h2>
                  
                  <p className="text-muted-foreground mb-4">
                    We stand behind the quality of our Hawaiian beef chips. If you're not completely satisfied 
                    with your purchase, we'll make it right. Your satisfaction is our top priority, and we're 
                    committed to ensuring you love every bite of our products.
                  </p>
                  
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="font-semibold">
                      Not happy with your order? Contact us within 30 days for a resolution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Policy */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <RotateCcw className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">30-Day Return Window</h3>
                      <p className="text-muted-foreground">
                        We accept returns within 30 days of delivery for unopened, undamaged products in their 
                        original packaging. Due to food safety regulations, we cannot accept returns on opened products.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Eligible for Return</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Unopened products in original packaging</li>
                        <li>Products damaged during shipping</li>
                        <li>Incorrect items received</li>
                        <li>Products with quality issues</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Not Eligible for Return</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Opened or partially consumed products</li>
                        <li>Products past the 30-day return window</li>
                        <li>Products damaged due to mishandling by customer</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Return Shipping</h3>
                      <p className="text-muted-foreground">
                        For quality issues or shipping errors, we'll provide a prepaid return label. 
                        For other returns, customers are responsible for return shipping costs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Refund Process */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Refund Process</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">How Refunds Work</h3>
                      <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                        <li>Contact our customer service team to initiate a return</li>
                        <li>Receive return authorization and instructions</li>
                        <li>Ship the product back (if applicable)</li>
                        <li>Refund processed within 5-7 business days of receipt</li>
                        <li>Funds appear in your account within 3-5 business days</li>
                      </ol>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Refund Methods</h3>
                      <p className="text-muted-foreground">
                        Refunds are issued to the original payment method used for the purchase. 
                        If the original payment method is no longer available, we'll work with you 
                        to find an alternative solution.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Partial Refunds</h3>
                      <p className="text-muted-foreground">
                        In some cases, we may offer partial refunds for:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                        <li>Minor packaging damage that doesn't affect product quality</li>
                        <li>Delayed shipments</li>
                        <li>Other circumstances at our discretion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Special Circumstances</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Damaged or Defective Products</h3>
                      <p className="text-muted-foreground">
                        If you receive damaged or defective products, please contact us immediately with photos 
                        of the damage. We'll arrange for a replacement or full refund at no additional cost to you.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Wrong Item Received</h3>
                      <p className="text-muted-foreground">
                        If you receive the wrong item, we'll send the correct item immediately and provide a 
                        prepaid label to return the incorrect item.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Gift Returns</h3>
                      <p className="text-muted-foreground">
                        Gift recipients can exchange items for store credit or choose a different product of 
                        equal value. Original purchaser will not be notified of gift returns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Contact Us for Returns</h2>
                  
                  <p className="text-muted-foreground mb-4">
                    To initiate a return or if you have any questions about our return policy, 
                    please contact our customer service team:
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-muted-foreground">{BUSINESS_INFO.phone}</p>
                      <p className="text-sm text-muted-foreground">{BUSINESS_INFO.hours.weekdays}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href={`mailto:${BUSINESS_INFO.email}`} className="text-primary hover:underline">
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-1">Response Time</h3>
                      <p className="text-muted-foreground">
                        We typically respond to all inquiries within 1 business day
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Note:</strong> This return policy applies to purchases made directly through 
                      our website. For products purchased through Amazon or other retailers, please refer 
                      to their respective return policies.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}