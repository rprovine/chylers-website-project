'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@radix-ui/react-dialog'
import { X, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/lib/utils'
import { CartItemCard } from './cart-item-card'

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading } = useCartStore()

  const isEmpty = !cart || cart.items.length === 0

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onOpenChange={closeCart}>
        <div className="fixed inset-0 z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" onClick={closeCart} />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="flex h-full flex-col bg-background shadow-xl">
                  {/* Header */}
                  <div className="flex items-center justify-between px-4 py-6 sm:px-6">
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
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}