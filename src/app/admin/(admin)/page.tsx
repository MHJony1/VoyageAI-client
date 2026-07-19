'use client';

import {
  Users,
  MapPin,
  Backpack,
  Star,
  Sparkles,
  ShieldOff,
} from 'lucide-react';
import {
  ResponsiveContainer,
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
  Legend,
} from 'recharts';
import { useAdminOverview } from '@/hooks/useAdmin';
import { AdminPageHeader, StatCard } from '@/components/admin/AdminUI';
import { GridSkeleton } from '@/components/Loading';
import ErrorState from '@/components/ErrorState';

const PIE_COLORS = ['#6366f1', '#14b8a6', '#f59e0b', '#f43f5e', '#0ea5e9', '#8b5cf6'];

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      <div className="h-64">{children}</div>
    </div>
  );
}

export default function AdminOverviewPage() {
  const { data, isLoading, isError, refetch } = useAdminOverview();

  if (isLoading) {
    return (
      <div>
        <AdminPageHeader title="Overview" description="Platform analytics at a glance" />
        <GridSkeleton count={6} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div>
        <AdminPageHeader title="Overview" />
        <ErrorState message="Failed to load overview data." onRetry={() => refetch()} />
      </div>
    );
  }

  // Merge monthly series by month key for a combined trend chart
  const monthSet = new Set<string>();
  [data.monthlyUsers, data.monthlyTrips, data.monthlyReviews, data.monthlyAI].forEach((s) =>
    s.forEach((p) => monthSet.add(p.month)),
  );
  const months = Array.from(monthSet).sort();
  const trend = months.map((m) => ({
    month: m,
    Users: data.monthlyUsers.find((p) => p.month === m)?.count || 0,
    Trips: data.monthlyTrips.find((p) => p.month === m)?.count || 0,
    Reviews: data.monthlyReviews.find((p) => p.month === m)?.count || 0,
    AI: data.monthlyAI.find((p) => p.month === m)?.count || 0,
  }));

  return (
    <div>
      <AdminPageHeader title="Overview" description="Platform analytics at a glance" />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard label="Users" value={data.counts.users} icon={<Users size={22} />} accent="indigo" />
        <StatCard
          label="Destinations"
          value={data.counts.destinations}
          icon={<MapPin size={22} />}
          accent="sky"
        />
        <StatCard label="Trips" value={data.counts.trips} icon={<Backpack size={22} />} accent="emerald" />
        <StatCard label="Reviews" value={data.counts.reviews} icon={<Star size={22} />} accent="amber" />
        <StatCard
          label="AI Requests"
          value={data.counts.aiHistories}
          icon={<Sparkles size={22} />}
          accent="violet"
        />
        <StatCard
          label="Blocked Users"
          value={data.blockedUsers}
          icon={<ShieldOff size={22} />}
          accent="rose"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Monthly Activity">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" fontSize={11} stroke="#94a3b8" />
              <YAxis fontSize={11} stroke="#94a3b8" allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Users" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Trips" stroke="#14b8a6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Reviews" stroke="#f59e0b" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="AI" stroke="#8b5cf6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Destinations by Category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.destinationsByCategory}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" />
              <YAxis fontSize={11} stroke="#94a3b8" allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Trip Status Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.tripStatusDistribution}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.tripStatusDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="AI Request Types">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.aiTypeDistribution}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.aiTypeDistribution.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
