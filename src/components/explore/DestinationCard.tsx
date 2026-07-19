'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Wallet,
  ArrowRight,
  Heart,
  Share2,
  Eye,
} from 'lucide-react';
import { Destination } from '@/types';
import { useState } from 'react';

interface DestinationCardProps {
  destination: Destination;
}

function getPlaceholderImage(destinationName: string): string {
  return `https://placehold.co/500x400?text=${encodeURIComponent(destinationName)}`;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link href={`/explore/${destination._id}`}>
        <div className="relative bg-white rounded-2xl border border-slate-200/60 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-64 overflow-hidden bg-slate-100">
            {destination.thumbnail ? (
              <Image
                src={destination.thumbnail}
                alt={destination.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <Image
                src={getPlaceholderImage(destination.title || 'Destination')}
                alt={`${destination.title || 'Destination'} - placeholder`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-full border border-white/10">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {destination.rating}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLiked(!isLiked);
                }}
                className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 hover:scale-110"
              >
                <Heart
                  className={`w-4 h-4 transition-all ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
                />
              </button>
              <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition-all duration-300 hover:scale-110">
                <Share2 className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">
                  {destination.country}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs text-white font-medium">
                  ${Math.round(destination.estimatedBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {destination.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mt-2 mb-4 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Eye className="w-4 h-4 text-blue-400" />
                  <span className="text-xs">
                    {Math.floor(Math.random() * 100) + 20} views
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm group"
              >
                <span>View Details</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
