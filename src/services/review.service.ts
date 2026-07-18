import apiClient from '@/services/api';
import { ReviewsResponse } from '@/types';

export const reviewService = {
  async getReviewsByDestination(
    destinationId: string,
    page: number = 1,
    limit: number = 12
  ): Promise<ReviewsResponse> {
    const response = await apiClient.get(`/reviews/destination/${destinationId}`, {
      params: { page, limit },
    });
    return response.data;
  },
};

export default reviewService;
