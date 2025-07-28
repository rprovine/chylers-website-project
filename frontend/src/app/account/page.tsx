import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Package, Heart, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Account',
  description: 'Manage your account, view orders, and update your preferences.',
}

export default function AccountPage() {
  // TODO: Add authentication check
  const isAuthenticated = false

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Sign In to Your Account</h1>
              <p className="text-muted-foreground mb-8">
                Access your order history, manage your addresses, and update your preferences.
              </p>
              
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Account features coming soon! In the meantime, you can:
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/shop">Continue Shopping</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Contact Support</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">My Account</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back! Manage your account and orders.
          </p>
        </div>
      </section>

      {/* Account Dashboard */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your personal information and password
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/profile">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View your order history and track shipments
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/orders">View Orders</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Addresses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your shipping and billing addresses
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/addresses">Manage Addresses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Favorites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Save your favorite products for quick ordering
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/account/favorites">View Favorites</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}