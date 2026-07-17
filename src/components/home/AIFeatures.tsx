'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';

const features = [
  {
    icon: MapPin,
    title: 'AI Trip Planner',
    description: 'Generate complete travel itineraries tailored to your budget, interests, and travel style.',
    href: '/ai/planner',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Destination Recommendation',
    description: 'Get AI-powered destination suggestions based on your preferences and travel goals.',
    href: '/ai/recommend',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: MessageSquare,
    title: 'Travel Assistant',
    description: 'Chat with our AI travel assistant for instant answers to all your travel questions.',
    href: '/ai/chat',
    color: 'bg-teal-100 text-teal-600',
  },
];

export default function AIFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <Section bgColor="gray" className="bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-slate-900 mb-4">Powered by AI</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Experience the future of travel planning with our advanced AI features
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={feature.href}>
                  <div className="bg-white rounded-lg shadow-md border border-slate-200 p-8 h-full hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>

                    <h3 className="text-h4 font-semibold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 mb-6 flex-1">
                      {feature.description}
                    </p>

                    <div className="flex items-center gap-2 text-sky-600 font-medium group-hover:gap-3 transition-all">
                      Get Started
                      <ArrowRight size={18} />
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
