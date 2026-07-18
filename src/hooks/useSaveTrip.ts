import { useMutation } from '@tanstack/react-query';
import tripService from '@/services/trip.service';
import { CreateTripPayload } from '@/types';

export function useSaveTrip() {
  return useMutation({
    mutationFn: (payload: CreateTripPayload) => tripService.createTrip(payload),
  });
}
