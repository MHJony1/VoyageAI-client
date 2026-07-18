'use client';

import { Search, RotateCcw } from 'lucide-react';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface FilterSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  country: string;
  onCountryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  onReset: () => void;
  categories: string[];
  countries: string[];
}

export default function FilterSidebar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  country,
  onCountryChange,
  sort,
  onSortChange,
  onReset,
  categories,
  countries,
}: FilterSidebarProps) {
  const isFiltered = search || category || country || sort;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Search</h3>
        <Input
          type="text"
          placeholder="Search destinations..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search size={18} />}
          className="text-sm"
        />
      </div>

      {/* Category */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Category</h3>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 text-sm border-2 border-slate-200 rounded-lg bg-white text-slate-900 focus:border-sky-600 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Country */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Country</h3>
        <select
          value={country}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full px-4 py-2 text-sm border-2 border-slate-200 rounded-lg bg-white text-slate-900 focus:border-sky-600 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="">All Countries</option>
          {countries.map((ctry) => (
            <option key={ctry} value={ctry}>
              {ctry}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Sort By</h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-2 text-sm border-2 border-slate-200 rounded-lg bg-white text-slate-900 focus:border-sky-600 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="">Most Recent</option>
          <option value="rating">Highest Rating</option>
          <option value="budget">Budget (Low to High)</option>
        </select>
      </div>

      {/* Reset Button */}
      {isFiltered && (
        <Button
          variant="outline"
          size="md"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Reset Filters
        </Button>
      )}
    </div>
  );
}
