import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import AuthProvider from '@/components/providers/AuthProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Placeholder-bild från Unsplash (kostnadsfri)
const PLACEHOLDER_OG_IMAGE =
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&h=630&auto=format&fit=crop';

export const metadata: Metadata = {
  title: {
    default: 'Offertu | Effektiv offerthantering för företag',
    template: '%s | Offertu',
  },
  description:
    'Offertu hjälper företag att effektivisera offertprocessen med smarta verktyg för projektkalkylering, offerthantering och uppföljning.',
  authors: [{ name: 'Offertu Team' }],
  creator: 'Offertu AB',
  publisher: 'Offertu AB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://offertu.vercel.app'),
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'sv_SE',
    url: 'https://offertu.vercel.app', // Ändra till er faktiska domän
    siteName: 'Offertu',
    title: 'Offertu | Effektiv offerthantering för företag',
    description:
      'Offertu hjälper företag att effektivisera offertprocessen med smarta verktyg för projektkalkylering, offerthantering och uppföljning.',
    images: [
      {
        url: PLACEHOLDER_OG_IMAGE, // Placeholder från Unsplash
        width: 1200,
        height: 630,
        alt: 'Offertu - Effektiv offerthantering',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico', // Temporärt använd favicon.ico tills apple-touch-icon.png skapas
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <header>
            <Navbar />
          </header>
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
