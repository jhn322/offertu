import { Card, CardContent } from '@/components/ui/card';

export function LeadsOverviewSkeleton() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="pt-6">
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
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex justify-between items-center py-1">
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-8 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
