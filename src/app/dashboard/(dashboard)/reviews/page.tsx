'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Trash2,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus,
  Crown,
  Calendar,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  useReviews,
  useCreateReview,
  useDeleteReview,
  useUpdateReview,
} from '@/hooks/useReviews';
import { useDestinations } from '@/hooks/useDestinations';
import { Skeleton } from '@/components/Loading';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { Review } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
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
  const [deletingReview, setDeletingReview] = useState<Review | null>(null);

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
    setValue,
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

  // Get destination name by ID - with fallback
  const getDestinationName = (id: string) => {
    if (!id) return 'Unknown Destination';
    const dest = destinations.find((d) => d._id === id);
    return dest ? `${dest.name}, ${dest.country}` : id;
  };

  // Get destination name for editing review (using the review's stored destination name)
  const getEditingDestinationName = () => {
    if (!editingReview) return '';
    return getDestinationName(editingReview.destinationId);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingReview(null);
    reset({ rating: 5, destinationId: '', comment: '' });
  };

  const onSubmit = async (data: ReviewFormData) => {
    try {
      if (editingReview) {
        await updateReview.mutateAsync({
          id: editingReview._id,
          payload: data,
        });
        toast.success('Review updated successfully');
      } else {
        await createReview.mutateAsync(data);
        toast.success('Review created successfully');
      }
      reset();
      closeForm();
    } catch {
      toast.error(
        editingReview ? 'Failed to update review' : 'Failed to create review',
      );
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingReview) return;
    try {
      await deleteReview.mutateAsync(deletingReview._id);
      toast.success('Review deleted');
      setDeletingReview(null);
    } catch {
      toast.error('Failed to delete review');
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

  const handleOpenCreateForm = () => {
    setEditingReview(null);
    reset({ rating: 5, destinationId: '', comment: '' });
    setShowForm(true);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-6xl mx-auto"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl blur-xl opacity-30" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-white fill-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                My Reviews
              </h1>
              <p className="text-slate-500 flex items-center gap-2">
                <span>Share your travel experiences</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-sm font-medium text-slate-700">
                  {reviews.length} reviews
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 px-4 py-2 rounded-full border border-amber-200/30">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-700">
                Premium Reviewer
              </span>
            </div>
            <button
              onClick={handleOpenCreateForm}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 font-medium"
            >
              <Plus size={18} />
              Write Review
            </button>
          </div>
        </div>
      </motion.div>

      {/* Reviews List */}
      <motion.div variants={itemVariants}>
        {reviewsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200/60 p-6"
              >
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-16 text-center shadow-sm">
            <div className="text-6xl mb-4">✍️</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No reviews yet
            </h3>
            <p className="text-slate-500 mb-4">
              Share your travel experiences by writing a review
            </p>
            <button
              onClick={handleOpenCreateForm}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 font-medium"
            >
              Write Your First Review
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {reviews.map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl border border-slate-200/60 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
                          {getDestinationName(review.destinationId)}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-600 border border-blue-200/30">
                          Verified
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {review.comment}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleEdit(review)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setDeletingReview(review)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <motion.div
            variants={itemVariants}
            className="mt-8 flex justify-center items-center gap-3"
          >
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-xl transition-all border border-slate-200/60"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-medium text-slate-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
              disabled={page === pagination.totalPages}
              className="p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-xl transition-all border border-slate-200/60"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Review Form Modal - Fixed Destination Display */}
      <Modal
        open={showForm}
        onClose={closeForm}
        title={editingReview ? 'Edit Review' : 'Write a Review'}
        description={
          editingReview
            ? 'Update your rating and comments'
            : 'Tell others about your experience'
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Destination - Fixed for edit mode */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Destination
            </label>
            {editingReview ? (
              // Show destination name as disabled input for edit mode
              <div className="w-full px-4 py-3 bg-slate-100 border border-slate-200/60 rounded-xl text-slate-700 font-medium">
                {getEditingDestinationName()}
                <input type="hidden" {...register('destinationId')} />
              </div>
            ) : (
              // Show select for create mode
              <select
                {...register('destinationId')}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Select a destination</option>
                {destinations.map((dest) => (
                  <option key={dest._id} value={dest._id}>
                    {dest.name}, {dest.country}
                  </option>
                ))}
              </select>
            )}
            {errors.destinationId && (
              <p className="text-red-600 text-sm mt-1">
                {errors.destinationId.message}
              </p>
            )}
          </div>

          {/* Rating - Premium */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Rating
            </label>
            <div className="flex gap-3 bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue('rating', star, { shouldValidate: true })
                  }
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    star <= rating
                      ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50'
                      : 'hover:bg-slate-100'
                  }`}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                >
                  <Star
                    size={28}
                    className={
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              {rating === 5
                ? '⭐ Excellent!'
                : rating === 4
                  ? '👍 Great!'
                  : rating === 3
                    ? '👌 Good'
                    : rating === 2
                      ? '😕 Not great'
                      : rating === 1
                        ? '😞 Poor'
                        : 'Select a rating'}
            </p>
            {errors.rating && (
              <p className="text-red-600 text-sm mt-1">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Your Review
            </label>
            <textarea
              {...register('comment')}
              rows={4}
              placeholder="Share your experience..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
            />
            {errors.comment && (
              <p className="text-red-600 text-sm mt-1">
                {errors.comment.message}
              </p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={closeForm}
              disabled={createReview.isPending || updateReview.isPending}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              isLoading={createReview.isPending || updateReview.isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {createReview.isPending || updateReview.isPending
                ? 'Saving...'
                : editingReview
                  ? 'Update Review'
                  : 'Create Review'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingReview}
        onClose={() => setDeletingReview(null)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteReview.isPending}
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        confirmLabel="Delete Review"
        itemDetails={
          deletingReview && (
            <div className="space-y-2">
              <p className="font-semibold text-slate-900">
                {getDestinationName(deletingReview.destinationId)}
              </p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < deletingReview.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 line-clamp-2">
                {deletingReview.comment}
              </p>
            </div>
          )
        }
      />
    </motion.div>
  );
}
