import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CardContent, CardTitle, CardDescription } from "@/components/ui/card";

export default function NotFound() {
  return (
    <CardContent className="h-screen w-full flex items-center justify-center bg-[#F1F1F1]">
      <div className="text-center space-y-6 max-w-[600px] px-4">
        <div className="space-y-2">
          <CardTitle className="text-[#282828] text-4xl font-bold sm:text-6xl">
            404
          </CardTitle>
          <CardTitle className="text-[#555555] text-xl sm:text-2xl font-semibold">
            Sidan kunde inte hittas
          </CardTitle>
        </div>
        <CardDescription className="text-[#555555] text-base sm:text-lg">
          Tyvärr kunde vi inte hitta sidan du sökte efter. Kontrollera
          webbadressen eller gå tillbaka till startsidan.
        </CardDescription>
        <CardDescription className="flex justify-center gap-4">
          <Button
            asChild
            variant="default"
            className="bg-[#4683FF] hover:bg-[#4683FF]/90 text-white"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Gå tillbaka hem
            </Link>
          </Button>
        </CardDescription>
        <CardContent className="pt-8">
          <div className="h-2 w-32 mx-auto rounded-full bg-gradient-to-r from-[#FFAE00] via-[#FF7164] to-[#4683FF]" />
        </CardContent>
      </div>
    </CardContent>
  );
}
