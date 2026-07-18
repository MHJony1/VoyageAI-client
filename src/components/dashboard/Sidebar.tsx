'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LayoutDashboard,
  Wand2,
  Compass,
  MessageCircle,
  Backpack,
  History,
  Star,
  User,
  Settings,
  LogOut,
  ChevronRight,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

const topItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Compass, label: 'Explore', href: '/explore' },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Wand2, label: 'AI Planner', href: '/dashboard/ai-planner' },
  { icon: Compass, label: 'AI Recommendation', href: '/dashboard/ai-recommendation' },
  { icon: MessageCircle, label: 'AI Chat', href: '/dashboard/ai-chat' },
  { icon: Backpack, label: 'My Trips', href: '/dashboard/my-trips' },
  { icon: History, label: 'AI History', href: '/dashboard/ai-history' },
  { icon: Star, label: 'Reviews', href: '/dashboard/reviews' },
];

const bottomItems = [
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const sidebarVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    closed: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <Link href="/" onClick={onClose}>
          {!isCollapsed && (
            <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg" />
              <span className="font-bold text-slate-900">VoyageAI</span>
            </div>
          )}
          {isCollapsed && <div className="w-8 h-8 bg-gradient-primary rounded-lg cursor-pointer hover:opacity-80 transition-opacity" />}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          aria-label="Toggle sidebar"
        >
          <ChevronRight size={18} className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
        <button
          onClick={onClose}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {/* Top Navigation Items (Home, Explore) */}
        <div className="mb-4 pb-4 border-b border-slate-200">
          {topItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors group ${
                  active
                    ? 'bg-sky-100 text-sky-600 font-medium'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
                {active && !isCollapsed && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </div>

        {/* Main Dashboard Items */}
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors group ${
                active
                  ? 'bg-sky-100 text-sky-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
              {active && !isCollapsed && <ChevronRight size={16} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Items */}
      <div className="border-t border-slate-200 p-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                active
                  ? 'bg-sky-100 text-sky-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 h-screen w-64 bg-white z-50 md:hidden flex flex-col"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
