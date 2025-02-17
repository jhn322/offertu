import LeadSubmissionForm from "./LeadSubmissionForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export default function Header() {
  return (
    <header className="bg-background py-12 px-4 md:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground">
                Offertu
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-primary-foreground">
                Räkna smartare, vinn fler uppdrag
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Låt våra experter hjälpa dig att räkna på projekt inom bygg, VVS
                och el. Snabbt, träffsäkert och personligt genom direktkontakt
                online.
              </p>
            </div>

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

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-card p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Spara tid</h3>
            <p className="text-muted-foreground">
              Låt våra erfarna kalkylatorer ta hand om beräkningarna medan du
              fokuserar på det du gör bäst.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Öka precision</h3>
            <p className="text-muted-foreground">
              Minimera risken för felberäkningar med vår beprövade metodik och
              branschexpertis.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Vinn fler affärer</h3>
            <p className="text-muted-foreground">
              Med välgrundade och konkurrenskraftiga offerter ökar dina chanser
              att landa uppdraget.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
