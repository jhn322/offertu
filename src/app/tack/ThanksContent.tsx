'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeadResponse } from '@/types';

export default function ThanksContent() {
  const id = useSearchParams().get('id');
  const [leadData, setLeadData] = useState<LeadResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeadData() {
      if (!id) {
        setError('No lead ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/leads/${id}`);
        if (!response.ok) throw new Error('Failed to fetch lead data');

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch lead data');
        }
        setLeadData(data.data);
      } catch (error) {
        console.error('Error fetching lead data:', error);
        setError('Could not load your submission data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeadData();
  }, [id]);

  return (
    <main className="container max-w-2xl mx-auto py-12 px-4">
      <Card>
        <CardHeader className="space-y-2 text-center pb-8">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold">
              Tack för ditt intresse!
            </CardTitle>
            <p className="text-muted-foreground">
              Vi har mottagit din intresseanmälan
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {isLoading ? (
            <div
              className="flex justify-center p-4"
              role="status"
              aria-label="Laddar din information"
            >
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary" />
            </div>
          ) : error ? (
            <div
              className="text-destructive text-center p-4 bg-destructive/10 rounded-lg"
              role="alert"
            >
              {error}
            </div>
          ) : leadData ? (
            <>
              <section
                className="border rounded-lg p-4"
                aria-labelledby="next-steps-title"
              >
                <h2 id="next-steps-title" className="font-medium mb-3">
                  Nästa steg
                </h2>
                <div className="flex gap-3 text-muted-foreground">
                  <CheckCircle
                    className="h-5 w-5 text-primary flex-shrink-0"
                    aria-hidden="true"
                  />
                  <p>
                    Vi återkommer till dig inom 24 timmar för att boka ett
                    personligt videomöte. Vi har skickat mer information till
                    din e-post
                    {leadData.phone &&
                      ' och kommer även skicka en bekräftelse till din telefon'}
                    .
                  </p>
                </div>
              </section>

              <section
                className="border rounded-lg p-4"
                aria-labelledby="contact-info-title"
              >
                <h2 id="contact-info-title" className="font-medium mb-4">
                  Dina kontaktuppgifter
                </h2>
                <div className="space-y-4">
                  {leadData.email && (
                    <div className="flex items-center gap-3">
                      <Mail
                        className="h-5 w-5 text-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground">E-post:</p>
                        <p className="font-medium">{leadData.email}</p>
                      </div>
                    </div>
                  )}
                  {leadData.phone && (
                    <div className="flex items-center gap-3">
                      <Phone
                        className="h-5 w-5 text-primary flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Telefon:
                        </p>
                        <p className="font-medium">{leadData.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground italic mt-4 text-center">
                  Kontrollera gärna att dina uppgifter är korrekta
                </p>
              </section>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Under tiden är du välkommen att utforska våra{' '}
                  <Link
                    href="/verktyg-resurser"
                    className="underline hover:text-primary"
                    aria-label="Utforska våra verktyg"
                  >
                    verktyg
                  </Link>
                </p>
              </div>
            </>
          ) : null}

          <div className="flex justify-center pt-4">
            <Button
              asChild
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90"
              aria-label="Gå tillbaka till startsidan"
            >
              <Link href="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Tillbaka till startsidan
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
