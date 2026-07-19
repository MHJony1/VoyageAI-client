'use client';

import { motion } from 'framer-motion';
import { GridSkeleton } from '@/components/Loading';
import DestinationCard from '@/components/explore/DestinationCard';
import { Destination } from '@/types';

interface RelatedDestinationsProps {
  destinations: Destination[];
  isLoading: boolean;
}

export default function RelatedDestinations({
  destinations,
  isLoading,
}: RelatedDestinationsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
          <h2 className="text-2xl font-bold text-slate-900">
            Related Destinations
          </h2>
        </div>
        <GridSkeleton count={4} />
      </div>
    );
  }

  if (!destinations || destinations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900">
          Related Destinations
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest._id} destination={dest} />
        ))}
      </div>
    </motion.div>
  );
}
