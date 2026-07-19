'use client';

import { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BudgetInputProps {
  label?: string;
  required?: boolean;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: string;
  placeholder?: string;
}

const formatNumber = (n: number): string =>
  n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const parseNumber = (s: string): number => {
  const digits = s.replace(/[^0-9]/g, '');
  return digits ? parseInt(digits, 10) : 0;
};

/**
 * Budget input that formats with thousands separators as you type
 * (e.g. "1,500") while emitting a plain number to the form.
 */
export default function BudgetInput({
  label,
  required,
  value,
  onChange,
  error,
  placeholder = '1,500',
}: BudgetInputProps) {
  const [text, setText] = useState(value ? formatNumber(value) : '');

  // Keep display in sync when the form resets the value externally
  useEffect(() => {
    setText((current) => {
      const parsed = parseNumber(current);
      if ((value || 0) !== parsed) {
        return value ? formatNumber(value) : '';
      }
      return current;
    });
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseNumber(e.target.value);
    setText(parsed ? formatNumber(parsed) : '');
    onChange(parsed);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-900 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-md bg-emerald-50 text-emerald-600">
          <DollarSign size={14} />
        </div>
        <input
          type="text"
          inputMode="numeric"
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'w-full pl-11 pr-14 py-2 text-sm border-2 rounded-lg transition-colors tabular-nums',
            'border-slate-200 bg-white text-slate-900 placeholder-slate-400',
            'focus:border-indigo-500 focus:outline-none',
            error && 'border-red-500 focus:border-red-500'
          )}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
          USD
        </span>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
