'use client';

import { motion } from 'framer-motion';
import { GridSkeleton } from '@/components/Loading';
import DestinationCard from '@/components/explore/DestinationCard';
import { Destination } from '@/types';

interface RelatedDestinationsProps {
  destinations: Destination[];
  isLoading: boolean;
}

export default function RelatedDestinations({ destinations, isLoading }: RelatedDestinationsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-h3 font-bold text-slate-900">Related Destinations</h2>
        <GridSkeleton count={4} />
      </div>
    );
  }

  if (!destinations || destinations.length === 0) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-4">
      <h2 className="text-h3 font-bold text-slate-900">Related Destinations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <DestinationCard key={dest._id} destination={dest} />
        ))}
      </div>
    </motion.div>
  );
}
