'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

export default function AIChatPage() {
  const [message, setMessage] = useState('');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto h-full flex flex-col"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <MessageCircle className="text-purple-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AI Travel Assistant</h1>
        </div>
        <p className="text-slate-600">Chat with AI for travel advice and recommendations</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex-1 bg-white rounded-lg border border-slate-200 p-6 mb-4 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle size={16} className="text-sky-600" />
              </div>
              <div className="bg-slate-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-slate-900">Hi! I'm your AI travel assistant. How can I help you plan your next adventure?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about travel..."
            className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2">
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
