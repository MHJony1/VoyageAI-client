'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Wallet, ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

function getPlaceholderImage(destinationName: string): string {
  return `https://placehold.co/500x400?text=${encodeURIComponent(destinationName)}`;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link href={`/explore/${destination._id}`}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-slate-200">
            {destination.thumbnail ? (
              <Image
                src={destination.thumbnail}
                alt={destination.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <Image
                src={getPlaceholderImage(destination.title)}
                alt={`${destination.title} - placeholder`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-h4 font-semibold text-slate-900 group-hover:text-sky-600 transition-colors mb-1 line-clamp-1">
                {destination.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                <MapPin size={16} className="text-sky-600 flex-shrink-0" />
                <span className="line-clamp-1">{destination.country}</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                {destination.description}
              </p>
            </div>

            {/* Stats & Button */}
            <div className="space-y-3 border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Star size={16} className="fill-yellow-400 text-yellow-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-slate-900">
                    {destination.rating}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Wallet size={16} className="text-teal-600 flex-shrink-0" />
                  <span>${Math.round(destination.estimatedBudget)}</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
