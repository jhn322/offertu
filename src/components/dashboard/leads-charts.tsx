'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LeadResponse } from '@/types';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  TooltipProps,
} from 'recharts';
import { format, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsChartsSkeleton } from './leads-charts-skeleton';
import { useState, useEffect } from 'react';
import { categoryTranslations } from '@/lib/constants';

interface LeadsChartsProps {
  leads: LeadResponse[];
}

interface MonthlyData {
  month: string;
  count: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  type: 'monthly' | 'category';
}

export function LeadsCharts({ leads }: LeadsChartsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (leads.length > 0) {
      setIsLoading(false);
    }
  }, [leads]);

  // Get monthly data for the past 12 months
  const monthlyData = React.useMemo(() => {
    const now = new Date();
    const monthsInterval = eachMonthOfInterval({
      start: subMonths(now, 11),
      end: now,
    });

    const monthlyLeads = monthsInterval.map((month) => {
      const monthStart = startOfMonth(month);
      const count = leads.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return startOfMonth(leadDate).getTime() === monthStart.getTime();
      }).length;

      return {
        month: format(month, 'MMM yyyy', { locale: sv }),
        count,
      };
    });

    return monthlyLeads;
  }, [leads]);

  // Get category distribution data
  const categoryData = React.useMemo(() => {
    const categoryCounts = leads.reduce((acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: categoryTranslations[category] || category,
      value: count,
    }));
  }, [leads]);

  if (isLoading) return <LeadsChartsSkeleton />;

  const CustomTooltip = ({ active, payload, type }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const displayValue =
        type === 'monthly'
          ? (data as MonthlyData).month
          : (data as CategoryData).name;

      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                {type === 'monthly' ? 'Månad' : 'Kategori'}
              </span>
              <span className="font-bold text-muted-foreground">
                {displayValue}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[0.70rem] uppercase text-muted-foreground">
                Antal
              </span>
              <span className="font-bold">{payload[0].value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipWrapper = (
    props: TooltipProps<number, string> & { type: 'monthly' | 'category' }
  ) => {
    return <CustomTooltip {...props} type={props.type} />;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistik</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Månadsvis</TabsTrigger>
            <TabsTrigger value="category">Kategorier</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="h-[380px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis
                    dataKey="month"
                    stroke="#282828"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#282828"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    content={(props: TooltipProps<number, string>) => (
                      <CustomTooltipWrapper {...props} type="monthly" />
                    )}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#282828"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="category">
            <div className="h-[380px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <XAxis
                    dataKey="name"
                    stroke="#282828"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#282828"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    content={(props: TooltipProps<number, string>) => (
                      <CustomTooltipWrapper {...props} type="category" />
                    )}
                  />
                  <Bar dataKey="value" fill="#282828" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
