'use client';

import { motion, type Variants } from 'framer-motion';
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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function DestinationDetailClient({
  id,
}: DestinationDetailClientProps) {
  const { data: destination, isLoading, error, refetch } = useDestination(id);
  const { data: relatedDestinations = [], isLoading: relatedLoading } =
    useRelatedDestinations(destination?.category || null, id);
  const {
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useDestinationReviews(id);

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
            action={{
              label: 'Back to Explore',
              onClick: () => (window.location.href = '/explore'),
            }}
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <DestinationHero destination={destination} />

      <section className="py-16 bg-gradient-to-b from-white to-slate-50/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <KeyInformation destination={destination} />
              </motion.div>

              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    <h2 className="text-2xl font-bold text-slate-900">
                      About {destination.title}
                    </h2>
                  </div>
                  <p className="text-base text-slate-600 leading-relaxed max-w-3xl">
                    {destination.description}
                  </p>
                </div>
              </motion.div>

              {destination.gallery && destination.gallery.length > 0 && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <ImageGallery
                    images={destination.gallery}
                    destinationName={destination.title}
                  />
                </motion.div>
              )}

              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <ReviewsSection
                  reviews={reviews}
                  isLoading={reviewsLoading}
                  error={reviewsError}
                />
              </motion.div>

              {relatedDestinations.length > 0 && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <RelatedDestinations
                    destinations={relatedDestinations}
                    isLoading={relatedLoading}
                  />
                </motion.div>
              )}
            </div>

            {/* Right Column - Sticky Action Card */}
            <div className="lg:col-span-1">
              <ActionCard destination={destination} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
