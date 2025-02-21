'use client';

import { LeadsTable } from '@/components/dashboard/leads-table';
import { LeadsOverview } from '@/components/dashboard/leads-overview';
import { DashboardShell } from '@/components/dashboard/shell';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <main>
      <Navbar />
      <DashboardShell>
        <div className="flex flex-col gap-8">
          <Suspense fallback={<div>Laddar översikt...</div>}>
            <LeadsOverview />
          </Suspense>
          <Suspense fallback={<div>Laddar leads...</div>}>
            <LeadsTable />
          </Suspense>
        </div>
      </DashboardShell>
      <Footer />
    </main>
  );
}
