import { Skeleton } from '@/components/Loading';

export default function DetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="w-full h-96 md:h-[500px]" />

      <div className="container-custom space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>

        <Skeleton className="h-96 w-full" />

        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
