'use client';

import Button from '@/components/Button';

interface DemoLoginButtonProps {
  onFill: (email: string, password: string) => void;
  isLoading?: boolean;
}

export default function DemoLoginButton({
  onFill,
  isLoading = false,
}: DemoLoginButtonProps) {
  const handleDemo = () => {
    onFill('demo@example.com', 'Demo@123456');
  };

  return (
    <Button
      variant="outline"
      fullWidth
      onClick={handleDemo}
      disabled={isLoading}
      className="border-gray-300"
    >
      Demo Login
    </Button>
  );
}
