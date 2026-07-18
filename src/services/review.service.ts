import apiClient from '@/services/api';
import { Review, ReviewsResponse, PaginatedResponse } from '@/types';

export interface CreateReviewPayload {
  destinationId: string;
  rating: number;
  comment: string;
}

export const reviewService = {
  async getAllReviews(page: number = 1, limit: number = 12): Promise<PaginatedResponse<Review>> {
    const response = await apiClient.get('/reviews', {
      params: { page, limit },
    });
    return response.data;
  },

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

  async createReview(payload: CreateReviewPayload): Promise<Review> {
    const response = await apiClient.post('/reviews', payload);
    return response.data.data;
  },

  async updateReview(id: string, payload: Partial<CreateReviewPayload>): Promise<Review> {
    const response = await apiClient.patch(`/reviews/${id}`, payload);
    return response.data.data;
  },

  async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`/reviews/${id}`);
  },
};

export default reviewService;

