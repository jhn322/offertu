'use client';

import { Suspense, useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { LeadResponse } from '@/types';
import Script from 'next/script';
import { DateRange } from 'react-day-picker';
import dynamic from 'next/dynamic';
import { DashboardShell } from '@/components/dashboard/shell';
import { LeadsOverviewSkeleton } from '@/components/dashboard/leads-overview-skeleton';
import { LeadsChartsSkeleton } from '@/components/dashboard/leads-charts-skeleton';
import { LeadsTableSkeleton } from '@/components/dashboard/leads-table-skeleton';

// Dynamically import heavy components
const LeadsTable = dynamic(
  () =>
    import('@/components/dashboard/leads-table').then((mod) => ({
      default: mod.LeadsTable,
    })),
  {
    loading: () => <LeadsTableSkeleton />,
    ssr: false,
  }
);

const LeadsOverview = dynamic(
  () =>
    import('@/components/dashboard/leads-overview').then((mod) => ({
      default: mod.LeadsOverview,
    })),
  {
    loading: () => <LeadsOverviewSkeleton />,
    ssr: false,
  }
);

const LeadsCharts = dynamic(
  () =>
    import('@/components/dashboard/leads-charts').then((mod) => ({
      default: mod.LeadsCharts,
    })),
  {
    loading: () => <LeadsChartsSkeleton />,
    ssr: false,
  }
);

const useLeadsData = () => {
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

  const [comparisonDateRange, setComparisonDateRange] = useState<
    DateRange | undefined
  >(undefined);

  // Initial fetch of leads
  useEffect(() => {
    let isMounted = true;

    async function fetchInitialLeads() {
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) throw new Error('Failed to fetch leads');

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch leads');
        }
        if (isMounted) {
          setLeads(data.data);
        }
      } catch (error) {
        console.error('Error fetching initial leads:', error);
      }
    }

    fetchInitialLeads();
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    leads,
    setLeads,
    dateRange,
    setDateRange,
    comparisonDateRange,
    setComparisonDateRange,
  };
};

export function DashboardContent() {
  const {
    leads,
    setLeads,
    dateRange,
    setDateRange,
    comparisonDateRange,
    setComparisonDateRange,
  } = useLeadsData();

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
          <div className="grid gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-1 md:grid-cols-2">
            <section aria-label="Leads statistik">
              <Suspense fallback={<LeadsOverviewSkeleton />}>
                <LeadsOverview
                  leads={leads}
                  dateRange={dateRange}
                  onDateRangeChange={setDateRange}
                  comparisonDateRange={comparisonDateRange}
                  onComparisonDateRangeChange={setComparisonDateRange}
                />
              </Suspense>
            </section>
            <section aria-label="Leads diagram">
              <Suspense fallback={<LeadsChartsSkeleton />}>
                <LeadsCharts
                  leads={leads}
                  dateRange={dateRange}
                  comparisonDateRange={comparisonDateRange}
                />
              </Suspense>
            </section>
          </div>
          <section aria-label="Leads tabell">
            <Suspense fallback={<LeadsTableSkeleton />}>
              <LeadsTable onLeadsUpdate={setLeads} />
            </Suspense>
          </section>
        </div>
      </DashboardShell>
    </>
  );
}
