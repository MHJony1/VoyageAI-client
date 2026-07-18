import { Suspense } from 'react';
import DestinationDetailClient from '@/components/destination/DestinationDetailClient';
import DetailSkeleton from '@/components/destination/DetailSkeleton';

export const metadata = {
  title: 'Destination | VoyageAI',
  description: 'Explore detailed information about this destination',
};

export default function DestinationPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <DestinationDetailClient id={params.id} />
    </Suspense>
  );
}
