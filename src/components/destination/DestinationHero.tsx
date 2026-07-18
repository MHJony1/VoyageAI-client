'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Wallet } from 'lucide-react';
import { Destination } from '@/types';

function getPlaceholderImage(name: string): string {
  return `https://placehold.co/1200x600?text=${encodeURIComponent(name)}`;
}

interface DestinationHeroProps {
  destination: Destination;
}

export default function DestinationHero({ destination }: DestinationHeroProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="relative h-96 md:h-screen lg:h-[600px] bg-slate-900 overflow-hidden">
        {destination.thumbnail ? (
          <Image
            src={destination.thumbnail}
            alt={destination.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src={getPlaceholderImage(destination.title)}
            alt={`${destination.title} banner`}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="container-custom pb-8 md:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                <span className="bg-sky-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {destination.category}
                </span>
                <span className="bg-teal-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                  {destination.bestSeason}
                </span>
              </div>

              <h1 className="text-h2 md:text-h1 text-white font-bold">{destination.title}</h1>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={20} />
                  <span className="font-medium">{destination.country}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Star size={20} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{destination.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Wallet size={20} />
                  <span className="font-medium">${Math.round(destination.estimatedBudget)}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
