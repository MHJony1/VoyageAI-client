'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trash2, Edit2, X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReviews, useCreateReview, useDeleteReview, useUpdateReview } from '@/hooks/useReviews';
import { useDestinations } from '@/hooks/useDestinations';
import { Skeleton } from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import { toast } from 'sonner';
import { Review } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const reviewSchema = z.object({
  destinationId: z.string().min(1, 'Destination required'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

export default function ReviewsPage() {
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const { data: reviewsData, isLoading: reviewsLoading } = useReviews(page, 10);
  const { data: destinations = [] } = useDestinations(50);
  const createReview = useCreateReview();
  const deleteReview = useDeleteReview();
  const updateReview = useUpdateReview();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      destinationId: '',
      comment: '',
    },
  });

  const rating = watch('rating');
  const reviews = reviewsData?.data || [];
  const pagination = reviewsData?.pagination;

  const onSubmit = async (data: ReviewFormData) => {
    try {
      if (editingReview) {
        await updateReview.mutateAsync({
          id: editingReview._id,
          payload: data,
        });
        toast.success('Review updated');
      } else {
        await createReview.mutateAsync(data);
        toast.success('Review created');
      }
      reset();
      setShowForm(false);
      setEditingReview(null);
    } catch {
      toast.error(editingReview ? 'Failed to update review' : 'Failed to create review');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this review?')) {
      try {
        await deleteReview.mutateAsync(id);
        toast.success('Review deleted');
      } catch {
        toast.error('Failed to delete review');
      }
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    reset({
      destinationId: review.destinationId,
      rating: review.rating,
      comment: review.comment,
    });
    setShowForm(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Reviews</h1>
              <p className="text-slate-600">Share your travel experiences</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingReview(null);
              reset();
              setShowForm(true);
            }}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Write Review
          </button>
        </div>
      </motion.div>

      {/* Reviews List */}
      <motion.div variants={itemVariants}>
        {reviewsLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="Share your travel experiences by writing a review"
          />
        ) : (
          <>
            <div className="space-y-4">
              <AnimatePresence>
                {reviews.map((review) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg">
                          {review.destinationId}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300'
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4">{review.comment}</p>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEdit(review)}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Edit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <motion.div variants={itemVariants} className="mt-8 flex justify-center items-center gap-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-slate-600">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
                  disabled={page === pagination.totalPages}
                  className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingReview ? 'Edit Review' : 'Write a Review'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Destination */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Destination
                  </label>
                  <select
                    {...register('destinationId')}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">Select a destination</option>
                    {destinations.map((dest) => (
                      <option key={dest._id} value={dest._id}>
                        {dest.name}, {dest.country}
                      </option>
                    ))}
                  </select>
                  {errors.destinationId && (
                    <p className="text-red-600 text-sm mt-1">{errors.destinationId.message}</p>
                  )}
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-3">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => {
                          const input = document.querySelector(
                            'input[type="hidden"][name="rating"]'
                          ) as HTMLInputElement;
                          if (input) input.value = star.toString();
                        }}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Star
                          size={24}
                          className={
                            star <= rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-slate-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    {...register('rating', { valueAsNumber: true })}
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Your Review
                  </label>
                  <textarea
                    {...register('comment')}
                    rows={4}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  {errors.comment && (
                    <p className="text-red-600 text-sm mt-1">{errors.comment.message}</p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createReview.isPending || updateReview.isPending}
                    className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition-colors"
                  >
                    {createReview.isPending || updateReview.isPending
                      ? 'Saving...'
                      : editingReview
                        ? 'Update'
                        : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
