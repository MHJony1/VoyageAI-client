'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Input from '@/components/Input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: 'success', text: 'Thanks for subscribing!' });
      setEmail('');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({ type: 'error', text: 'Failed to subscribe. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section bgColor="gray" className="bg-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md border border-slate-200 p-8 md:p-12">
            <div className="flex items-center justify-center w-14 h-14 bg-sky-100 rounded-lg mx-auto mb-6">
              <Mail className="text-sky-600" size={24} />
            </div>

            <h2 className="text-h3 text-center text-slate-900 mb-3">
              Travel Inspiration Delivered
            </h2>

            <p className="text-center text-slate-600 mb-8 max-w-lg mx-auto">
              Subscribe to our newsletter for travel tips, destination guides, and exclusive AI-generated itineraries delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="flex items-center justify-center gap-2 px-6 w-full sm:w-auto"
                >
                  <Send size={18} />
                  Subscribe
                </Button>
              </div>

              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm font-medium text-center ${
                    message.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {message.text}
                </motion.div>
              )}

              <p className="text-xs text-slate-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
