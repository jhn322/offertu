export function LeadsTableSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-5 md:h-6 w-24 md:w-32 bg-muted animate-pulse rounded" />
          <div className="h-3 md:h-4 w-48 md:w-64 bg-muted animate-pulse rounded" />
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="h-9 w-full sm:w-[250px] bg-muted animate-pulse rounded" />
            <div className="h-9 w-full sm:w-[150px] bg-muted animate-pulse rounded" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          {/* Table Header */}
          <div className="hidden sm:block h-12 border-b bg-muted/5">
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
            <div key={i} className="border-b last:border-0">
              {/* Mobile View */}
              <div className="sm:hidden p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-36 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:grid grid-cols-6 px-4 py-4">
                {[...Array(6)].map((_, j) => (
                  <div
                    key={j}
                    className="h-5 w-full max-w-[120px] bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 px-2 pt-2">
          <div className="h-4 sm:h-5 w-24 sm:w-32 bg-muted animate-pulse rounded" />
          <div className="flex space-x-2">
            <div className="h-8 sm:h-9 w-8 sm:w-9 bg-muted animate-pulse rounded" />
            <div className="h-8 sm:h-9 w-24 sm:w-28 bg-muted animate-pulse rounded" />
            <div className="h-8 sm:h-9 w-24 sm:w-28 bg-muted animate-pulse rounded" />
            <div className="h-8 sm:h-9 w-8 sm:w-9 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
