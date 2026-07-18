import { Suspense } from 'react';
import ExploreClient from '@/components/explore/ExploreClient';
import { GridSkeleton } from '@/components/Loading';
import Container from '@/components/Container';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'Explore Destinations | VoyageAI',
  description: 'Discover incredible destinations from around the world. Search, filter, and find your next adventure.',
};

function ExploreLoadingFallback() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Explore Destinations"
        description="Discover incredible destinations from around the world. Search, filter, and find your next adventure."
      />
      <section className="section-py">
        <Container>
          <GridSkeleton count={12} />
        </Container>
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExploreLoadingFallback />}>
      <ExploreClient />
    </Suspense>
  );
}
