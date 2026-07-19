'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Copy,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Crown,
  Clock,
  Filter,
  MessageCircle,
  Compass,
} from 'lucide-react';
import {
  useAIChatHistory,
  useDeleteChatHistory,
  useClearAllChatHistory,
} from '@/hooks/useAIChatHistory';
import { Skeleton } from '@/components/Loading';
import ConfirmDialog from '@/components/ConfirmDialog';
import { toast } from 'sonner';
import { AIHistoryItem } from '@/types';

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

const AI_TYPE_COLORS: Record<
  string,
  { bg: string; text: string; border: string; icon: any; label: string }
> = {
  planner: {
    bg: 'bg-gradient-to-r from-blue-50 to-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    icon: Compass,
    label: 'Trip Plan',
  },
  recommendation: {
    bg: 'bg-gradient-to-r from-purple-50 to-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
    icon: Sparkles,
    label: 'Recommendation',
  },
  chat: {
    bg: 'bg-gradient-to-r from-sky-50 to-sky-100',
    text: 'text-sky-700',
    border: 'border-sky-200',
    icon: MessageCircle,
    label: 'Chat',
  },
};

const TYPE_FILTERS = [
  { value: 'all', label: 'All Types' },
  { value: 'planner', label: 'Trip Plans' },
  { value: 'recommendation', label: 'Recommendations' },
  { value: 'chat', label: 'Chats' },
];

export default function AIHistoryPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<AIHistoryItem | null>(null);
  const [page, setPage] = useState(1);
  const [deletingItem, setDeletingItem] = useState<AIHistoryItem | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: histories = [], isLoading } = useAIChatHistory();
  const deleteHistory = useDeleteChatHistory();
  const clearHistory = useClearAllChatHistory();

  const items = Array.isArray(histories) ? histories : [];

  const filteredHistories = items.filter((item) => {
    const matchesSearch =
      item.prompt?.toLowerCase().includes(search.toLowerCase()) ||
      item.response?.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const ITEMS_PER_PAGE = 8;
  const paginatedItems = filteredHistories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const totalPages = Math.ceil(filteredHistories.length / ITEMS_PER_PAGE);

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    try {
      await deleteHistory.mutateAsync(deletingItem._id);
      setDeletingItem(null);
      setSelectedItem(null);
      toast.success('History item deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleConfirmClearAll = async () => {
    try {
      await clearHistory.mutateAsync();
      setShowClearAll(false);
      setPage(1);
      toast.success('All history cleared');
    } catch {
      toast.error('Failed to clear history');
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const getTypeColors = (type: string) => {
    return AI_TYPE_COLORS[type] || AI_TYPE_COLORS.chat;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-6xl mx-auto"
    >
      {/* Premium Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 rounded-2xl blur-xl opacity-30" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                <History className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                AI History
              </h1>
              <p className="text-slate-500 flex items-center gap-2">
                <span>View your past AI interactions</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span className="text-sm font-medium text-slate-700">
                  {filteredHistories.length} entries
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {items.length > 0 && (
              <button
                onClick={() => setShowClearAll(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 text-sm font-medium border border-red-200/50 hover:border-red-300/50"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 px-4 py-2 rounded-full border border-amber-200/30">
              <Crown className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-amber-700">
                Premium History
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Premium Filters */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search history..."
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
            {/* Desktop Type Filter */}
            <div className="hidden md:flex items-center gap-2">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setPage(1);
                }}
                className="px-4 py-3 bg-white border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-700 text-sm shadow-sm min-w-[140px]"
              >
                {TYPE_FILTERS.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
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
              <span className="text-sm text-slate-700">Filter</span>
              {typeFilter !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </button>

            {/* Mobile Filter Dropdown */}
            {isFilterOpen && (
              <div className="md:hidden absolute mt-2 right-0 w-48 bg-white border border-slate-200/60 rounded-xl shadow-lg z-10 p-2">
                {TYPE_FILTERS.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => {
                      setTypeFilter(filter.value);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      typeFilter === filter.value
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* History List */}
      <motion.div variants={itemVariants}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200/60 p-4"
              >
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">📜</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No history yet
            </h3>
            <p className="text-slate-500">
              Your AI interactions will appear here
            </p>
          </div>
        ) : filteredHistories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No results found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((history) => {
                const colors = getTypeColors(history.type);
                const Icon = colors.icon;

                return (
                  <motion.div
                    key={history._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedItem(history)}
                    className="bg-white rounded-xl border border-slate-200/60 p-5 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={18} className={colors.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
                          >
                            {colors.label}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <Clock size={10} />
                            {new Date(history.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="font-medium text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {history.prompt || 'Request'}
                        </h3>
                        {history.response && (
                          <p className="text-sm text-slate-500 line-clamp-2">
                            {history.response}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-1.5 mt-3 pt-3 border-t border-slate-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (history.prompt) handleCopy(history.prompt);
                        }}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Copy prompt"
                      >
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingItem(history);
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
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
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-xl transition-all border border-slate-200/60"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Detail Modal - Premium */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl ${getTypeColors(selectedItem.type).bg} flex items-center justify-center`}
                  >
                    {(() => {
                      const colors = getTypeColors(selectedItem.type);
                      const Icon = colors.icon;
                      return <Icon size={18} className={colors.text} />;
                    })()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {getTypeColors(selectedItem.type).label}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {new Date(selectedItem.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1.5">
                    Prompt
                  </p>
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-100/30">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap break-words leading-relaxed">
                      {selectedItem.prompt}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1.5">
                    Response
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap break-words leading-relaxed">
                      {selectedItem.response}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() =>
                    handleCopy(
                      `Prompt: ${selectedItem.prompt}\n\nResponse: ${selectedItem.response}`,
                    )
                  }
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-50 to-sky-50 hover:from-blue-100 hover:to-sky-100 text-blue-700 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm border border-blue-200/30"
                >
                  <Copy size={16} />
                  Copy All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        isLoading={deleteHistory.isPending}
        title="Delete History Item"
        message="Are you sure you want to delete this AI history item?"
        confirmLabel="Delete Item"
        itemDetails={
          deletingItem && (
            <div className="space-y-1.5">
              <p className="font-semibold text-slate-900 line-clamp-2">
                {deletingItem.prompt || 'Request'}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span
                  className={`px-2 py-0.5 rounded-full ${getTypeColors(deletingItem.type).bg} ${getTypeColors(deletingItem.type).text}`}
                >
                  {getTypeColors(deletingItem.type).label}
                </span>
                <span>
                  {new Date(deletingItem.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )
        }
      />

      {/* Clear All Confirmation */}
      <ConfirmDialog
        open={showClearAll}
        onClose={() => setShowClearAll(false)}
        onConfirm={handleConfirmClearAll}
        isLoading={clearHistory.isPending}
        title="Clear All History"
        message={
          <>
            This will permanently delete all{' '}
            <span className="font-semibold text-slate-900">{items.length}</span>{' '}
            AI history items.
          </>
        }
        confirmLabel="Clear All"
      />
    </motion.div>
  );
}
