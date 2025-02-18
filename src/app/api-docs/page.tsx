import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Code, Lock, Zap } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ApiDocumentation() {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <div className="mx-auto max-w-[800px] space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Effektivisera din verksamhet ytterligare genom att integrera våra
            tjänster direkt i dina system. Ansök om API-tillgång och skräddarsy
            lösningen efter dina behov.
          </p>
          <Button size="lg" className="bg-primary">
            Ansök om API-tillgång
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Code className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Kraftfullt API</CardTitle>
              <CardDescription>
                Integrera våra tjänster sömlöst i dina befintliga system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                RESTful API med omfattande dokumentation och exempel för snabb
                implementation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lock className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Säker Integration</CardTitle>
              <CardDescription>
                Högsta säkerhetsnivå med modern autentisering
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                OAuth 2.0 och API-nycklar för säker åtkomst till alla endpoints.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary" />
              <CardTitle className="mt-4">Snabb & Pålitlig</CardTitle>
              <CardDescription>
                Optimerad prestanda med 99.9% upptid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Snabba svarstider och robust infrastruktur för tillförlitlig
                drift.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
