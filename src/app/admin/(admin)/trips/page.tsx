'use client';

import { useState } from 'react';
import { Trash2, Eye } from 'lucide-react';
import { useAdminTrips, useDeleteTrip } from '@/hooks/useAdmin';
import {
  AdminPageHeader,
  AdminSearchBar,
  AdminPagination,
  AdminTable,
  Badge,
} from '@/components/admin/AdminUI';
import Modal from '@/components/Modal';
import ConfirmDialog from '@/components/ConfirmDialog';
import Select from '@/components/Select';
import { TableSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { AdminTrip } from '@/types/admin';

const STATUS_OPTIONS = [
  { value: 'saved', label: 'Saved' },
  { value: 'planned', label: 'Planned' },
  { value: 'completed', label: 'Completed' },
];

export default function AdminTripsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const search = useDebouncedValue(searchInput, 400);
  const [status, setStatus] = useState('');
  const [viewTrip, setViewTrip] = useState<AdminTrip | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminTrip | null>(null);

  const { data, isLoading, isError, refetch } = useAdminTrips({
    page,
    limit: 10,
    search,
    status: status || undefined,
  });

  const deleteMut = useDeleteTrip();

  const trips = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget._id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <AdminPageHeader title="Trips" description="View and manage user trips" />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v);
            setPage(1);
          }}
          placeholder="Search by destination..."
          className="flex-1"
        />
        <Select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          options={STATUS_OPTIONS}
          className="sm:w-44"
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load trips." onRetry={() => refetch()} />
      ) : trips.length === 0 ? (
        <EmptyState icon="map" title="No trips found" description="Try adjusting your filters." />
      ) : (
        <AdminTable>
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Destination</th>
              <th className="text-left font-semibold px-4 py-3">User</th>
              <th className="text-left font-semibold px-4 py-3">Days</th>
              <th className="text-left font-semibold px-4 py-3">Budget</th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-right font-semibold px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {trips.map((t) => (
              <tr key={t._id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 font-medium text-slate-800">{t.destination}</td>
                <td className="px-4 py-3 text-slate-600">
                  {t.user ? (
                    <div>
                      <p>{t.user.name}</p>
                      <p className="text-xs text-slate-400">{t.user.email}</p>
                    </div>
                  ) : (
                    <span className="text-slate-400">Deleted user</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">{t.days}</td>
                <td className="px-4 py-3 text-slate-600">${t.budget}</td>
                <td className="px-4 py-3">
                  <Badge color="sky">{t.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => setViewTrip(t)}
                      title="View"
                      className="p-2 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(t)}
                      title="Delete"
                      className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      )}

      <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        open={!!viewTrip}
        onClose={() => setViewTrip(null)}
        title={viewTrip?.destination}
        description={viewTrip?.user?.name ? `Planned by ${viewTrip.user.name}` : undefined}
        size="lg"
      >
        {viewTrip && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Days</p>
                <p className="font-semibold text-slate-800">{viewTrip.days}</p>
              </div>
              <div>
                <p className="text-slate-400">Budget</p>
                <p className="font-semibold text-slate-800">${viewTrip.budget}</p>
              </div>
              <div>
                <p className="text-slate-400">Est. Cost</p>
                <p className="font-semibold text-slate-800">${viewTrip.estimatedCost}</p>
              </div>
              <div>
                <p className="text-slate-400">Style</p>
                <p className="font-semibold text-slate-800 capitalize">{viewTrip.travelStyle}</p>
              </div>
            </div>
            {viewTrip.interests?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {viewTrip.interests.map((i) => (
                  <Badge key={i} color="indigo">
                    {i}
                  </Badge>
                ))}
              </div>
            )}
            <div>
              <p className="text-slate-400 text-sm mb-1">Itinerary</p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap max-h-80 overflow-y-auto">
                {viewTrip.itinerary}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Trip"
        message="Are you sure you want to delete this trip?"
        itemDetails={deleteTarget ? <span className="font-medium">{deleteTarget.destination}</span> : null}
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
