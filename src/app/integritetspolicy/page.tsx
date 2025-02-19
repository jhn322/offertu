import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function IntegrityPolicy() {
  const policyPoints = [
    {
      title: "Ärlighet och Transparens",
      content:
        "Vi förbinder oss att vara ärliga och transparenta i alla våra affärstransaktioner och kommunikationer.",
    },
    {
      title: "Etiska Affärsmetoder",
      content:
        "Vi följer de högsta etiska standarderna i våra affärsmetoder och beslutsprocesser.",
    },
    {
      title: "Konfidentialitet",
      content:
        "Vi respekterar och skyddar konfidentialiteten för våra kunder, anställda och affärspartners.",
    },
    {
      title: "Rättvis Behandling",
      content:
        "Vi behandlar alla individer med respekt och rättvisa, oavsett deras position eller bakgrund.",
    },
    {
      title: "Miljöansvar",
      content:
        "Vi strävar efter att minimera vår miljöpåverkan och främja hållbara metoder.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Integritetspolicy
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Vårt åtagande för integritet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              På Offertu är vi engagerade i att upprätthålla de högsta
              standarderna för integritet i alla aspekter av vår verksamhet.
              Denna policy beskriver våra kärnprinciper och förväntningar på
              etiskt uppförande.
            </p>
            <div className="space-y-6">
              {policyPoints.map((point, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                  <p>{point.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
