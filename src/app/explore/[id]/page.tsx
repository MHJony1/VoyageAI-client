import { Suspense } from 'react';
import DestinationDetailClient from '@/components/destination/DestinationDetailClient';
import DetailSkeleton from '@/components/destination/DetailSkeleton';

export const metadata = {
  title: 'Destination | VoyageAI',
  description: 'Explore detailed information about this destination',
};

export default async function DestinationPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <DestinationDetailClient id={id} />
    </Suspense>
  );
}
