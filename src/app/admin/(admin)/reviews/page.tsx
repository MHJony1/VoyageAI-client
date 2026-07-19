'use client';

import { useState } from 'react';
import { Trash2, Star } from 'lucide-react';
import { useAdminReviews, useDeleteReview } from '@/hooks/useAdmin';
import {
  AdminPageHeader,
  AdminSearchBar,
  AdminPagination,
  AdminTable,
} from '@/components/admin/AdminUI';
import ConfirmDialog from '@/components/ConfirmDialog';
import { TableSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { AdminReview } from '@/types/admin';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'text-amber-400' : 'text-slate-200'}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const search = useDebouncedValue(searchInput, 400);
  const [deleteTarget, setDeleteTarget] = useState<AdminReview | null>(null);

  const { data, isLoading, isError, refetch } = useAdminReviews({ page, limit: 10, search });
  const deleteMut = useDeleteReview();

  const reviews = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget._id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <AdminPageHeader title="Reviews" description="Moderate destination reviews" />

      <AdminSearchBar
        value={searchInput}
        onChange={(v) => {
          setSearchInput(v);
          setPage(1);
        }}
        placeholder="Search review text..."
        className="mb-4"
      />

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load reviews." onRetry={() => refetch()} />
      ) : reviews.length === 0 ? (
        <EmptyState icon="inbox" title="No reviews found" description="Try adjusting your search." />
      ) : (
        <AdminTable>
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left font-semibold px-4 py-3">User</th>
              <th className="text-left font-semibold px-4 py-3">Destination</th>
              <th className="text-left font-semibold px-4 py-3">Rating</th>
              <th className="text-left font-semibold px-4 py-3">Comment</th>
              <th className="text-right font-semibold px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((r) => (
              <tr key={r._id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3 text-slate-600">
                  {r.user ? (
                    <div>
                      <p className="font-medium text-slate-800">{r.user.name}</p>
                      <p className="text-xs text-slate-400">{r.user.email}</p>
                    </div>
                  ) : (
                    <span className="text-slate-400">Deleted user</span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-600">
                  {r.destination ? r.destination.title : <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <Stars rating={r.rating} />
                </td>
                <td className="px-4 py-3 text-slate-600 max-w-xs">
                  <p className="line-clamp-2">{r.comment}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => setDeleteTarget(r)}
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

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Review"
        message="Deleting this review will recalculate the destination's average rating."
        itemDetails={
          deleteTarget ? <span className="italic text-slate-600">“{deleteTarget.comment}”</span> : null
        }
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
