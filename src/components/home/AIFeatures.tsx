'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, MessageSquare, ArrowRight, Zap } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';

const features = [
  {
    icon: MapPin,
    title: 'AI Trip Planner',
    description: 'Generate complete travel itineraries tailored to your budget, interests, and travel style in seconds.',
    href: '/ai/planner',
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50',
  },
  {
    icon: Sparkles,
    title: 'Smart Recommendations',
    description: 'Get AI-powered destination suggestions based on your preferences and travel goals.',
    href: '/ai/recommend',
    gradient: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
  },
  {
    icon: MessageSquare,
    title: 'Travel Assistant',
    description: 'Chat with our AI travel assistant for instant answers to all your travel questions 24/7.',
    href: '/ai/chat',
    gradient: 'from-teal-500 to-emerald-500',
    bgGradient: 'from-teal-50 to-emerald-50',
  },
];

export default function AIFeatures() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section bgColor="gray" className="bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium mb-6"
          >
            <Zap size={16} />
            Powered by Advanced AI
          </motion.div>
          <h2 className="text-h2 text-slate-900 mb-4">Intelligent Travel Features</h2>
          <p className="text-body-lg text-slate-600 max-w-3xl mx-auto">
            Harness the power of AI to discover destinations, create personalized itineraries, and get expert travel advice instantly
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -12, transition: { duration: 0.2 } }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className={`bg-gradient-to-br ${feature.bgGradient} rounded-2xl border border-slate-200 p-8 h-full hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden group`}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity" />

                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon size={28} />
                    </div>

                    <h3 className="text-h4 font-semibold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 mb-6 flex-1 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-sky-600 font-semibold group-hover:gap-3 transition-all">
                      Explore
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
