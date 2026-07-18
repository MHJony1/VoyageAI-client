import { useQuery } from '@tanstack/react-query';
import apiClient from '@/services/api';

interface Destination {
  _id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  budget: string;
  category: string;
}

async function fetchDestinations(limit?: number): Promise<Destination[]> {
  try {
    const params = limit ? `?limit=${limit}` : '';
    const response = await apiClient.get(`/destinations${params}`);
    if (response.data.success) {
      return response.data.data;
    }
    return [];
  } catch {
    throw new Error('Failed to fetch destinations');
  }
}

export function useDestinations(limit?: number) {
  return useQuery({
    queryKey: ['destinations', limit],
    queryFn: () => fetchDestinations(limit),
    staleTime: 1000 * 60 * 30,
  });
}

export function useFeaturedDestinations() {
  return useDestinations(3);
}
