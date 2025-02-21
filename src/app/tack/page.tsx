'use client';

import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CheckCircle, ArrowLeft, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LeadResponse } from '@/types';

function ThanksContent() {
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
    <div className="container py-12">
      <div className="mx-auto max-w-[800px] space-y-8">
        <Card className="text-center">
          <CardHeader className="space-y-4">
            <CheckCircle className="h-16 w-16 text-primary mx-auto" />
            <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl">
              Tack för ditt intresse!
            </CardTitle>
            <CardDescription className="text-xl">
              Vi har mottagit din intresseanmälan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 text-muted-foreground">
              {isLoading ? (
                <p>Laddar...</p>
              ) : error ? (
                <p className="text-destructive">{error}</p>
              ) : leadData ? (
                <>
                  {/* Contact Information Section */}
                  <div className="rounded-lg  p-6 space-y-4">
                    <div className="space-y-3 text-muted-foreground">
                      {leadData.email && (
                        <>
                          <p>
                            Vi kommer att skicka mer information till din
                            e-post:
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-2">
                              <Mail className="h-5 w-5" />
                              <span className="ec-email font-medium">
                                {leadData.email}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {leadData.phone && (
                        <>
                          <p>
                            samt en bekräftelse av att vi mottagit dina
                            kontaktuppgifter till:
                          </p>
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <div className="flex items-center gap-2">
                              <Phone className="h-5 w-5" />
                              <span className="ec-phone font-medium">
                                {leadData.phone}
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground text-right italic mt-2">
                      Kontrollera gärna att dina uppgifter är korrekta
                    </p>
                  </div>

                  {/* Next Steps Section */}
                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-lg">
                      Vi återkommer till dig inom 24 timmar för att boka ett
                      personligt videomöte.
                    </p>
                    <p>
                      Under tiden är du välkommen att utforska våra resurser och
                      verktyg.
                    </p>
                  </div>
                </>
              ) : null}
            </div>
            <Button asChild className="mt-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tillbaka till startsidan
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Laddar...</div>}>
        <ThanksContent />
      </Suspense>
      <Footer />
    </>
  );
}
