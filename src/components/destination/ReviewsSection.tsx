'use client';

import { Star, Calendar, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import { Review } from '@/types';

interface ReviewsSectionProps {
  reviews: Review[];
  isLoading: boolean;
  error: Error | null;
}

function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const userInitial = review.userId.substring(0, 1).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 border border-slate-200/60 rounded-xl bg-white hover:shadow-md transition-all duration-300"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
            {userInitial}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                User {review.userId.slice(0, 8)}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">
                  {review.rating}/5
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{date}</span>
            </div>
          </div>
          <p className="text-sm text-slate-700 mt-3 leading-relaxed">
            {review.comment}
          </p>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
            <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors">
              <Heart className="w-3.5 h-3.5" />
              <span>Like</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsSection({
  reviews,
  isLoading,
  error,
}: ReviewsSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-5 border border-slate-200/60 rounded-xl">
              <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
        </div>
        <EmptyState
          title="Reviews"
          description="Unable to load reviews"
          icon="inbox"
        />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200/60 p-12 text-center">
          <div className="text-5xl mb-4">✍️</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-sm text-slate-500">
            Be the first to review this destination!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900">
          Reviews
          <span className="text-sm font-normal text-slate-500 ml-2">
            ({reviews.length} reviews)
          </span>
        </h2>
      </div>
      <div className="space-y-3">
        {reviews.map((r) => (
          <ReviewCard key={r._id} review={r} />
        ))}
      </div>
    </div>
  );
}
