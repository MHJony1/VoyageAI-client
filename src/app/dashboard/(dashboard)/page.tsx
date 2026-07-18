'use client';

import { motion } from 'framer-motion';
import {
  Backpack,
  MapPin,
  Star,
  Zap,
  TrendingUp,
  Activity,
  ArrowUpRight,
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
} from 'recharts';
import { useDashboardOverview, useDashboardStatistics } from '@/hooks/useDashboard';
import { Skeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';
import EmptyState from '@/components/EmptyState';
import Button from '@/components/Button';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const CHART_COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

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
          <div key={i} className="bg-white rounded-lg border border-slate-200 p-6">
            <Skeleton className="w-12 h-12 rounded-lg mb-4" />
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
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Zap,
      label: 'AI Generations',
      value: data?.totalAIGenerations || 0,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Star,
      label: 'Reviews Written',
      value: data?.totalReviews || 0,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: MapPin,
      label: 'Favorite Destination',
      value: data?.favoriteDestination || 'None',
      isText: true,
      color: 'bg-green-100 text-green-600',
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
          <div
            key={card.label}
            className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
              <Icon size={24} />
            </div>
            <p className="text-slate-600 text-sm font-medium">{card.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-2">
              {card.isText ? card.value : card.value}
            </p>
          </div>
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
            className="bg-white rounded-lg border border-slate-200 p-6"
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

  return (
    <motion.div
      variants={itemVariants}
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* Monthly Trips */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Monthly Trips Trend
        </h3>
        {data.monthlyTrips && data.monthlyTrips.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyTrips}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>

      {/* Monthly AI Usage */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Monthly AI Usage
        </h3>
        {data.monthlyAI && data.monthlyAI.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyAI}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>

      {/* Monthly Reviews */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Monthly Reviews
        </h3>
        {data.monthlyReviews && data.monthlyReviews.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.monthlyReviews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-500">
            No data available
          </div>
        )}
      </div>

      {/* Trip Status Distribution */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Trip Status Distribution
        </h3>
        {data.tripStatusDistribution && data.tripStatusDistribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.tripStatusDistribution}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.tripStatusDistribution.map((_: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
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
        <EmptyState
          icon="map"
          title="No Recent Trips"
          description="Start planning your first trip to see it here"
          action={{
            label: 'Plan a Trip',
            onClick: () => (window.location.href = '/dashboard/ai-planner'),
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent Trips</h2>
        <Link href="/dashboard/my-trips">
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {data.slice(0, 5).map((trip: any) => (
          <div
            key={trip._id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex-1">
              <p className="font-medium text-slate-900">{trip.destination}</p>
              <p className="text-xs text-slate-500">
                {trip.days} days • ${trip.budget}
              </p>
            </div>
            <ArrowUpRight size={16} className="text-slate-400" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function RecentAIActivitiesSection({ data }: any) {
  if (!data || data.length === 0) {
    return (
      <motion.div variants={itemVariants}>
        <EmptyState
          icon="inbox"
          title="No AI Activities"
          description="Use our AI features to get recommendations and generate itineraries"
          action={{
            label: 'Start AI Planning',
            onClick: () => (window.location.href = '/dashboard/ai-planner'),
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Recent AI Activities</h2>
        <Link href="/dashboard/ai-history">
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-3">
        {data.slice(0, 5).map((activity: any) => (
          <div
            key={activity._id}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900 capitalize">
                  {activity.type}
                </p>
                <p className="text-xs text-slate-500">
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

function QuickActionsSection() {
  const actions = [
    {
      icon: Backpack,
      label: 'Plan a New Trip',
      href: '/dashboard/ai-planner',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: TrendingUp,
      label: 'Get Recommendations',
      href: '/dashboard/ai-recommendation',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Star,
      label: 'View My Reviews',
      href: '/dashboard/reviews',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Activity,
      label: 'AI History',
      href: '/dashboard/ai-history',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer">
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} />
                </div>
                <span className="font-medium text-slate-900 text-sm">
                  {action.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function DashboardOverviewPage() {
  const { data: overviewData, isLoading: overviewLoading, error: overviewError, refetch: refetchOverview } = useDashboardOverview();
  const { data: statisticsData, isLoading: statsLoading, error: statsError, refetch: refetchStats } = useDashboardStatistics();

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
      className="p-4 md:p-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
        <p className="text-slate-600 mt-2">
          Here's an overview of your travel activity
        </p>
      </motion.div>

      {/* Overview Cards */}
      <OverviewCards
        isLoading={overviewLoading}
        error={overviewError}
        data={overviewData}
      />

      {/* Charts Grid */}
      <div className="mt-8">
        <ChartsGrid
          isLoading={statsLoading}
          error={statsError}
          data={statisticsData}
        />
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Trips */}
        <RecentTripsSection data={overviewData?.recentTrips} />

        {/* Quick Actions */}
        <QuickActionsSection />
      </div>

      {/* Recent AI Activities */}
      <div className="mt-8">
        <RecentAIActivitiesSection data={overviewData?.recentAIActivities} />
      </div>
    </motion.div>
  );
}
