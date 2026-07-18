import { apiClient } from './api';

export interface UpdateProfilePayload {
  name?: string;
  photo?: string;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  aiNotifications: boolean;
  tripReminder: boolean;
  marketingEmails: boolean;
  profileVisibility: 'public' | 'private';
  activityVisibility: 'public' | 'private';
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: any;
}

export const userService = {
  updateProfile: async (payload: UpdateProfilePayload): Promise<UserResponse> => {
    const response = await apiClient.patch<UserResponse>('/user/profile', payload);
    return response.data;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/user/change-password', payload);
    return response.data;
  },

  getSettings: async (): Promise<{ success: boolean; message: string; data: Partial<UserSettings> }> => {
    const response = await apiClient.get<{ success: boolean; message: string; data: Partial<UserSettings> }>(
      '/user/settings'
    );
    return response.data;
  },

  updateSettings: async (settings: Partial<UserSettings>): Promise<UserResponse> => {
    const response = await apiClient.patch<UserResponse>('/user/settings', settings);
    return response.data;
  },

  logoutAllDevices: async (): Promise<UserResponse> => {
    const response = await apiClient.post<UserResponse>('/user/logout-all-devices');
    return response.data;
  },
};
