import type { Metadata } from 'next';
import { DashboardContent } from '../../components/dashboard/dashboard-content';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Hantera dina leads och förfrågningar effektivt med Offertu dashboard.',
  openGraph: {
    title: 'Dashboarh',
    description:
      'Hantera dina leads och förfrågningar effektivt med Offertu dashboard.',
  },
};

export default function DashboardPage() {
  return (
    <main>
      <DashboardContent />
    </main>
  );
}
