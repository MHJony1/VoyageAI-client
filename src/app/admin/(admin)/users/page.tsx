'use client';

import { useState } from 'react';
import { Trash2, ShieldCheck, Ban } from 'lucide-react';
import {
  useAdminUsers,
  useChangeRole,
  useSetBlocked,
  useDeleteUser,
} from '@/hooks/useAdmin';
import {
  AdminPageHeader,
  AdminSearchBar,
  AdminPagination,
  AdminTable,
  Badge,
} from '@/components/admin/AdminUI';
import ConfirmDialog from '@/components/ConfirmDialog';
import Select from '@/components/Select';
import ToggleSwitch from '@/components/ToggleSwitch';
import { TableSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/providers/AuthProvider';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import type { AdminUser } from '@/types/admin';

const ROLE_OPTIONS = [
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'admin', label: 'Admin' },
];

export default function AdminUsersPage() {
  const { user: current } = useAuth();
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const search = useDebouncedValue(searchInput, 400);
  const [role, setRole] = useState('');
  const [blocked, setBlocked] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const { data, isLoading, isError, refetch } = useAdminUsers({
    page,
    limit: 10,
    search,
    role: role || undefined,
    blocked: blocked || undefined,
  });

  const roleMut = useChangeRole();
  const blockMut = useSetBlocked();
  const deleteMut = useDeleteUser();

  const users = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteMut.mutate(deleteTarget._id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div>
      <AdminPageHeader title="Users" description="Manage platform users and roles" />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v);
            setPage(1);
          }}
          placeholder="Search name or email..."
          className="flex-1"
        />
        <Select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setPage(1);
          }}
          options={ROLE_OPTIONS}
          className="sm:w-44"
        />
        <Select
          value={blocked}
          onChange={(e) => {
            setBlocked(e.target.value);
            setPage(1);
          }}
          options={[
            { value: 'false', label: 'Active' },
            { value: 'true', label: 'Blocked' },
          ]}
          className="sm:w-40"
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load users." onRetry={() => refetch()} />
      ) : users.length === 0 ? (
        <EmptyState icon="inbox" title="No users found" description="Try adjusting your filters." />
      ) : (
        <AdminTable>
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="text-left font-semibold px-4 py-3">User</th>
              <th className="text-left font-semibold px-4 py-3">Provider</th>
              <th className="text-left font-semibold px-4 py-3">Role</th>
              <th className="text-left font-semibold px-4 py-3">Blocked</th>
              <th className="text-right font-semibold px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => {
              const isSelf = current?._id === u._id;
              return (
                <tr key={u._id} className="hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-semibold">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 flex items-center gap-2">
                          {u.name}
                          {isSelf && <Badge color="indigo">You</Badge>}
                        </p>
                        <p className="text-xs text-slate-400">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 capitalize">{u.provider}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={u.role}
                      onChange={(e) => roleMut.mutate({ id: u._id, role: e.target.value })}
                      options={ROLE_OPTIONS}
                      disabled={isSelf}
                      className="!py-1.5 text-sm w-36"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <ToggleSwitch
                      checked={u.blocked}
                      onCheckedChange={(v) => blockMut.mutate({ id: u._id, blocked: v })}
                      disabled={isSelf}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <span className="hidden sm:inline text-slate-300">
                        {u.role === 'admin' ? (
                          <ShieldCheck size={16} className="text-indigo-400" />
                        ) : u.blocked ? (
                          <Ban size={16} className="text-red-400" />
                        ) : null}
                      </span>
                      <button
                        onClick={() => setDeleteTarget(u)}
                        disabled={isSelf}
                        title="Delete user"
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </AdminTable>
      )}

      <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        message="This will permanently delete the user and all their trips, reviews and AI history."
        itemDetails={
          deleteTarget ? (
            <div>
              <p className="font-medium">{deleteTarget.name}</p>
              <p className="text-slate-500">{deleteTarget.email}</p>
            </div>
          ) : null
        }
        isLoading={deleteMut.isPending}
      />
    </div>
  );
}
