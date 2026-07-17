import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section bgColor="gradient" className="text-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-h1 text-white">Plan Smarter. Travel Better.</h1>
              <p className="text-lg text-white/90">
                Discover amazing destinations and create personalized travel itineraries with AI-powered recommendations tailored to your preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/explore">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Explore Destinations
                  </Button>
                </Link>
                <Link href="/ai/planner">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    AI Trip Planner
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full h-96 bg-white/10 rounded-lg border-2 border-white/20 flex items-center justify-center">
                <span className="text-white/50">Travel Illustration</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Section */}
      <Section>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-h2 text-slate-900 mb-4">Featured Destinations</h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto">
              Explore our handpicked collection of the world's most incredible destinations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-slate-200" />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">Destination {i + 1}</h3>
                  <p className="text-sm text-slate-600">Placeholder content for featured destinations</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section bgColor="gray">
        <Container>
          <div className="text-center">
            <h2 className="text-h2 text-slate-900 mb-4">Ready to Start Your Adventure?</h2>
            <p className="text-body-lg text-slate-600 max-w-2xl mx-auto mb-8">
              Create personalized travel plans with our AI-powered trip planner
            </p>
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
