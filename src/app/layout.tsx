import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-primary',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'VoyageAI - AI-powered Travel Planning',
  description: 'Plan smarter. Travel better. AI-powered travel itinerary planning.',
  keywords: ['travel', 'ai', 'planning', 'destinations', 'trips'],
  openGraph: {
    title: 'VoyageAI - AI-powered Travel Planning',
    description: 'Plan smarter. Travel better.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.variable}>
        <QueryProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
