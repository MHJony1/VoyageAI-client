'use client';

import { motion } from 'framer-motion';
import { Check, Brain, Shield, Zap, Users, Globe } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';

const reasons = [
  {
    icon: Brain,
    title: 'AI-Powered Planning',
    description: 'Intelligent algorithms that understand your preferences and create perfect itineraries.',
  },
  {
    icon: Zap,
    title: 'Save Time',
    description: 'Get personalized travel plans in seconds instead of hours of research.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    description: 'Explore destinations from every corner of the world with detailed insights.',
  },
  {
    icon: Shield,
    title: 'Trusted & Secure',
    description: 'Your data is encrypted and protected with enterprise-grade security.',
  },
  {
    icon: Users,
    title: 'Community Insights',
    description: 'Learn from millions of travelers and real reviews from genuine users.',
  },
  {
    icon: Check,
    title: 'Best Price Guarantee',
    description: 'Budget-friendly recommendations and insider tips for every destination.',
  },
];

export default function WhyChoose() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-h2 text-slate-900 mb-4">Why Choose VoyageAI?</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Complete travel solutions designed to make your journey unforgettable
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            const colors = ['from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500', 'from-teal-500 to-emerald-500', 'from-sky-500 to-blue-500', 'from-amber-500 to-orange-500'];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-lg transition-all group"
              >
                <div className="flex-shrink-0">
                  <div className={`flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br ${colors[index]} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-h5 font-semibold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                    {reason.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
