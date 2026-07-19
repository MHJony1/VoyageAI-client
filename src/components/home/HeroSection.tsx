'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Sparkles,
  Globe,
  Star,
  Search,
  MapPin,
  TrendingUp,
  Users,
} from 'lucide-react';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const popularCities = [
    'Bali',
    'Dubai',
    'Tokyo',
    'Maldives',
    'Paris',
    'London',
  ];

  const destinationImages = [
    {
      src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&auto=format&fit=crop&q=80',
      alt: 'Travel destination',
      title: 'Adventure Awaits',
      subtitle: 'Explore the world',
    },
    {
      src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&auto=format&fit=crop&q=80',
      alt: 'Travel destination',
      title: 'Island Escape',
      subtitle: 'Beach paradise',
    },
    {
      src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&auto=format&fit=crop&q=80',
      alt: 'Travel destination',
      title: 'City Lights',
      subtitle: 'Urban exploration',
    },
    {
      src: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&auto=format&fit=crop&q=80',
      alt: 'Travel destination',
      title: 'Mountain View',
      subtitle: "Nature's beauty",
    },
  ];

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&h=1080&fit=crop&auto=format"
          alt="Luxury travel background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/95 via-[#0a0e1a]/80 to-[#0a0e1a]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-sky-500/20 via-indigo-500/10 to-amber-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-2xl px-4 py-1.5 rounded-full border border-white/10"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </motion.div>
              <span className="text-[11px] font-medium tracking-wide">
                <span className="text-amber-300">Premium</span>
                <span className="text-white/30 mx-1.5">·</span>
                <span className="text-white/40">AI Travel Planning</span>
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-3">
              <motion.h1 variants={itemVariants}>
                <span className="block text-4xl sm:text-5xl lg:text-6xl font-light text-white/90 leading-[1.05] tracking-tight">
                  Explore
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mt-1">
                  <span className="bg-gradient-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">
                    The World
                  </span>
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base text-white/50 max-w-md leading-relaxed font-light"
              >
                AI-powered travel planning that creates personalized
                itineraries, discovers hidden gems, and makes every journey
                extraordinary.
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="flex items-center bg-white/5 backdrop-blur-2xl rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex-1 flex items-center gap-2.5 px-4 py-2.5">
                  <MapPin className="w-4 h-4 text-amber-400/50" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full bg-transparent border-none outline-none text-sm text-white/80 placeholder-white/30 font-light"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mx-1.5 px-4 py-2 bg-gradient-to-r from-amber-400 to-rose-400 text-white rounded-lg font-medium text-xs hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  Search
                </motion.button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-1"
            >
              {[
                { value: '50K+', label: 'Trips Planned', icon: Users },
                { value: '195+', label: 'Countries', icon: Globe },
                { value: '4.9', label: 'Rating', icon: Star },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex items-center gap-1.5">
                    <stat.icon className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-lg font-bold text-white tracking-tight">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-[9px] text-white/30 font-medium uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Trending Cities */}
            <motion.div variants={itemVariants} className="pt-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-3 h-3 text-amber-400" />
                <span className="text-[9px] text-white/30 font-medium tracking-[0.2em] uppercase">
                  Trending Destinations
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularCities.map((city, index) => (
                  <motion.span
                    key={city}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.04 }}
                    className="px-3 py-1 bg-white/5 backdrop-blur-sm rounded-full border border-white/5 text-[10px] text-white/40 hover:bg-white/10 hover:border-white/15 hover:text-white/70 transition-all duration-300 cursor-pointer font-light"
                  >
                    {city}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-4 gap-3">
              {/* Large Image */}
              <div className="col-span-4 row-span-2 relative rounded-xl overflow-hidden h-[200px] shadow-2xl shadow-amber-500/5">
                <Image
                  src={destinationImages[0].src}
                  alt={destinationImages[0].alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-semibold text-sm">
                    {destinationImages[0].title}
                  </p>
                  <p className="text-white/50 text-[10px]">
                    {destinationImages[0].subtitle}
                  </p>
                </div>
              </div>

              {/* Small Image 1 */}
              <div className="col-span-2 relative rounded-xl overflow-hidden h-[160px] shadow-2xl shadow-amber-500/5">
                <Image
                  src={destinationImages[1].src}
                  alt={destinationImages[1].alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-semibold text-sm">
                    {destinationImages[1].title}
                  </p>
                  <p className="text-white/50 text-[10px]">
                    {destinationImages[1].subtitle}
                  </p>
                </div>
              </div>

              {/* Small Image 2 */}
              <div className="col-span-2 relative rounded-xl overflow-hidden h-[160px] shadow-2xl shadow-amber-500/5">
                <Image
                  src={destinationImages[2].src}
                  alt={destinationImages[2].alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-semibold text-sm">
                    {destinationImages[2].title}
                  </p>
                  <p className="text-white/50 text-[10px]">
                    {destinationImages[2].subtitle}
                  </p>
                </div>
              </div>

              {/* Medium Image */}
              <div className="col-span-4 relative rounded-xl overflow-hidden h-[180px] shadow-2xl shadow-amber-500/5">
                <Image
                  src={destinationImages[3].src}
                  alt={destinationImages[3].alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white font-semibold text-sm">
                    {destinationImages[3].title}
                  </p>
                  <p className="text-white/50 text-[10px]">
                    {destinationImages[3].subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              }}
              className="absolute -bottom-4 -right-4 bg-black/60 backdrop-blur-2xl rounded-xl px-4 py-2.5 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white/10 bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-[9px] font-bold text-white"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] text-white/40 font-light">
                    Active Travelers
                  </p>
                  <p className="text-sm font-bold text-white tracking-tight">
                    2,847 now
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
