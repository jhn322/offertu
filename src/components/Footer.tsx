import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t">
      <div className="container px-4 py-8 md:py-12">
        <div className="flex flex-col space-y-8">
          {/* Logos */}
          <div className="flex space-x-6">
            <CardContent className="h-12 w-32 relative">
              <AspectRatio ratio={32 / 12} className="w-32">
                <Image
                  src="/placeholder.svg"
                  alt="Logo 1"
                  fill
                  className="object-contain"
                />
              </AspectRatio>
            </CardContent>
            <div className="h-12 w-32 relative">
              <AspectRatio ratio={32 / 12} className="w-32">
                <Image
                  src="/placeholder.svg"
                  alt="Logo 2"
                  fill
                  className="object-contain"
                />
              </AspectRatio>
            </div>
          </div>

          {/* Main Content */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <nav className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <CardContent className="space-y-3">
                <CardTitle className="font-semibold text-base">
                  Om Offertu
                </CardTitle>
                <div className="grid gap-2">
                  <Link href="/karriarer">
                    <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Karriär
                    </CardDescription>
                  </Link>
                  <Link href="/nyheter">
                    <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Nyheter
                    </CardDescription>
                  </Link>
                  <Link href="#">
                    <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Verktyg & Resurser{" "}
                    </CardDescription>
                  </Link>
                </div>
              </CardContent>
              <div className="space-y-3">
                <CardTitle className="font-semibold text-base">API</CardTitle>
                <div className="grid gap-2">
                  <Link href="#">
                    <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Dokumentation
                    </CardDescription>
                  </Link>
                </div>
              </div>
            </nav>

            {/* Brand */}
            <CardContent className="p-0">
              <CardTitle className="text-4xl font-bold">Offertu</CardTitle>
            </CardContent>
          </section>

          <Separator className="my-4" />

          {/* Footer */}
          <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardDescription className="text-sm text-muted-foreground">
              Copyright {currentYear} | Offertu AB
            </CardDescription>
            <div className="flex gap-4 text-sm">
              <Link href="#">
                <CardDescription className="text-sm  text-muted-foreground hover:text-primary transition-colors">
                  Integritetspolicy
                </CardDescription>
              </Link>
              <Link href="#">
                <CardDescription className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Användarvillkor
                </CardDescription>
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </footer>
  );
}
