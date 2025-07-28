import { Star } from 'lucide-react'
import { REVIEW_SUMMARY } from '@/data/reviews'

export function ReviewSummaryWidget() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.round(REVIEW_SUMMARY.average)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="font-semibold">{REVIEW_SUMMARY.average}</span>
      </div>
      <span className="text-sm text-muted-foreground">
        ({REVIEW_SUMMARY.total} reviews)
      </span>
    </div>
  )
}