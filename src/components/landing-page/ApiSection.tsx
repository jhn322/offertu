import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ApiSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1F1F1]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Integrera Offertu i ditt system
            </CardTitle>
            <CardContent>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Effektivisera din verksamhet ytterligare genom att integrera
                våra tjänster direkt i dina system. Ansök om API-tillgång och
                skräddarsy lösningen efter dina behov.
              </p>
            </CardContent>
          </div>
        </div>
        <div className="mx-auto mt-12 grid items-center gap-6 md:mt-16 md:grid-cols-2 md:gap-12 lg:mt-24">
          <Card className="border-2 border-[#FFAE00] bg-white">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[#FFAE00] p-2">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Vårt API</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500">
                Få tillgång till vårt kraftfulla API och börja integrera våra
                tjänster i ditt system redan idag.
              </p>
              <Button asChild className="bg-[#FFAE00] hover:bg-primary/90">
                <Link href="/api" className="inline-flex items-center gap-2">
                  Kom igång med API
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <div className="relative hidden md:block">
            <div className="absolute -left-12 top-1/2 h-px w-[calc(100%+6rem)] -translate-y-1/2 bg-gradient-to-r from-[#E4E4E4] via-[#555555] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
