import { useQuery } from '@tanstack/react-query';
import reviewService from '@/services/review.service';
import { Review, PaginationMeta } from '@/types';

interface UseDestinationReviewsReturn {
  reviews: Review[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useDestinationReviews(
  destinationId: string | null,
  page: number = 1
): UseDestinationReviewsReturn {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reviews', destinationId, page],
    queryFn: async () => {
      if (!destinationId) throw new Error('Destination ID required');
      return reviewService.getReviewsByDestination(destinationId, page, 12);
    },
    enabled: !!destinationId,
  });

  return {
    reviews: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
