'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, Users, Star } from 'lucide-react';

const categories = [
  {
    name: 'Beach',
    icon: '🏖️',
    count: 2450,
    color: 'from-blue-500/90 to-cyan-500/90',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&auto=format',
    description: 'Paradise escapes',
  },
  {
    name: 'Cultural',
    icon: '🏛️',
    count: 1876,
    color: 'from-purple-500/90 to-pink-500/90',
    image:
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop&auto=format',
    description: 'Heritage & history',
  },
  {
    name: 'Adventure',
    icon: '🏔️',
    count: 1543,
    color: 'from-orange-500/90 to-red-500/90',
    image:
      'https://images.unsplash.com/photo-1501761095094-94d36f57edbb?w=600&auto=format',
    description: 'Thrill & excitement',
  },
  {
    name: 'Urban',
    icon: '🏙️',
    count: 1234,
    color: 'from-slate-600/90 to-slate-800/90',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&auto=format',
    description: 'City adventures',
  },
  {
    name: 'Mountain',
    icon: '⛰️',
    count: 987,
    color: 'from-emerald-500/90 to-teal-500/90',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop&auto=format',
    description: 'Peak experiences',
  },
  {
    name: 'Wildlife',
    icon: '🦁',
    count: 765,
    color: 'from-amber-500/90 to-orange-500/90',
    image:
      'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&h=300&fit=crop&auto=format',
    description: 'Nature encounters',
  },
  {
    name: 'Romantic',
    icon: '❤️',
    count: 654,
    color: 'from-rose-500/90 to-pink-500/90',
    image:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&auto=format',
    description: 'Love & romance',
  },
  {
    name: 'Wellness',
    icon: '🧘',
    count: 543,
    color: 'from-teal-500/90 to-emerald-500/90',
    image:
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&auto=format',
    description: 'Rejuvenate & relax',
  },
];

export default function PopularCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
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
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-200/30 mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase">
              Discover By Interest
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Explore by{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Interest
            </span>
          </h2>

          <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
            Discover destinations tailored to your travel style and interests
          </p>
        </motion.div>

        {/* Categories Grid - 4 columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.2 },
              }}
              className="group"
            >
              <Link href={`/explore?category=${category.name.toLowerCase()}`}>
                <div className="relative rounded-xl overflow-hidden h-52 shadow-lg hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-[9px] text-white/80 font-medium">
                          Top
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-white/90 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-[10px] text-white/50 font-light">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] text-white/40">
                          <Users className="w-2.5 h-2.5" />
                          <span>{category.count} destinations</span>
                        </div>
                        <div className="flex items-center gap-0.5 text-[10px] font-medium text-white group-hover:gap-1.5 transition-all">
                          <span>Explore</span>
                          <ArrowRight
                            size={12}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
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
          className="text-center mt-10"
        >
          <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 text-sm"
            >
              <span>View All Categories</span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
