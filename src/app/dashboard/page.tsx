import type { Metadata } from 'next';
import { DashboardContent } from '@/components/dashboard/dashboard-content';
import RoleGate from '@/components/auth/RoleGate';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'Hantera dina leads och förfrågningar effektivt med Offertu dashboard.',
  openGraph: {
    title: 'Dashboard',
    description:
      'Hantera dina leads och förfrågningar effektivt med Offertu dashboard.',
  },
};

export default function DashboardPage() {
  return (
    <main>
      <RoleGate allowedRoles={['ADMIN']}>
        <DashboardContent />
      </RoleGate>
    </main>
  );
}
