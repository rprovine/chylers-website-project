'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Eye, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Product } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'
import { REVIEW_SUMMARY } from '@/data/reviews'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const { addItem, isLoading } = useCartStore()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (selectedVariant) {
      await addItem(selectedVariant.id, 1)
    }
  }

  const mainImage = product.images[0]
  const price = parseFloat(selectedVariant?.price || '0')

  return (
    <Card 
      className={cn("group relative overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.handle}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {mainImage ? (
            <Image
              src={mainImage.src}
              alt={product.title}
              fill
              className="object-cover object-center transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.is_award_winning && (
              <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-2 py-1 rounded">
                Award Winning
              </span>
            )}
            {product.is_bestseller && (
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                Bestseller
              </span>
            )}
          </div>

          {/* Quick actions overlay */}
          <div className={cn(
            "absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity",
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleAddToCart}
              disabled={isLoading}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="secondary"
              asChild
            >
              <Link href={`/products/${product.handle}`}>
                <Eye className="h-4 w-4 mr-1" />
                View
              </Link>
            </Button>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.handle}`}>
          <h3 className="font-medium text-sm mb-1 line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        {product.flavor && (
          <p className="text-xs text-muted-foreground mb-2">
            {product.flavor} Flavor
          </p>
        )}

        {/* Review Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(REVIEW_SUMMARY.average)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({REVIEW_SUMMARY.total})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">{formatCurrency(price)}</span>
            {selectedVariant?.compare_at_price && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatCurrency(parseFloat(selectedVariant.compare_at_price))}
              </span>
            )}
          </div>
          
          {product.pack_sizes.length > 1 && (
            <span className="text-xs text-muted-foreground">
              {product.pack_sizes.length} sizes
            </span>
          )}
        </div>

        {/* Nutrition highlights */}
        <div className="mt-2 flex gap-2">
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            18g Protein
          </span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Keto
          </span>
        </div>
      </CardContent>
    </Card>
  )
}