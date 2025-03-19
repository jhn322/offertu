import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CareerSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2
              id="career-heading"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Karriär
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Vi söker talanger som vill vara med och forma framtidens
              offerthantering.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid gap-6 md:mt-16 md:grid-cols-2 lg:mt-24">
          <Card className="border-2 border-secondary bg-white">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-secondary p-2" aria-hidden="true">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Lediga tjänster</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Projektledare</li>
                <li>Back-end utvecklare</li>
              </ul>
              <Button
                asChild
                variant="outline"
                className="border-secondary text-white bg-secondary hover:bg-secondary/90 hover:text-white"
              >
                <Link
                  href="/karriarer"
                  className="inline-flex items-center gap-2"
                  aria-label="Se alla lediga tjänster"
                >
                  Karriär
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
