import { useMutation } from '@tanstack/react-query';
import { authService, GoogleLoginPayload } from '@/services/auth.service';
import { AuthResponse } from '@/types';

export const useGoogleLogin = () => {
  return useMutation<AuthResponse, Error, GoogleLoginPayload>({
    mutationFn: (payload: GoogleLoginPayload) => authService.googleLogin(payload),
  });
};
