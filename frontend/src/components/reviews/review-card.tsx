'use client'

import { Star, ThumbsUp, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Review } from '@/data/reviews'
import { formatDistanceToNow } from 'date-fns'

interface ReviewCardProps {
  review: Review
}

export function ReviewCard({ review }: ReviewCardProps) {
  const reviewDate = new Date(review.date)
  const timeAgo = formatDistanceToNow(reviewDate, { addSuffix: true })

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{review.author}</h3>
              {review.verified && (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>Verified Purchase</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{review.location}</p>
          </div>
          <div className="text-sm text-muted-foreground">{timeAgo}</div>
        </div>

        {/* Rating and Title */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            {review.flavor && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {review.flavor}
              </span>
            )}
          </div>
          <h4 className="font-semibold text-lg">{review.title}</h4>
        </div>

        {/* Review Content */}
        <p className="text-muted-foreground mb-4 line-clamp-4">{review.content}</p>

        {/* Pros if available */}
        {review.pros && review.pros.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-1">Pros:</p>
            <ul className="text-sm text-muted-foreground">
              {review.pros.map((pro, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span className="text-green-600">✓</span> {pro}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Helpful */}
        <div className="flex items-center justify-between pt-4 border-t">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ThumbsUp className="h-4 w-4" />
            <span>Helpful ({review.helpful})</span>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}