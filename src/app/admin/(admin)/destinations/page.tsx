'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Star, Eye, EyeOff } from 'lucide-react';
import {
  useAdminDestinations,
  useCreateDestination,
  useUpdateDestination,
  useDeleteDestination,
  useToggleFeature,
  useTogglePublish,
} from '@/hooks/useAdmin';
import {
  AdminPageHeader,
  AdminSearchBar,
  AdminPagination,
  AdminTable,
  Badge,
} from '@/components/admin/AdminUI';
import DestinationFormModal from '@/components/admin/DestinationFormModal';
import ConfirmDialog from '@/components/ConfirmDialog';
import Button from '@/components/Button';
import Select from '@/components/Select';
import { TableSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { AdminDestination, DestinationFormValues } from '@/types/admin';

export default function AdminDestinationsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const search = useDebouncedValue(searchInput, 400);
  const [featured, setFeatured] = useState('');
  const [published, setPublished] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminDestination | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminDestination | null>(null);

  const { data, isLoading, isError, refetch } = useAdminDestinations({
    page,
    limit: 10,
    search,
    featured: featured || undefined,
    published: published || undefined,
  });

  const createMut = useCreateDestination();
  const updateMut = useUpdateDestination();
  const deleteMut = useDeleteDestination();
  const featureMut = useToggleFeature();
  const publishMut = useTogglePublish();

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (d: AdminDestination) => {
    setEditing(d);
    setModalOpen(true);
  };

  const handleSubmit = (values: DestinationFormValues) => {
    if (editing) {
      updateMut.mutate(
        { id: editing._id, data: values },
        { onSuccess: () => setModalOpen(false) },
      );
    } else {
      createMut.mutate(values, { onSuccess: () => setModalOpen(false) });
    }
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget._id, { onSuccess: () => setDeleteTarget(null) });
  };

  const destinations = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div>
      <AdminPageHeader title="Destinations" description="Manage all travel destinations">
        <Button onClick={openCreate}>
          <Plus size={18} />
          New
        </Button>
      </AdminPageHeader>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v);
            setPage(1);
          }}
          placeholder="Search title, country, category..."
          className="flex-1"
        />
        <Select
          value={featured}
          onChange={(e) => {
            setFeatured(e.target.value);
            setPage(1);
          }}
          options={[
            { value: 'true', label: 'Featured' },
            { value: 'false', label: 'Not featured' },
          ]}
          className="sm:w-44"
        />
        <Select
          value={published}
          onChange={(e) => {
            setPublished(e.target.value);
            setPage(1);
          }}
          options={[
            { value: 'true', label: 'Published' },
            { value: 'false', label: 'Unpublished' },
          ]}
          className="sm:w-44"
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load destinations." onRetry={() => refetch()} />
      ) : destinations.length === 0 ? (
        <EmptyState
          icon="map"
          title="No destinations found"
          description="Create your first destination to get started."
          action={{ label: 'New Destination', onClick: openCreate }}
        />
      ) : (
        <AdminTable>
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left font-semibold px-4 py-3">Destination</th>
              <th className="text-left font-semibold px-4 py-3">Country</th>
              <th className="text-left font-semibold px-4 py-3">Category</th>
              <th className="text-left font-semibold px-4 py-3">Budget</th>
              <th className="text-left font-semibold px-4 py-3">Status</th>
              <th className="text-right font-semibold px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {destinations.map((d) => (
              <tr key={d._id} className="hover:bg-slate-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200">
                      <Image
                        src={d.thumbnail}
                        alt={d.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{d.title}</p>
                      <p className="text-xs text-slate-400">{d.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{d.country}</td>
                <td className="px-4 py-3 text-slate-600 capitalize">{d.category}</td>
                <td className="px-4 py-3 text-slate-600">${d.estimatedBudget}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge color={d.published ? 'green' : 'slate'}>
                      {d.published ? 'Published' : 'Draft'}
                    </Badge>
                    {d.featured && <Badge color="amber">Featured</Badge>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => featureMut.mutate(d._id)}
                      title={d.featured ? 'Unfeature' : 'Feature'}
                      className={`p-2 rounded-lg transition-colors ${
                        d.featured
                          ? 'text-amber-500 hover:bg-amber-50'
                          : 'text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <Star size={16} fill={d.featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => publishMut.mutate(d._id)}
                      title={d.published ? 'Unpublish' : 'Publish'}
                      className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
                    >
                      {d.published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    <button
                      onClick={() => openEdit(d)}
                      title="Edit"
                      className="p-2 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(d)}
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

      <DestinationFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        destination={editing}
        onSubmit={handleSubmit}
        isSubmitting={createMut.isPending || updateMut.isPending}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Destination"
        message="Are you sure you want to delete this destination?"
        itemDetails={deleteTarget ? <span className="font-medium">{deleteTarget.title}</span> : null}
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
