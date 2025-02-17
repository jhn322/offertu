import LeadSubmissionForm from "./LeadSubmissionForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Header() {
  return (
    <CardHeader className="bg-background py-16 px-4 md:py-20">
      <CardContent className="max-w-6xl mx-auto">
        <div className="space-y-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-primary-foreground">
            Offertu
          </CardTitle>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <CardTitle className="text-xl md:text-2xl font-semibold text-primary-foreground">
                Räkna smartare, vinn fler uppdrag
              </CardTitle>
              <p className="text-muted-foreground max-w-xl">
                Låt våra experter hjälpa dig att räkna på projekt inom bygg, VVS
                och el. Snabbt, träffsäkert och personligt genom direktkontakt
                online.
              </p>

              <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                <li>Lämna dina kontaktuppgifter</li>
                <li>Vi återkommer inom 24 timmar</li>
                <li>Genomför ett personligt videomöte</li>
                <li>Få experthjälp med din offertberäkning</li>
              </ol>
            </div>

            <div>
              <LeadSubmissionForm />
            </div>
          </div>

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
