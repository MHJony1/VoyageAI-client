'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingInputProps {
  label?: string;
  required?: boolean;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

/**
 * Interactive 1-5 star rating input. Clicking the left half of a star
 * selects a half step (e.g. 3.5), the right half a full step.
 */
export default function StarRatingInput({
  label,
  required,
  value,
  onChange,
  error,
}: StarRatingInputProps) {
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;

  const ratingFor = (starIndex: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeftHalf = e.clientX - rect.left < rect.width / 2;
    return starIndex - (isLeftHalf ? 0.5 : 0);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-900 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1"
          role="radiogroup"
          aria-label={label || 'Rating'}
          onMouseLeave={() => setHover(null)}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            const fill = Math.min(Math.max(display - (star - 1), 0), 1);
            return (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={value >= star}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                onClick={(e) => onChange(ratingFor(star, e))}
                onMouseMove={(e) => setHover(ratingFor(star, e))}
                className="relative p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 rounded"
              >
                <Star size={26} className="text-slate-200" fill="currentColor" />
                {fill > 0 && (
                  <span
                    className="absolute inset-0 p-0.5 overflow-hidden"
                    style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}
                  >
                    <Star size={26} className="text-amber-400" fill="currentColor" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <span
          className={cn(
            'px-2.5 py-1 rounded-lg text-sm font-semibold tabular-nums',
            'bg-amber-50 text-amber-700 border border-amber-200'
          )}
        >
          {display.toFixed(1)}
        </span>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
