'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function CTASection() {
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

  return (
    <Section bgColor="gradient" className="text-white relative overflow-hidden py-24 lg:py-40 bg-gradient-to-br from-teal-900 via-slate-900 to-sky-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-sky-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500/20 to-sky-500/20 backdrop-blur-md border border-teal-400/40 px-4 py-2 rounded-full mb-8 shadow-lg"
          >
            <Zap size={16} className="text-yellow-300" />
            <span className="text-sm font-medium bg-gradient-to-r from-sky-200 to-teal-200 bg-clip-text text-transparent">Start Free Today</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight space-y-2"
          >
            <span className="block text-white drop-shadow-lg">Begin Your</span>
            <span className="block bg-gradient-to-r from-teal-200 via-sky-200 to-teal-100 bg-clip-text text-transparent text-5xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              Journey Today
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light"
          >
            Transform your travel experience with AI-powered planning. No credit card required.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-sky-600 hover:bg-white hover:scale-105 px-10 w-full sm:w-auto font-bold shadow-2xl hover:shadow-sky-500/50 transition-all duration-300"
              >
                <Sparkles size={22} />
                Start Planning Now
                <ArrowRight size={22} />
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/15 hover:border-teal-300 hover:scale-105 px-10 w-full sm:w-auto font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Explore Destinations
              </Button>
            </Link>
          </motion.div>

          <motion.p variants={itemVariants} className="text-white/80 text-sm font-medium">
            <span className="bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent">Join 100K+ travelers</span> • Free forever plan • No credit card needed
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}
