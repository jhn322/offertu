import Hero from '../components/landing-page/Hero';
import ApiSection from '../components/landing-page/ApiSection';
import CareerSection from '../components/landing-page/CareerSection';
import ResourcesSection from '../components/landing-page/ResourcesSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // * Metadata ärvs från layout.tsx
  // Lägg till specifik metadata här om det behövs
};

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <header>
        <Hero />
      </header>
      <ApiSection />
      <CareerSection />
      <ResourcesSection />
    </main>
  );
}
