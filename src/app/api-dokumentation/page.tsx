'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Code, Lock, Zap } from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

export default function ApiDocumentation() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="container py-12">
      <div className="flex flex-col gap-6">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            API Dokumentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Effektivisera din verksamhet ytterligare genom att integrera våra
            tjänster direkt i dina system. Ansök om API-tillgång och skräddarsy
            lösningen efter dina behov.
          </p>

          {/* Button component for applying for API access */}
          <Button
            size="lg"
            className="bg-primary"
            onClick={() => setShowForm(true)}
            aria-label="Ansök om API-tillgång"
          >
            Ansök om API-tillgång
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </header>
        <Separator className="my-4" aria-hidden="true" />

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogOverlay className={'bg-slate-900/40 backdrop-blur-[2px]'} />
          <DialogContent
            className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
            aria-labelledby="dialog-title"
          >
            <DialogHeader className="text-left">
              <DialogTitle id="dialog-title" className="text-xl font-semibold">
                Ansök om vårat API
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Fyll i formuläret nedan så återkommer vi inom kort med mer
                information.
              </DialogDescription>
            </DialogHeader>
            <LeadForm category="api" showPhone={false} />
          </DialogContent>
        </Dialog>

        <section
          className="grid gap-8 md:grid-cols-3"
          aria-labelledby="features-title"
        >
          <h2 id="features-title" className="sr-only">
            API-funktioner
          </h2>
          <Card>
            <CardHeader>
              <Code className="h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle className="mt-4">Kraftfullt API</CardTitle>
              <CardDescription>
                Integrera våra tjänster sömlöst i dina befintliga system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                RESTful API med omfattande dokumentation och exempel för snabb
                implementation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle className="mt-4">Säker Integration</CardTitle>
              <CardDescription>
                Högsta säkerhetsnivå med modern autentisering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                OAuth 2.0 och API-nycklar för säker åtkomst till alla endpoints.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary" aria-hidden="true" />
              <CardTitle className="mt-4">Snabb & Pålitlig</CardTitle>
              <CardDescription>
                Optimerad prestanda med 99.9% upptid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Snabba svarstider och robust infrastruktur för tillförlitlig
                drift.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
