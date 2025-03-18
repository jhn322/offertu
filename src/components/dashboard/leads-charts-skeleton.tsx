import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';

export function LeadsChartsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent className="h-[540px]">
        <Tabs defaultValue="monthly" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <div className="h-9 w-full bg-muted animate-pulse rounded" />
            <div className="h-9 w-full bg-muted animate-pulse rounded" />
          </TabsList>
          <TabsContent value="monthly" className="h-[calc(100%-40px)]">
            <div className="h-full pt-4 flex flex-col">
              {/* Chart area */}
              <div className="h-[calc(100%-30px)] w-full rounded-lg bg-muted/50 animate-pulse" />
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
          <TabsContent value="category" className="h-[calc(100%-40px)]">
            <div className="h-full pt-4 flex flex-col">
              {/* Chart area */}
              <div className="h-[calc(100%-30px)] w-full rounded-lg bg-muted/50 animate-pulse" />
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
