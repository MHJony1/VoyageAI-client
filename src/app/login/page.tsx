import { AuthLayout, LoginForm, PublicRoute } from '@/components/auth';

export const metadata = {
  title: 'Login - VoyageAI',
  description: 'Sign in to your VoyageAI account',
};

export default function LoginPage() {
  return (
    <PublicRoute>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </PublicRoute>
  );
}
