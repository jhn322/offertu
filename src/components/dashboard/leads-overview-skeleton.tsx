export function LeadsOverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(5)].map((_, i) => (
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
  );
}
