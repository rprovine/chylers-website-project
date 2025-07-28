'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ReviewCard } from './review-card'
import { REVIEWS, REVIEW_SUMMARY } from '@/data/reviews'

export function ReviewsSection() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const reviewsPerPage = 6

  // Filter reviews by rating if selected
  const filteredReviews = selectedRating
    ? REVIEWS.filter(review => review.rating === selectedRating)
    : REVIEWS

  // Calculate pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage)
  const startIndex = (currentPage - 1) * reviewsPerPage
  const endIndex = startIndex + reviewsPerPage
  const currentReviews = filteredReviews.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of reviews section
    const reviewsSection = document.getElementById('reviews-section')
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="reviews-section" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Reviews</h2>
          <p className="text-lg text-muted-foreground">
            See what our customers are saying about Chyler's Hawaiian Beef Chips
          </p>
        </div>

        {/* Review Summary */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{REVIEW_SUMMARY.average}</div>
                <div className="flex justify-center mb-2">
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
                <p className="text-sm text-muted-foreground">
                  Based on {REVIEW_SUMMARY.total} reviews
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="md:col-span-2">
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = REVIEW_SUMMARY.distribution[rating as keyof typeof REVIEW_SUMMARY.distribution]
                    const percentage = (count / REVIEW_SUMMARY.total) * 100

                    return (
                      <button
                        key={rating}
                        onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                        className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          selectedRating === rating
                            ? 'bg-primary/10'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-sm w-12">{rating} star</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-yellow-400 h-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {count}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    {REVIEW_SUMMARY.verified_purchase_percentage}% of reviews are from verified purchases
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Status */}
        {selectedRating && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filteredReviews.length} reviews with {selectedRating} star{selectedRating !== 1 ? 's' : ''}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedRating(null)
                setCurrentPage(1)
              }}
            >
              Clear filter
            </Button>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1
              // Show first page, last page, and pages around current page
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              }
              // Show ellipsis
              if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2">...</span>
              }
              return null
            })}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Write a Review CTA */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Love Our Beef Chips?</h3>
              <p className="text-muted-foreground mb-6">
                We'd love to hear about your experience! Share your thoughts and help others discover the perfect Hawaiian snack.
              </p>
              <Button size="lg">Write a Review</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}