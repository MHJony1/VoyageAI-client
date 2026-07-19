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
  Clock,
  Users,
  Award,
  Sparkles,
  Crown,
  Compass,
} from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { GridSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import { useFeaturedDestinations } from '@/hooks/useDestinations';

function getPlaceholderImage(destinationName: string): string {
  return `https://placehold.co/500x400?text=${encodeURIComponent(destinationName)}`;
}

// Deterministic hash so SSR and client render the same pseudo-random stats
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export default function FeaturedDestinations() {
  const {
    data: destinations = [],
    isLoading,
    error,
    refetch,
  } = useFeaturedDestinations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  if (error) {
    return (
      <Section>
        <Container>
          <ErrorState
            message="Failed to load featured destinations"
            onRetry={() => refetch()}
          />
        </Container>
      </Section>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-amber-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-amber-200/30 mb-4">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-[10px] text-amber-700 font-medium tracking-[0.2em] uppercase">
              Top Picks
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>

          <p className="text-sm text-slate-500 mt-3 max-w-2xl mx-auto">
            Explore our handpicked collection of the world's most incredible
            destinations, curated by travel experts for unforgettable
            experiences.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-400" />
            <Compass className="w-4 h-4 text-blue-400/60" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-blue-400" />
          </div>
        </motion.div>

        {isLoading ? (
          <GridSkeleton count={3} />
        ) : (
          <>
            {/* Destinations Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {destinations.map((destination) => (
                <motion.div
                  key={destination._id}
                  variants={itemVariants}
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                  className="group"
                >
                  <Link href={`/explore/${destination._id}`}>
                    <div className="relative bg-white rounded-2xl border border-slate-200/60 hover:border-slate-300/80 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden bg-slate-100">
                        {destination.image ? (
                          <Image
                            src={destination.image}
                            alt={destination.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <Image
                            src={getPlaceholderImage(
                              destination.name || 'Destination',
                            )}
                            alt={`${destination.name || 'Destination'} - placeholder`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 bg-slate-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          <span className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-full border border-white/10">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {destination.rating} ({destination.reviewCount})
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 hover:scale-110 transition-all duration-300">
                            <Heart className="w-4 h-4 text-white hover:fill-white transition-all" />
                          </button>
                          <button className="p-2 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 hover:scale-110 transition-all duration-300">
                            <Share2 className="w-4 h-4 text-white" />
                          </button>
                        </div>

                        {/* Bottom Info */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-white">
                            <MapPin className="w-4 h-4 text-sky-400" />
                            <span className="text-sm font-medium">
                              {destination.country}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                            <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs text-white font-medium">
                              {destination.budget}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {destination.name}
                          </h3>

                          <p className="text-sm text-slate-500 line-clamp-2 mt-2 mb-4 leading-relaxed">
                            {destination.description}
                          </p>
                        </div>

                        {/* Bottom Section */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="text-xs">
                                  {(hashCode(destination._id) % 100) + 20}+
                                  travelers
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <Clock className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs">
                                  {
                                    ['Summer', 'Winter', 'Spring', 'Fall'][
                                      hashCode(destination._id) % 4
                                    ]
                                  }
                                </span>
                              </div>
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm group"
                          >
                            <span>Explore Destination</span>
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
              ))}
            </motion.div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link href="/explore">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-medium rounded-xl transition-all duration-300 group"
                >
                  <span>View All Destinations</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
