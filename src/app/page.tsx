import { Navbar } from "../components/Navbar";
import Hero from "../components/landing-page/Hero";
import ApiSection from "../components/landing-page/ApiSection";
import CareerSection from "../components/landing-page/CareerSection";
import ResourcesSection from "../components/landing-page/ResourcesSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <Navbar />
        <Hero />
        <ApiSection />
        <CareerSection />
        <ResourcesSection />
        <Footer />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
