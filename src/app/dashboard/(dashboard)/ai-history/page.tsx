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
} from 'lucide-react';
import { useAIChatHistory, useDeleteChatHistory, useClearAllChatHistory } from '@/hooks/useAIChatHistory';
import { Skeleton } from '@/components/Loading';
import EmptyState from '@/components/EmptyState';
import ConfirmDialog from '@/components/ConfirmDialog';
import { toast } from 'sonner';
import { AIHistoryItem } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const AI_TYPE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  planner: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Trip Plan' },
  recommendation: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Recommendation' },
  chat: { bg: 'bg-sky-100', text: 'text-sky-700', label: 'Chat' },
};

export default function AIHistoryPage() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<AIHistoryItem | null>(null);
  const [page, setPage] = useState(1);
  const [deletingItem, setDeletingItem] = useState<AIHistoryItem | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);

  const { data: histories = [], isLoading } = useAIChatHistory();
  const deleteHistory = useDeleteChatHistory();
  const clearHistory = useClearAllChatHistory();

  const items = Array.isArray(histories) ? histories : [];

  const filteredHistories = items.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.prompt?.toLowerCase().includes(term) ||
      item.response?.toLowerCase().includes(term)
    );
  });

  const ITEMS_PER_PAGE = 10;
  const paginatedItems = filteredHistories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <History className="text-orange-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">AI Request History</h1>
              <p className="text-slate-600">View your past AI interactions</p>
            </div>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => setShowClearAll(true)}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>
      </motion.div>

      {/* Search */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search history..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </motion.div>

      {/* History List */}
      <motion.div variants={itemVariants}>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <EmptyState title="No history" description="Your AI interactions will appear here" />
        ) : filteredHistories.length === 0 ? (
          <EmptyState title="No results" description="Try a different search" />
        ) : (
          <>
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {paginatedItems.map((history) => {
                  const colors = AI_TYPE_COLORS[history.type] || AI_TYPE_COLORS.chat;

                  return (
                    <motion.div
                      key={history._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      onClick={() => setSelectedItem(history)}
                      className="p-4 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                              {colors.label}
                            </span>
                            <span className="text-xs text-slate-500">
                              {new Date(history.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-medium text-slate-900 mb-1 line-clamp-1">
                            {history.prompt || 'Request'}
                          </h3>
                          {history.response && (
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {history.response}
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (history.prompt) handleCopy(history.prompt);
                            }}
                            className="p-2 hover:bg-slate-200 rounded transition-colors"
                            title="Copy prompt"
                          >
                            <Copy size={16} className="text-slate-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingItem(history);
                            }}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div variants={itemVariants} className="mt-6 flex justify-center items-center gap-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm text-slate-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}
          </>
        )}
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  {(AI_TYPE_COLORS[selectedItem.type] || AI_TYPE_COLORS.chat).label}
                </h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Prompt</p>
                  <div className="bg-sky-50 rounded-lg p-3">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap break-words">
                      {selectedItem.prompt}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Response</p>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <p className="text-sm text-slate-900 whitespace-pre-wrap break-words">
                      {selectedItem.response}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400">
                  {new Date(selectedItem.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <button
                  onClick={() =>
                    handleCopy(
                      `Prompt: ${selectedItem.prompt}\n\nResponse: ${selectedItem.response}`
                    )
                  }
                  className="w-full px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Copy size={16} />
                  Copy
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Item Confirmation */}
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
              <p className="text-xs text-slate-500">
                {(AI_TYPE_COLORS[deletingItem.type] || AI_TYPE_COLORS.chat).label} ·{' '}
                {new Date(deletingItem.createdAt).toLocaleDateString()}
              </p>
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
            <span className="font-semibold text-slate-900">{items.length}</span> AI history
            items.
          </>
        }
        confirmLabel="Clear All"
      />
    </motion.div>
  );
}
