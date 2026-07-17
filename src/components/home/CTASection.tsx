'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';

export default function CTASection() {
  return (
    <Section bgColor="gradient" className="text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-300 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center py-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
          >
            <Sparkles size={16} className="text-yellow-300" />
            <span className="text-sm font-medium">Limited Time Offer</span>
          </motion.div>

          <h2 className="text-h2 mb-6 leading-tight">
            Ready to Start Your Adventure?
          </h2>

          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of travelers who've already discovered their next dream destination with VoyageAI's intelligent travel planning.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-sky-600 hover:bg-slate-100 px-8 w-full sm:w-auto font-semibold"
              >
                <Sparkles size={20} />
                Start Planning Now
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 px-8 w-full sm:w-auto"
              >
                Explore First
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>

          <p className="text-white/70 text-sm mt-6">
            No credit card required • Free to get started
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
