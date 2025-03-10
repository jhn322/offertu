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
      {/* Semantisk sektion för hero-bannern */}
      <section aria-labelledby="hero-heading">
        <Hero />
      </section>

      {/* Semantisk sektion för API-information */}
      <section aria-labelledby="api-heading">
        <ApiSection />
      </section>

      {/* Semantisk sektion för karriärmöjligheter */}
      <section aria-labelledby="career-heading">
        <CareerSection />
      </section>

      {/* Semantisk sektion för resurser */}
      <section aria-labelledby="resources-heading">
        <ResourcesSection />
      </section>
    </main>
  );
}
