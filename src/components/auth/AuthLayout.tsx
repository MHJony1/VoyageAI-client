'use client';

import { motion } from 'framer-motion';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading?: string;
  subheading?: string;
}

export default function AuthLayout({
  children,
  heading = 'Welcome to VoyageAI',
  subheading = 'Plan your journey with AI-powered insights',
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left side - Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>

      {/* Right side - Gradient background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center text-white px-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{heading}</h1>
          <p className="text-lg text-blue-100 mb-8 max-w-md">{subheading}</p>

          {/* Decorative elements */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <span className="text-sm font-medium">Explore Destinations</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">🗺️</span>
              </div>
              <span className="text-sm font-medium">AI-Powered Planning</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <span className="text-sm font-medium">Smart Suggestions</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
