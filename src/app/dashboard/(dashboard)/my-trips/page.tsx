'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Backpack,
  Calendar,
  Trash2,
  Edit2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Wallet,
  Crown,
  Users,
  Filter,
  X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTrips, useDeleteTrip, useUpdateTrip } from '@/hooks/useTrips';
import { CardSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { Trip } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const STATUS_OPTIONS = ['active', 'completed', 'planned', 'cancelled'] as const;

const TRAVEL_STYLES = [
  { value: 'luxury', label: 'Luxury ✨' },
  { value: 'budget', label: 'Budget 💰' },
  { value: 'moderate', label: 'Moderate ⚖️' },
  { value: 'backpacker', label: 'Backpacker 🎒' },
  { value: 'adventure', label: 'Adventure 🧗' },
];

const STATUS_COLORS = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  completed: 'bg-blue-100 text-blue-700 border-blue-200',
  planned: 'bg-amber-100 text-amber-700 border-amber-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

const editTripSchema = z.object({
  destination: z.string().min(2, 'Destination must be at least 2 characters'),
  days: z
    .number({ error: 'Days is required' })
    .min(1, 'At least 1 day')
    .max(90, 'Maximum 90 days'),
  budget: z
    .number({ error: 'Budget is required' })
    .min(1, 'Budget must be greater than 0'),
  travelStyle: z.string().min(1, 'Travel style is required'),
  status: z.enum(STATUS_OPTIONS),
});

type EditTripFormData = z.infer<typeof editTripSchema>;

export default function MyTripsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [deletingTrip, setDeletingTrip] = useState<Trip | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isLoading, error } = useTrips(page, 10);
  const deleteTrip = useDeleteTrip();
  const updateTrip = useUpdateTrip();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTripFormData>({
    resolver: zodResolver(editTripSchema),
  });

  const trips = data?.data || [];
  const pagination = data?.pagination;

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.destination
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = !statusFilter || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEditModal = (trip: Trip) => {
    setEditingTrip(trip);
    reset({
      destination: trip.destination,
      days: trip.days,
      budget: trip.budget,
      travelStyle: trip.travelStyle,
      status: (STATUS_OPTIONS as readonly string[]).includes(trip.status)
        ? (trip.status as EditTripFormData['status'])
        : 'planned',
    });
  };

  const handleConfirmDelete = async () => {
    if (!deletingTrip) return;
    try {
      await deleteTrip.mutateAsync(deletingTrip._id);
      toast.success(`Trip to ${deletingTrip.destination} deleted`);
      setDeletingTrip(null);
      setSelectedTrip(null);
    } catch {
      toast.error('Failed to delete trip');
    }
  };

  const onEditSubmit = async (formData: EditTripFormData) => {
    if (!editingTrip) return;
    try {
      await updateTrip.mutateAsync({
        id: editingTrip._id,
        payload: formData,
      });
      setEditingTrip(null);
      toast.success('Trip updated successfully');
    } catch {
      toast.error('Failed to update trip');
    }
  };

  if (error) return <ErrorState message="Failed to load trips" />;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-30" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Backpack className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                My Trips
              </h1>
              <p className="text-slate-500 flex items-center gap-2">
                <span>Manage your travel plans</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-sm font-medium text-slate-700">
                  {filteredTrips.length} trips
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 px-4 py-2 rounded-full border border-amber-200/30">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-700">
              Premium Traveler
            </span>
          </div>
        </div>
      </motion.div>

      {/* Premium Filters */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by destination..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400 shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-all"
              >
                <X size={16} className="text-slate-400" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Desktop Status Filter */}
            <div className="hidden md:flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-3 bg-white border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-700 text-sm shadow-sm min-w-[140px]"
              >
                <option value="">All Status</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center gap-2 px-4 py-3 bg-white border border-slate-200/60 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
            >
              <Filter size={18} className="text-slate-600" />
              <span className="text-sm text-slate-700">Filters</span>
              {statusFilter && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </button>

            {/* Mobile Filter Dropdown */}
            {isFilterOpen && (
              <div className="md:hidden absolute mt-2 right-0 w-48 bg-white border border-slate-200/60 rounded-xl shadow-lg z-10 p-2">
                {STATUS_OPTIONS.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status === statusFilter ? '' : status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      statusFilter === status
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
                {statusFilter && (
                  <button
                    onClick={() => {
                      setStatusFilter('');
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    Clear filter
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Trips Grid */}
      <motion.div variants={itemVariants}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No trips found
            </h3>
            <p className="text-slate-500 mb-4">
              Create your first trip to get started
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Plan a Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTrips.map((trip) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[trip.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.planned}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {trip.status.charAt(0).toUpperCase() +
                        trip.status.slice(1)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(trip)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Edit trip"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeletingTrip(trip)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        title="Delete trip"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Destination */}
                  <h3 className="font-bold text-slate-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                    {trip.destination}
                  </h3>

                  {/* Details */}
                  <div className="space-y-2.5 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <Calendar size={15} className="text-blue-500" />
                      </div>
                      <span>{trip.days} days</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <Wallet size={15} className="text-emerald-500" />
                      </div>
                      <span>${trip.budget}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                        <Users size={15} className="text-purple-500" />
                      </div>
                      <span className="capitalize">{trip.travelStyle}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedTrip(trip)}
                    className="w-full py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-blue-600 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center items-center gap-3"
        >
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-xl transition-all border border-slate-200/60"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-slate-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
            disabled={page === pagination.totalPages}
            className="p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-xl transition-all border border-slate-200/60"
          >
            <ChevronRight size={18} />
          </button>
        </motion.div>
      )}

      {/* View Trip Modal - Premium */}
      <Modal
        open={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        title={selectedTrip?.destination}
        size="lg"
      >
        {selectedTrip && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50/80 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Status
                </p>
                <p className="mt-1.5 font-semibold text-slate-900 capitalize flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${selectedTrip.status === 'active' ? 'bg-emerald-500' : selectedTrip.status === 'completed' ? 'bg-blue-500' : selectedTrip.status === 'planned' ? 'bg-amber-500' : 'bg-red-500'}`}
                  />
                  {selectedTrip.status}
                </p>
              </div>
              <div className="bg-slate-50/80 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Budget
                </p>
                <p className="mt-1.5 font-semibold text-slate-900">
                  ${selectedTrip.budget}
                </p>
              </div>
              <div className="bg-slate-50/80 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Duration
                </p>
                <p className="mt-1.5 font-semibold text-slate-900">
                  {selectedTrip.days} days
                </p>
              </div>
              <div className="bg-slate-50/80 rounded-xl p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Travel Style
                </p>
                <p className="mt-1.5 font-semibold text-slate-900 capitalize">
                  {selectedTrip.travelStyle}
                </p>
              </div>
            </div>

            {selectedTrip.interests && selectedTrip.interests.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedTrip.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-sm text-slate-700 border border-slate-200/50"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedTrip.itinerary && (
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Itinerary
                </p>
                <div className="bg-slate-50/80 rounded-xl p-4 max-h-40 overflow-y-auto">
                  <p className="text-sm text-slate-600 whitespace-pre-wrap">
                    {selectedTrip.itinerary}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Trip Modal - Premium */}
      <Modal
        open={!!editingTrip}
        onClose={() => setEditingTrip(null)}
        title="Edit Trip"
        description="Update the details of your trip"
      >
        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Destination
            </label>
            <input
              type="text"
              {...register('destination')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            />
            {errors.destination && (
              <p className="text-red-600 text-sm mt-1">
                {errors.destination.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Days
              </label>
              <input
                type="number"
                min={1}
                {...register('days', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
              {errors.days && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.days.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Budget ($)
              </label>
              <input
                type="number"
                min={1}
                {...register('budget', { valueAsNumber: true })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
              />
              {errors.budget && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Travel Style
            </label>
            <select
              {...register('travelStyle')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            >
              {TRAVEL_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
            {errors.travelStyle && (
              <p className="text-red-600 text-sm mt-1">
                {errors.travelStyle.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-600 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => setEditingTrip(null)}
              disabled={updateTrip.isPending}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              fullWidth
              isLoading={updateTrip.isPending}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {updateTrip.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingTrip}
        onClose={() => setDeletingTrip(null)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteTrip.isPending}
        title="Delete Trip"
        message="Are you sure you want to delete this trip?"
        confirmLabel="Delete Trip"
        itemDetails={
          deletingTrip && (
            <div className="space-y-2">
              <p className="font-semibold text-slate-900">
                {deletingTrip.destination}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {deletingTrip.days} days
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet size={14} /> ${deletingTrip.budget}
                </span>
                <span
                  className={`capitalize px-2 py-0.5 rounded-full text-xs ${STATUS_COLORS[deletingTrip.status as keyof typeof STATUS_COLORS] || STATUS_COLORS.planned}`}
                >
                  {deletingTrip.status}
                </span>
              </div>
            </div>
          )
        }
      />
    </motion.div>
  );
}
