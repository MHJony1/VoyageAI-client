import apiClient from '@/services/api';
import { Destination, PaginatedResponse, DestinationQueryParams } from '@/types';

export const destinationService = {
  async getDestinations(params: DestinationQueryParams): Promise<PaginatedResponse<Destination>> {
    const queryParams: Record<string, any> = {};

    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.search) queryParams.search = params.search;
    if (params.country) queryParams.country = params.country;
    if (params.category) queryParams.category = params.category;
    if (params.sort) queryParams.sort = params.sort;

    const response = await apiClient.get('/destinations', { params: queryParams });
    return response.data;
  },

  async getDestinationById(id: string): Promise<Destination> {
    const response = await apiClient.get(`/destinations/${id}`);
    return response.data.data;
  },

  async getCountries(): Promise<string[]> {
    const response = await apiClient.get('/destinations/countries');
    return Array.isArray(response.data?.data) ? response.data.data : [];
  },

  async getRelatedDestinations(category: string, excludeId: string): Promise<Destination[]> {
    const response = await apiClient.get('/destinations', {
      params: {
        category,
        limit: 6,
      },
    });
    const destinations: Destination[] = response.data.data || [];
    return destinations.filter((d) => d._id !== excludeId).slice(0, 4);
  },
};

export default destinationService;
