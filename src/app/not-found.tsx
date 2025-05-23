import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sidan kunde inte hittas!',
  description:
    'Tyvärr kunde vi inte hitta sidan du sökte efter. Kontrollera webbadressen eller gå tillbaka till startsidan.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="h-screen w-full flex items-center justify-center bg-card">
      <div className="text-center space-y-6 max-w-[600px] px-4">
        <div className="space-y-2">
          <CardTitle
            className="text-card-foreground text-4xl font-bold sm:text-6xl"
            aria-label="404"
          >
            404
          </CardTitle>
          <CardTitle className="text-muted-foreground text-xl sm:text-2xl font-semibold">
            Sidan kunde inte hittas
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground text-base sm:text-lg">
          Tyvärr kunde vi inte hitta sidan du sökte efter. Kontrollera
          webbadressen eller gå tillbaka till startsidan.
        </CardDescription>
        <CardDescription className="flex justify-center gap-4">
          <Button
            asChild
            variant="default"
            className="bg-secondary hover:bg-secondary/90 text-white"
            aria-label="Gå tillbaka till startsidan"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Gå tillbaka hem
            </Link>
          </Button>
        </CardDescription>
        <CardContent className="pt-8">
          <div
            className="h-2 w-32 mx-auto rounded-full bg-gradient-to-r from-primary via-accent to-secondary"
            aria-hidden="true"
            role="presentation"
          />
        </CardContent>
      </div>
    </main>
  );
}
