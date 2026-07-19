'use client';

import { Search, RotateCcw } from 'lucide-react';
import CountrySelect from './CountrySelect';

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
  isCountriesLoading?: boolean;
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
  isCountriesLoading,
}: FilterSidebarProps) {
  const isFiltered = search || category || country || sort;

  return (
    <div className="space-y-5">
      {/* Search */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Category
        </h3>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
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
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Country
        </h3>
        <CountrySelect
          value={country}
          onChange={onCountryChange}
          countries={countries}
          isLoading={isCountriesLoading}
        />
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5">
          Sort By
        </h3>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
        >
          <option value="">Most Recent</option>
          <option value="rating">Highest Rating</option>
          <option value="budget">Budget (Low to High)</option>
        </select>
      </div>

      {/* Reset Button */}
      {isFiltered && (
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all border border-slate-200"
        >
          <RotateCcw size={14} />
          Reset Filters
        </button>
      )}
    </div>
  );
}
