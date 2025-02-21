'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { LeadResponse } from '@/types';

export function LeadsOverview() {
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeadData() {
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) throw new Error('Failed to fetch leads');

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch leads');
        }
        setLeads(data.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setError('Could not load leads data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeadData();
  }, []);

  if (isLoading) return <div>Laddar...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get total number of leads
  const totalLeads = leads.length;
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

      {Object.entries(categoryCounts).map(([category, count]) => (
        <Card key={category}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium capitalize">
              {category} Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{count}</div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Senaste Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">{latestLeadTime}</div>
        </CardContent>
      </Card>
    </div>
  );
}
