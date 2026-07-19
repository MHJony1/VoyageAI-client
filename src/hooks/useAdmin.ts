import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import adminService from '@/services/admin.service';
import { uploadImage, uploadImages } from '@/services/upload.service';
import type { AdminListParams, DestinationFormValues } from '@/types/admin';

const errMsg = (error: unknown, fallback: string): string => {
  const e = error as { response?: { data?: { message?: string } }; message?: string };
  return e?.response?.data?.message || e?.message || fallback;
};

/* ------------------------------ Overview ------------------------------ */
export function useAdminOverview() {
  return useQuery({
    queryKey: ['admin', 'overview'],
    queryFn: () => adminService.getOverview(),
    staleTime: 1000 * 60 * 2,
  });
}

/* ---------------------------- Destinations ---------------------------- */
export function useAdminDestinations(params: AdminListParams) {
  return useQuery({
    queryKey: ['admin', 'destinations', params],
    queryFn: () => adminService.listDestinations(params),
    staleTime: 1000 * 30,
  });
}

export function useCreateDestination() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: DestinationFormValues) => adminService.createDestination(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'destinations'] });
      qc.invalidateQueries({ queryKey: ['admin', 'overview'] });
      toast.success('Destination created');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to create destination')),
  });
}

export function useUpdateDestination() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<DestinationFormValues> }) =>
      adminService.updateDestination(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'destinations'] });
      toast.success('Destination updated');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to update destination')),
  });
}

export function useDeleteDestination() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteDestination(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'destinations'] });
      qc.invalidateQueries({ queryKey: ['admin', 'overview'] });
      toast.success('Destination deleted');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to delete destination')),
  });
}

export function useToggleFeature() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.toggleFeature(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'destinations'] });
      toast.success('Feature status updated');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to update feature status')),
  });
}

export function useTogglePublish() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.togglePublish(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'destinations'] });
      toast.success('Publish status updated');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to update publish status')),
  });
}

/* -------------------------------- Users ------------------------------- */
export function useAdminUsers(params: AdminListParams) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: () => adminService.listUsers(params),
    staleTime: 1000 * 30,
  });
}

export function useChangeRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) => adminService.changeRole(id, role),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      toast.success('Role updated');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to update role')),
  });
}

export function useSetBlocked() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, blocked }: { id: string; blocked: boolean }) =>
      adminService.setBlocked(id, blocked),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      qc.invalidateQueries({ queryKey: ['admin', 'overview'] });
      toast.success(vars.blocked ? 'User blocked' : 'User unblocked');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to update block status')),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteUser(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      qc.invalidateQueries({ queryKey: ['admin', 'overview'] });
      toast.success('User deleted');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to delete user')),
  });
}

/* -------------------------------- Trips ------------------------------- */
export function useAdminTrips(params: AdminListParams) {
  return useQuery({
    queryKey: ['admin', 'trips', params],
    queryFn: () => adminService.listTrips(params),
    staleTime: 1000 * 30,
  });
}

export function useDeleteTrip() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteTrip(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'trips'] });
      qc.invalidateQueries({ queryKey: ['admin', 'overview'] });
      toast.success('Trip deleted');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to delete trip')),
  });
}

/* ------------------------------- Reviews ------------------------------ */
export function useAdminReviews(params: AdminListParams) {
  return useQuery({
    queryKey: ['admin', 'reviews', params],
    queryFn: () => adminService.listReviews(params),
    staleTime: 1000 * 30,
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteReview(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'reviews'] });
      qc.invalidateQueries({ queryKey: ['admin', 'overview'] });
      toast.success('Review deleted');
    },
    onError: (e) => toast.error(errMsg(e, 'Failed to delete review')),
  });
}

/* ------------------------------ AI History ---------------------------- */
export function useAdminAIHistory(params: AdminListParams) {
  return useQuery({
    queryKey: ['admin', 'ai-history', params],
    queryFn: () => adminService.listAIHistory(params),
    staleTime: 1000 * 30,
  });
}

/* ------------------------------ Uploads ------------------------------- */
export function useImageUpload() {
  return useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onError: (e) => toast.error(errMsg(e, 'Image upload failed')),
  });
}

export function useMultiImageUpload() {
  return useMutation({
    mutationFn: (files: File[]) => uploadImages(files),
    onError: (e) => toast.error(errMsg(e, 'Image upload failed')),
  });
}
