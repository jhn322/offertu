'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { LeadResponse } from '@/types';
import { LeadsOverviewSkeleton } from './leads-overview-skeleton';

interface LeadsOverviewProps {
  leads: LeadResponse[];
}

export function LeadsOverview({ leads }: LeadsOverviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Category translations
  const categoryTranslations: Record<string, string> = {
    careers: 'Karriär',
    news: 'Nyheter',
    service: 'Service',
    api: 'API',
    templates: 'Mallar',
    tools: 'Verktyg',
  };

  useEffect(() => {
    // Only handle loading state if no leads are provided yet
    if (leads.length > 0) {
      setIsLoading(false);
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

  if (isLoading) return <LeadsOverviewSkeleton />;
  if (error) return <div>Error: {error}</div>;

  // Get total number of leads
  const totalLeads = leads.length;

  // Calculate category counts
  const categoryCounts = leads.reduce((acc, lead) => {
    acc[lead.category] = (acc[lead.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get the latest lead
  const latestLead = leads[0];
  const latestLeadTime = latestLead
    ? formatDistanceToNow(new Date(latestLead.createdAt), {
        addSuffix: true,
        locale: sv,
      })
    : 'N/A';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Mobile summary card */}
      <Card className="md:hidden col-span-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"></CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Totalt antal:
              </span>
              <span className="font-bold">{totalLeads}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Senaste lead:
              </span>
              <span className="text-sm">{latestLeadTime}</span>
            </div>
            <div className="border-t pt-2">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div
                  key={category}
                  className="flex justify-between items-center py-1"
                >
                  <span className="text-sm text-muted-foreground capitalize">
                    {categoryTranslations[category] || category}:
                  </span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Larger screen view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 col-span-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totalt antal Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Senaste Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              {latestLeadTime}
            </div>
          </CardContent>
        </Card>

        {Object.entries(categoryCounts).map(([category, count]) => (
          <Card key={category}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium capitalize">
                {categoryTranslations[category] || category} Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
