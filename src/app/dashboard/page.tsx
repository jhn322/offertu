'use client';

import { LeadsTable } from '@/components/dashboard/leads-table';
import { LeadsOverview } from '@/components/dashboard/leads-overview';
import { LeadsOverviewSkeleton } from '@/components/dashboard/leads-overview-skeleton';
import { LeadsTableSkeleton } from '@/components/dashboard/leads-table-skeleton';
import { DashboardShell } from '@/components/dashboard/shell';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

export default function DashboardPage() {
  return (
    <main>
      <Toaster richColors />
      <Navbar />
      <DashboardShell>
        <div className="flex flex-col gap-8">
          <Suspense fallback={<LeadsOverviewSkeleton />}>
            <LeadsOverview />
          </Suspense>
          <Suspense fallback={<LeadsTableSkeleton />}>
            <LeadsTable />
          </Suspense>
        </div>
      </DashboardShell>
      <Footer />
    </main>
  );
}
