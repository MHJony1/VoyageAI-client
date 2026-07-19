'use client';

import {
  MapPin,
  Tag,
  Wallet,
  Sun,
  Users,
} from 'lucide-react';
import { Destination } from '@/types';

interface KeyInformationProps {
  destination: Destination;
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  color: string;
}) => (
  <div
    className={`flex flex-col items-center text-center p-4 rounded-xl bg-gradient-to-br ${color} border border-white/20 shadow-sm hover:shadow-md transition-all duration-300`}
  >
    <Icon size={22} className="text-white/90 mb-2" />
    <p className="text-[10px] text-white/70 font-medium tracking-wider uppercase">
      {label}
    </p>
    <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
  </div>
);

export default function KeyInformation({ destination }: KeyInformationProps) {
  const items = [
    {
      icon: MapPin,
      label: 'Country',
      value: destination.country,
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Tag,
      label: 'Category',
      value: destination.category,
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Wallet,
      label: 'Budget',
      value: `$${Math.round(destination.estimatedBudget)}`,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Sun,
      label: 'Best Season',
      value: destination.bestSeason,
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: Users,
      label: 'Popularity',
      value: 'Top Rated',
      color: 'from-rose-500 to-rose-600',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
        <h2 className="text-2xl font-bold text-slate-900">Key Information</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item, index) => (
          <InfoItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}
