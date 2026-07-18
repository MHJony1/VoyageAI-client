import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import reviewService, { CreateReviewPayload } from '@/services/review.service';
import { Review, PaginatedResponse } from '@/types';

export function useReviews(page: number = 1, limit: number = 12) {
  return useQuery({
    queryKey: ['reviews', page, limit],
    queryFn: () => reviewService.getAllReviews(page, limit) as Promise<PaginatedResponse<Review>>,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewService.createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useUpdateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateReviewPayload> }) =>
      reviewService.updateReview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reviewService.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
}
