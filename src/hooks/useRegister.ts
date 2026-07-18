import { useMutation } from '@tanstack/react-query';
import { authService, RegisterPayload } from '@/services/auth.service';
import { AuthResponse } from '@/types';

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  });
};
