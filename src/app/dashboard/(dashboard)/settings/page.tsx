'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Eye } from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const ToggleSwitch = ({ defaultChecked = false }: { defaultChecked?: boolean }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      onClick={() => setChecked(!checked)}
      className={`w-12 h-6 rounded-full transition-colors flex items-center ${
        checked ? 'bg-sky-600' : 'bg-slate-300'
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  );
};

export default function SettingsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Settings className="text-purple-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        </div>
        <p className="text-slate-600">Manage your account preferences</p>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-orange-600" size={24} />
          <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-600">Receive email updates about your trips</p>
            </div>
            <ToggleSwitch defaultChecked />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="font-medium text-slate-900">AI Recommendations</p>
              <p className="text-sm text-slate-600">Get personalized travel recommendations</p>
            </div>
            <ToggleSwitch defaultChecked />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div>
              <p className="font-medium text-slate-900">Marketing Emails</p>
              <p className="text-sm text-slate-600">Receive promotional content and offers</p>
            </div>
            <ToggleSwitch />
          </div>
        </div>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-red-600" size={24} />
          <h2 className="text-lg font-semibold text-slate-900">Privacy & Security</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-medium text-slate-900 transition-colors">
            Change Password
          </button>

          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-medium text-slate-900 transition-colors">
            Two-Factor Authentication
          </button>

          <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg font-medium text-slate-900 transition-colors">
            Manage Sessions
          </button>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Eye className="text-blue-600" size={24} />
          <h2 className="text-lg font-semibold text-slate-900">Preferences</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Theme</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <button className="w-full mt-6 px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium">
            Save Preferences
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
