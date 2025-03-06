import Hero from '../components/landing-page/Hero';
import ApiSection from '../components/landing-page/ApiSection';
import CareerSection from '../components/landing-page/CareerSection';
import ResourcesSection from '../components/landing-page/ResourcesSection';

export default function Home() {
  return (
    <div>
      <main>
        <Hero />
        <ApiSection />
        <CareerSection />
        <ResourcesSection />
      </main>
    </div>
  );
}
