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
    return mockDestinations.slice(0, limit);
  }
}

const mockDestinations: Destination[] = [
  {
    _id: '1',
    name: 'Paris',
    country: 'France',
    description: 'City of light with iconic landmarks and world-class cuisine',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 1243,
    budget: '$100-150/day',
    category: 'Cultural',
  },
  {
    _id: '2',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Vibrant metropolis blending tradition and technology',
    image: 'https://images.unsplash.com/photo-1540959375944-7049f642e9c1?w=500&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 892,
    budget: '$80-120/day',
    category: 'Urban',
  },
  {
    _id: '3',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches and temples',
    image: 'https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=500&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 1567,
    budget: '$30-50/day',
    category: 'Beach',
  },
  {
    _id: '4',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps with endless attractions',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&h=400&fit=crop',
    rating: 4.5,
    reviewCount: 2341,
    budget: '$150-200/day',
    category: 'Urban',
  },
  {
    _id: '5',
    name: 'Dubai',
    country: 'UAE',
    description: 'Modern desert oasis with luxury shopping and architecture',
    image: 'https://images.unsplash.com/photo-1512453697918-a48a6f4a7c12?w=500&h=400&fit=crop',
    rating: 4.4,
    reviewCount: 1189,
    budget: '$120-180/day',
    category: 'Luxury',
  },
  {
    _id: '6',
    name: 'Barcelona',
    country: 'Spain',
    description: 'Architectural marvel with beaches and vibrant nightlife',
    image: 'https://images.unsplash.com/photo-1562883676-8c5ebd014edd?w=500&h=400&fit=crop',
    rating: 4.6,
    reviewCount: 1456,
    budget: '$60-100/day',
    category: 'Beach',
  },
];

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
