import { useQuery } from '@tanstack/react-query';
import dashboardService from '@/services/dashboard.service';

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => dashboardService.getOverview(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useDashboardStatistics() {
  return useQuery({
    queryKey: ['dashboard', 'statistics'],
    queryFn: () => dashboardService.getStatistics(),
    staleTime: 1000 * 60 * 5,
  });
}
