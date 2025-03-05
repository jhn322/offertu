import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';

export function LeadsChartsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <div className="h-9 w-full bg-muted animate-pulse rounded" />
            <div className="h-9 w-full bg-muted animate-pulse rounded" />
          </TabsList>
          <TabsContent value="monthly">
            <div className="h-[300px] pt-4">
              {/* X-axis labels */}
              <div className="flex justify-between mb-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-12 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
              {/* Chart area */}
              <div className="h-[250px] w-full rounded-lg bg-muted/50 animate-pulse" />
              {/* Y-axis labels */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-6 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="category">
            <div className="h-[300px] pt-4">
              {/* X-axis labels */}
              <div className="flex justify-between mb-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-12 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
              {/* Chart area */}
              <div className="h-[250px] w-full rounded-lg bg-muted/50 animate-pulse" />
              {/* Y-axis labels */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 space-y-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-6 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
