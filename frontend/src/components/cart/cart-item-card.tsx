'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CartItem } from '@/types'
import { useCartStore } from '@/store/cart'
import { formatCurrency } from '@/lib/utils'

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateItem, removeItem, isLoading } = useCartStore()

  const handleQuantityChange = (quantity: number) => {
    if (quantity > 0) {
      updateItem(String(item.id), quantity)
    }
  }

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.product_title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-xs text-gray-400">No image</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium">{item.product_title}</h3>
            {item.variant_title && (
              <p className="text-sm text-muted-foreground">{item.variant_title}</p>
            )}
          </div>
          <p className="text-sm font-medium">{formatCurrency(item.line_total)}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isLoading || item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isLoading}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => removeItem(String(item.id))}
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}