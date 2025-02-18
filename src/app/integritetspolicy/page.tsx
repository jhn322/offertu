import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function IntegrityPolicy() {
  const policyPoints = [
    {
      title: "Honesty and Transparency",
      content:
        "We commit to being honest and transparent in all our business dealings and communications.",
    },
    {
      title: "Ethical Business Practices",
      content:
        "We adhere to the highest ethical standards in our business practices and decision-making processes.",
    },
    {
      title: "Confidentiality",
      content:
        "We respect and protect the confidentiality of our clients, employees, and business partners.",
    },
    {
      title: "Fair Treatment",
      content:
        "We treat all individuals with respect and fairness, regardless of their position or background.",
    },
    {
      title: "Environmental Responsibility",
      content:
        "We strive to minimize our environmental impact and promote sustainable practices.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Integrity Policy
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>Our Commitment to Integrity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6">
              At [Your Company Name], we are committed to upholding the highest
              standards of integrity in all aspects of our business. This policy
              outlines our core principles and expectations for ethical conduct.
            </p>
            <div className="space-y-6">
              {policyPoints.map((point, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                  <p>{point.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
