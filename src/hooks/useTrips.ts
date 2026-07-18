import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import tripService from '@/services/trip.service';
import { CreateTripPayload, Trip, PaginatedResponse } from '@/types';

export function useTrips(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['trips', page, limit],
    queryFn: () => tripService.getTrips(page, limit) as Promise<PaginatedResponse<Trip>>,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTripById(id: string) {
  return useQuery({
    queryKey: ['trip', id],
    queryFn: () => tripService.getTripById(id),
    enabled: !!id,
  });
}

export function useCreateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTripPayload) => tripService.createTrip(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useUpdateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateTripPayload> }) =>
      tripService.updateTrip(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}

export function useDeleteTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tripService.deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
  });
}
