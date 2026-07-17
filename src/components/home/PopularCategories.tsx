'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';

const categories = [
  { name: 'Beach', icon: '🏖️', count: 2450, color: 'from-blue-400 to-cyan-400' },
  { name: 'Cultural', icon: '🏛️', count: 1876, color: 'from-purple-400 to-pink-400' },
  { name: 'Adventure', icon: '🏔️', count: 1543, color: 'from-orange-400 to-red-400' },
  { name: 'Urban', icon: '🏙️', count: 1234, color: 'from-gray-400 to-slate-500' },
  { name: 'Mountain', icon: '⛰️', count: 987, color: 'from-green-400 to-emerald-400' },
  { name: 'Wildlife', icon: '🦁', count: 765, color: 'from-yellow-400 to-orange-400' },
];

export default function PopularCategories() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 text-slate-900 mb-4">Popular Destinations by Category</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Explore destinations based on your travel interests
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href={`/explore?category=${category.name.toLowerCase()}`}>
                <div className={`bg-gradient-to-br ${category.color} rounded-lg p-6 text-white shadow-md hover:shadow-lg transition-all duration-300 h-full min-h-48 flex flex-col justify-between`}>
                  <div>
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <h3 className="text-h4 font-semibold mb-2">{category.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium opacity-90">
                      {category.count} places
                    </span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
