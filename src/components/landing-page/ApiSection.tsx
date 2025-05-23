import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function ApiSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2
              id="api-heading"
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            >
              Integrera Offertu i ditt system
            </h2>
            <div>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Effektivisera din verksamhet ytterligare genom att integrera
                våra tjänster direkt i dina system. Ansök om API-tillgång och
                skräddarsy lösningen efter dina behov.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 grid items-center gap-6 md:mt-16 md:grid-cols-2 md:gap-12 lg:mt-24">
          <Card className="border-2 border-primary bg-white">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary p-2" aria-hidden="true">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Vårt API</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Få tillgång till vårt kraftfulla API och börja integrera våra
                tjänster i ditt system redan idag.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link
                  href="/api-dokumentation"
                  className="inline-flex items-center gap-2"
                  aria-label="Gå till API-dokumentation"
                >
                  Kom igång med API
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <div className="relative hidden md:block">
            <div
              className="absolute left-0 right-0 top-1/2 h-px max-w-full -translate-y-1/2 bg-gradient-to-r from-muted via-muted-foreground to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
