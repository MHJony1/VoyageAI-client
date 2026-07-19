'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Check, Search, X } from 'lucide-react';

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  countries: string[];
  isLoading?: boolean;
  className?: string;
}

export default function CountrySelect({
  value,
  onChange,
  countries,
  isLoading = false,
  className = '',
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return countries;
    return countries.filter((c) => c.toLowerCase().includes(q));
  }, [countries, query]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      // Focus the typeahead input once the panel is mounted
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const select = (country: string) => {
    onChange(country);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const choice = filtered[activeIndex];
      if (choice) select(choice);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
      >
        <span className={value ? 'text-slate-700' : 'text-slate-400'}>
          {value || 'All Countries'}
        </span>
        <div className="flex items-center gap-1">
          {value && (
            <X
              className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            />
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          <div className="relative p-2 border-b border-slate-100">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type to search countries..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <ul className="max-h-60 overflow-y-auto py-1">
            <li>
              <button
                type="button"
                onClick={() => select('')}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                All Countries
                {!value && <Check className="w-3.5 h-3.5 text-blue-500" />}
              </button>
            </li>
            {isLoading ? (
              <li className="px-4 py-2 text-sm text-slate-400">Loading...</li>
            ) : filtered.length === 0 ? (
              <li className="px-4 py-2 text-sm text-slate-400">No countries found</li>
            ) : (
              filtered.map((country, idx) => (
                <li key={country}>
                  <button
                    type="button"
                    onClick={() => select(country)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                      idx === activeIndex ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {country}
                    {value === country && <Check className="w-3.5 h-3.5 text-blue-500" />}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
