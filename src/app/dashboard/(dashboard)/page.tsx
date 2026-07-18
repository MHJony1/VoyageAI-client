'use client';

import { motion } from 'framer-motion';
import { Backpack, MapPin, Star, Zap } from 'lucide-react';

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

const stats = [
  { icon: Backpack, label: 'Total Trips', value: '12', color: 'bg-blue-100 text-blue-600' },
  { icon: MapPin, label: 'Destinations Visited', value: '28', color: 'bg-green-100 text-green-600' },
  { icon: Star, label: 'Reviews Written', value: '15', color: 'bg-yellow-100 text-yellow-600' },
  { icon: Zap, label: 'AI Requests', value: '47', color: 'bg-purple-100 text-purple-600' },
];

export default function DashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
        <p className="text-slate-600 mt-2">Here's an overview of your travel activity</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} />
              </div>
              <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Trips</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">Bali Adventure</p>
                  <p className="text-xs text-slate-500">5 days • 2 weeks ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-900 font-medium transition-colors">
              Plan a New Trip
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-900 font-medium transition-colors">
              Get Recommendations
            </button>
            <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-900 font-medium transition-colors">
              View My Reviews
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
