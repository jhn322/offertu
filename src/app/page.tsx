import Hero from '../components/landing-page/Hero';
import ApiSection from '../components/landing-page/ApiSection';
import CareerSection from '../components/landing-page/CareerSection';
import ResourcesSection from '../components/landing-page/ResourcesSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // * Kommenterat ut för att använda metadata från layout.tsx
  // title: 'Offertu | Effektiv offerthantering',
  // description:
  //   'Offertu hjälper företag att effektivisera offertprocessen med smarta verktyg för projektkalkylering, offerthantering och uppföljning.',
  openGraph: {
    title: 'Välkommen till Offertu - Din partner för effektiv offerthantering',
    // description:
    //   'Offertu hjälper företag att effektivisera offertprocessen med smarta verktyg för projektkalkylering, offerthantering och uppföljning.',
  },
};

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <Hero />
      <ApiSection />
      <CareerSection />
      <ResourcesSection />
    </main>
  );
}
