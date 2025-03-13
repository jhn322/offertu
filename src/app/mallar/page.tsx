import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, FileText, List, Shield } from 'lucide-react';
import LeadForm from '../../components/LeadForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offertmallar',
  description:
    'Professionella och juridiskt granskade offertmallar för företag. Skräddarsydda mallar för olika branscher med modern design och juridiskt korrekta villkor.',
  keywords: [
    'offertmallar',
    'kontraktmallar',
    'affärsmallar',
    'juridiska mallar',
    'checklistor',
    'offertu',
  ],
  openGraph: {
    title: 'Offertmallar | Offertu',
    description:
      'Professionella och juridiskt granskade offertmallar för företag. Skräddarsydda mallar för olika branscher med modern design och juridiskt korrekta villkor.',
    url: '/mallar',
  },
};

const templates = [
  {
    title: 'Professionella offertmallar',
    description:
      'Skräddarsydda mallar för olika branscher och användningsområden',
    icon: FileText,
    features: [
      'Branschspecifika mallar',
      'Anpassningsbara sektioner',
      'Modern design',
    ],
  },
  {
    title: 'Juridiskt granskade kontraktmallar',
    description: 'Säkerställ att dina kontrakt följer alla juridiska krav',
    icon: Shield,
    features: [
      'Uppdaterade villkor',
      'Juridiskt granskade',
      'Lokala anpassningar',
    ],
  },
  {
    title: 'Checklistor för offertgenomgång',
    description:
      'Systematisk genomgång för kvalitetssäkring av offerten och kontraktet',
    icon: List,
    features: ['Steg-för-steg guide', 'Kvalitetskontroll', 'Best practices'],
  },
];

export default function Templates() {
  return (
    <>
      <main className="container py-12">
        <article className="flex flex-col gap-6">
          <header className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Offertmallar
            </h1>
            <p className="text-xl text-muted-foreground">
              Professionella och juridiskt granskade mallar för alla dina behov
            </p>
          </header>
          <Separator className="my-4" />

          <section className="mx-auto max-w-[580px] w-full">
            <Card>
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold">
                  Anmäl intresse
                </CardTitle>
                <p className="text-muted-foreground">
                  Våra mallar lanseras inom kort, lämna din e-postadress så får
                  du tillgång till dom först av alla.
                </p>
              </CardHeader>
              <CardContent>
                <LeadForm category="templates" showPhone={false} />
              </CardContent>
            </Card>
          </section>

          <section className="mt-16 grid gap-8 md:grid-cols-3">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.title} className="relative overflow-hidden">
                  <CardHeader>
                    <div className="rounded-lg bg-primary/10 p-2 w-fit">
                      <Icon
                        className="h-6 w-6 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="mt-4">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {template.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle
                            className="h-4 w-4 text-primary"
                            aria-hidden="true"
                          />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-6 w-full">Se mallar</Button>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </article>
      </main>
    </>
  );
}
