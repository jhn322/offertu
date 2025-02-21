import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';
import { jobs } from './data';

export default function Career() {
  return (
    <>
      <Navbar />
      <div className="container py-12">
        <article className="mx-auto max-w-[800px] space-y-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Karriär hos oss
          </h1>
          <p className="text-xl text-muted-foreground">
            Vi söker talanger som vill vara med och forma framtidens
            offerthantering
          </p>
        </article>

        <div className="mt-16 grid gap-6">
          {jobs.map((job) => {
            const Icon = job.icon;
            return (
              <Card key={job.id} className="group relative overflow-hidden">
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
                    asChild
                    variant="ghost"
                    className="group-hover:translate-x-1 transition-transform duration-300 hover:bg-secondary hover:text-primary-foreground"
                  >
                    <Link href={`/karriarer/${job.slug}`}>
                      Läs mer och ansök <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
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
