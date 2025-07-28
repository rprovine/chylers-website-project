import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Order History',
  description: 'View your past orders and track current shipments.',
}

export default function OrderHistoryPage() {
  // TODO: Add authentication and fetch real orders
  const orders: any[] = []

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Order History</h1>
          <p className="text-lg text-muted-foreground">
            View and track your past orders
          </p>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
                <p className="text-muted-foreground mb-6">
                  When you place your first order, it will appear here.
                </p>
                <Button asChild>
                  <Link href="/shop">Start Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Order items would be mapped here */}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}