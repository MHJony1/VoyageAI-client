'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Lock, Eye, LogOut } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateSettings, useLogoutAllDevices, useUserSettings } from '@/hooks/useUser';
import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';
import ToggleSwitch from '@/components/ToggleSwitch';
import Select from '@/components/Select';
import Button from '@/components/Button';

const settingsSchema = z.object({
  emailNotifications: z.boolean(),
  aiNotifications: z.boolean(),
  tripReminder: z.boolean(),
  marketingEmails: z.boolean(),
  profileVisibility: z.enum(['public', 'private']),
  activityVisibility: z.enum(['public', 'private']),
  theme: z.enum(['light', 'dark', 'system']),
  language: z.string(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

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

const defaultSettings: SettingsForm = {
  emailNotifications: true,
  aiNotifications: true,
  tripReminder: true,
  marketingEmails: false,
  profileVisibility: 'public',
  activityVisibility: 'public',
  theme: 'system',
  language: 'en',
};

export default function SettingsPage() {
  const { logout } = useAuth();
  const { data: settingsData, isLoading: settingsLoading } = useUserSettings();
  const updateSettingsMutation = useUpdateSettings();
  const logoutAllDevicesMutation = useLogoutAllDevices();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settingsData?.data || defaultSettings,
  });

  const onSubmit = async (data: SettingsForm) => {
    try {
      await updateSettingsMutation.mutateAsync(data);
      toast.success('Settings saved successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    }
  };

  const handleLogoutAllDevices = async () => {
    if (!confirm('Are you sure? This will log you out on all devices.')) return;
    try {
      await logoutAllDevicesMutation.mutateAsync();
      toast.success('Logged out from all devices');
      logout();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to logout from all devices');
    }
  };

  if (settingsLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-4 md:p-6 max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        </div>
      </motion.div>
    );
  }

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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Notification Settings */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="text-orange-600" size={24} />
            <h2 className="text-lg font-semibold text-slate-900">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            <Controller
              name="emailNotifications"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Email Notifications</p>
                    <p className="text-sm text-slate-600">Receive email updates about your trips</p>
                  </div>
                  <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />

            <div className="border-t border-slate-200" />

            <Controller
              name="aiNotifications"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="font-medium text-slate-900">AI Notifications</p>
                    <p className="text-sm text-slate-600">Get personalized travel recommendations</p>
                  </div>
                  <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />

            <div className="border-t border-slate-200" />

            <Controller
              name="tripReminder"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="font-medium text-slate-900">Trip Reminders</p>
                    <p className="text-sm text-slate-600">Get reminders for upcoming trips</p>
                  </div>
                  <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />

            <div className="border-t border-slate-200" />

            <Controller
              name="marketingEmails"
              control={control}
              render={({ field }) => (
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="font-medium text-slate-900">Marketing Emails</p>
                    <p className="text-sm text-slate-600">Receive promotional content and offers</p>
                  </div>
                  <ToggleSwitch checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="text-blue-600" size={24} />
            <h2 className="text-lg font-semibold text-slate-900">Privacy Settings</h2>
          </div>

          <div className="space-y-4">
            <Controller
              name="profileVisibility"
              control={control}
              render={({ field }) => (
                <Select
                  label="Profile Visibility"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'private', label: 'Private' },
                  ]}
                />
              )}
            />

            <Controller
              name="activityVisibility"
              control={control}
              render={({ field }) => (
                <Select
                  label="Activity Visibility"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'public', label: 'Public' },
                    { value: 'private', label: 'Private' },
                  ]}
                />
              )}
            />
          </div>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="text-teal-600" size={24} />
            <h2 className="text-lg font-semibold text-slate-900">Appearance</h2>
          </div>

          <div className="space-y-4">
            <Controller
              name="theme"
              control={control}
              render={({ field }) => (
                <Select
                  label="Theme"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'system', label: 'System' },
                  ]}
                />
              )}
            />

            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select
                  label="Language"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { value: 'en', label: 'English' },
                    { value: 'es', label: 'Spanish' },
                    { value: 'fr', label: 'French' },
                  ]}
                />
              )}
            />
          </div>
        </motion.div>

        {/* Security Settings */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-red-600" size={24} />
            <h2 className="text-lg font-semibold text-slate-900">Security</h2>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleLogoutAllDevices}
              isLoading={logoutAllDevicesMutation.isPending}
              disabled={logoutAllDevicesMutation.isPending}
              className="w-full"
            >
              <LogOut size={18} />
              Logout All Devices
            </Button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button
            type="submit"
            isLoading={updateSettingsMutation.isPending}
            disabled={updateSettingsMutation.isPending || !isDirty}
          >
            Save Settings
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
