'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Copy,
  Trash2,
  Plus,
  History,
  X,
  Sparkles,
  Crown,
  Bot,
  User,
  Clock,
  Loader2,
} from 'lucide-react';
import {
  useAIChatHistory,
  useSendChatMessage,
  useDeleteChatHistory,
  useClearAllChatHistory,
} from '@/hooks/useAIChatHistory';
import ConfirmDialog from '@/components/ConfirmDialog';
import { toast } from 'sonner';
import { AIHistoryItem } from '@/types';

const SUGGESTED_PROMPTS = [
  { icon: '🏝️', label: 'Plan a 5-day trip to Bali' },
  { icon: '💑', label: 'Best places for honeymoon' },
  { icon: '💰', label: 'Budget trip to Thailand' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family vacation ideas' },
  { icon: '🗺️', label: 'Hidden gems in Europe' },
  { icon: '🌄', label: 'Adventure travel destinations' },
];

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

type MessageRole = 'user' | 'assistant';

interface LocalMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export default function AIChatPage() {
  const [currentMessages, setCurrentMessages] = useState<LocalMessage[]>([]);
  const [currentHistoryId, setCurrentHistoryId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [deletingChat, setDeletingChat] = useState<AIHistoryItem | null>(null);
  const [showClearAll, setShowClearAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: chatHistories = [], isLoading: historyLoading } =
    useAIChatHistory();
  const sendMessage = useSendChatMessage();
  const deleteHistory = useDeleteChatHistory();
  const clearHistory = useClearAllChatHistory();

  const chatItems = Array.isArray(chatHistories)
    ? chatHistories.filter((item) => item.type === 'chat')
    : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus();
    }
  }, [isTyping]);

  const handleSendMessage = async (text: string = message) => {
    if (!text.trim() || isTyping) return;

    const userMessage: LocalMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setCurrentMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    try {
      const response = await sendMessage.mutateAsync({
        conversationId: currentHistoryId,
        message: text,
      });

      const aiMessage: LocalMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setCurrentMessages((prev) => [...prev, aiMessage]);

      if (!currentHistoryId && response.conversationId) {
        setCurrentHistoryId(response.conversationId);
      }
    } catch {
      toast.error('Failed to send message');
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setCurrentMessages([]);
    setCurrentHistoryId(null);
    setMessage('');
    inputRef.current?.focus();
  };

  const handleSelectHistory = (history: AIHistoryItem) => {
    setCurrentHistoryId(null);
    const messages: LocalMessage[] = [
      {
        id: `${history._id}-user`,
        role: 'user',
        content: history.prompt,
        timestamp: new Date(history.createdAt),
      },
      {
        id: `${history._id}-assistant`,
        role: 'assistant',
        content: history.response,
        timestamp: new Date(history.createdAt),
      },
    ];
    setCurrentMessages(messages);
  };

  const handleConfirmDeleteChat = async () => {
    if (!deletingChat) return;
    try {
      await deleteHistory.mutateAsync(deletingChat._id);
      if (currentHistoryId === deletingChat._id) {
        handleNewChat();
      }
      setDeletingChat(null);
      toast.success('Conversation deleted');
    } catch {
      toast.error('Failed to delete conversation');
    }
  };

  const handleConfirmClearHistory = async () => {
    try {
      await clearHistory.mutateAsync();
      handleNewChat();
      setShowClearAll(false);
      toast.success('All conversations cleared');
    } catch {
      toast.error('Failed to clear conversations');
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-full flex bg-gradient-to-br from-slate-50 via-white to-slate-50/80"
    >
      {/* Sidebar */}
      <motion.div
        variants={itemVariants}
        className={`${
          sidebarOpen ? 'w-72' : 'w-0 md:w-0'
        } transition-all duration-300 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 overflow-hidden flex flex-col shadow-lg`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200/60 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-slate-900">Chat History</span>
            <span className="ml-auto text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {chatItems.length}
            </span>
          </div>
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-300 font-medium text-sm"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-3">
          {historyLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : chatItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <History size={28} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                No conversations yet
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {chatItems.map((history) => (
                <motion.div
                  key={history._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                    currentHistoryId === history._id
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm'
                      : 'hover:bg-slate-50/80'
                  }`}
                  onClick={() => handleSelectHistory(history)}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={14} className="text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">
                        {history.prompt || 'Conversation'}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Clock size={12} className="text-slate-400" />
                        <p className="text-xs text-slate-400">
                          {new Date(history.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingChat(history);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={14} className="text-red-500" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        {chatItems.length > 0 && (
          <div className="p-3 border-t border-slate-200/60">
            <button
              onClick={() => setShowClearAll(true)}
              className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Clear All History
            </button>
          </div>
        )}
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-xl transition-all"
              >
                {sidebarOpen ? <X size={20} /> : <MessageCircle size={20} />}
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-lg opacity-30" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">
                    AI Travel Assistant
                  </h1>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online • Ready to help
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 px-3 py-1.5 rounded-full border border-amber-200/30">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] font-medium text-amber-700">
                Premium AI
              </span>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <motion.div
          variants={itemVariants}
          className="flex-1 overflow-y-auto p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            {currentMessages.length === 0 && !isTyping ? (
              <EmptyState onSelectPrompt={handleSendMessage} />
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {currentMessages.map((msg) => (
                    <ChatMessageBubble
                      key={msg.id}
                      message={msg}
                      onCopy={handleCopyMessage}
                    />
                  ))}
                </AnimatePresence>

                {isTyping && <TypingIndicator />}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </motion.div>

        {/* Input Area */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-xl border-t border-slate-200/60 p-4 md:p-6 shadow-lg"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything about travel..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200/60 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                  disabled={isTyping}
                />
                {message.length > 0 && (
                  <button
                    onClick={() => setMessage('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-lg transition-all"
                  >
                    <X size={16} className="text-slate-400" />
                  </button>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSendMessage()}
                disabled={isTyping || !message.trim()}
                className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2 font-medium"
              >
                <span className="hidden sm:inline">Send</span>
                <Send size={18} />
              </motion.button>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              Press Enter to send • AI may make mistakes
            </p>
          </div>
        </motion.div>
      </div>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={!!deletingChat}
        onClose={() => setDeletingChat(null)}
        onConfirm={handleConfirmDeleteChat}
        isLoading={deleteHistory.isPending}
        title="Delete Conversation"
        message="Are you sure you want to delete this conversation?"
        confirmLabel="Delete"
        itemDetails={
          deletingChat && (
            <div className="space-y-1.5">
              <p className="font-semibold text-slate-900 line-clamp-2">
                {deletingChat.prompt || 'Conversation'}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(deletingChat.createdAt).toLocaleDateString()}
              </p>
            </div>
          )
        }
      />

      <ConfirmDialog
        open={showClearAll}
        onClose={() => setShowClearAll(false)}
        onConfirm={handleConfirmClearHistory}
        isLoading={clearHistory.isPending}
        title="Clear All Conversations"
        message={
          <>
            This will permanently delete all{' '}
            <span className="font-semibold text-slate-900">
              {chatItems.length}
            </span>{' '}
            conversations.
          </>
        }
        confirmLabel="Clear All"
      />
    </motion.div>
  );
}

interface ChatMessageBubbleProps {
  message: LocalMessage;
  onCopy: (content: string) => void;
}

function ChatMessageBubble({ message, onCopy }: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20'
            : 'bg-white border border-slate-200/60 text-slate-900 group relative shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {!isUser && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={() => onCopy(message.content)}
            className="absolute top-2 right-2 p-1.5 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
            title="Copy message"
          >
            <Copy size={14} className="text-slate-400 hover:text-slate-600" />
          </motion.button>
        )}

        <p
          className={`text-[10px] mt-2 ${isUser ? 'text-white/60' : 'text-slate-400'}`}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {isUser && (
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-slate-600" />
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
        <Bot className="w-4 h-4 text-white" />
      </div>

      <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface EmptyStateProps {
  onSelectPrompt: (prompt: string) => void;
}

function EmptyState({ onSelectPrompt }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
        className="relative w-20 h-20 mx-auto mb-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-2xl" />
        <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Start a Conversation
      </h2>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Ask me anything about travel planning and I'll help you out!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <motion.button
            key={prompt.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.08 }}
            onClick={() => onSelectPrompt(prompt.label)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl border border-slate-200/60 transition-all duration-300 group"
          >
            <span className="text-xl">{prompt.icon}</span>
            <span className="group-hover:text-blue-600 transition-colors">
              {prompt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
