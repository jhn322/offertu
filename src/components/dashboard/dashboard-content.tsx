'use client';

import { LeadsTable } from '@/components/dashboard/leads-table';
import { LeadsOverview } from '@/components/dashboard/leads-overview';
import { LeadsOverviewSkeleton } from '@/components/dashboard/leads-overview-skeleton';
import { LeadsTableSkeleton } from '@/components/dashboard/leads-table-skeleton';
import { LeadsCharts } from '@/components/dashboard/leads-charts';
import { LeadsChartsSkeleton } from '@/components/dashboard/leads-charts-skeleton';
import { DashboardShell } from '@/components/dashboard/shell';
import { Suspense, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { LeadResponse } from '@/types';
import Script from 'next/script';
import { DateRange } from 'react-day-picker';

export function DashboardContent() {
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return {
      from: thirtyDaysAgo,
      to: now,
    };
  });

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

  // Handler for updating date range
  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
  };

  // Schema.org structured data for Dashboard
  const dashboardSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Offertu Dashboard',
    description:
      'Hantera dina leads och förfrågningar effektivt med Offertu dashboard.',
  };

  return (
    <>
      {/* Add schema.org structured data */}
      <Script id="dashboard-schema" type="application/ld+json">
        {JSON.stringify(dashboardSchema)}
      </Script>

      <Toaster richColors />
      <DashboardShell>
        <div
          className="flex flex-col gap-8"
          role="region"
          aria-label="Dashboard översikt"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <section aria-label="Leads statistik">
              <Suspense fallback={<LeadsOverviewSkeleton />}>
                <LeadsOverview
                  leads={leads}
                  dateRange={dateRange}
                  onDateRangeChange={handleDateRangeChange}
                />
              </Suspense>
            </section>
            <section aria-label="Leads diagram">
              <Suspense fallback={<LeadsChartsSkeleton />}>
                <LeadsCharts leads={leads} dateRange={dateRange} />
              </Suspense>
            </section>
          </div>
          <section aria-label="Leads tabell">
            <Suspense fallback={<LeadsTableSkeleton />}>
              <LeadsTable onLeadsUpdate={handleLeadsUpdate} />
            </Suspense>
          </section>
        </div>
      </DashboardShell>
    </>
  );
}
