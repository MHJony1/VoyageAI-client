'use client';

import { motion } from 'framer-motion';
import { Backpack, MapPin, Calendar } from 'lucide-react';

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

const trips = [
  {
    id: 1,
    title: 'Bali Beach Getaway',
    destination: 'Bali, Indonesia',
    date: 'Mar 15 - Mar 22, 2024',
    days: 7,
  },
  {
    id: 2,
    title: 'European Adventure',
    destination: 'Paris, France',
    date: 'Apr 1 - Apr 15, 2024',
    days: 14,
  },
  {
    id: 3,
    title: 'Mountain Trekking',
    destination: 'Swiss Alps',
    date: 'May 10 - May 18, 2024',
    days: 8,
  },
];

export default function MyTripsPage() {
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
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Backpack className="text-blue-600" size={24} />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">My Trips</h1>
            </div>
            <p className="text-slate-600">Manage your travel plans</p>
          </div>
          <button className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
            Plan New Trip
          </button>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-primary rounded-lg mb-4" />
            <h3 className="font-semibold text-slate-900 text-lg">{trip.title}</h3>
            <div className="space-y-2 mt-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{trip.date}</span>
              </div>
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-900 font-medium transition-colors">
              View Details
            </button>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
