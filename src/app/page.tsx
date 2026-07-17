import HeroSection from '@/components/home/HeroSection';
import FeaturedDestinations from '@/components/home/FeaturedDestinations';
import AIFeatures from '@/components/home/AIFeatures';
import WhyChoose from '@/components/home/WhyChoose';
import TravelStats from '@/components/home/TravelStats';
import PopularCategories from '@/components/home/PopularCategories';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <AIFeatures />
      <WhyChoose />
      <TravelStats />
      <PopularCategories />
      <Testimonials />
      <Newsletter />
      <CTASection />
    </>
  );
}
