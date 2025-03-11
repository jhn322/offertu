import { Calculator, LineChart, PieChart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Metadata } from 'next';
import LeadForm from '../../components/LeadForm';

export const metadata: Metadata = {
  title: 'Verktyg och resurser',
  description:
    'Upptäck Offertus smarta verktyg för offertberäkningar, marginalanalys och kostnadsfördelning som hjälper ditt företag att effektivisera offertprocessen.',
  openGraph: {
    title: 'Verktyg och resurser för offerthantering',
    description:
      'Upptäck Offertus smarta verktyg för offertberäkningar, marginalanalys och kostnadsfördelning.',
    images: [
      {
        url: 'https://images.unsplash.com/reserve/oIpwxeeSPy1cnwYpqJ1w_Dufer%20Collateral%20test.jpg?q=80&w=1615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Replace with actual image URL
        width: 1200,
        height: 630,
        alt: 'Verktyg och resurser för offerthantering',
      },
    ],
  },
  alternates: {
    canonical: '/verktyg-resurser',
  },
};

export default function ToolsPage() {
  const tools = [
    {
      title: 'Snabbkalkylator',
      description:
        'Beräkna grundläggande kostnader och marginaler för dina projekt på några sekunder.',
      icon: (
        <Calculator className="h-12 w-12 text-primary" aria-hidden="true" />
      ),
      iconAlt: 'Kalkylator-ikon',
    },
    {
      title: 'Marginalanalys',
      description:
        'Analysera och optimera dina vinstmarginaler med vårt visualiseringsverktyg.',
      icon: (
        <LineChart className="h-12 w-12 text-secondary" aria-hidden="true" />
      ),
      iconAlt: 'Linjediagram-ikon',
    },
    {
      title: 'Kostnadsfördelning',
      description:
        'Få en tydlig överblick över kostnadsfördelningen i dina projekt.',
      icon: (
        <PieChart className="h-12 w-12 text-destructive" aria-hidden="true" />
      ),
      iconAlt: 'Cirkeldiagram-ikon',
    },
  ];

  return (
    <main
      id="main-content"
      className="container py-12 flex flex-col min-h-screen"
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          <h1
            id="tools-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Verktyg och resurser
          </h1>
          <p className="text-xl text-muted-foreground">
            Snabba och enkla verktyg för grundläggande offertberäkningar.
          </p>
        </div>
        <Separator className="my-4" role="presentation" />

        <section aria-labelledby="interest-heading">
          <h2 id="interest-heading" className="sr-only">
            Anmäl intresse för verktyg
          </h2>
          <div className="mx-auto max-w-[580px] w-full">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold">
                  Anmäl intresse
                </CardTitle>
                <p className="text-muted-foreground">
                  Våra verktyg är fortfarande under konstruktion, lämna din
                  e-postadress så skickar vi dig ett meddelande när de är
                  lanserade.
                </p>
              </CardHeader>
              <CardContent>
                <LeadForm category="tools" showPhone={false} />
              </CardContent>
            </Card>
          </div>
        </section>

        <section aria-labelledby="tools-list-heading" className="mt-16">
          <h2
            id="tools-list-heading"
            className="invisible text-2xl font-semibold"
          >
            Tillgängliga verktyg
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {tools.map((tool) => (
              <article key={tool.title} className="flex flex-col">
                <Card className="h-full flex flex-col relative overflow-hidden">
                  <CardHeader>
                    <div className="mb-4" aria-hidden="true">
                      {tool.icon}
                      <span className="sr-only">{tool.iconAlt}</span>
                    </div>
                    <CardTitle>
                      <h3>{tool.title}</h3>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                  <CardFooter className="mt-auto pt-4">
                    <Button asChild className="w-full">
                      <Link
                        href="#"
                        aria-label={`Öppna ${tool.title} verktyget`}
                      >
                        Öppna verktyg{' '}
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
