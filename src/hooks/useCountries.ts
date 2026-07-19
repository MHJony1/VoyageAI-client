import { useQuery } from '@tanstack/react-query';
import destinationService from '@/services/destination.service';

export function useCountries() {
  return useQuery({
    queryKey: ['destinations', 'countries'],
    queryFn: () => destinationService.getCountries(),
    staleTime: 1000 * 60 * 30,
  });
}
