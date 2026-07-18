import { useQuery } from '@tanstack/react-query';
import destinationService from '@/services/destination.service';
import { DestinationQueryParams, Destination, PaginationMeta } from '@/types';

interface UseExploreDestinationsReturn {
  destinations: Destination[];
  pagination: PaginationMeta | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useExploreDestinations(params: DestinationQueryParams): UseExploreDestinationsReturn {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['destinations', 'explore', params],
    queryFn: async () => {
      const response = await destinationService.getDestinations(params);
      return response;
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    destinations: data?.data || [],
    pagination: data?.pagination || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
