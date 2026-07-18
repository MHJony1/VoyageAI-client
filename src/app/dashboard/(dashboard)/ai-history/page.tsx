'use client';

import { motion } from 'framer-motion';
import { History, Clock } from 'lucide-react';

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

const historyItems = [
  { id: 1, type: 'Trip Plan', destination: 'Tokyo, Japan', date: '2 hours ago' },
  { id: 2, type: 'Recommendation', destination: 'Paris, France', date: 'Yesterday' },
  { id: 3, type: 'Chat', destination: 'Budget travel tips', date: '3 days ago' },
  { id: 4, type: 'Trip Plan', destination: 'New York, USA', date: '1 week ago' },
];

export default function AIHistoryPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <History className="text-orange-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AI Request History</h1>
        </div>
        <p className="text-slate-600">View your past AI interactions</p>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-200">
          {historyItems.map((item) => (
            <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{item.type}</p>
                  <p className="text-sm text-slate-600 mt-1">{item.destination}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={16} />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
