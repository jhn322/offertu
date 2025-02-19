import { CalendarDays, Clock, ArrowRight } from "lucide-react";
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

export default function NewsPage() {
  const news = [
    {
      title: "5 viktiga trender inom offerering 2025",
      excerpt:
        "Upptäck de senaste trenderna som formar framtidens offerering och hur du kan ligga steget före.",
      date: "2025-02-18",
      readTime: "5 min",
      category: "Trender",
    },
    {
      title: "Så optimerar du din projektkalkylering",
      excerpt:
        "En djupgående guide om hur du kan effektivisera din kalkylprocess och öka precisionen i dina offerter.",
      date: "2025-02-15",
      readTime: "8 min",
      category: "Guide",
    },
    {
      title: "Digitalisering av offertprocessen",
      excerpt:
        "Lär dig hur moderna verktyg kan transformera ditt sätt att hantera offerter och kalkyler.",
      date: "2025-02-10",
      readTime: "6 min",
      category: "Digitalisering",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Nyheter & Insikter
            </h1>
            <p className="text-xl text-muted-foreground">
              Ta del av de senaste trenderna, expertråden och branschnyheterna
              inom offerering och projektkalkylering.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {item.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.readTime}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.excerpt}</p>
                </CardContent>
                <CardFooter className="mt-auto pt-4">
                  <Button
                    asChild
                    variant="ghost"
                    className="ml-auto text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  >
                    <Link href="#">
                      Läs mer <ArrowRight className="ml-2 h-4 w-4" />
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
