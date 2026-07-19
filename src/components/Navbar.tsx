'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  LogOut,
  User,
  Sparkles,
  Compass,
  LayoutDashboard,
  Bot,
  Home,
  Info,
  Mail,
  ChevronDown,
  Settings,
  HelpCircle,
  Shield,
} from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const publicLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/about', label: 'About', icon: Info },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  const authenticatedLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/ai/planner', label: 'AI Planner', icon: Bot },
  ];

  const navLinks = isAuthenticated ? authenticatedLinks : publicLinks;

  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname?.startsWith(path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/50'
          : 'bg-white border-b border-slate-200/30'
      }`}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                VoyageAI
              </span>
              <span className="text-[10px] lg:text-xs text-slate-400 font-medium tracking-wider uppercase">
                Plan Smarter • Travel Better
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 group ${
                    active
                      ? 'text-sky-700 bg-sky-50/80 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      active
                        ? 'text-sky-500'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{link.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50/80 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-all">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-slate-700">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-400">Premium</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200/50 py-1.5 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        Settings
                      </Link>
                      <Link
                        href="/help"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-slate-400" />
                        Help & Support
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 py-1">
                      <Link
                        href="/privacy"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Shield className="w-4 h-4 text-slate-400" />
                        Privacy
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-200 hover:scale-105"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-3 border-t border-slate-200/50 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'text-sky-700 bg-sky-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      active ? 'text-sky-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{link.label}</span>
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-500" />
                  )}
                </Link>
              );
            })}

            <div className="mt-3 pt-3 border-t border-slate-200/50">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 mb-2 bg-slate-50/80 rounded-xl">
                    <p className="text-sm font-medium text-slate-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-slate-500">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200"
                  >
                    <User className="w-5 h-5 text-slate-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200"
                  >
                    <Settings className="w-5 h-5 text-slate-400" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50/80 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2 px-4">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50/80 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
