import apiClient from '@/services/api';
import { Trip, CreateTripPayload, PaginatedResponse } from '@/types';

export const tripService = {
  async getTrips(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Trip>> {
    const response = await apiClient.get('/trips', {
      params: { page, limit },
    });
    return response.data;
  },

  async getTripById(id: string): Promise<Trip> {
    const response = await apiClient.get(`/trips/${id}`);
    return response.data.data;
  },

  async createTrip(payload: CreateTripPayload): Promise<Trip> {
    const response = await apiClient.post('/trips', payload);
    return response.data.data;
  },

  async updateTrip(id: string, payload: Partial<CreateTripPayload>): Promise<Trip> {
    const response = await apiClient.patch(`/trips/${id}`, payload);
    return response.data.data;
  },

  async deleteTrip(id: string): Promise<void> {
    await apiClient.delete(`/trips/${id}`);
  },
};

export default tripService;

