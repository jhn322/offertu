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
        </CardHeader>
        <CardContent className="h-[450px] flex flex-col justify-between">
          <div className="grid gap-6">
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
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <div className="h-6 w-8 bg-muted animate-pulse rounded" />
                <div className="h-4 w-12 bg-muted animate-pulse rounded" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="mt-1.5 h-1 w-full bg-muted animate-pulse rounded" />
            </div>

            {/* Category Distribution */}
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-40 bg-muted animate-pulse rounded" />
              </div>
              <div className="mt-3 space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                    </div>
                    <div className="h-1 w-full bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
