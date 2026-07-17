import { AlertCircle } from 'lucide-react';
import Button from './Button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 py-12 px-4">
      <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-center max-w-sm mb-6">{message}</p>
      <div className="flex gap-4">
        {onRetry && (
          <Button onClick={onRetry} variant="primary" size="md">
            Try Again
          </Button>
        )}
        {action && (
          <Button onClick={action.onClick} variant="secondary" size="md">
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
