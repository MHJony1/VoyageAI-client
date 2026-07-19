'use client';

import { motion, type Variants } from 'framer-motion';
import {
  Backpack,
  MapPin,
  Star,
  Zap,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Sparkles,
  Crown,
  Clock,
  Calendar,
  Wallet,
  Users,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  useDashboardOverview,
  useDashboardStatistics,
} from '@/hooks/useDashboard';
import { Skeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import Button from '@/components/Button';
import Link from 'next/link';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const CHART_COLORS = [
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
];

function OverviewCards({ isLoading, error, data }: any) {
  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ErrorState
          title="Failed to load overview"
          message="Could not fetch your statistics"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm"
          >
            <Skeleton className="w-12 h-12 rounded-xl mb-4" />
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      icon: Backpack,
      label: 'Total Trips',
      value: data?.totalTrips || 0,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50/80 to-cyan-50/80',
    },
    {
      icon: Zap,
      label: 'AI Generations',
      value: data?.totalAIGenerations || 0,
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50/80 to-pink-50/80',
    },
    {
      icon: Star,
      label: 'Reviews Written',
      value: data?.totalReviews || 0,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50/80 to-orange-50/80',
    },
    {
      icon: MapPin,
      label: 'Favorite Destination',
      value: data?.favoriteDestination || 'None',
      isText: true,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50/80 to-teal-50/80',
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`relative bg-gradient-to-br ${card.bgGradient} rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
            <div
              className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} text-white items-center justify-center shadow-lg mb-4`}
            >
              <Icon size={22} />
            </div>
            <p className="text-slate-600 text-sm font-medium">{card.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {card.isText ? card.value : card.value.toLocaleString()}
            </p>
            {!card.isText && (
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp size={12} />
                <span>+12% from last month</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ChartsGrid({ isLoading, error, data }: any) {
  if (error) {
    return (
      <motion.div variants={itemVariants}>
        <ErrorState
          title="Failed to load charts"
          message="Could not fetch your statistics"
        />
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm"
          >
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </motion.div>
    );
  }

  if (!data) {
    return null;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl rounded-xl p-4 border border-slate-200/60 shadow-xl">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="text-sm text-slate-600">
              {item.name}: {item.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Monthly Trips - Area Chart */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Monthly Trips
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            <TrendingUp size={12} />
            <span>+23%</span>
          </div>
        </div>
        {data.monthlyTrips && data.monthlyTrips.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data.monthlyTrips}>
              <defs>
                <linearGradient id="tripsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#tripsGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>

      {/* Monthly AI Usage - Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">AI Usage</h3>
          <div className="flex items-center gap-1.5 text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
            <Zap size={12} />
            <span>+45%</span>
          </div>
        </div>
        {data.monthlyAI && data.monthlyAI.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.monthlyAI}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>

      {/* Monthly Reviews - Line Chart */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Reviews</h3>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            <Star size={12} />
            <span>+18%</span>
          </div>
        </div>
        {data.monthlyReviews && data.monthlyReviews.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.monthlyReviews}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e2e8f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>

      {/* Trip Status Distribution - Pie Chart */}
      <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Trip Status</h3>
          <div className="flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            <Users size={12} />
            <span>Distribution</span>
          </div>
        </div>
        {data.tripStatusDistribution &&
        data.tripStatusDistribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data.tripStatusDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                label={({ status, percent }: { status?: string; percent?: number }) =>
                  `${status ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {data.tripStatusDistribution.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RecentTripsSection({ data }: any) {
  if (!data || data.length === 0) {
    return (
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-xl border border-slate-200/60 p-8 text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No Recent Trips
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Start planning your first trip to see it here
          </p>
          <Link href="/dashboard/ai-planner">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Plan a Trip
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-50 rounded-xl">
            <Backpack size={18} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Recent Trips</h2>
        </div>
        <Link href="/dashboard/my-trips">
          <Button variant="outline" size="sm" className="text-slate-600">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {data.slice(0, 5).map((trip: any) => (
          <Link key={trip._id} href={`/dashboard/my-trips/${trip._id}`}>
            <div className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl hover:bg-slate-100 transition-all duration-200 group cursor-pointer">
              <div className="flex-1">
                <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                  {trip.destination}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={12} />
                    {trip.days} days
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Wallet size={12} />${trip.budget}
                  </span>
                </div>
              </div>
              <ArrowUpRight
                size={16}
                className="text-slate-400 group-hover:text-blue-600 transition-colors"
              />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function QuickActionsSection() {
  const actions = [
    {
      icon: Sparkles,
      label: 'AI Planner',
      href: '/dashboard/ai-planner',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      label: 'Recommendations',
      href: '/dashboard/ai-recommendation',
      gradient: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Star,
      label: 'My Reviews',
      href: '/dashboard/reviews',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: Crown,
      label: 'Premium Features',
      href: '/dashboard/premium',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-50 rounded-xl">
          <Zap size={18} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`flex flex-col items-center gap-2 p-4 bg-gradient-to-br ${action.gradient} text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{action.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

function RecentAIActivitiesSection({ data }: any) {
  if (!data || data.length === 0) {
    return (
      <motion.div variants={itemVariants}>
        <div className="bg-white rounded-xl border border-slate-200/60 p-8 text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No AI Activities
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            Use our AI features to get recommendations
          </p>
          <Link href="/dashboard/ai-planner">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Start AI Planning
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 rounded-xl">
            <Activity size={18} className="text-purple-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            AI Activities
          </h2>
        </div>
        <Link href="/dashboard/ai-history">
          <Button variant="outline" size="sm" className="text-slate-600">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {data.slice(0, 5).map((activity: any) => (
          <div
            key={activity._id}
            className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl hover:bg-slate-100 transition-all duration-200"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                <Activity size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900 capitalize">
                  {activity.type}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock size={12} />
                  {new Date(activity.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-400" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function DashboardOverviewPage() {
  const {
    data: overviewData,
    isLoading: overviewLoading,
    error: overviewError,
    refetch: refetchOverview,
  } = useDashboardOverview();
  const {
    data: statisticsData,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useDashboardStatistics();

  const isLoading = overviewLoading || statsLoading;
  const hasError = overviewError || statsError;

  if (hasError && !isLoading) {
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <ErrorState
          title="Failed to load dashboard"
          message="Could not fetch your dashboard data. Please try again."
          onRetry={() => {
            refetchOverview();
            refetchStats();
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Welcome Back! 👋
            </h1>
            <p className="text-slate-500 mt-1">
              Here's an overview of your travel activity
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <Clock size={14} />
              <span>Last updated: Just now</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <OverviewCards
        isLoading={overviewLoading}
        error={overviewError}
        data={overviewData}
      />

      {/* Charts Grid */}
      <ChartsGrid
        isLoading={statsLoading}
        error={statsError}
        data={statisticsData}
      />

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTripsSection data={overviewData?.recentTrips} />
        <QuickActionsSection />
      </div>

      {/* Recent AI Activities */}
      <RecentAIActivitiesSection data={overviewData?.recentAIActivities} />
    </motion.div>
  );
}
