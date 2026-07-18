'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sliders } from 'lucide-react';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/Button';
import { GridSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useExploreDestinations } from '@/hooks/useExploreDestinations';
import DestinationGrid from './DestinationGrid';
import FilterSidebar from './FilterSidebar';
import FilterDrawer from './FilterDrawer';
import Pagination from './Pagination';
import { DestinationQueryParams } from '@/types';

const DEFAULT_CATEGORIES = [
  'Beach',
  'Cultural',
  'Adventure',
  'Urban',
  'Mountain',
  'Wildlife',
  'Luxury',
  'Nature',
  'Historical',
  'Food',
];

export default function ExploreClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL params
  const page = parseInt(searchParams.get('page') || '1', 10);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || '';
  const sort = searchParams.get('sort') || '';

  // Local state for search debounce
  const [localSearch, setLocalSearch] = useState(search);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        updateFilter({ search: localSearch, page: 1 });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [localSearch, search]);

  // Build query params
  const validSort = (sort === 'rating' || sort === 'budget' ? sort : undefined) as 'rating' | 'budget' | undefined;
  const queryParams: DestinationQueryParams = {
    page,
    limit: 12,
    ...(search && { search }),
    ...(category && { category }),
    ...(country && { country }),
    ...(validSort && { sort: validSort }),
  };

  // Fetch data
  const { destinations, pagination, isLoading, error, refetch } = useExploreDestinations(queryParams);

  // Derive filter options from data
  const categories = useMemo(() => {
    const fromData = Array.from(
      new Set([...DEFAULT_CATEGORIES, ...destinations.map((d) => d.category)].filter(Boolean))
    ).sort();
    return fromData;
  }, [destinations]);

  const countries = useMemo(() => {
    return Array.from(new Set(destinations.map((d) => d.country))).sort();
  }, [destinations]);

  // Update URL and filters
  const updateFilter = (updates: Record<string, any>) => {
    const params = new URLSearchParams();

    const newPage = updates.page ?? page;
    const newSearch = updates.search !== undefined ? updates.search : search;
    const newCategory = updates.category !== undefined ? updates.category : category;
    const newCountry = updates.country !== undefined ? updates.country : country;
    const newSort = updates.sort !== undefined ? updates.sort : sort;

    if (newPage > 1) params.set('page', String(newPage));
    if (newSearch) params.set('search', newSearch);
    if (newCategory) params.set('category', newCategory);
    if (newCountry) params.set('country', newCountry);
    if (newSort) params.set('sort', newSort);

    router.replace(`/explore?${params.toString()}`);
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setLocalSearch('');
    router.replace('/explore');
  };

  // Handle filter changes
  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    updateFilter({ category: value, page: 1 });
  };

  const handleCountryChange = (value: string) => {
    updateFilter({ country: value, page: 1 });
  };

  const handleSortChange = (value: string) => {
    updateFilter({ sort: value, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateFilter({ page: newPage });
  };

  const totalPages = pagination?.totalPages || 1;
  const isEmpty = !isLoading && destinations.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PageHeader
        title="Explore Destinations"
        description="Discover incredible destinations from around the world. Search, filter, and find your next adventure."
      />

      {/* Main Content */}
      <section className="section-py">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24 bg-slate-50 rounded-2xl border border-slate-200 p-6">
                <FilterSidebar
                  search={localSearch}
                  onSearchChange={handleSearchChange}
                  category={category}
                  onCategoryChange={handleCategoryChange}
                  country={country}
                  onCountryChange={handleCountryChange}
                  sort={sort}
                  onSortChange={handleSortChange}
                  onReset={handleResetFilters}
                  categories={categories}
                  countries={countries}
                />
              </div>
            </motion.div>

            {/* Results Column */}
            <div className="lg:col-span-3 space-y-8">
              {/* Mobile Filter Button */}
              <div className="lg:hidden flex items-center gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-2"
                >
                  <Sliders size={18} />
                  Filters
                </Button>
                {pagination && (
                  <span className="text-sm text-slate-600">
                    {pagination.total} results
                  </span>
                )}
              </div>

              {/* Results Header */}
              {pagination && !isEmpty && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-slate-600"
                >
                  Showing {(page - 1) * 12 + 1}–
                  {Math.min(page * 12, pagination.total)} of{' '}
                  {pagination.total} results
                </motion.div>
              )}

              {/* Loading State */}
              {isLoading && <GridSkeleton count={12} />}

              {/* Error State */}
              {error && !isLoading && (
                <ErrorState
                  title="Failed to load destinations"
                  message="Something went wrong while fetching destinations. Please try again."
                  onRetry={() => refetch()}
                />
              )}

              {/* Empty State */}
              {isEmpty && !error && (
                <EmptyState
                  icon="search"
                  title="No destinations found"
                  description="Try adjusting your filters or search terms to find what you're looking for."
                  action={{
                    label: 'Reset Filters',
                    onClick: handleResetFilters,
                  }}
                />
              )}

              {/* Grid */}
              {!isLoading && !error && !isEmpty && (
                <DestinationGrid destinations={destinations} />
              )}

              {/* Pagination */}
              {!isLoading && !error && !isEmpty && totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center mt-12"
                >
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        search={localSearch}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        country={country}
        onCountryChange={handleCountryChange}
        sort={sort}
        onSortChange={handleSortChange}
        onReset={handleResetFilters}
        categories={categories}
        countries={countries}
      />
    </div>
  );
}
