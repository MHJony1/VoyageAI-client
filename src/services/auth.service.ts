import { apiClient } from './api';

export interface User {
  _id: string;
  name: string;
  email: string;
  photo?: string;
  provider: string;
  role: string;
  blocked?: boolean;
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

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface GoogleLoginPayload {
  token: string;
}

export const authService = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/register', payload);
    return response.data;
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },

  googleLogin: async (payload: GoogleLoginPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/google', payload);
    return response.data;
  },

  demoLogin: async (): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth/demo');
    return response.data;
  },

  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>('/auth/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
