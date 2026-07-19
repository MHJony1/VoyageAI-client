'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Wallet,
  Calendar,
  Award,
  Heart,
} from 'lucide-react';
import { Destination } from '@/types';

function getPlaceholderImage(name: string): string {
  return `https://placehold.co/1920x800?text=${encodeURIComponent(name)}`;
}

interface DestinationHeroProps {
  destination: Destination;
}

export default function DestinationHero({ destination }: DestinationHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[550px] overflow-hidden bg-slate-800">
        {/* Full Image with proper display */}
        <div className="absolute inset-0 w-full h-full">
          {destination.thumbnail ? (
            <Image
              src={destination.thumbnail}
              alt={destination.title}
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          ) : (
            <Image
              src={getPlaceholderImage(destination.title || 'Destination')}
              alt={`${destination.title || 'Destination'} banner`}
              fill
              className="object-cover object-center"
              priority
              quality={100}
              sizes="100vw"
            />
          )}
        </div>

        {/* Simple gradient overlay at bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-3"
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 bg-blue-600/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                  <Award className="w-3 h-3" />
                  {destination.category}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-600/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                  <Calendar className="w-3 h-3" />
                  Best: {destination.bestSeason}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-600/80 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                  <Heart className="w-3 h-3" />
                  Top Rated
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-lg">
                {destination.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-white">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-amber-400" />
                  <span className="text-sm font-medium">
                    {destination.country}
                  </span>
                </div>
                <span className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">
                    {destination.rating}
                  </span>
                  <span className="text-white/60 text-xs">(2.4k reviews)</span>
                </div>
                <span className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-1.5">
                  <Wallet size={16} className="text-emerald-400" />
                  <span className="text-sm font-medium">
                    ${Math.round(destination.estimatedBudget)}
                  </span>
                  <span className="text-white/60 text-xs">avg / trip</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
