import apiClient from '@/services/api';

export interface TripPlanRequest {
  destination: string;
  budget: number;
  numberOfDays: number;
  travelStyle: string;
  interests: string[];
  groupType?: string;
  preferredSeason?: string;
}

export interface TripPlanResponse {
  type: string;
  overview: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    meals: string;
  }>;
  budget: {
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    total: number;
  };
  hotels: Array<{
    name: string;
    type: string;
    pricePerNight: string;
    rating: number;
  }>;
  transportation: Array<{
    type: string;
    details: string;
    estimatedCost: string;
  }>;
  food: Array<{
    restaurant: string;
    cuisine: string;
    recommendation: string;
  }>;
  activities: Array<{
    activity: string;
    description: string;
    bestTime: string;
  }>;
  tips: string[];
  packing: string[];
}

export interface RecommendationRequest {
  budget: number;
  preferredSeason: string;
  travelStyle: string;
  groupType: string;
  interests: string[];
}

export interface RecommendationDestination {
  name: string;
  country: string;
  reason: string;
  estimatedBudget: string;
  bestTimeToVisit: string;
  suggestedDuration: string;
  mustVisitAttractions: string[];
  travelTips: string[];
}

export interface RecommendationResponse {
  type: string;
  destinations: RecommendationDestination[];
  alternatives: RecommendationDestination[];
  generalTips: string[];
}

export const aiService = {
  async generateTripPlan(payload: TripPlanRequest): Promise<TripPlanResponse> {
    const response = await apiClient.post('/ai/trip-plan', payload);
    return response.data.data;
  },

  async generateRecommendation(payload: RecommendationRequest): Promise<RecommendationResponse> {
    const response = await apiClient.post('/ai/recommend', payload);
    return response.data.data;
  },
};

export default aiService;
