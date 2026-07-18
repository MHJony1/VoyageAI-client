'use client';

import { Star } from 'lucide-react';
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
  const date = new Date(review.createdAt).toLocaleDateString();
  const userInitial = review.userId.substring(0, 1).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border border-slate-200 rounded-lg bg-white"
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-semibold">
          {userInitial}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">User {review.userId.slice(0, 8)}</p>
              <p className="text-xs text-slate-500">{date}</p>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-700 mt-2 line-clamp-3">{review.comment}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsSection({ reviews, isLoading, error }: ReviewsSectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-h3 font-bold text-slate-900">Reviews</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 border border-slate-200 rounded-lg">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-20 mb-3" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <EmptyState title="Reviews" description="Unable to load reviews" icon="inbox" />;
  }

  if (!reviews || reviews.length === 0) {
    return <EmptyState title="No reviews yet" description="Be the first to review this destination!" icon="inbox" />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-h3 font-bold text-slate-900">Reviews ({reviews.length})</h2>
      <div className="space-y-3">{reviews.map((r) => <ReviewCard key={r._id} review={r} />)}</div>
    </div>
  );
}
