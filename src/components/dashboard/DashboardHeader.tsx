'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Crown,
  Home,
  Compass,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const breadcrumbMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/ai-planner': 'AI Planner',
  '/dashboard/ai-recommendation': 'AI Recommendation',
  '/dashboard/ai-chat': 'AI Chat',
  '/dashboard/my-trips': 'My Trips',
  '/dashboard/ai-history': 'AI History',
  '/dashboard/reviews': 'Reviews',
  '/dashboard/profile': 'Profile',
  '/dashboard/settings': 'Settings',
};

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsDropdownOpen(false);
  };

  const currentPageTitle = breadcrumbMap[pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Dashboard
            </Link>
            {pathname !== '/dashboard' && (
              <>
                <span className="text-slate-300 text-sm">/</span>
                <span className="text-sm font-semibold text-slate-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {currentPageTitle}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center - Home & Explore Links */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Home size={16} />
            <span>Home</span>
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            href="/explore"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Compass size={16} />
            <span>Explore</span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200/60 rounded-xl hover:border-slate-300/80 transition-all focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-400 w-40"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full shadow-lg shadow-rose-500/30" />
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-700">
                  {user?.name || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5 text-amber-400" />
                  Premium
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden"
                >
                  {/* User Info */}
                  <div className="p-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-b border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
                      >
                        <Shield size={16} className="text-indigo-500" />
                        Admin Panel
                      </Link>
                    )}
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <User size={16} className="text-slate-400" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Settings size={16} className="text-slate-400" />
                      Settings
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200/60" />

                  {/* Logout */}
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
