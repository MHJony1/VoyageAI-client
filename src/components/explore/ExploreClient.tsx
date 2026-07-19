'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Filter, Compass, X } from 'lucide-react';
import Container from '@/components/Container';
import { GridSkeleton } from '@/components/Loading';
import { useExploreDestinations } from '@/hooks/useExploreDestinations';
import { POPULAR_COUNTRIES, DESTINATION_CATEGORIES } from '@/constants';
import DestinationGrid from './DestinationGrid';
import FilterDrawer from './FilterDrawer';
import CountrySelect from './CountrySelect';
import Pagination from './Pagination';

const CATEGORIES = DESTINATION_CATEGORIES;

export default function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [country, setCountry] = useState(searchParams.get('country') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounce search so typing doesn't fire an API request per keystroke
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timer);
  }, [search]);

  // Backend-driven search/filter/sort/pagination. The service layer passes
  // these through axios `params`, so they're serialized as real query params.
  const { destinations, pagination, isLoading, error, refetch } =
    useExploreDestinations({
      search: debouncedSearch || undefined,
      category: category || undefined,
      country: country || undefined,
      sort: sort === 'rating' || sort === 'budget' ? sort : undefined,
      page,
      limit: 9,
    });

  // Static list of popular tourist countries for the filter dropdown
  const countries = POPULAR_COUNTRIES;

  const updateQueryParams = useCallback(
    (updates: Record<string, string | number>, { replace = false } = {}) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      });

      const url = `/explore?${params.toString()}`;
      if (replace) {
        router.replace(url, { scroll: false });
      } else {
        router.push(url, { scroll: false });
      }
    },
    [router, searchParams],
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    // replace, not push — typing shouldn't create a history entry per keystroke
    updateQueryParams({ search: value, page: 1 }, { replace: true });
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    setPage(1);
    updateQueryParams({ category: value, page: 1 });
  };

  const handleCountry = (value: string) => {
    setCountry(value);
    setPage(1);
    updateQueryParams({ country: value, page: 1 });
  };

  const handleSort = (value: string) => {
    setSort(value);
    setPage(1);
    updateQueryParams({ sort: value, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateQueryParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setCountry('');
    setSort('');
    setPage(1);
    router.push('/explore', { scroll: false });
  };

  // Server-reported totals — the API returns one page of at most `limit`
  // items, so totals must come from the pagination metadata, not array length
  const totalPages = pagination?.totalPages || 1;
  const totalResults = pagination?.total ?? destinations.length;
  const isFiltered = search || category || country || sort;

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setSearch(params.get('search') || '');
    setCategory(params.get('category') || '');
    setCountry(params.get('country') || '');
    setSort(params.get('sort') || '');
    setPage(Number(params.get('page')) || 1);
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-slate-500">Failed to load destinations</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Hero Section with Image */}
      <section className="relative h-[300px] lg:h-[340px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=1920&h=800&fit=crop&auto=format"
          alt="Explore destinations"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        <div className="relative z-10 h-full flex items-center justify-center">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-4">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-[10px] font-medium text-white/90 tracking-[0.2em] uppercase">
                  Discover Your Next Adventure
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight">
                Explore <span className="text-amber-300">Destinations</span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Discover incredible destinations from around the world. Find
                your perfect getaway.
              </p>
            </motion.div>
          </Container>
        </div>
      </section>

      <Container className="py-8">
        {/* Search & Filter Bar - Only once */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          <div className="relative flex-1 w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none shadow-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-3">
              <select
                value={category}
                onChange={(e) => handleCategory(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm min-w-[130px]"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <CountrySelect
                value={country}
                onChange={handleCountry}
                countries={countries}
                className="min-w-[180px]"
              />

              <select
                value={sort}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm min-w-[130px]"
              >
                <option value="">Most Recent</option>
                <option value="rating">Highest Rating</option>
                <option value="budget">Budget (Low to High)</option>
              </select>

              {isFiltered && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
            >
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm text-slate-700">Filters</span>
              {isFiltered && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </button>

            {/* Results Count */}
            <div className="hidden sm:block text-sm text-slate-500 whitespace-nowrap">
              {isLoading
                ? 'Loading...'
                : `${totalResults} destination${totalResults === 1 ? '' : 's'}`}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div>
          {/* Results Grid */}
          <div className="flex-1">
            {isLoading ? (
              <GridSkeleton count={9} />
            ) : destinations?.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white rounded-2xl border border-slate-200/60"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {country
                    ? `No destinations found for ${country}`
                    : 'No destinations found'}
                </h3>
                <p className="text-slate-500">
                  {country
                    ? 'We don’t have any destinations here yet. Try another country or filter.'
                    : 'Try adjusting your search or filters'}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
              <>
                <DestinationGrid destinations={destinations} />

                <div className="mt-8">
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        search={search}
        onSearchChange={handleSearch}
        category={category}
        onCategoryChange={handleCategory}
        country={country}
        onCountryChange={handleCountry}
        sort={sort}
        onSortChange={handleSort}
        onReset={handleReset}
        categories={CATEGORIES}
        countries={countries}
      />
    </div>
  );
}
