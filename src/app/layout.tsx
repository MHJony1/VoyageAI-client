import type { Metadata } from 'next';
import { QueryProvider } from '@/providers/QueryProvider';
import './globals.css';

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
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
