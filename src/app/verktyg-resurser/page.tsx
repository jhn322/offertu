import { Calculator, LineChart, PieChart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ToolsPage() {
  const tools = [
    {
      title: "Snabbkalkylator",
      description:
        "Beräkna grundläggande kostnader och marginaler för dina projekt på några sekunder.",
      icon: <Calculator className="h-12 w-12 text-primary" />,
    },
    {
      title: "Marginalanalys",
      description:
        "Analysera och optimera dina vinstmarginaler med vårt visualiseringsverktyg.",
      icon: <LineChart className="h-12 w-12 text-secondary" />,
    },
    {
      title: "Kostnadsfördelning",
      description:
        "Få en tydlig överblick över kostnadsfördelningen i dina projekt.",
      icon: <PieChart className="h-12 w-12 text-destructive" />,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Verktyg
            </h1>
            <p className="text-xl text-muted-foreground">
              Snabba och enkla verktyg för grundläggande offertberäkningar.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Card key={tool.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-4">{tool.icon}</div>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button asChild className="ml-auto">
                    <Link href="#">
                      Öppna verktyg <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
