import { AuthLayout, RegisterForm, PublicRoute } from '@/components/auth';

export const metadata = {
  title: 'Register - VoyageAI',
  description: 'Create a new VoyageAI account',
};

export default function RegisterPage() {
  return (
    <PublicRoute>
      <AuthLayout
        title="Start Your Journey"
        subtitle="Join thousands of travelers exploring the world with AI-powered planning"
      >
        <RegisterForm />
      </AuthLayout>
    </PublicRoute>
  );
}
