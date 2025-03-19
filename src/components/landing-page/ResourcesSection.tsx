import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  PenToolIcon as Tool,
  Newspaper,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ResourcesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <h2
          id="resources-heading"
          className="sr-only text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
        >
          Resurser och verktyg
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="bg-white">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-lg bg-bg-primary-foreground p-2"
                    aria-hidden="true"
                  >
                    <Newspaper className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Nyheter</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ta del av de senaste trenderna, expertråden och
                  branschnyheterna inom offerering och projektkalkylering.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                >
                  <Link
                    href="nyheter"
                    className="inline-flex items-center gap-2"
                    aria-label="Läs våra nyheter och artiklar"
                  >
                    Nyheter
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </article>

          <article className="bg-white">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-lg bg-primary-foreground p-2"
                    aria-hidden="true"
                  >
                    <Tool className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Verktyg</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Snabba och enkla verktyg för grundläggande offertberäkningar.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                >
                  <Link
                    href="/verktyg-resurser"
                    className="inline-flex items-center gap-2"
                    aria-label="Utforska våra kostnadsfria verktyg"
                  >
                    Verktyg (gratis)
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </article>

          <article className="bg-white lg:col-span-1 md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-lg bg-primary-foreground p-2"
                    aria-hidden="true"
                  >
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Mallar</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Professionella offertmallar</li>
                  <li>Juridiskt granskade kontraktmallar</li>
                  <li>Checklistor för offertgenomgång</li>
                </ul>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link
                    href="/mallar"
                    className="inline-flex items-center gap-2"
                    aria-label="Ladda ner våra professionella mallar"
                  >
                    Ladda ner mallar
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </article>
        </div>
      </div>
    </section>
  );
}
