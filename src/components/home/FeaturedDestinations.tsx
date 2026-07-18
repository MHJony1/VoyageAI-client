'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Wallet, ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import { GridSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import { useFeaturedDestinations } from '@/hooks/useDestinations';

function getPlaceholderImage(destinationName: string): string {
  return `https://placehold.co/500x400?text=${encodeURIComponent(destinationName)}`;
}

export default function FeaturedDestinations() {
  const { data: destinations = [], isLoading, error, refetch } = useFeaturedDestinations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
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
    <Section className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-slate-900 mb-4">Featured Destinations</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Explore our handpicked collection of the world's most incredible destinations
          </p>
        </motion.div>

        {isLoading ? (
          <GridSkeleton count={3} />
        ) : (
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
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={`/explore/${destination._id}`}>
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col backdrop-blur-sm">
                    <div className="relative h-56 overflow-hidden bg-slate-200">
                      {destination.image ? (
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <Image
                          src={getPlaceholderImage(destination.name)}
                          alt={`${destination.name} - placeholder`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500 bg-slate-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-h4 font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                            {destination.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                          <MapPin size={16} className="text-sky-600" />
                          <span>{destination.country}</span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                          {destination.description}
                        </p>
                      </div>

                      <div className="space-y-3 border-t border-slate-200 pt-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-slate-900">
                              {destination.rating}
                            </span>
                            <span className="text-xs text-slate-500">
                              ({destination.reviewCount})
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-slate-600">
                            <Wallet size={16} className="text-teal-600" />
                            <span>{destination.budget}</span>
                          </div>
                        </div>

                        <Button
                          variant="primary"
                          size="md"
                          className="w-full flex items-center justify-center gap-2"
                        >
                          Explore
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link href="/explore">
            <Button variant="outline" size="lg">
              View All Destinations
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
