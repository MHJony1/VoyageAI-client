'use client';

import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

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

export default function AIPlannerPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Wand2 className="text-blue-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AI Trip Planner</h1>
        </div>
        <p className="text-slate-600">Let AI help you create the perfect travel itinerary</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Plan Your Trip</h2>
          <p className="text-slate-600">AI Planner interface coming soon...</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Tips</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Tell us your budget</li>
            <li>• Specify duration</li>
            <li>• Share your interests</li>
            <li>• Get custom itinerary</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
