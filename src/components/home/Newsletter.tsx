'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Sparkles,
  Crown,
  Shield,
  ArrowRight,
  Compass,
  Heart,
} from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({
        type: 'success',
        text: '🎉 Thanks for subscribing! Welcome to the VoyageAI family.',
      });
      setEmail('');
      setTimeout(() => setMessage(null), 4000);
    } catch {
      setMessage({
        type: 'error',
        text: 'Failed to subscribe. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #e2e8f0 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-1/2 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-gradient-to-l from-amber-400/10 to-pink-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-white rounded-3xl border border-slate-200/60 p-8 md:p-12 lg:p-16 shadow-xl hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-amber-100/20 to-pink-100/20 rounded-full blur-3xl" />

            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="relative z-10 text-center">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-1.5 rounded-full border border-blue-200/30 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[10px] text-slate-600 font-medium tracking-[0.2em] uppercase">
                  Premium Newsletter
                </span>
                <Crown className="w-3.5 h-3.5 text-amber-500" />
              </motion.div>

              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl mx-auto mb-6 shadow-lg shadow-blue-500/20"
              >
                <Compass size={32} />
              </motion.div>

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Get Travel{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Inspiration
                </span>
              </h2>

              <p className="text-slate-500 text-base sm:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Subscribe to receive exclusive travel tips, destination guides,
                and AI-generated itineraries tailored to your interests.
              </p>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              >
                {[
                  {
                    icon: Sparkles,
                    label: 'AI Itineraries',
                    color: 'text-blue-600',
                  },
                  {
                    icon: Shield,
                    label: 'Privacy First',
                    color: 'text-emerald-600',
                  },
                  {
                    icon: Heart,
                    label: 'Weekly Updates',
                    color: 'text-rose-600',
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-2 text-slate-600 text-sm"
                  >
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                    <span>{feature.label}</span>
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <form
                onSubmit={handleSubscribe}
                className="space-y-4 max-w-xl mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 min-w-[140px]"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </div>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Subscribe</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </motion.button>
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-xl text-sm font-medium text-center ${
                      message.type === 'success'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}

                <p className="text-slate-400 text-xs text-center flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  10,000+ subscribers
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Free to join
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Cancel anytime
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
