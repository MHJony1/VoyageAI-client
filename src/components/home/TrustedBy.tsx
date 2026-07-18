'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Container from '@/components/Container';

const partners = [
  { name: 'Google', icon: '🔍' },
  { name: 'Microsoft', icon: '💼' },
  { name: 'Amazon', icon: '📦' },
  { name: 'Airbnb', icon: '🏠' },
  { name: 'Booking', icon: '📅' },
  { name: 'Expedia', icon: '🌐' },
];

export default function TrustedBy() {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section className="bg-white border-b border-slate-200">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">
            Trusted by industry leaders
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span className="text-3xl">{partner.icon}</span>
              <p className="text-sm font-medium text-slate-600">{partner.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
