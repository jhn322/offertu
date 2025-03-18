import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function LeadsOverviewSkeleton() {
  return (
    <div className="grid gap-4">
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          {/* Date Range Picker Skeleton */}
          <div className="mt-2">
            <div className="h-10 w-full bg-muted animate-pulse rounded" />
          </div>
        </CardHeader>
        <CardContent className="h-[545px] flex flex-col justify-between">
          <div className="grid gap-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <div className="h-6 w-8 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                  </div>
                  {i === 1 && (
                    <div className="mt-1 h-4 w-32 bg-muted animate-pulse rounded" />
                  )}
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border p-2 h-24">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <div className="h-6 w-8 bg-muted animate-pulse rounded" />
                <div className="h-4 w-12 bg-muted animate-pulse rounded" />
              </div>
              {/* Progress indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-2.5 w-2.5 bg-muted animate-pulse rounded-full" />
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
              </div>
            </div>

            {/* Radial Chart Skeleton */}
            <div className="rounded-lg border p-5">
              <div className="flex justify-between items-center mb-3">
                <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              </div>

              {/* Radial Chart Placeholder */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-40 h-40 rounded-full border-8 border-muted-foreground/20 animate-pulse">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-16 bg-muted animate-pulse rounded" />
                  </div>
                </div>
                <div className="mt-4 h-4 w-16 bg-muted animate-pulse rounded" />
              </div>

              {/* Stats row */}
              <div className="flex justify-between items-center mt-4">
                <div className="h-4 w-48 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
