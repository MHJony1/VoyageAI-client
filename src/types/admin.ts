// Admin panel type definitions

export interface AdminUserRef {
  _id: string;
  name: string;
  email: string;
  photo?: string;
}

export interface AdminDestination {
  _id: string;
  title: string;
  country: string;
  category: string;
  description: string;
  location: string;
  thumbnail: string;
  gallery: string[];
  rating: number;
  estimatedBudget: number;
  bestSeason: string;
  featured: boolean;
  published: boolean;
  duration?: string;
  bestTimeDescription?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  travelTips?: string[];
  weather?: string;
  currency?: string;
  language?: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  provider: string;
  role: string;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTrip {
  _id: string;
  user: AdminUserRef | null;
  destination: string;
  days: number;
  budget: number;
  travelStyle: string;
  interests: string[];
  itinerary: string;
  estimatedCost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminReview {
  _id: string;
  user: AdminUserRef | null;
  destination: { _id: string; title: string; country: string } | null;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAIHistory {
  _id: string;
  user: AdminUserRef | null;
  type: string;
  prompt: string;
  response: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlyPoint {
  month: string;
  count: number;
}

export interface NamedCount {
  name: string;
  count: number;
}

export interface AdminOverview {
  counts: {
    users: number;
    destinations: number;
    trips: number;
    reviews: number;
    aiHistories: number;
  };
  blockedUsers: number;
  featuredDestinations: number;
  monthlyUsers: MonthlyPoint[];
  monthlyTrips: MonthlyPoint[];
  monthlyReviews: MonthlyPoint[];
  monthlyAI: MonthlyPoint[];
  tripStatusDistribution: NamedCount[];
  destinationsByCategory: NamedCount[];
  aiTypeDistribution: NamedCount[];
  recentUsers: AdminUserRef[];
  recentTrips: { _id: string; destination: string; user: string; createdAt: string }[];
}

export interface DestinationFormValues {
  title: string;
  country: string;
  category: string;
  description: string;
  location: string;
  thumbnail: string;
  gallery: string[];
  rating: number;
  estimatedBudget: number;
  bestSeason: string;
  featured: boolean;
  published: boolean;
  duration?: string;
  bestTimeDescription?: string;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  travelTips?: string[];
  weather?: string;
  currency?: string;
  language?: string;
  latitude?: number;
  longitude?: number;
  mapUrl?: string;
}

export interface AdminListParams {
  page?: number;
  limit?: number;
  search?: string;
  [key: string]: string | number | undefined;
}
