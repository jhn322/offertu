import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <div className="container py-8 max-w-4xl">
        <div className="text-center mb-12">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using our services
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {sections.map((section, index) => (
                <div key={section.title}>
                  <a
                    href={`#section-${index + 1}`}
                    className="flex items-center py-2 text-sm hover:text-primary"
                  >
                    {index + 1}. {section.title}
                  </a>
                  {index < sections.length - 1 && <Separator />}
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-8 mt-8">
          {sections.map((section, index) => (
            <Card key={section.title} id={`section-${index + 1}`}>
              <CardHeader>
                <CardTitle>{`${index + 1}. ${section.title}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

const sections = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement...",
  },
  {
    title: "Use License",
    content:
      "Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only...",
  },
  {
    title: "Disclaimer",
    content:
      "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation...",
  },
  {
    title: "Limitations",
    content:
      "In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use...",
  },
  // Add more sections as needed
];
