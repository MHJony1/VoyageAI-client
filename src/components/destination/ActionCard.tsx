// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Sparkles, Save, Compass } from 'lucide-react';
// import { useAuth } from '@/providers/AuthProvider';
// import { useSaveTrip } from '@/hooks/useSaveTrip';
// import Button from '@/components/Button';
// import { Destination } from '@/types';
// import { toast } from 'sonner';

// interface ActionCardProps {
//   destination: Destination;
// }

// export default function ActionCard({ destination }: ActionCardProps) {
//   const { isAuthenticated, isLoading: authLoading } = useAuth();
//   const { mutate: saveTrip, isPending } = useSaveTrip();

//   const handleSaveTrip = () => {
//     if (!isAuthenticated) {
//       toast.error('Please log in to save trips');
//       return;
//     }

//     saveTrip(
//       {
//         destinationId: destination._id,
//         destination: destination.title,
//         days: 3,
//         budget: destination.estimatedBudget,
//         travelStyle: 'Custom',
//         itinerary: destination.description,
//         estimatedCost: destination.estimatedBudget,
//         status: 'saved',
//       },
//       {
//         onSuccess: () => {
//           toast.success('Trip saved successfully!');
//         },
//         onError: (error: any) => {
//           toast.error(error.response?.data?.message || 'Failed to save trip');
//         },
//       }
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="lg:sticky lg:top-24 space-y-4"
//     >
//       <div className="bg-white border-2 border-sky-600 rounded-2xl p-6 shadow-lg">
//         <div className="space-y-4">
//           <Link href={`/ai/planner?destination=${destination._id}`} className="block">
//             <Button variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
//               <Sparkles size={20} />
//               AI Trip Planner
//             </Button>
//           </Link>

//           <Button
//             variant="outline"
//             size="lg"
//             onClick={handleSaveTrip}
//             isLoading={isPending}
//             disabled={isPending || authLoading}
//             className="w-full flex items-center justify-center gap-2"
//           >
//             <Save size={20} />
//             Save Trip
//           </Button>

//           <Link href="/explore" className="block">
//             <Button variant="ghost" size="lg" className="w-full flex items-center justify-center gap-2">
//               <Compass size={20} />
//               Explore More
//             </Button>
//           </Link>
//         </div>

//         <div className="mt-6 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
//           <p>
//             <span className="font-semibold">💡 Tip:</span> Use our AI planner to create a customized itinerary
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }




'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Save, Compass, Star, Clock, Shield } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useSaveTrip } from '@/hooks/useSaveTrip';
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
      transition={{ delay: 0.3, duration: 0.5 }}
      className="lg:sticky lg:top-24 space-y-4"
    >
      <div className="relative bg-white rounded-2xl border border-slate-200/60 p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        
        {/* Price */}
        <div className="mb-4">
          <p className="text-sm text-slate-500">Estimated Cost</p>
          <p className="text-3xl font-bold text-slate-900">
            ${Math.round(destination.estimatedBudget)}
          </p>
          <p className="text-xs text-slate-400">Average cost per trip</p>
        </div>

        <div className="space-y-3">
          {/* AI Planner Button */}
          <Link href={`/ai/planner?destination=${destination._id}`} className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Sparkles size={18} />
              <span>AI Trip Planner</span>
            </motion.button>
          </Link>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveTrip}
            disabled={isPending || authLoading}
            className="w-full py-3.5 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            <span>{isPending ? 'Saving...' : 'Save Trip'}</span>
          </motion.button>

          {/* Explore Button */}
          <Link href="/explore" className="block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-transparent text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Compass size={18} />
              <span>Explore More</span>
            </motion.button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-6 pt-6 border-t border-slate-200/60 space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>4.9/5 average rating</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>24/7 AI support available</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Secure booking</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}