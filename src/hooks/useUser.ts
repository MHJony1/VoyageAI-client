import { useMutation, useQuery } from '@tanstack/react-query';
import { userService, UpdateProfilePayload, ChangePasswordPayload, UserSettings } from '@/services/user.service';

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => userService.updateProfile(payload),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => userService.changePassword(payload),
  });
};

export const useUserSettings = () => {
  return useQuery({
    queryKey: ['user-settings'],
    queryFn: () => userService.getSettings(),
  });
};

export const useUpdateSettings = () => {
  return useMutation({
    mutationFn: (settings: Partial<UserSettings>) => userService.updateSettings(settings),
  });
};

export const useLogoutAllDevices = () => {
  return useMutation({
    mutationFn: () => userService.logoutAllDevices(),
  });
};
