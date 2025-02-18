import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Building2, Code2, Users } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

const jobs = [
  {
    title: "Projektledare",
    department: "Project Management",
    location: "Stockholm",
    type: "Heltid",
    icon: Users,
  },
  {
    title: "Back-end utvecklare",
    department: "Engineering",
    location: "Stockholm/Remote",
    type: "Heltid",
    icon: Code2,
  },
  {
    title: "Account Manager",
    department: "Sales",
    location: "Göteborg",
    type: "Heltid",
    icon: Building2,
  },
];

export default function Career() {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <div className="mx-auto max-w-[800px] space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Karriär hos oss
          </h1>
          <p className="text-xl text-muted-foreground">
            Vi söker talanger som vill vara med och forma framtidens
            offerthantering
          </p>
        </div>

        <div className="mt-16 grid gap-6">
          {jobs.map((job) => {
            const Icon = job.icon;
            return (
              <Card key={job.title} className="group relative overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.department}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    Läs mer och ansök <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
