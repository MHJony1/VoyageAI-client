'use client';

import { motion } from 'framer-motion';
import { Sparkles, Crown, Shield, Compass, Globe, Users } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title = 'Start Your Journey',
  subtitle = 'Join thousands of travelers exploring the world with AI-powered planning',
}: AuthLayoutProps) {
  const features = [
    { icon: Compass, label: 'Explore Destinations' },
    { icon: Sparkles, label: 'AI-Powered Planning' },
    { icon: Globe, label: 'Global Coverage' },
    { icon: Users, label: '100K+ Travelers' },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left side - Branding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden p-12"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-black/5" />
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center text-white max-w-md"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
              <Crown className="w-7 h-7 text-amber-300" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-bold text-white">VoyageAI</span>
              <p className="text-[10px] text-white/60 tracking-widest uppercase">
                Premium Travel Platform
              </p>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {title}
          </h1>

          <p className="text-white/80 text-base mb-8 leading-relaxed">
            {subtitle}
          </p>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-white/90 font-medium">
                  {feature.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex items-center justify-center gap-6 text-white/50 text-xs"
          >
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>Secure</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="text-amber-300">★</span>
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Powered</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Right side - Form */}
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
