import { useMutation, useQueryClient } from '@tanstack/react-query';
import tripService from '@/services/trip.service';
import { CreateTripPayload } from '@/types';

export function useSaveTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTripPayload) => tripService.createTrip(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}
