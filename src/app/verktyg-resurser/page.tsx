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
    <main id="main-content" className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center py-20">
        <div className="max-w-4xl w-full px-4">
          <h1 id="tools-heading" className="text-3xl font-bold mb-6">
            Verktyg och resurser
          </h1>
          <div className="space-y-4">
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

          <section aria-labelledby="tools-list-heading">
            <h2
              id="tools-list-heading"
              className="invisible text-2xl font-semibold "
            >
              Tillgängliga verktyg
            </h2>
            <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <article key={tool.title} className="flex flex-col">
                  <Card className="h-full flex flex-col">
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
                      <p className="text-muted-foreground">
                        {tool.description}
                      </p>
                    </CardContent>
                    <CardFooter className="mt-auto pt-4">
                      <Button asChild className="ml-auto">
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
      </div>
    </main>
  );
}
