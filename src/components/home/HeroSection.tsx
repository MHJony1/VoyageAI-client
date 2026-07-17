'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Compass } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <Section bgColor="gradient" className="text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-300 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-sm font-medium">Powered by AI</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Plan Smarter.
              <br />
              Travel Better.
            </h1>

            <p className="text-xl text-white/90 max-w-lg leading-relaxed">
              Discover amazing destinations and create personalized travel itineraries with AI-powered recommendations tailored to your unique preferences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/explore" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <Compass size={20} />
                  Explore Destinations
                </Button>
              </Link>
              <Link href="/ai/planner" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  <Sparkles size={20} />
                  AI Trip Planner
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-teal-400 rounded-2xl blur-2xl opacity-30" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 aspect-square flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl"
                >
                  🌍
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
