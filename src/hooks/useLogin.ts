import { useMutation } from '@tanstack/react-query';
import { authService, LoginPayload } from '@/services/auth.service';
import { AuthResponse } from '@/types';

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginPayload>({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  });
};
