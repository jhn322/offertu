import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <section className="container py-8 max-w-4xl">
        <div className="text-center mb-12">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Användarvillkor</h1>
          <p className="text-lg text-muted-foreground">
            Vänligen läs dessa villkor noggrant innan du använder våra tjänster
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Innehållsförteckning</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              {sections.map((section, index) => (
                <div key={section.title}>
                  <a
                    href={`#section-${index + 1}`}
                    className="flex items-center py-2 text-sm hover:text-primary"
                  >
                    {index + 1}. {section.title}
                  </a>
                  {index < sections.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-8 mt-8">
          {sections.map((section, index) => (
            <Card key={section.title} id={`section-${index + 1}`}>
              <CardHeader>
                <CardTitle>{`${index + 1}. ${section.title}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

const sections = [
  {
    title: "Godkännande av villkor",
    content:
      "Genom att få tillgång till och använda denna webbplats accepterar du och samtycker till att vara bunden av de villkor och bestämmelser som anges i detta avtal. Om du inte accepterar dessa villkor, bör du avstå från att använda webbplatsen. Dessa villkor kan komma att ändras från tid till annan, och det är ditt ansvar att regelbundet granska dem för eventuella uppdateringar.",
  },
  {
    title: "Användarlicens",
    content:
      "Tillstånd beviljas för att tillfälligt ladda ner en kopia av materialet (information eller programvara) på vår webbplats för personligt, icke-kommersiellt och övergående bruk. Detta är endast en licens och inte en överlåtelse av äganderätt. Under denna licens får du inte: \n\n1. Ändra eller kopiera materialet \n2. Använda materialet i kommersiellt syfte eller för offentlig visning (kommersiell eller icke-kommersiell) \n3. Försöka dekompilera eller bakåtkonstruera någon programvara som finns på webbplatsen \n4. Ta bort upphovsrätt eller andra äganderättsliga markeringar från materialet \n5. Överföra materialet till en annan person eller spegla det på någon annan server. \n\nDenna licens upphör automatiskt om du bryter mot någon av dessa begränsningar och kan när som helst avslutas av webbplatsens ägare.",
  },
  {
    title: "Ansvarsfriskrivning",
    content:
      "Materialet på vår webbplats tillhandahålls 'i befintligt skick'. Vi lämnar inga garantier, varken uttryckliga eller underförstådda, och frånsäger oss härmed alla andra garantier, inklusive men inte begränsat till underförstådda garantier för säljbarhet, lämplighet för ett visst syfte eller icke-intrång i immateriella rättigheter. Vidare garanterar vi inte eller gör några uttalanden angående noggrannheten, sannolika resultat eller tillförlitligheten av användningen av materialet på webbplatsen eller på andra webbplatser som är länkade till denna.",
  },
  {
    title: "Begränsningar",
    content:
      "Under inga omständigheter ska vi eller våra leverantörer vara ansvariga för eventuella skador (inklusive, utan begränsning, skador för förlust av data eller vinst, eller på grund av affärsavbrott) som uppstår till följd av användningen eller oförmågan att använda materialet på webbplatsen, även om vi eller en auktoriserad representant har informerats muntligt eller skriftligt om möjligheten till sådana skador. Eftersom vissa jurisdiktioner inte tillåter begränsningar av underförstådda garantier eller ansvarsbegränsningar för följdskador, kanske dessa begränsningar inte gäller dig.",
  },
  {
    title: "Ändringar och rättelser",
    content:
      "Materialet på denna webbplats kan innehålla tekniska, typografiska eller fotografiska fel. Vi garanterar inte att något material på webbplatsen är korrekt, fullständigt eller aktuellt. Vi kan när som helst göra ändringar i materialet utan föregående meddelande, men vi åtar oss inte att uppdatera materialet.",
  },
  {
    title: "Länkar till tredje part",
    content:
      "Vår webbplats kan innehålla länkar till externa webbplatser som vi inte kontrollerar. Vi ansvarar inte för innehållet på sådana länkade webbplatser och inkluderandet av någon länk innebär inte ett godkännande eller stöd från oss. Användning av sådana länkade webbplatser sker på egen risk.",
  },
  {
    title: "Gällande lag",
    content:
      "Dessa villkor styrs och tolkas i enlighet med lagarna i det land eller den jurisdiktion där vår verksamhet är registrerad, utan hänsyn till dess lagkonfliktsprinciper. Genom att använda webbplatsen samtycker du till att alla rättsliga åtgärder eller tvister som uppstår ur eller relaterar till dessa villkor ska lösas i behörig domstol i den aktuella jurisdiktionen.",
  },
];
