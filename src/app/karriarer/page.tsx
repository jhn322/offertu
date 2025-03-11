import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { jobs } from './data';
import { generateJobListSchema } from './schemaUtils';
import Script from 'next/script';

// Add metadata for the careers page
export const metadata: Metadata = {
  title: 'Karriär hos Offertu | Lediga tjänster',
  description:
    'Utforska karriärmöjligheter hos Offertu. Vi söker engagerade talanger som vill vara med och revolutionera hur företag hanterar offerter och kalkyler.',
  keywords: [
    'karriär',
    'jobb',
    'lediga tjänster',
    'offertu',
    'tech-jobb',
    'utvecklare',
    'projektledare',
  ],
  openGraph: {
    title: 'Karriärmöjligheter hos Offertu',
    description:
      'Sök jobb hos ett av Sveriges mest innovativa tech-bolag inom offerthantering och kalkylering.',
    images: [
      {
        url: 'https://offertu.se/images/karriar-banner.jpg', // Ersätt med verklig bild
        width: 1200,
        height: 630,
        alt: 'Karriär hos Offertu',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: '/karriarer',
  },
};

export default function Career() {
  const jobListSchema = generateJobListSchema(jobs);

  return (
    <>
      {/* Structured data for job list */}
      <Script id="joblist-schema" type="application/ld+json">
        {JSON.stringify(jobListSchema)}
      </Script>

      <main className="container py-12">
        <article>
          <div className="flex flex-col gap-6 mb-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Karriär hos oss
              </h1>
              <p className="text-xl text-muted-foreground">
                Vi söker talanger som vill vara med och forma framtidens
                offerthantering
              </p>
            </div>
            <Separator className="my-4" />
          </div>

          <section aria-label="Lediga tjänster" className="grid gap-6">
            {jobs.map((job) => {
              const Icon = job.icon;
              return (
                <article
                  key={job.id}
                  className="group relative overflow-hidden"
                >
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div
                        className="rounded-lg bg-primary/10 p-2"
                        aria-hidden="true"
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2>
                          <CardTitle>{job.title}</CardTitle>
                        </h2>
                        <CardDescription>{job.department}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{job.location}</span>
                        <span aria-hidden="true">•</span>
                        <span>{job.type}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        asChild
                        variant="ghost"
                        className="group-hover:translate-x-1 transition-transform duration-300 bg-primary hover:bg-secondary hover:text-white"
                      >
                        <Link href={`/karriarer/${job.slug}`}>
                          Läs mer och ansök{' '}
                          <ArrowRight
                            className="ml-2 h-4 w-4"
                            aria-hidden="true"
                          />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </article>
              );
            })}
          </section>
        </article>
      </main>
    </>
  );
}
