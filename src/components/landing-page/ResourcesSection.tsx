import Link from "next/link";
import {
  ArrowRight,
  FileText,
  PenToolIcon as Tool,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ResourcesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#E4E4E4]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[#282828] p-2">
                  <Newspaper className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Nyheter</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500">
                Ta del av de senaste trenderna, expertråden och branschnyheterna
                inom offerering och projektkalkylering.
              </p>
              <Button asChild variant="outline">
                <Link href="nyheter" className="inline-flex items-center gap-2">
                  Nyheter
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[#282828] p-2">
                  <Tool className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Verktyg</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500">
                Snabba och enkla verktyg för grundläggande offertberäkningar.
              </p>
              <Button asChild variant="outline">
                <Link
                  href="/verktyg-resurser"
                  className="inline-flex items-center gap-2"
                >
                  Verktyg (gratis)
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white lg:col-span-1 md:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-[#282828] p-2">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Mallar</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="list-inside list-disc space-y-2 text-gray-500">
                <li>Professionella offertmallar</li>
                <li>Juridiskt granskade kontraktmallar</li>
                <li>Checklistor för offertgenomgång</li>
              </ul>
              <Button asChild className="bg-[#FFAE00] hover:bg-[#FFAE00]/90">
                <Link href="/mallar" className="inline-flex items-center gap-2">
                  Ladda ner mallar
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
