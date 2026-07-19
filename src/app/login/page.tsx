import { AuthLayout, LoginForm, PublicRoute } from '@/components/auth';

export const metadata = {
  title: 'Login - VoyageAI',
  description: 'Sign in to your VoyageAI account',
};

export default function LoginPage() {
  return (
    <PublicRoute>
      <AuthLayout
        title="Welcome Back"
        subtitle="Sign in to continue your journey with AI-powered travel planning"
      >
        <LoginForm />
      </AuthLayout>
    </PublicRoute>
  );
}
