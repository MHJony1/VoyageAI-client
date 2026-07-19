'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Search, Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchableSelectProps {
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  /** Allow typing a value that is not in the options list */
  allowCustom?: boolean;
  disabled?: boolean;
}

/**
 * Searchable dropdown used in admin forms. Type to filter options;
 * with `allowCustom` the typed text itself can be selected.
 */
export default function SearchableSelect({
  label,
  required,
  placeholder = 'Select an option',
  options,
  value,
  onChange,
  error,
  allowCustom = false,
  disabled = false,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.toLowerCase().includes(q));
  }, [options, query]);

  const showCustomOption =
    allowCustom &&
    query.trim().length > 0 &&
    !options.some((opt) => opt.toLowerCase() === query.trim().toLowerCase());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) {
      setHighlighted(0);
      // Focus the search box as soon as the dropdown opens
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.children[highlighted] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlighted]);

  const select = (option: string) => {
    onChange(option);
    setOpen(false);
    setQuery('');
  };

  const totalItems = filtered.length + (showCustomOption ? 1 : 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (showCustomOption && highlighted === filtered.length) {
        select(query.trim());
      } else if (filtered[highlighted]) {
        select(filtered[highlighted]);
      } else if (allowCustom && query.trim()) {
        select(query.trim());
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
    }
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-slate-900 mb-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-left border-2 rounded-lg bg-white transition-colors',
            'border-slate-200 focus:border-indigo-500 focus:outline-none',
            'disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed',
            open && 'border-indigo-500',
            error && 'border-red-500'
          )}
        >
          <span className={cn('truncate', value ? 'text-slate-900' : 'text-slate-400')}>
            {value || placeholder}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            {value && !disabled && (
              <span
                role="button"
                tabIndex={-1}
                aria-label="Clear selection"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="p-0.5 text-slate-400 hover:text-slate-600 rounded transition-colors"
              >
                <X size={14} />
              </span>
            )}
            <ChevronDown
              size={16}
              className={cn('text-slate-400 transition-transform', open && 'rotate-180')}
            />
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute z-30 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-900/10 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-100">
                <Search size={14} className="text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setHighlighted(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search..."
                  className="w-full text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent"
                />
              </div>
              <ul ref={listRef} className="max-h-52 overflow-y-auto py-1">
                {filtered.map((option, i) => (
                  <li key={option}>
                    <button
                      type="button"
                      onClick={() => select(option)}
                      onMouseEnter={() => setHighlighted(i)}
                      className={cn(
                        'w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-colors',
                        highlighted === i ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700'
                      )}
                    >
                      <span className="truncate">{option}</span>
                      {value === option && <Check size={14} className="text-indigo-600 shrink-0" />}
                    </button>
                  </li>
                ))}
                {showCustomOption && (
                  <li>
                    <button
                      type="button"
                      onClick={() => select(query.trim())}
                      onMouseEnter={() => setHighlighted(filtered.length)}
                      className={cn(
                        'w-full px-3 py-2 text-sm text-left transition-colors',
                        highlighted === filtered.length
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'text-slate-700'
                      )}
                    >
                      Use &quot;{query.trim()}&quot;
                    </button>
                  </li>
                )}
                {filtered.length === 0 && !showCustomOption && (
                  <li className="px-3 py-6 text-sm text-slate-400 text-center">
                    No results found
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
