import apiClient from '@/services/api';
import type { PaginatedResponse } from '@/types';
import type {
  AdminOverview,
  AdminDestination,
  AdminUser,
  AdminTrip,
  AdminReview,
  AdminAIHistory,
  DestinationFormValues,
  AdminListParams,
} from '@/types/admin';

const buildParams = (params: AdminListParams): Record<string, string | number> => {
  const out: Record<string, string | number> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null) {
      out[key] = value as string | number;
    }
  });
  return out;
};

export const adminService = {
  /* ------------------------------ Overview ------------------------------ */
  getOverview: async (): Promise<AdminOverview> => {
    const res = await apiClient.get('/admin/overview');
    return res.data.data;
  },

  /* ---------------------------- Destinations ---------------------------- */
  listDestinations: async (params: AdminListParams): Promise<PaginatedResponse<AdminDestination>> => {
    const res = await apiClient.get('/admin/destinations', { params: buildParams(params) });
    return res.data;
  },
  createDestination: async (data: DestinationFormValues): Promise<AdminDestination> => {
    const res = await apiClient.post('/admin/destinations', data);
    return res.data.data;
  },
  updateDestination: async (
    id: string,
    data: Partial<DestinationFormValues>,
  ): Promise<AdminDestination> => {
    const res = await apiClient.patch(`/admin/destinations/${id}`, data);
    return res.data.data;
  },
  deleteDestination: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/destinations/${id}`);
  },
  toggleFeature: async (id: string): Promise<AdminDestination> => {
    const res = await apiClient.patch(`/admin/destinations/${id}/feature`);
    return res.data.data;
  },
  togglePublish: async (id: string): Promise<AdminDestination> => {
    const res = await apiClient.patch(`/admin/destinations/${id}/publish`);
    return res.data.data;
  },

  /* -------------------------------- Users ------------------------------- */
  listUsers: async (params: AdminListParams): Promise<PaginatedResponse<AdminUser>> => {
    const res = await apiClient.get('/admin/users', { params: buildParams(params) });
    return res.data;
  },
  changeRole: async (id: string, role: string): Promise<AdminUser> => {
    const res = await apiClient.patch(`/admin/users/${id}/role`, { role });
    return res.data.data;
  },
  setBlocked: async (id: string, blocked: boolean): Promise<AdminUser> => {
    const res = await apiClient.patch(`/admin/users/${id}/block`, { blocked });
    return res.data.data;
  },
  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/users/${id}`);
  },

  /* -------------------------------- Trips ------------------------------- */
  listTrips: async (params: AdminListParams): Promise<PaginatedResponse<AdminTrip>> => {
    const res = await apiClient.get('/admin/trips', { params: buildParams(params) });
    return res.data;
  },
  deleteTrip: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/trips/${id}`);
  },

  /* ------------------------------- Reviews ------------------------------ */
  listReviews: async (params: AdminListParams): Promise<PaginatedResponse<AdminReview>> => {
    const res = await apiClient.get('/admin/reviews', { params: buildParams(params) });
    return res.data;
  },
  deleteReview: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/reviews/${id}`);
  },

  /* ------------------------------ AI History ---------------------------- */
  listAIHistory: async (params: AdminListParams): Promise<PaginatedResponse<AdminAIHistory>> => {
    const res = await apiClient.get('/admin/ai-history', { params: buildParams(params) });
    return res.data;
  },
};

export default adminService;
