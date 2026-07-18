'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const startPage = Math.max(1, page - 2);
  const endPage = Math.min(totalPages, page + 2);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const showLeftDots = startPage > 1;
  const showRightDots = endPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Prev Button */}
      <Button
        variant="outline"
        size="md"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft size={18} />
      </Button>

      {/* First Page */}
      {showLeftDots && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            1
          </button>
          {startPage > 2 && (
            <span className="px-2 py-2 text-slate-400">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
            p === page
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 hover:bg-slate-100'
          )}
        >
          {p}
        </button>
      ))}

      {/* Last Page */}
      {showRightDots && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 py-2 text-slate-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        size="md"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1"
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
}
