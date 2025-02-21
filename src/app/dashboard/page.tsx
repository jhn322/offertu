import { Metadata } from 'next';
import { LeadsTable } from '@/components/dashboard/leads-table';
import { LeadsOverview } from '@/components/dashboard/leads-overview';
import { DashboardShell } from '@/components/dashboard/shell';
import { getLeads } from '@/server/data/lead.data';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Lead management dashboard',
};

export default async function DashboardPage() {
  const leads = await getLeads();

  return (
    <main>
      <Navbar />
      <DashboardShell>
        <div className="flex flex-col gap-8">
          <LeadsOverview />
          <LeadsTable leads={leads} />
        </div>
      </DashboardShell>
      <Footer />
    </main>
  );
}
