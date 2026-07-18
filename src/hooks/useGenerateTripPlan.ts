import { useMutation } from '@tanstack/react-query';
import aiService, { TripPlanRequest, TripPlanResponse } from '@/services/ai.service';

export function useGenerateTripPlan() {
  return useMutation<TripPlanResponse, Error, TripPlanRequest>({
    mutationFn: (payload) => aiService.generateTripPlan(payload),
  });
}
