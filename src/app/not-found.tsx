'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Compass, LogIn, LayoutDashboard, Plane } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.3,
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

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
      },
    },
  };

  useEffect(() => {
    document.title = '404 - Page Not Found | VoyageAI';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-sky-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 container-custom px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex justify-center relative">
              {/* Animated plane */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -top-16 -left-16 md:-left-20"
              >
                <Plane size={64} className="text-sky-500" />
              </motion.div>

              {/* 404 Number */}
              <div className="relative">
                <motion.div
                  className="text-9xl md:text-[150px] font-black bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                >
                  404
                </motion.div>
              </div>

              {/* Compass icon decoration */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute -bottom-12 -right-12 md:-right-20"
              >
                <Compass size={60} className="text-blue-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
          >
            Oops! Lost in the Journey
          </motion.h1>

          {/* Message */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed"
          >
            The page you're looking for doesn't exist. It might have been removed, or maybe you took a wrong turn on your travel adventure.
          </motion.p>

          {/* CTA Text */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-slate-500 mb-12"
          >
            Let's get you back on track and exploring amazing destinations.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
            >
              <Home size={20} />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-sky-600 text-sky-600 font-medium rounded-lg hover:bg-sky-50 transition-colors"
            >
              <Compass size={20} />
              <span>Explore Destinations</span>
            </Link>

            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-100 text-blue-600 font-medium rounded-lg hover:bg-blue-200 transition-colors"
              >
                <LayoutDashboard size={20} />
                <span>Go to Dashboard</span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-300 transition-colors"
              >
                <LogIn size={20} />
                <span>Sign In</span>
              </Link>
            )}
          </motion.div>

          {/* Help text */}
          <motion.p
            variants={itemVariants}
            className="mt-12 text-sm text-slate-500"
          >
            Need help?{' '}
            <Link href="/" className="text-sky-600 hover:text-sky-700 font-medium">
              Contact us
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
