'use client';

import { motion } from 'framer-motion';
import Container from '@/components/Container';
import ErrorState from '@/components/ErrorState';
import { useDestination, useRelatedDestinations } from '@/hooks/useDestination';
import { useDestinationReviews } from '@/hooks/useDestinationReviews';
import DestinationHero from './DestinationHero';
import KeyInformation from './KeyInformation';
import ImageGallery from './ImageGallery';
import ReviewsSection from './ReviewsSection';
import RelatedDestinations from './RelatedDestinations';
import ActionCard from './ActionCard';
import DetailSkeleton from './DetailSkeleton';

interface DestinationDetailClientProps {
  id: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function DestinationDetailClient({ id }: DestinationDetailClientProps) {
  const { data: destination, isLoading, error, refetch } = useDestination(id);
  const { data: relatedDestinations = [], isLoading: relatedLoading } = useRelatedDestinations(
    destination?.category || null,
    id
  );
  const { reviews, isLoading: reviewsLoading, error: reviewsError } = useDestinationReviews(id);

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (error || !destination) {
    return (
      <div className="section-py">
        <Container>
          <ErrorState
            title="Destination not found"
            message="The destination you're looking for doesn't exist or has been removed."
            onRetry={() => refetch()}
            action={{ label: 'Back to Explore', onClick: () => window.location.href = '/explore' }}
          />
        </Container>
      </div>
    );
  }

  return (
    <>
      <DestinationHero destination={destination} />

      <section className="section-py bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              <motion.div variants={sectionVariants} initial="hidden" whileInView="visible">
                <KeyInformation destination={destination} />
              </motion.div>

              <motion.div variants={sectionVariants} initial="hidden" whileInView="visible">
                <div className="space-y-4">
                  <h2 className="text-h3 font-bold text-slate-900">About</h2>
                  <p className="text-body-lg text-slate-700 leading-relaxed">{destination.description}</p>
                </div>
              </motion.div>

              {destination.gallery && destination.gallery.length > 0 && (
                <motion.div variants={sectionVariants} initial="hidden" whileInView="visible">
                  <ImageGallery images={destination.gallery} destinationName={destination.title} />
                </motion.div>
              )}

              <motion.div variants={sectionVariants} initial="hidden" whileInView="visible">
                <ReviewsSection reviews={reviews} isLoading={reviewsLoading} error={reviewsError} />
              </motion.div>

              {relatedDestinations.length > 0 && (
                <motion.div variants={sectionVariants} initial="hidden" whileInView="visible">
                  <RelatedDestinations destinations={relatedDestinations} isLoading={relatedLoading} />
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-1">
              <ActionCard destination={destination} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
