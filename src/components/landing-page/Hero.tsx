import LeadForm from '../LeadForm';
// import LeadSubmissionForm from '../LeadSubmissionForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Header() {
  return (
    <CardHeader className="bg-background py-16 px-4 md:py-20">
      <CardContent className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Offertu
          </CardTitle>

          <CardHeader className="grid lg:grid-cols-2 gap-16 items-start">
            <CardContent className="space-y-8">
              <CardTitle className="text-xl md:text-2xl font-semibold text-primary-foreground">
                Räkna smartare, vinn fler uppdrag
              </CardTitle>
              <p className="text-muted-foreground max-w-xl">
                Låt våra experter hjälpa dig att räkna på projekt inom bygg, VVS
                och el. Snabbt, träffsäkert och personligt genom direktkontakt
                online.
              </p>

              <section className="max-w-3xl mx-auto">
                <div className="mb-12">
                  <CardTitle className="text-xl font-semibold mb-6 text-primary-foreground">
                    Så här fungerar det
                  </CardTitle>
                  <ol className="relative space-y-6">
                    {[
                      'Lämna dina kontaktuppgifter',
                      'Vi återkommer inom 24 timmar',
                      'Genomför ett personligt videomöte',
                      'Få experthjälp med din offertberäkning',
                    ].map((step, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-none">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="text-muted-foreground">{step}</div>
                          {index < 3 && (
                            <div className="absolute left-4 mt-4 w-[1px] h-8 bg-border" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            </CardContent>

            <div>
              {/* Ansökningsformulär */}
              <Card>
                <CardHeader>
                  <CardTitle>Anmäl intresse</CardTitle>
                  <CardDescription>
                    Fyll i formuläret nedan så återkommer vi inom kort med mer
                    information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadForm category="service" />
                </CardContent>
              </Card>
            </div>
          </CardHeader>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-card p-8 rounded-lg">
              <CardHeader>
                <CardTitle className="font-semibold text-lg mb-2">
                  Spara tid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Låt våra erfarna kalkylatorer ta hand om beräkningarna medan
                  du fokuserar på det du gör bäst.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card p-8 rounded-lg">
              <CardHeader>
                <CardTitle className="font-semibold text-lg mb-2">
                  Öka precision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Minimera risken för felberäkningar med vår beprövade metodik
                  och branschexpertis.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card p-8 rounded-lg">
              <CardHeader>
                <CardTitle className="font-semibold text-lg mb-2">
                  Vinn fler affärer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Med välgrundade och konkurrenskraftiga offerter ökar dina
                  chanser att landa uppdraget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </CardHeader>
  );
}
