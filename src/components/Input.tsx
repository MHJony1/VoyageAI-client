import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, type = 'text', ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-900 mb-2">
          {label}
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full px-4 py-2 text-base border-2 rounded-lg transition-colors',
            'border-slate-200 bg-white text-slate-900 placeholder-slate-400',
            'focus:border-sky-600 focus:outline-none',
            'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:border-red-500',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-slate-500">{helperText}</p>}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
