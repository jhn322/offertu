import type { Metadata } from 'next';
import { Suspense } from 'react';
import ThanksContent from './ThanksContent';

export const metadata: Metadata = {
  title: 'Tack för din intresseanmälan',
  description:
    'Vi har mottagit din intresseanmälan och återkommer inom kort med mer information.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Tack för din intresseanmälan | Offertu',
    description:
      'Vi har mottagit din intresseanmälan och återkommer inom kort med mer information.',
  },
};

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex items-center justify-center min-h-[50vh]"
          role="status"
          aria-label="Laddar sidan"
        >
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary" />
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
