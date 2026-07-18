import { AuthLayout, RegisterForm, PublicRoute } from '@/components/auth';

export const metadata = {
  title: 'Register - VoyageAI',
  description: 'Create a new VoyageAI account',
};

export default function RegisterPage() {
  return (
    <PublicRoute>
      <AuthLayout heading="Get Started" subheading="Create your account and begin your journey">
        <RegisterForm />
      </AuthLayout>
    </PublicRoute>
  );
}
