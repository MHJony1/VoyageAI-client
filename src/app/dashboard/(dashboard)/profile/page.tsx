'use client';

import { motion } from 'framer-motion';
import { User, Lock, Upload } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';
import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useUpdateProfile, useChangePassword } from '@/hooks/useUser';
import { toast } from 'sonner';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { formatDate } from '@/lib/utils';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ProfileForm = z.infer<typeof profileSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;

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

export default function ProfilePage() {
  const { user } = useAuth();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateProfileMutation = useUpdateProfile();
  const changePasswordMutation = useChangePassword();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = async (data: ProfileForm) => {
    try {
      await updateProfileMutation.mutateAsync({ name: data.name });
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const onPasswordSubmit = async (data: PasswordForm) => {
    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully');
      resetPassword();
      setShowPasswordForm(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const memberSinceDate = user?.createdAt ? formatDate(new Date(user.createdAt)) : 'N/A';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 md:p-6 max-w-4xl mx-auto"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
            <User className="text-cyan-600" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
        </div>
        <p className="text-slate-600">Manage your personal information</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-8 mb-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center text-2xl font-bold text-sky-600 overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : user?.photo ? (
                <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-sky-600 text-white p-2 rounded-full hover:bg-sky-700 transition-colors"
              title="Upload photo"
            >
              <Upload size={16} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{user?.name}</h2>
            <p className="text-slate-600 mb-2">{user?.email}</p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full font-medium">{user?.role}</span>
              <span className="text-slate-600">Joined {memberSinceDate}</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            {...registerProfile('name')}
            error={profileErrors.name?.message}
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="mt-1 text-sm text-slate-500">Email cannot be changed</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Role</label>
              <input
                type="text"
                value={user?.role}
                disabled
                className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">Member Since</label>
              <input
                type="text"
                value={memberSinceDate}
                disabled
                className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <Button
            type="submit"
            isLoading={updateProfileMutation.isPending}
            disabled={updateProfileMutation.isPending}
          >
            Save Changes
          </Button>
        </form>
      </motion.div>

      {/* Change Password Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-red-600" size={24} />
          <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
        </div>

        {!showPasswordForm ? (
          <Button variant="outline" onClick={() => setShowPasswordForm(true)}>
            Change Password
          </Button>
        ) : (
          <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
            <Input
              label="Current Password"
              type="password"
              {...registerPassword('oldPassword')}
              error={passwordErrors.oldPassword?.message}
              required
            />

            <Input
              label="New Password"
              type="password"
              {...registerPassword('newPassword')}
              error={passwordErrors.newPassword?.message}
              required
            />

            <Input
              label="Confirm New Password"
              type="password"
              {...registerPassword('confirmPassword')}
              error={passwordErrors.confirmPassword?.message}
              required
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                isLoading={changePasswordMutation.isPending}
                disabled={changePasswordMutation.isPending}
              >
                Update Password
              </Button>
              <Button variant="secondary" onClick={() => setShowPasswordForm(false)} type="button">
                Cancel
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
