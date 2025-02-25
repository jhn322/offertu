'use client';

import { LeadsTable } from '@/components/dashboard/leads-table';
import { LeadsOverview } from '@/components/dashboard/leads-overview';
import { LeadsOverviewSkeleton } from '@/components/dashboard/leads-overview-skeleton';
import { LeadsTableSkeleton } from '@/components/dashboard/leads-table-skeleton';
import { DashboardShell } from '@/components/dashboard/shell';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Suspense, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { LeadResponse } from '@/types';

export default function DashboardPage() {
  const [leads, setLeads] = useState<LeadResponse[]>([]);

  // Initial fetch of leads
  useEffect(() => {
    async function fetchInitialLeads() {
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) throw new Error('Failed to fetch leads');

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch leads');
        }
        setLeads(data.data);
      } catch (error) {
        console.error('Error fetching initial leads:', error);
      }
    }

    fetchInitialLeads();
  }, []);

  // Handler for updating leads
  const handleLeadsUpdate = (newLeads: LeadResponse[]) => {
    setLeads(newLeads);
  };

  return (
    <main>
      <Toaster richColors />
      <Navbar />
      <DashboardShell>
        <div className="flex flex-col gap-8">
          <Suspense fallback={<LeadsOverviewSkeleton />}>
            <LeadsOverview leads={leads} />
          </Suspense>
          <Suspense fallback={<LeadsTableSkeleton />}>
            <LeadsTable onLeadsUpdate={handleLeadsUpdate} />
          </Suspense>
        </div>
      </DashboardShell>
      <Footer />
    </main>
  );
}
