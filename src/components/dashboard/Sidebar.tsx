'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Wand2,
  Compass,
  MessageCircle,
  Backpack,
  History,
  Star,
  ChevronRight,
  X,
  Sparkles,
  Crown,
  LogOut,
} from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wand2, label: 'AI Planner', href: '/dashboard/ai-planner' },
  {
    icon: Compass,
    label: 'AI Recommendation',
    href: '/dashboard/ai-recommendation',
  },
  { icon: MessageCircle, label: 'AI Chat', href: '/dashboard/ai-chat' },
  { icon: Backpack, label: 'My Trips', href: '/dashboard/my-trips' },
  { icon: History, label: 'AI History', href: '/dashboard/ai-history' },
  { icon: Star, label: 'Reviews', href: '/dashboard/reviews' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
    onClose();
  };

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-gradient-to-b from-white to-slate-50/80">
      {/* Premium Header */}
      <div className="relative p-4 border-b border-slate-200/60 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            {!isCollapsed && (
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VoyageAI
                </span>
                <p className="text-[8px] text-slate-400 tracking-widest uppercase">
                  Premium Travel
                </p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <ChevronRight
              size={16}
              className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
            />
          </button>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* User Profile */}
      {!isCollapsed && (
        <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" />
                Premium Member
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items - Only Dashboard items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
          {!isCollapsed ? 'Menu' : '•••'}
        </p>
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all duration-200 group ${
                active
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon
                size={isCollapsed ? 20 : 18}
                className={
                  active
                    ? 'text-blue-500'
                    : 'text-slate-400 group-hover:text-slate-600'
                }
              />
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1">
                    {item.label}
                  </span>
                  {active && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom - Only Logout */}
      <div className="border-t border-slate-200/60 p-3">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <LogOut
            size={isCollapsed ? 20 : 18}
            className="text-slate-400 group-hover:text-red-500"
          />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white border-r border-slate-200/60 shadow-sm transition-all duration-300 ${
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
              className="fixed left-0 top-0 h-screen w-72 bg-white z-50 md:hidden flex flex-col shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
