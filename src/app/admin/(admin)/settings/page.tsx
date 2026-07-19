'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { UserCog, KeyRound } from 'lucide-react';
import { userService } from '@/services/user.service';
import { useAuth } from '@/providers/AuthProvider';
import { AdminPageHeader } from '@/components/admin/AdminUI';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { Card, CardBody, CardHeader } from '@/components/Card';

const profileSchema = z.object({
  name: z.string().min(2, 'Name is required'),
});
type ProfileForm = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, 'Current password is required'),
    newPassword: z.string().min(6, 'Must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
type PasswordForm = z.infer<typeof passwordSchema>;

export default function AdminSettingsPage() {
  const { user, restoreSession } = useAuth();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profileForm = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: { name: user?.name || '' },
  });

  const passwordForm = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  });

  const submitProfile = async (data: ProfileForm) => {
    setSavingProfile(true);
    try {
      await userService.updateProfile({ name: data.name });
      await restoreSession();
      toast.success('Profile updated');
    } catch (e) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const submitPassword = async (data: PasswordForm) => {
    setSavingPassword(true);
    try {
      await userService.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success('Password changed');
      passwordForm.reset();
    } catch (e) {
      const msg = (e as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Settings" description="Manage your admin account" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <UserCog size={18} className="text-indigo-500" />
            <span className="font-semibold text-slate-800">Profile</span>
          </CardHeader>
          <CardBody>
            <form onSubmit={profileForm.handleSubmit(submitProfile)} className="space-y-4">
              <Input
                label="Name"
                {...profileForm.register('name')}
                error={profileForm.formState.errors.name?.message}
              />
              <Input label="Email" value={user?.email || ''} disabled />
              <Input label="Role" value={user?.role || ''} disabled className="capitalize" />
              <Button type="submit" isLoading={savingProfile}>
                Save Profile
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader className="flex items-center gap-2">
            <KeyRound size={18} className="text-indigo-500" />
            <span className="font-semibold text-slate-800">Change Password</span>
          </CardHeader>
          <CardBody>
            {user?.provider !== 'local' ? (
              <p className="text-sm text-slate-500">
                Password change is only available for local accounts.
              </p>
            ) : (
              <form onSubmit={passwordForm.handleSubmit(submitPassword)} className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  {...passwordForm.register('oldPassword')}
                  error={passwordForm.formState.errors.oldPassword?.message}
                />
                <Input
                  label="New Password"
                  type="password"
                  {...passwordForm.register('newPassword')}
                  error={passwordForm.formState.errors.newPassword?.message}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  {...passwordForm.register('confirmPassword')}
                  error={passwordForm.formState.errors.confirmPassword?.message}
                />
                <Button type="submit" isLoading={savingPassword}>
                  Update Password
                </Button>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
