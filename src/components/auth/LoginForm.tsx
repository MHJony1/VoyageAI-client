'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/providers/AuthProvider';
import Button from '@/components/Button';
import Input from '@/components/Input';
import PasswordInput from './PasswordInput';
import GoogleLoginButton from './GoogleLoginButton';
import DemoLoginButton from './DemoLoginButton';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      await login({
        email: data.email,
        password: data.password,
      });

      if (data.rememberMe) {
        localStorage.setItem('rememberedEmail', data.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = (email: string, password: string) => {
    setValue('email', email);
    setValue('password', password);
  };

  const passwordValue = watch('password');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          placeholder="you@example.com"
          type="email"
          disabled={isLoading}
          error={errors.email?.message}
          {...register('email')}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={passwordValue}
          onChange={(value) => setValue('password', value)}
          error={errors.password?.message}
          disabled={isLoading}
        />

        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            disabled={isLoading}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
            {...register('rememberMe')}
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
          >
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isLoading}
          className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="space-y-3">
        <GoogleLoginButton isLoading={isLoading} />
        <DemoLoginButton onFill={handleDemoFill} isLoading={isLoading} />
      </div>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-700">
          Sign up
        </Link>
      </p>

      <Link
        href="#"
        className="block text-center text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        Forgot your password?
      </Link>
    </div>
  );
}
