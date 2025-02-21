import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { leadData } from '@/server/data/lead.data';
import { formatDistanceToNow } from 'date-fns';
import { sv } from 'date-fns/locale';

export async function LeadsOverview() {
  const leads = await leadData.getAll();

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
