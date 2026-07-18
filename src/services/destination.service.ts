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
};

export default destinationService;
