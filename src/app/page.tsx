import { Navbar } from "../components/Navbar";
import Hero from "../components/Hero";
import ApiSection from "../components/ApiSection";
import CareerSection from "../components/CareerSection";
import ResourcesSection from "../components/ResourcesSection";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main>
        <Navbar />
        <Hero />
        <ApiSection />
        <CareerSection />
        <ResourcesSection />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
