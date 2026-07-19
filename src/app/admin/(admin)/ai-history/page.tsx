'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAdminAIHistory } from '@/hooks/useAdmin';
import {
  AdminPageHeader,
  AdminSearchBar,
  AdminPagination,
  Badge,
} from '@/components/admin/AdminUI';
import Select from '@/components/Select';
import { TableSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const TYPE_OPTIONS = [
  { value: 'planner', label: 'Planner' },
  { value: 'recommendation', label: 'Recommendation' },
  { value: 'chat', label: 'Chat' },
];

const typeColor: Record<string, 'indigo' | 'sky' | 'amber'> = {
  planner: 'indigo',
  recommendation: 'sky',
  chat: 'amber',
};

export default function AdminAIHistoryPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const search = useDebouncedValue(searchInput, 400);
  const [type, setType] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useAdminAIHistory({
    page,
    limit: 10,
    search,
    type: type || undefined,
  });

  const items = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  return (
    <div>
      <AdminPageHeader title="AI History" description="Read-only log of all AI requests" />

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v);
            setPage(1);
          }}
          placeholder="Search prompt or response..."
          className="flex-1"
        />
        <Select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          options={TYPE_OPTIONS}
          className="sm:w-52"
        />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <ErrorState message="Failed to load AI history." onRetry={() => refetch()} />
      ) : items.length === 0 ? (
        <EmptyState icon="inbox" title="No AI history found" description="Try adjusting your filters." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = expanded === item._id;
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : item._id)}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Badge color={typeColor[item.type] || 'slate'}>{item.type}</Badge>
                    <span className="text-sm text-slate-700 truncate">{item.prompt}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:block text-xs text-slate-400">
                      {item.user?.name || 'Deleted user'}
                    </span>
                    {isOpen ? (
                      <ChevronUp size={16} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400" />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 border-t border-slate-100 pt-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Prompt</p>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-wrap">
                        {item.prompt}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase mb-1">Response</p>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-700 whitespace-pre-wrap max-h-72 overflow-y-auto">
                        {item.response}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      {item.user?.email} · {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AdminPagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
