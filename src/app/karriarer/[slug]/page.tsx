import { notFound } from 'next/navigation';
import { jobs } from '../data';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LeadForm from '@/components/LeadForm';

export default async function JobDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const job = jobs.find((job) => job.slug === resolvedParams.slug);

  if (!job) {
    notFound();
  }

  const Icon = job.icon;

  return (
    <>
      <Navbar />
      <main className="container py-12">
        <div className="mx-auto max-w-[800px] space-y-8">
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
      <Footer />
    </>
  );
}
