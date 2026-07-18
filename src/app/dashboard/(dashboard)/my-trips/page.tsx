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
  X,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useTrips, useDeleteTrip, useUpdateTrip } from '@/hooks/useTrips';
import { CardSkeleton } from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import ErrorState from '@/components/ErrorState';
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

const STATUS_OPTIONS = ['active', 'completed', 'planned', 'cancelled'];

export default function MyTripsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [editStatus, setEditStatus] = useState('');

  const { data, isLoading, error } = useTrips(page, 10);
  const deleteTrip = useDeleteTrip();
  const updateTrip = useUpdateTrip();

  const trips = data?.data || [];
  const pagination = data?.pagination;

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.destination.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Delete this trip?')) {
      try {
        await deleteTrip.mutateAsync(id);
        toast.success('Trip deleted');
        setSelectedTrip(null);
      } catch {
        toast.error('Failed to delete trip');
      }
    }
  };

  const handleStatusUpdate = async () => {
    if (!editingTrip || !editStatus) return;
    try {
      await updateTrip.mutateAsync({
        id: editingTrip._id,
        payload: { status: editStatus as any },
      });
      setEditingTrip(null);
      setEditStatus('');
      toast.success('Trip updated');
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
                      onClick={() => {
                        setEditingTrip(trip);
                        setEditStatus(trip.status);
                      }}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(trip._id)}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
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
      <AnimatePresence>
        {selectedTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTrip(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-900">{selectedTrip.destination}</h2>
                <button onClick={() => setSelectedTrip(null)} className="text-slate-500 hover:text-slate-700">
                  <X size={24} />
                </button>
              </div>

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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Status Modal */}
      <AnimatePresence>
        {editingTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditingTrip(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-md w-full p-6"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">Update Trip Status</h2>

              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 mb-4"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingTrip(null)}
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  disabled={updateTrip.isPending}
                  className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 transition-colors"
                >
                  {updateTrip.isPending ? 'Saving...' : 'Save'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
