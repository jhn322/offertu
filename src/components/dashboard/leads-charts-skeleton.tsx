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
            <div className="h-[380px] pt-4">
              {/* Chart area */}
              <div className="h-[330px] w-full rounded-lg bg-muted/50 animate-pulse" />
              {/* X-axis labels */}
              <div className="flex justify-between mt-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-16 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="category">
            <div className="h-[450px] pt-4">
              {/* Chart area */}
              <div className="h-[400px] w-full rounded-lg bg-muted/50 animate-pulse" />
              {/* Category labels */}
              <div className="flex justify-between mt-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-24 bg-muted animate-pulse rounded"
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
