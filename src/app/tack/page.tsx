import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ThanksPage() {
  return (
    <>
      <Navbar />
      <div className='container py-12'>
        <div className='mx-auto max-w-[800px] space-y-8'>
          <Card className='text-center'>
            <CardHeader className='space-y-4'>
              <CheckCircle className='h-16 w-16 text-primary mx-auto' />
              <CardTitle className='text-3xl font-bold tracking-tight sm:text-4xl'>
                Tack för ditt intresse!
              </CardTitle>
              <CardDescription className='text-xl'>
                Vi har mottagit din intresseanmälan
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4 text-muted-foreground'>
                <p>
                  Vi återkommer till dig inom 24 timmar för att boka ett
                  personligt videomöte.
                </p>
                <p>
                  Under tiden är du välkommen att utforska våra resurser och
                  verktyg.
                </p>
              </div>
              <Button asChild className='mt-8'>
                <Link href='/' className='inline-flex items-center gap-2'>
                  <ArrowLeft className='h-4 w-4' />
                  Tillbaka till startsidan
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
