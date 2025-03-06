import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { articles } from './data';

export default function NewsPage() {
  return (
    <>
      <section className="container py-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Nyheter
            </h1>
            <p className="text-xl text-muted-foreground">
              Ta del av de senaste trenderna, expertråden och branschnyheterna
              inom offerering och projektkalkylering.
            </p>
          </div>
          <Separator className="my-4" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.slug} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {article.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button
                    asChild
                    className="ml-auto bg-[#FFAE00] text-primary-foreground hover:bg-[#FFAE00]/90"
                  >
                    <Link href={`/nyheter/${article.slug}`}>
                      Läs mer <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
