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
} from 'lucide-react';
import { useAIChatHistory, useSendChatMessage, useDeleteChatHistory, useClearAllChatHistory } from '@/hooks/useAIChatHistory';
import { LoadingSpinner } from '@/components/Loading';
import { toast } from 'sonner';
import { ChatHistory } from '@/types';

const SUGGESTED_PROMPTS = [
  'Plan a 5-day trip to Bali',
  'Best places for honeymoon',
  'Budget trip to Thailand',
  'Family vacation ideas',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
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

  const { data: chatHistories = [], isLoading: historyLoading } = useAIChatHistory();
  const sendMessage = useSendChatMessage();
  const deleteHistory = useDeleteChatHistory();
  const clearHistory = useClearAllChatHistory();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const handleSendMessage = async (text: string = message) => {
    if (!text.trim()) return;

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
        historyId: currentHistoryId,
        message: text,
      });

      const aiMessage: LocalMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
      };

      setCurrentMessages((prev) => [...prev, aiMessage]);

      if (!currentHistoryId && response._id) {
        setCurrentHistoryId(response._id);
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
  };

  const handleSelectHistory = (history: ChatHistory) => {
    setCurrentHistoryId(history._id);
    const messages: LocalMessage[] = history.messages.map((msg) => ({
      id: msg._id,
      role: msg.role,
      content: msg.content,
      timestamp: new Date(msg.createdAt),
    }));
    setCurrentMessages(messages);
  };

  const handleDeleteHistory = async (historyId: string) => {
    try {
      await deleteHistory.mutateAsync(historyId);
      if (currentHistoryId === historyId) {
        handleNewChat();
      }
      toast.success('Conversation deleted');
    } catch {
      toast.error('Failed to delete conversation');
    }
  };

  const handleClearHistory = async () => {
    try {
      await clearHistory.mutateAsync();
      handleNewChat();
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
      className="h-full flex bg-slate-50"
    >
      {/* Sidebar */}
      <motion.div
        variants={itemVariants}
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } transition-all duration-300 bg-white border-r border-slate-200 overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b border-slate-200">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {historyLoading ? (
            <div className="flex items-center justify-center h-full">
              <LoadingSpinner className="h-8" />
            </div>
          ) : chatHistories.length === 0 ? (
            <div className="p-4 text-center">
              <History size={32} className="text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No conversations yet</p>
            </div>
          ) : (
            <div className="p-2">
              {chatHistories.map((history) => (
                <motion.div
                  key={history._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors group ${
                    currentHistoryId === history._id
                      ? 'bg-sky-100 text-sky-700'
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={() => handleSelectHistory(history)}
                >
                  <p className="text-sm font-medium truncate">
                    {history.title || 'Conversation'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(history.createdAt).toLocaleDateString()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteHistory(history._id);
                    }}
                    className="hidden group-hover:block mt-2 p-1 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={14} className="text-red-600" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {chatHistories.length > 0 && (
          <div className="p-2 border-t border-slate-200">
            <button
              onClick={handleClearHistory}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Clear All History
            </button>
          </div>
        )}
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.div variants={itemVariants} className="bg-white border-b border-slate-200 p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
              >
                {sidebarOpen ? <X size={20} /> : <MessageCircle size={20} />}
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="text-purple-600" size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-900">AI Travel Assistant</h1>
                  <p className="text-xs text-slate-500">Chat for travel advice</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Messages Area */}
        <motion.div variants={itemVariants} className="flex-1 overflow-y-auto p-4 md:p-6">
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
        <motion.div variants={itemVariants} className="bg-white border-t border-slate-200 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <input
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
                className="flex-1 px-4 py-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isTyping || !message.trim()}
                className="px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle size={16} className="text-sky-600" />
        </div>
      )}

      <div
        className={`max-w-lg rounded-lg p-4 ${
          isUser
            ? 'bg-sky-600 text-white'
            : 'bg-slate-100 text-slate-900 group relative'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>

        {!isUser && (
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            onClick={() => onCopy(message.content)}
            className="absolute top-2 right-2 p-1 hover:bg-slate-200 rounded transition-colors"
            title="Copy message"
          >
            <Copy size={14} className="text-slate-600" />
          </motion.button>
        )}

        <p className="text-xs mt-2 opacity-70">
          {message.timestamp.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
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
      <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
        <MessageCircle size={16} className="text-sky-600" />
      </div>

      <div className="bg-slate-100 rounded-lg p-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-slate-400 rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
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
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
      >
        <MessageCircle className="text-purple-600" size={32} />
      </motion.div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        Start a Conversation
      </h2>
      <p className="text-slate-600 mb-8">
        Ask me anything about travel planning and I'll help you out!
      </p>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-600 mb-4">
          Try these suggestions:
        </p>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            onClick={() => onSelectPrompt(prompt)}
            className="block w-full px-4 py-3 text-sm text-sky-600 hover:bg-sky-50 rounded-lg border border-sky-200 transition-colors"
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
