export function LeadsTableSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="h-9 w-[250px] bg-muted animate-pulse rounded" />
            <div className="h-9 w-[150px] bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          {/* Table Header */}
          <div className="h-12 border-b bg-muted/5">
            <div className="grid grid-cols-6 px-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-24 bg-muted animate-pulse rounded my-4"
                />
              ))}
            </div>
          </div>

          {/* Table Rows */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 px-4 py-4 border-b last:border-0"
            >
              {[...Array(6)].map((_, j) => (
                <div
                  key={j}
                  className="h-5 w-32 bg-muted animate-pulse rounded"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          <div className="flex space-x-2">
            <div className="h-9 w-28 bg-muted animate-pulse rounded" />
            <div className="h-9 w-28 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
