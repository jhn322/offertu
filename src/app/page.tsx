import { Navbar } from '../components/Navbar';
import Hero from '../components/landing-page/Hero';
import ApiSection from '../components/landing-page/ApiSection';
import CareerSection from '../components/landing-page/CareerSection';
import ResourcesSection from '../components/landing-page/ResourcesSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <Hero />
        <ApiSection />
        <CareerSection />
        <ResourcesSection />
        <Footer />
      </main>
    </div>
  );
}
