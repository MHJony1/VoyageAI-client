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
  id?: string;
  title?: string;
  thumbnail?: string;
  estimatedBudget?: number;
  bestSeason?: string;
}

async function fetchDestinations(limit?: number): Promise<Destination[]> {
  try {
    // Serialize via axios `params` — never interpolate values into the URL string.
    // Guard against non-numeric input so a bad caller can't produce ?limit=[object Object]
    const numericLimit =
      typeof limit === 'number' && Number.isFinite(limit) ? limit : undefined;
    const response = await apiClient.get('/destinations', {
      params: numericLimit !== undefined ? { limit: numericLimit } : undefined,
    });
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
