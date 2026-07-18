import apiClient from '@/services/api';
import { Trip, CreateTripPayload } from '@/types';

export const tripService = {
  async createTrip(payload: CreateTripPayload): Promise<Trip> {
    const response = await apiClient.post('/trips', payload);
    return response.data.data;
  },
};

export default tripService;
