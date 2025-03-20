import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LeadsChartsSkeleton() {
  return (
    <Card className="h-full w-full min-w-0 overflow-hidden">
      <CardHeader className="px-3 sm:px-6">
        <div className="h-6 w-24 bg-muted animate-pulse rounded" />
      </CardHeader>
      <CardContent className="px-3 sm:px-6">
        <Tabs defaultValue="monthly" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="monthly" className="px-1 sm:px-3">
              <div className="h-5 w-full bg-muted animate-pulse rounded" />
            </TabsTrigger>
            <TabsTrigger value="category" className="px-1 sm:px-3">
              <div className="h-5 w-full bg-muted animate-pulse rounded" />
            </TabsTrigger>
            <TabsTrigger value="pie" className="px-1 sm:px-3">
              <div className="h-5 w-full bg-muted animate-pulse rounded" />
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="monthly"
            className="min-h-[400px] sm:min-h-[500px]"
          >
            <div className="h-full pt-4 flex flex-col">
              {/* Chart area */}
              <div className="h-[calc(100%-30px)] w-full rounded-lg bg-muted/50 animate-pulse" />
              {/* X-axis labels */}
              <div className="flex justify-between mt-4 flex-wrap gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-12 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="category"
            className="min-h-[400px] sm:min-h-[500px]"
          >
            <div className="h-full pt-4 flex flex-col">
              {/* Chart area */}
              <div className="h-[calc(100%-30px)] w-full rounded-lg bg-muted/50 animate-pulse" />
              {/* Category labels */}
              <div className="flex justify-between mt-4 flex-wrap gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-16 bg-muted animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pie" className="min-h-[400px] sm:min-h-[500px]">
            <div className="h-full pt-4 flex flex-col items-center justify-center">
              {/* Pie chart placeholder */}
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-8 border-muted-foreground/20 animate-pulse mb-6">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="h-12 w-12 bg-muted animate-pulse rounded-full" />
                </div>
              </div>
              {/* Legend */}
              <div className="flex gap-2 flex-wrap justify-center mt-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-muted animate-pulse rounded-full" />
                    <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
