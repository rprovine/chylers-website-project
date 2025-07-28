'use client'

import { X, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/lib/utils'
import { CartItemCard } from './cart-item-card'
import { cn } from '@/lib/utils'

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading } = useCartStore()

  const isEmpty = !cart || cart.items.length === 0

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/30" 
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-xl",
        "transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 sm:px-6 border-b">
            <h2 className="text-lg font-medium">Shopping Cart</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeCart}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            {isEmpty ? (
              <div className="flex flex-col items-center justify-center h-full">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mb-8">
                  Add some delicious beef chips to get started!
                </p>
                <Button onClick={closeCart} asChild>
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart?.items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {!isEmpty && cart && (
            <div className="border-t px-4 py-6 sm:px-6">
              {/* Free shipping progress */}
              {cart.subtotal < 49 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Add {formatCurrency(49 - cart.subtotal)} for free shipping!</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min((cart.subtotal / 49) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cart.subtotal)}</span>
                </div>
                {cart.discount_amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(cart.discount_amount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {cart.is_free_shipping_eligible
                      ? 'FREE'
                      : formatCurrency(cart.shipping_amount)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-medium pt-2 border-t">
                  <span>Total</span>
                  <span>{formatCurrency(cart.total_amount)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                <Button asChild className="w-full">
                  <Link href="/checkout" onClick={closeCart}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={closeCart}
                  asChild
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}