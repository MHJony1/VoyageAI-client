'use client';

import { motion } from 'framer-motion';
import Section from '@/components/Section';
import Container from '@/components/Container';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const stats = [
  { label: 'Destinations Covered', value: '195+', icon: '🌍' },
  { label: 'Trips Planned', value: '50K+', icon: '✈️' },
  { label: 'Happy Travelers', value: '100K+', icon: '😊' },
  { label: 'AI Recommendations', value: '1M+', icon: '🤖' },
];

const categoryData = [
  { name: 'Beach', value: 28, color: '#0ea5e9' },
  { name: 'Cultural', value: 25, color: '#14b8a6' },
  { name: 'Adventure', value: 22, color: '#f59e0b' },
  { name: 'Urban', value: 15, color: '#8b5cf6' },
  { name: 'Mountain', value: 10, color: '#ef4444' },
];

const trendData = [
  { month: 'Jan', trips: 4000, users: 2400 },
  { month: 'Feb', trips: 3000, users: 1398 },
  { month: 'Mar', trips: 2000, users: 9800 },
  { month: 'Apr', trips: 2780, users: 3908 },
  { month: 'May', trips: 1890, users: 4800 },
  { month: 'Jun', trips: 2390, users: 3800 },
];

export default function TravelStats() {
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
          <h2 className="text-h2 text-slate-900 mb-4">Travel by the Numbers</h2>
          <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
            Join millions of travelers discovering the world with VoyageAI
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 text-center border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-h3 font-bold text-sky-600 mb-2">{stat.value}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-lg shadow-md p-8 border border-slate-200">
            <h3 className="text-h4 font-semibold text-slate-900 mb-6">
              Popular Destination Categories
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {categoryData.map((cat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm text-slate-600">
                    {cat.name} {cat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 border border-slate-200">
            <h3 className="text-h4 font-semibold text-slate-900 mb-6">
              Growth Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="trips" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                <Bar dataKey="users" fill="#14b8a6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
