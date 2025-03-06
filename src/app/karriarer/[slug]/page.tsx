// import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { jobs } from '../data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LeadForm from '@/components/LeadForm';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Hjälpfunktion för att hämta job från slug
 * Returnerar jobbet om det finns, annars anropar notFound()
 */
async function getJobFromSlug(params: Promise<{ slug: string }>) {
  const resolvedParams = await params;
  const job = jobs.find((job) => job.slug === resolvedParams.slug);

  if (!job) {
    notFound();
  }

  return job;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = await getJobFromSlug(params);

  // Använd en lämplig Unsplash-bild baserat på avdelning
  const departmentImages = {
    'Project Management':
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&h=600&auto=format&fit=crop',
    Engineering:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&h=600&auto=format&fit=crop',
    'Data Science':
      'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&h=600&auto=format&fit=crop',
    'Human Resources':
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&h=600&auto=format&fit=crop',
  };

  const imageUrl =
    departmentImages[job.department as keyof typeof departmentImages] ||
    'https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1200&h=600&auto=format&fit=crop';

  return {
    title: `${job.title} | Karriär på Offertu`,
    description: job.description,
    openGraph: {
      title: `${job.title} - ${job.department}`,
      description: job.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 600,
          alt: `${job.title} på Offertu`,
        },
      ],
      type: 'website',
      siteName: 'Karriär på Offertu',
      locale: 'sv_SE',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} | Karriär på Offertu`,
      description: job.description,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = await getJobFromSlug(params);
  const Icon = job.icon;

  return (
    <>
      <main className="max-w-3xl mx-auto py-12">
        <div className="space-y-8">
          {/* Header Card */}
          <Card>
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-3xl">{job.title}</CardTitle>
                  <CardDescription>{job.department}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Om tjänsten */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Om tjänsten</h2>
                <p className="text-muted-foreground">{job.description}</p>
              </div>

              {/* Arbetsuppgifter */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Dina arbetsuppgifter</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>
              </div>

              {/* Kvalifikationer */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Kvalifikationer</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {job.requirements.map((requirement, index) => (
                    <li key={index}>{requirement}</li>
                  ))}
                </ul>
              </div>

              {/* Förmåner */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Vi erbjuder</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Om företaget */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Om Offertu</h2>
                <p className="text-muted-foreground">
                  Offertu är ett snabbväxande tech-bolag som revolutionerar hur
                  företag hanterar sina offerter och kalkyler. Vi kombinerar
                  modern teknologi med branschexpertis för att skapa framtidens
                  lösningar för offerthantering.
                </p>
              </div>

              {/* Process */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Rekryteringsprocess</h2>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Ansökan granskas</li>
                  <li>Första intervju (30-45 min)</li>
                  <li>Teknisk/praktisk uppgift</li>
                  <li>Andra intervju med team</li>
                  <li>Referenser</li>
                  <li>Erbjudande</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Ansökningsformulär */}
          <Card>
            <CardHeader>
              <CardTitle>Sök tjänsten</CardTitle>
              <CardDescription>
                Fyll i formuläret nedan så återkommer vi inom kort med mer
                information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadForm
                category="careers"
                referenceId={job.id}
                showPhone={false}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
