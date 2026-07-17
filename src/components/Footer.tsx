import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, MessageSquare, Share2, Users } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg" />
              <span className="text-xl font-bold text-white">VoyageAI</span>
            </div>
            <p className="text-sm text-slate-400">
              Plan smarter. Travel better. Discover your next adventure with AI-powered travel planning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Explore
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Mail size={16} />
                <span>info@voyageai.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-600 hover:text-white transition-colors">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-600 hover:text-white transition-colors">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-600 hover:text-white transition-colors">
                <Share2 size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:bg-sky-600 hover:text-white transition-colors">
                <Users size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">
            &copy; {currentYear} VoyageAI. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
