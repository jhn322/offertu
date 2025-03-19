'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { formatDistanceToNow, differenceInDays, format } from 'date-fns';
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
  TrendingDownIcon,
} from 'lucide-react';
import { getCategoryColorValue } from './leads-charts';
import { DateRangePicker } from './date-range-picker';
import { DateRange } from 'react-day-picker';

interface LeadsOverviewProps {
  leads: LeadResponse[];
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  comparisonDateRange?: DateRange;
  onComparisonDateRangeChange?: (range: DateRange | undefined) => void;
}

export function LeadsOverview({
  leads,
  dateRange: propDateRange,
  onDateRangeChange,
  comparisonDateRange: propComparisonDateRange,
  onComparisonDateRangeChange,
}: LeadsOverviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataReady, setDataReady] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (propDateRange) return propDateRange;

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
  >(propComparisonDateRange);
  const [showComparison, setShowComparison] = useState<boolean>(
    !!propComparisonDateRange
  );
  const [filteredLeads, setFilteredLeads] = useState<LeadResponse[]>(leads);
  const [comparisonLeads, setComparisonLeads] = useState<LeadResponse[]>([]);

  // Check if leads data is available and has categories
  useEffect(() => {
    if (leads.length > 0) {
      const hasCategories = leads.some((lead) => lead.category);
      setDataReady(hasCategories);
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

          if (data.data?.length > 0) {
            const hasCategories = data.data.some(
              (lead: LeadResponse) => lead.category
            );
            setDataReady(hasCategories);
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
  }, [leads.length, leads]);

  // Update local dateRange when prop changes
  useEffect(() => {
    if (propDateRange) {
      setDateRange(propDateRange);
    }
  }, [propDateRange]);

  // Update comparison date range when prop changes
  useEffect(() => {
    if (propComparisonDateRange) {
      setComparisonDateRange(propComparisonDateRange);
      setShowComparison(true);
    } else {
      setShowComparison(false);
    }
  }, [propComparisonDateRange]);

  // Handle date range change
  const handleDateRangeChange = (newRange: DateRange | undefined) => {
    setDateRange(newRange);
    // Call the parent handler if provided
    if (onDateRangeChange) {
      onDateRangeChange(newRange);
    }
  };

  // Handle comparison date range change
  const handleComparisonDateRangeChange = (newRange: DateRange | undefined) => {
    setComparisonDateRange(newRange);
    // Call the parent handler if provided
    if (onComparisonDateRangeChange) {
      onComparisonDateRangeChange(newRange);
    }
  };

  // Handle comparison toggle
  const handleComparisonToggle = (enabled: boolean) => {
    setShowComparison(enabled);
    if (!enabled && onComparisonDateRangeChange) {
      onComparisonDateRangeChange(undefined);
      setComparisonDateRange(undefined);
    }
  };

  // Filter leads based on date range
  useEffect(() => {
    if (!dateRange?.from) {
      setFilteredLeads(leads);
      return;
    }

    const from = new Date(dateRange.from);
    from.setHours(0, 0, 0, 0);

    const to = dateRange.to ? new Date(dateRange.to) : new Date();
    to.setHours(23, 59, 59, 999);

    const filtered = leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= from && leadDate <= to;
    });

    setFilteredLeads(filtered);
  }, [leads, dateRange]);

  // Filter comparison leads
  useEffect(() => {
    if (!comparisonDateRange?.from || !showComparison) {
      setComparisonLeads([]);
      return;
    }

    const from = new Date(comparisonDateRange.from);
    from.setHours(0, 0, 0, 0);

    const to = comparisonDateRange.to
      ? new Date(comparisonDateRange.to)
      : new Date();
    to.setHours(23, 59, 59, 999);

    const filtered = leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= from && leadDate <= to;
    });

    setComparisonLeads(filtered);
  }, [leads, comparisonDateRange, showComparison]);

  if (isLoading) return <LeadsOverviewSkeleton />;
  if (error) return <div>Error: {error}</div>;
  if (!dataReady && leads.length === 0) return <LeadsOverviewSkeleton />;

  // Get the most recent lead
  const mostRecentLead =
    filteredLeads.length > 0
      ? filteredLeads.reduce((latest, current) =>
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
  const filteredLeadsCount = filteredLeads.length;

  // Calculate date range period in days
  const dateRangePeriod =
    dateRange?.from && dateRange?.to
      ? differenceInDays(dateRange.to, dateRange.from) + 1
      : 30;

  // Calculate category counts and percentages
  const categoryCounts = filteredLeads.reduce((acc, lead) => {
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

  // Calculate comparison category counts if needed
  const comparisonCategoryCounts = comparisonLeads.reduce((acc, lead) => {
    if (lead.category) {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Calculate comparison metrics
  const comparisonLeadsCount = comparisonLeads.length;
  const leadsTrend =
    comparisonLeadsCount > 0
      ? ((filteredLeadsCount - comparisonLeadsCount) / comparisonLeadsCount) *
        100
      : 0;

  // If we filtered to no category data, show a fallback message instead of skeleton
  const hasCategoryData = categoryData.length > 0;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            Leads Översikt
          </CardTitle>
          <CardDescription className="text-sm">
            Statistik och analys av leads
          </CardDescription>
          <div className="mt-2">
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              comparisonDateRange={comparisonDateRange}
              onComparisonDateRangeChange={handleComparisonDateRangeChange}
              showComparison={showComparison}
              onComparisonToggle={handleComparisonToggle}
            />
          </div>
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
                  {showComparison && comparisonLeadsCount > 0
                    ? 'Aktuell period'
                    : `Senaste ${dateRangePeriod} dagarna`}
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-xl font-bold">{filteredLeadsCount}</span>
                <span className="text-sm text-muted-foreground">leads</span>
                {showComparison && comparisonLeadsCount > 0 && (
                  <span
                    className={`ml-1 text-xs flex items-center ${
                      leadsTrend >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {leadsTrend >= 0 ? (
                      <>
                        <TrendingUpIcon className="h-3 w-3 mr-0.5" />+
                        {leadsTrend.toFixed(1)}%
                      </>
                    ) : (
                      <>
                        <TrendingDownIcon className="h-3 w-3 mr-0.5" />
                        {leadsTrend.toFixed(1)}%
                      </>
                    )}
                  </span>
                )}
              </div>
              {showComparison && comparisonLeadsCount > 0 && (
                <div className="mt-1 text-xs text-muted-foreground">
                  {leadsTrend >= 0 ? 'Ökning' : 'Minskning'} jämfört med
                  föregående period
                </div>
              )}
              <div className="mt-3 flex items-center gap-2 text-sm">
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500"></div>
                <span className="text-muted-foreground text-xs">
                  {Math.round((filteredLeadsCount / totalLeads) * 100) || 0}% av
                  totala leads ({totalLeads})
                </span>
              </div>
              {showComparison && comparisonLeadsCount > 0 && (
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                  <span className="text-muted-foreground text-xs">
                    Jämförelseperiod: {comparisonLeadsCount} leads
                    {comparisonDateRange?.from && comparisonDateRange?.to && (
                      <>
                        {' '}
                        (
                        {format(comparisonDateRange.from, 'd MMM', {
                          locale: sv,
                        })}{' '}
                        -{' '}
                        {format(comparisonDateRange.to, 'd MMM', {
                          locale: sv,
                        })}
                        )
                      </>
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Category Distribution */}
            {hasCategoryData ? (
              <RadialChart
                leads={filteredLeads}
                dateRange={dateRange}
                comparisonLeads={showComparison ? comparisonLeads : undefined}
                comparisonDateRange={
                  showComparison ? comparisonDateRange : undefined
                }
              />
            ) : (
              <div className="rounded-lg border p-5 text-center text-muted-foreground">
                Ingen kategoridata tillgänglig för valt datumintervall
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
