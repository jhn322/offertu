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
import { Separator } from '@/components/ui/separator';
import { ArrowRight } from 'lucide-react';
import { jobs } from './data';

export default function Career() {
  return (
    <>
      <section className="container py-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Karriär hos oss
            </h1>
            <p className="text-xl text-muted-foreground">
              Vi söker talanger som vill vara med och forma framtidens
              offerthantering
            </p>
          </div>
          <Separator className="my-4" />

          <div className="grid gap-6">
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
                      className="group-hover:translate-x-1 transition-transform duration-300 bg-primary hover:bg-secondary hover:text-white"
                    >
                      <Link href={`/karriarer/${job.slug}`}>
                        Läs mer och ansök{' '}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
