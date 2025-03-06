import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function ArticleLoading() {
  return (
    <>
      <main className="max-w-5xl mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className="mb-4 pl-0 text-muted-foreground"
          >
            <Link href="/nyheter">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Tillbaka till nyheter
            </Link>
          </Button>

          <Skeleton className="mb-4 h-8 w-24" />

          <Skeleton className="mb-4 h-12 w-3/4" />

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_250px]">
          <div className="article-content">
            <Skeleton className="mb-8 aspect-video w-full rounded-lg" />

            <div className="space-y-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <Skeleton className="h-9 w-24" />
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-20">
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <Skeleton className="mb-4 h-6 w-20" />
                <div className="space-y-3">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-4 w-full" />
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-lg border bg-card p-4 shadow-sm">
                <Skeleton className="mb-4 h-6 w-40" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
