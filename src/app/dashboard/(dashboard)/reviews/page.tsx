'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

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

const reviews = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    rating: 5,
    text: 'Amazing beaches and friendly locals. Highly recommended!',
    date: '2 weeks ago',
  },
  {
    id: 2,
    destination: 'Paris, France',
    rating: 4,
    text: 'Beautiful city, great food. A bit crowded during peak season.',
    date: '1 month ago',
  },
  {
    id: 3,
    destination: 'Tokyo, Japan',
    rating: 5,
    text: 'Perfect blend of tradition and modernity. Must visit!',
    date: '2 months ago',
  },
];

export default function ReviewsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">My Reviews</h1>
            </div>
            <p className="text-slate-600">Share your travel experiences</p>
          </div>
          <button className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
            Write Review
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900">{review.destination}</h3>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}
                  />
                ))}
              </div>
            </div>
            <p className="text-slate-600">{review.text}</p>
            <p className="text-xs text-slate-500 mt-3">{review.date}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
