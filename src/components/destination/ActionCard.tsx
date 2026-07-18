'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Save, Compass } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useSaveTrip } from '@/hooks/useSaveTrip';
import Button from '@/components/Button';
import { Destination } from '@/types';
import { toast } from 'sonner';

interface ActionCardProps {
  destination: Destination;
}

export default function ActionCard({ destination }: ActionCardProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { mutate: saveTrip, isPending } = useSaveTrip();

  const handleSaveTrip = () => {
    if (!isAuthenticated) {
      toast.error('Please log in to save trips');
      return;
    }

    saveTrip(
      {
        destinationId: destination._id,
        destination: destination.title,
        days: 3,
        budget: destination.estimatedBudget,
        travelStyle: 'Custom',
        itinerary: destination.description,
        estimatedCost: destination.estimatedBudget,
        status: 'saved',
      },
      {
        onSuccess: () => {
          toast.success('Trip saved successfully!');
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || 'Failed to save trip');
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="lg:sticky lg:top-24 space-y-4"
    >
      <div className="bg-white border-2 border-sky-600 rounded-2xl p-6 shadow-lg">
        <div className="space-y-4">
          <Link href={`/ai/planner?destination=${destination._id}`} className="block">
            <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
              <Sparkles size={20} />
              AI Trip Planner
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={handleSaveTrip}
            isLoading={isPending}
            disabled={isPending || authLoading}
            className="w-full flex items-center justify-center gap-2"
          >
            <Save size={20} />
            Save Trip
          </Button>

          <Link href="/explore" className="block">
            <Button variant="ghost" size="lg" className="w-full flex items-center justify-center gap-2">
              <Compass size={20} />
              Explore More
            </Button>
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
          <p>
            <span className="font-semibold">💡 Tip:</span> Use our AI planner to create a customized itinerary
          </p>
        </div>
      </div>
    </motion.div>
  );
}
