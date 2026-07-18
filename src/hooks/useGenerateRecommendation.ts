import { useMutation } from '@tanstack/react-query';
import aiService, { RecommendationRequest, RecommendationResponse } from '@/services/ai.service';

export function useGenerateRecommendation() {
  return useMutation<RecommendationResponse, Error, RecommendationRequest>({
    mutationFn: (payload) => aiService.generateRecommendation(payload),
  });
}
