'use client';

import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';

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

export default function AIRecommendationPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Compass className="text-green-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">AI Recommendations</h1>
        </div>
        <p className="text-slate-600">Discover destinations tailored to your preferences</p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-primary rounded-lg mb-4" />
            <h3 className="font-semibold text-slate-900">Recommended Destination {i}</h3>
            <p className="text-sm text-slate-600 mt-2">Based on your interests and budget</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
