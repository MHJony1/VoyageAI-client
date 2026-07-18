import { useQuery } from '@tanstack/react-query';
import destinationService from '@/services/destination.service';

export function useDestination(id: string | null) {
  return useQuery({
    queryKey: ['destination', id],
    queryFn: async () => {
      if (!id) throw new Error('Destination ID required');
      return destinationService.getDestinationById(id);
    },
    enabled: !!id,
  });
}

export function useRelatedDestinations(category: string | null, excludeId: string) {
  return useQuery({
    queryKey: ['destinations', 'related', category],
    queryFn: async () => {
      if (!category) return [];
      return destinationService.getRelatedDestinations(category, excludeId);
    },
    enabled: !!category,
  });
}
