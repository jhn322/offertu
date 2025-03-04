export function LeadsOverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Mobile summary skeleton */}
      <div className="md:hidden col-span-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-8 bg-muted animate-pulse rounded" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
            </div>
            <div className="border-t pt-2 space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop cards skeleton */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6 space-y-2">
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
