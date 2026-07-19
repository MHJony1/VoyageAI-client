// Global type definitions

export interface Destination {
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
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: PaginationMeta;
}

export interface DestinationQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  country?: string;
  category?: string;
  sort?: 'rating' | 'budget';
}

export interface Review {
  _id: string;
  userId: string;
  destinationId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  success: boolean;
  message: string;
  data: Review[];
  pagination: PaginationMeta;
}

export interface CreateTripPayload {
  destinationId?: string;
  destination: string;
  days: number;
  budget: number;
  travelStyle: string;
  interests?: string[];
  itinerary: string;
  estimatedCost: number;
  status: string;
}

export interface Trip {
  _id: string;
  userId: string;
  destinationId?: string;
  destination: string;
  days: number;
  budget: number;
  travelStyle: string;
  interests?: string[];
  itinerary: string;
  estimatedCost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  provider: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ChatMessage {
  _id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface AIHistoryItem {
  _id: string;
  userId: string;
  type: 'planner' | 'recommendation' | 'chat';
  prompt: string;
  response: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ChatHistory {
  _id: string;
  userId: string;
  messages: ChatMessage[];
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatHistoriesResponse {
  success: boolean;
  message: string;
  data: ChatHistory[];
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    role: 'assistant';
    content: string;
    createdAt: string;
  };
}
