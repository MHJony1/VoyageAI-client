'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  MapPin,
  Users,
  Backpack,
  Star,
  History,
  Settings,
  ChevronRight,
  X,
  Shield,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';

export const adminNavItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: MapPin, label: 'Destinations', href: '/admin/destinations' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Backpack, label: 'Trips', href: '/admin/trips' },
  { icon: Star, label: 'Reviews', href: '/admin/reviews' },
  { icon: History, label: 'AI History', href: '/admin/ai-history' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  const handleLogout = () => {
    logout();
    router.push('/');
    onClose();
  };

  const sidebarVariants: Variants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } },
    closed: { x: '-100%', opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-800 text-slate-200">
      {/* Header */}
      <div className="relative p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  VoyageAI
                </span>
                <p className="text-[8px] text-slate-400 tracking-widest uppercase">Admin Panel</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Admin Profile */}
      {!isCollapsed && (
        <div className="mx-3 mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-slate-800 rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-xs text-indigo-300 truncate flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Administrator
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
          {!isCollapsed ? 'Management' : '•••'}
        </p>
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon
                size={isCollapsed ? 20 : 18}
                className={active ? 'text-indigo-300' : 'text-slate-500 group-hover:text-slate-300'}
              />
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  {active && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
        >
          <LogOut size={isCollapsed ? 20 : 18} className="text-slate-500 group-hover:text-red-400" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div
        className={`hidden md:flex flex-col shadow-sm transition-all duration-300 ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 h-screen w-72 z-50 md:hidden flex flex-col shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
