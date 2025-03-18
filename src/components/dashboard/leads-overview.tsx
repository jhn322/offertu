'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { LeadResponse } from '@/types';
import { LeadsOverviewSkeleton } from './leads-overview-skeleton';
import { RadialChart } from './leads-radial';
import { categoryTranslations } from '@/lib/constants';
import {
  UsersIcon,
  ClockIcon,
  TrendingUpIcon,
  BarChartIcon,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getCategoryColorValue } from './leads-charts';

interface LeadsOverviewProps {
  leads: LeadResponse[];
}

export function LeadsOverview({ leads }: LeadsOverviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    // Check if leads data is available and has categories
    if (leads.length > 0) {
      const hasCategories = leads.some((lead) => lead.category);

      if (hasCategories) {
        setDataReady(true);
        setIsLoading(false);
      } else {
        setDataReady(false);
      }
    } else {
      async function fetchLeadData() {
        try {
          const response = await fetch('/api/leads');
          if (!response.ok) throw new Error('Failed to fetch leads');

          const data = await response.json();
          if (!data.success) {
            throw new Error(data.error || 'Failed to fetch leads');
          }
        } catch (error) {
          console.error('Error fetching leads:', error);
          setError('Could not load leads data');
        } finally {
          setIsLoading(false);
        }
      }

      fetchLeadData();
    }
  }, [leads]);

  if (isLoading || !dataReady) return <LeadsOverviewSkeleton />;
  if (error) return <div>Error: {error}</div>;

  // Get the most recent lead
  const mostRecentLead =
    leads.length > 0
      ? leads.reduce((latest, current) =>
          new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest
        )
      : null;

  // Calculate time since last lead
  const timeSinceLastLead = mostRecentLead
    ? formatDistanceToNow(new Date(mostRecentLead.createdAt), {
        addSuffix: true,
        locale: sv,
      })
    : 'Ingen data';

  // Get total leads count
  const totalLeads = leads.length;

  // Calculate category counts and percentages
  const categoryCounts = leads.reduce((acc, lead) => {
    if (lead.category) {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      name: categoryTranslations[category] || category,
      value: count,
      color: getCategoryColorValue(category),
    })
  );

  // Get leads from last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentLeads = leads.filter(
    (lead) => new Date(lead.createdAt) > thirtyDaysAgo
  ).length;

  // If we have no category data, show skeleton
  if (categoryData.length === 0) {
    return <LeadsOverviewSkeleton />;
  }

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            Leads Översikt
          </CardTitle>
          <CardDescription className="text-sm">
            Statistik och analys leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Totalt antal
                  </span>
                </div>
                <div className="mt-1.5 flex items-baseline gap-1.5">
                  <span className="text-xl font-bold">{totalLeads}</span>
                  <span className="text-sm text-muted-foreground">leads</span>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Senaste lead
                  </span>
                </div>
                <div className="mt-1.5">
                  <span className="text-sm font-medium">
                    {mostRecentLead?.email || 'Ingen data'}
                  </span>
                  {mostRecentLead && (
                    <span
                      className="block text-xs text-muted-foreground mt-1"
                      aria-label={`Mottagen ${timeSinceLastLead}`}
                    >
                      {timeSinceLastLead}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Senaste 30 dagarna
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl font-bold">{recentLeads}</span>
                <span className="text-sm text-muted-foreground">leads</span>
              </div>
              <Progress
                value={(recentLeads / totalLeads) * 100}
                className="mt-1.5 h-1"
              />
            </div>

            {/* Category Distribution */}

            <RadialChart leads={leads} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
