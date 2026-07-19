'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Backpack,
  MapPin,
  Calendar,
  Trash2,
  Edit2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Wallet,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTrips, useDeleteTrip, useUpdateTrip } from '@/hooks/useTrips';
import { CardSkeleton } from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import Button from '@/components/Button';
import { toast } from 'sonner';
import { Trip } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const STATUS_OPTIONS = ['active', 'completed', 'planned', 'cancelled'] as const;

const TRAVEL_STYLES = [
  { value: 'luxury', label: 'Luxury' },
  { value: 'budget', label: 'Budget' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'backpacker', label: 'Backpacker' },
  { value: 'adventure', label: 'Adventure' },
];

const editTripSchema = z.object({
  destination: z.string().min(2, 'Destination must be at least 2 characters'),
  days: z.number({ error: 'Days is required' }).min(1, 'At least 1 day').max(90, 'Maximum 90 days'),
  budget: z.number({ error: 'Budget is required' }).min(1, 'Budget must be greater than 0'),
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
    const matchesSearch = trip.destination.toLowerCase().includes(search.toLowerCase());
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
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Backpack className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
            <p className="text-slate-600">Manage your travel plans</p>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div variants={itemVariants} className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by destination..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="">All Status</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
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
          <EmptyState title="No trips found" description="Create your first trip to get started" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTrips.map((trip) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="inline-block px-2 py-1 bg-sky-100 text-sky-700 text-xs font-medium rounded">
                        {trip.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <h3 className="font-semibold text-slate-900 text-lg mb-3">{trip.destination}</h3>

                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{trip.days} days</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedTrip(trip)}
                      className="flex-1 px-3 py-2 bg-sky-100 hover:bg-sky-200 text-sky-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(trip)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                      title="Edit trip"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => setDeletingTrip(trip)}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                      title="Delete trip"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <motion.div variants={itemVariants} className="mt-8 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-slate-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(pagination.totalPages, page + 1))}
            disabled={page === pagination.totalPages}
            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </motion.div>
      )}

      {/* View Trip Modal */}
      <Modal
        open={!!selectedTrip}
        onClose={() => setSelectedTrip(null)}
        title={selectedTrip?.destination}
        size="lg"
      >
        {selectedTrip && (
          <div className="space-y-4 text-slate-600">
            <div>
              <p className="text-sm font-medium text-slate-500">Status</p>
              <p className="mt-1 capitalize">{selectedTrip.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Days</p>
              <p className="mt-1">{selectedTrip.days} days</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Budget</p>
              <p className="mt-1">${selectedTrip.budget}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Travel Style</p>
              <p className="mt-1 capitalize">{selectedTrip.travelStyle}</p>
            </div>
            {selectedTrip.interests && selectedTrip.interests.length > 0 && (
              <div>
                <p className="text-sm font-medium text-slate-500">Interests</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedTrip.interests.map((interest) => (
                    <span key={interest} className="px-2 py-1 bg-slate-100 rounded text-xs">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedTrip.itinerary && (
              <div>
                <p className="text-sm font-medium text-slate-500">Itinerary</p>
                <p className="mt-1 text-sm line-clamp-3">{selectedTrip.itinerary}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Trip Modal */}
      <Modal
        open={!!editingTrip}
        onClose={() => setEditingTrip(null)}
        title="Edit Trip"
        description="Update the details of your trip"
      >
        <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">Destination</label>
            <input
              type="text"
              {...register('destination')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.destination && (
              <p className="text-red-600 text-sm mt-1">{errors.destination.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Days</label>
              <input
                type="number"
                min={1}
                {...register('days', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.days && <p className="text-red-600 text-sm mt-1">{errors.days.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">Budget ($)</label>
              <input
                type="number"
                min={1}
                {...register('budget', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
              />
              {errors.budget && (
                <p className="text-red-600 text-sm mt-1">{errors.budget.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">Travel Style</label>
            <select
              {...register('travelStyle')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            >
              {TRAVEL_STYLES.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
            {errors.travelStyle && (
              <p className="text-red-600 text-sm mt-1">{errors.travelStyle.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">Status</label>
            <select
              {...register('status')}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status.message}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => setEditingTrip(null)}
              disabled={updateTrip.isPending}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 border"
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth isLoading={updateTrip.isPending}>
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
            <div className="space-y-1.5">
              <p className="font-semibold text-slate-900">{deletingTrip.destination}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {deletingTrip.days} days
                </span>
                <span className="flex items-center gap-1">
                  <Wallet size={13} /> ${deletingTrip.budget}
                </span>
                <span className="capitalize">{deletingTrip.status}</span>
              </div>
            </div>
          )
        }
      />
    </motion.div>
  );
}
