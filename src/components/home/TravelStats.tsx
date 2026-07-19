'use client';

import { motion, type Variants } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Line,
} from 'recharts';
import {
  Globe,
  Plane,
  Users,
  Bot,
  TrendingUp,
  Award,
  Crown,
  Sparkles,
  Compass,
} from 'lucide-react';
import { useState } from 'react';

const stats = [
  {
    label: 'Destinations Covered',
    value: '195+',
    icon: Globe,
    gradient: 'from-blue-500 to-cyan-500',
    growth: '+12%',
  },
  {
    label: 'Trips Planned',
    value: '50K+',
    icon: Plane,
    gradient: 'from-purple-500 to-pink-500',
    growth: '+23%',
  },
  {
    label: 'Happy Travelers',
    value: '100K+',
    icon: Users,
    gradient: 'from-teal-500 to-emerald-500',
    growth: '+18%',
  },
  {
    label: 'AI Recommendations',
    value: '1M+',
    icon: Bot,
    gradient: 'from-amber-500 to-orange-500',
    growth: '+45%',
  },
];

const categoryData = [
  { name: 'Beach', value: 28, color: '#0ea5e9', icon: '🏖️' },
  { name: 'Cultural', value: 25, color: '#14b8a6', icon: '🏛️' },
  { name: 'Adventure', value: 22, color: '#f59e0b', icon: '🧗' },
  { name: 'Urban', value: 15, color: '#8b5cf6', icon: '🌆' },
  { name: 'Mountain', value: 10, color: '#ef4444', icon: '🏔️' },
];

const trendData = [
  { month: 'Jan', trips: 4000, users: 2800, revenue: 18000, growth: 15 },
  { month: 'Feb', trips: 4500, users: 3200, revenue: 22000, growth: 22 },
  { month: 'Mar', trips: 5200, users: 3800, revenue: 28000, growth: 35 },
  { month: 'Apr', trips: 4800, users: 3500, revenue: 24000, growth: 28 },
  { month: 'May', trips: 6000, users: 4500, revenue: 35000, growth: 42 },
  { month: 'Jun', trips: 7500, users: 5500, revenue: 42000, growth: 55 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-2xl rounded-2xl p-5 border border-slate-200/60 shadow-2xl shadow-slate-200/50 min-w-[220px]">
        <p className="text-sm font-bold text-slate-900 mb-3">{label}</p>
        {payload.map((item: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color || item.fill }}
              />
              <span className="text-sm text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">
              {item.value.toLocaleString()}
            </span>
          </div>
        ))}
        {payload[0]?.payload?.growth && (
          <div className="mt-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Growth</span>
              <span className="text-xs font-semibold text-emerald-600">
                ↑ {payload[0].payload.growth}%
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-xs text-slate-600 font-medium capitalize">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function TravelStats() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-amber-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-blue-200/30 mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase">
              Live Analytics
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            By the{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>

          <p className="text-base text-slate-500 mt-3 max-w-2xl mx-auto leading-relaxed">
            Join millions of travelers discovering the world with VoyageAI's
            intelligent planning
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 },
                }}
                className="group relative bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-slate-300/80 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                />

                <div className="relative">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50/80 px-2 py-1 rounded-full">
                      {stat.growth}
                    </span>
                  </div>

                  <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Pie Chart */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Popular Categories
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Distribution by travel type
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-slate-50/80 px-3 py-1.5 rounded-full border border-slate-200/50">
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-[10px] text-slate-500 font-medium">
                  Top 5
                </span>
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={3}
                    dataKey="value"
                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        className="transition-all duration-300 cursor-pointer"
                        style={{
                          opacity:
                            hoveredIndex === null || hoveredIndex === index
                              ? 1
                              : 0.5,
                          transform:
                            hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                          transformOrigin: 'center',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {categoryData.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="w-4 h-4 rounded-full group-hover:scale-110 transition-transform flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div className="flex items-center justify-between flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{cat.icon}</span>
                      <span className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      {cat.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart - Full height no gaps */}
          <div className="bg-white rounded-2xl border border-slate-200/60 p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Growth Trend
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Monthly performance metrics
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-200/30">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] text-emerald-700 font-medium">
                  +55% Growth
                </span>
              </div>
            </div>

            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={trendData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="tripsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#0ea5e9"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                    <linearGradient
                      id="usersGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
                      <stop
                        offset="100%"
                        stopColor="#14b8a6"
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e2e8f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                    domain={[0, 8000]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    content={renderLegend}
                    verticalAlign="bottom"
                    height={50}
                  />
                  <Bar
                    dataKey="trips"
                    name="Trips"
                    fill="url(#tripsGradient)"
                    radius={[6, 6, 0, 0]}
                    barSize={32}
                    className="transition-all duration-300"
                  />
                  <Bar
                    dataKey="users"
                    name="Users"
                    fill="url(#usersGradient)"
                    radius={[6, 6, 0, 0]}
                    barSize={32}
                    className="transition-all duration-300"
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#8b5cf6"
                    strokeWidth={2.5}
                    dot={{
                      fill: '#8b5cf6',
                      strokeWidth: 2,
                      r: 4,
                      stroke: '#fff',
                    }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Premium Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm border border-slate-200/60 rounded-3xl p-8 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                {
                  icon: Award,
                  label: 'Award Winning',
                  value: 'Best Travel AI 2024',
                  color: 'text-amber-500',
                  bg: 'from-amber-500/10 to-amber-500/20',
                },
                {
                  icon: Crown,
                  label: 'Premium Service',
                  value: 'Top Rated Platform',
                  color: 'text-purple-500',
                  bg: 'from-purple-500/10 to-purple-500/20',
                },
                {
                  icon: Sparkles,
                  label: 'AI Accuracy',
                  value: '98% Precision',
                  color: 'text-blue-500',
                  bg: 'from-blue-500/10 to-blue-500/20',
                },
                {
                  icon: Globe,
                  label: 'Global Reach',
                  value: '195+ Countries',
                  color: 'text-emerald-500',
                  bg: 'from-emerald-500/10 to-emerald-500/20',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`p-2 rounded-xl bg-gradient-to-br ${item.bg}`}
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">
                      {item.value}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
