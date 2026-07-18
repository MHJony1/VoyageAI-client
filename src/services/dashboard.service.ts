import apiClient from '@/services/api';

export interface OverviewData {
  totalTrips: number;
  totalAIGenerations: number;
  totalReviews: number;
  favoriteDestination?: string;
  recentTrips: Array<{
    _id: string;
    destination: string;
    days: number;
    budget: number;
    createdAt: string;
  }>;
  recentAIActivities: Array<{
    _id: string;
    type: string;
    createdAt: string;
  }>;
}

export interface DashboardStatistics {
  monthlyTrips: Array<{ month: string; count: number }>;
  monthlyAI: Array<{ month: string; count: number }>;
  monthlyReviews: Array<{ month: string; count: number }>;
  tripStatusDistribution: Array<{ status: string; count: number }>;
}

export const dashboardService = {
  async getOverview(): Promise<OverviewData> {
    const response = await apiClient.get('/dashboard/overview');
    return response.data.data;
  },

  async getStatistics(): Promise<DashboardStatistics> {
    const response = await apiClient.get('/dashboard/statistics');
    return response.data.data;
  },
};

export default dashboardService;
