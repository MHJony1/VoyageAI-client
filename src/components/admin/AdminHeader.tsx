'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, ChevronDown, LogOut, Settings, Shield, Home } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { adminNavItems } from './AdminSidebar';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const current = adminNavItems.find((item) =>
    item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href),
  );
  const currentTitle = current?.label || 'Overview';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left - menu + breadcrumb */}
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
              href="/admin"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Admin
            </Link>
            {pathname !== '/admin' && (
              <>
                <span className="text-slate-300 text-sm">/</span>
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  {currentTitle}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center - site link */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Home size={16} />
            <span>View Site</span>
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full shadow-lg shadow-indigo-500/30" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-700">{user?.name || 'Admin'}</p>
                <p className="text-[10px] text-indigo-500 flex items-center gap-1">
                  <Shield className="w-2.5 h-2.5" />
                  Administrator
                </p>
              </div>
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-slate-200/60 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-indigo-50/80 to-violet-50/80 border-b border-slate-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold shadow-md">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-slate-500">{user?.email || 'admin@voyageai.com'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/admin/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Settings size={16} className="text-slate-400" />
                      Settings
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Home size={16} className="text-slate-400" />
                      User Dashboard
                    </Link>
                  </div>

                  <div className="border-t border-slate-200/60" />

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
