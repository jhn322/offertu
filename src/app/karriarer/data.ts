import { Building2, Code2, Users } from "lucide-react";

export const jobs = [
  {
    id: "1",
    slug: "projektledare",
    title: "Projektledare",
    department: "Project Management",
    location: "Stockholm",
    type: "Heltid",
    icon: Users,
    description: "Vi söker en erfaren projektledare som kan driva våra kundprojekt framåt.",
    responsibilities: [
      "Leda och koordinera projekt från start till mål",
      "Hantera kundkommunikation och förväntningar",
      "Resursplanering och budgetansvar",
      "Utveckla och förbättra våra projektprocesser"
    ],
    requirements: [
      "3+ års erfarenhet av projektledning",
      "Erfarenhet från tech-industrin",
      "Utmärkta kommunikationsförmågor",
      "Strukturerad och målinriktad"
    ],
    benefits: [
      "Konkurrenskraftig lön",
      "Flexibla arbetstider",
      "Hälsovårdsbidrag",
      "Kompetensutveckling"
    ]
  },
  {
    id: "2",
    slug: "frontend-utvecklare",
    title: "Front-end utvecklare",
    department: "Engineering",
    location: "Malmö",
    type: "Heltid",
    icon: Code2,
    description: "Vi söker en kreativ front-end utvecklare som kan skapa användarvänliga gränssnitt.",
    responsibilities: [
      "Utveckla och underhålla webbapplikationer",
      "Samarbeta med designteamet för att implementera UI/UX",
      "Optimera applikationer för maximal hastighet",
      "Testa och felsöka applikationer"
    ],
    requirements: [
      "2+ års erfarenhet av front-end utveckling",
      "Kunskap i HTML, CSS, JavaScript",
      "Erfarenhet av React eller Angular",
      "Öga för design och detaljer"
    ],
    benefits: [
      "Kreativ arbetsmiljö",
      "Möjlighet att arbeta med de senaste teknologierna",
      "Friskvårdsbidrag",
      "Utbildningsmöjligheter"
    ]
  },
  {
    id: "3",
    slug: "data-analyst",
    title: "Dataanalytiker",
    department: "Data Science",
    location: "Göteborg",
    type: "Deltid",
    icon: Building2,
    description: "Vi söker en analytisk dataanalytiker som kan omvandla data till insikter.",
    responsibilities: [
      "Samla in och analysera data för att stödja affärsbeslut",
      "Skapa rapporter och visualiseringar",
      "Identifiera trender och mönster i data",
      "Samarbeta med olika avdelningar för att förstå deras databehov"
    ],
    requirements: [
      "Erfarenhet av dataanalys och statistik",
      "Kunskap i SQL och Python",
      "Förmåga att presentera data på ett begripligt sätt",
      "Problemlösningsförmåga"
    ],
    benefits: [
      "Flexibla arbetstider",
      "Möjlighet att arbeta med stora datamängder",
      "Hälsovårdsbidrag",
      "Karriärutvecklingsmöjligheter"
    ]
  },
  {
    id: "4",
    slug: "hr-specialist",
    title: "HR Specialist",
    department: "Human Resources",
    location: "Stockholm",
    type: "Heltid",
    icon: Users,
    description: "Vi söker en HR-specialist som kan stödja vår personalavdelning i olika HR-processer.",
    responsibilities: [
      "Rekrytering och onboarding av nya medarbetare",
      "Utveckla och implementera HR-policyer",
      "Stödja chefer i personalfrågor",
      "Organisera utbildningar och workshops"
    ],
    requirements: [
      "Erfarenhet av HR-arbete",
      "Kunskap om arbetsrätt och HR-system",
      "Starka kommunikations- och organisationsförmågor",
      "Förmåga att arbeta självständigt"
    ],
    benefits: [
      "Konkurrenskraftig lön",
      "Möjlighet att påverka HR-strategier",
      "Friskvårdsbidrag",
      "Utvecklingsmöjligheter"
    ]
  }
];