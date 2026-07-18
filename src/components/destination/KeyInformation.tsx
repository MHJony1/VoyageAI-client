'use client';

import { MapPin, Tag, Wallet, Sun, Clock } from 'lucide-react';
import { Destination } from '@/types';

interface KeyInformationProps {
  destination: Destination;
}

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ComponentType<any>; label: string; value: string }) => (
  <div className="flex flex-col items-center text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
    <Icon size={24} className="text-sky-600 mb-2" />
    <p className="text-xs text-slate-600 mb-1">{label}</p>
    <p className="text-sm font-semibold text-slate-900">{value}</p>
  </div>
);

export default function KeyInformation({ destination }: KeyInformationProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-h3 font-bold text-slate-900">Key Information</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <InfoItem icon={MapPin} label="Country" value={destination.country} />
        <InfoItem icon={Tag} label="Category" value={destination.category} />
        <InfoItem icon={Wallet} label="Budget" value={`$${Math.round(destination.estimatedBudget)}`} />
        <InfoItem icon={Sun} label="Best Season" value={destination.bestSeason} />
        <InfoItem icon={Clock} label="Duration" value="Flexible" />
      </div>
    </div>
  );
}
