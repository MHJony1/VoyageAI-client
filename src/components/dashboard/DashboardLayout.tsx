'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/80 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-7xl mx-auto"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
