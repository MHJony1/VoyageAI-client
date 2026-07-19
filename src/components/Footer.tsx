'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Share2,
  Users,
  Sparkles,
  Heart,
  ArrowUp,
  Shield,
  Clock,
  Globe,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-slate-800">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-white">VoyageAI</span>
                <p className="text-[10px] text-slate-500 tracking-widest uppercase">
                  Plan Smarter • Travel Better
                </p>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Plan smarter. Travel better. Discover your next adventure with
              AI-powered travel planning.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                <Shield className="w-3 h-3 text-emerald-400" />
                Secure
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                <Clock className="w-3 h-3 text-blue-400" />
                24/7 Support
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                <Users className="w-3 h-3 text-purple-400" />
                100K+ Users
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Explore Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  About VoyageAI
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>info@voyageai.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
            <div className="flex gap-2 mt-4">
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition-all"
              >
                <Users className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} VoyageAI. All rights reserved. Made with{' '}
            <Heart className="inline w-3.5 h-3.5 text-rose-500 fill-rose-500" />{' '}
            for travelers worldwide.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-slate-500 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <span className="w-px h-4 bg-slate-800" />
            <Link
              href="/terms"
              className="text-slate-500 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <span className="w-px h-4 bg-slate-800" />
            <Link
              href="/cookies"
              className="text-slate-500 hover:text-white transition-colors"
            >
              Cookies
            </Link>
            <span className="w-px h-4 bg-slate-800" />
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
