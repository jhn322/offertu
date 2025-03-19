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
  PieChart,
  Pie,
  Cell,
  Legend,
  PieLabelRenderProps,
} from 'recharts';
import { format, startOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LeadsChartsSkeleton } from './leads-charts-skeleton';
import { useState, useEffect } from 'react';
import { categoryTranslations } from '@/lib/constants';
import { DateRange } from 'react-day-picker';

interface LeadsChartsProps {
  leads: LeadResponse[];
  dateRange?: DateRange;
}

interface MonthlyData {
  month: string;
  count: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  type: 'monthly' | 'category';
}

// tailwind colors
export const categoryColors: Record<string, string> = {
  service: 'primary',
  templates: 'secondary',
  api: 'success',
  careers: 'destructive',
  tools: 'dark',
  news: 'outline',
};

export const getCategoryColorValue = (category: string): string => {
  const colorMap: Record<string, string> = {
    primary: '#FFAE00',
    secondary: '#2252B1',
    accent: '#FF7164',
    destructive: '#AB2222',
    muted: '#E4E4E4',
    success: '#06643D',
    dark: '#030712',
  };

  return colorMap[categoryColors[category] || 'muted'];
};

export function LeadsCharts({ leads, dateRange }: LeadsChartsProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (leads.length > 0) {
      setIsLoading(false);
    }
  }, [leads]);

  // Filter leads based on date range
  const filteredLeads = React.useMemo(() => {
    if (!dateRange?.from) return leads;

    const from = new Date(dateRange.from);
    from.setHours(0, 0, 0, 0);

    const to = dateRange.to ? new Date(dateRange.to) : new Date();
    to.setHours(23, 59, 59, 999);

    return leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= from && leadDate <= to;
    });
  }, [leads, dateRange]);

  // Get monthly data for the past 12 months
  const monthlyData = React.useMemo(() => {
    const now = new Date();
    const monthsInterval = eachMonthOfInterval({
      start: subMonths(now, 11),
      end: now,
    });

    const monthlyLeads = monthsInterval.map((month) => {
      const monthStart = startOfMonth(month);
      const count = filteredLeads.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return startOfMonth(leadDate).getTime() === monthStart.getTime();
      }).length;

      return {
        month: format(month, 'MMM yyyy', { locale: sv }),
        count,
      };
    });

    return monthlyLeads;
  }, [filteredLeads]);

  // Get category distribution data
  const categoryData = React.useMemo(() => {
    const categoryCounts = filteredLeads.reduce((acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCounts).map(([category, count]) => ({
      name: categoryTranslations[category] || category,
      value: count,
      color: getCategoryColorValue(category),
    }));
  }, [filteredLeads]);

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

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;

    // Handle possibly undefined values with defaults
    const safeInnerRadius = typeof innerRadius === 'number' ? innerRadius : 0;
    const safeOuterRadius = typeof outerRadius === 'number' ? outerRadius : 0;
    const safeCx = typeof cx === 'number' ? cx : 0;
    const safeCy = typeof cy === 'number' ? cy : 0;
    const safeMidAngle = typeof midAngle === 'number' ? midAngle : 0;

    const radius = safeInnerRadius + (safeOuterRadius - safeInnerRadius) * 0.6;
    const x = safeCx + radius * Math.cos(-safeMidAngle * RADIAN);
    const y = safeCy + radius * Math.sin(-safeMidAngle * RADIAN);

    return percent && percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Leads statistik</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="monthly">Linjediagram</TabsTrigger>
            <TabsTrigger value="category">Stapeldiagram</TabsTrigger>
            <TabsTrigger value="pie">Cirkeldiagram</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="h-[520px] pt-4">
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
                    stroke="#FFAE00"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="category">
            <div className="h-[520px] pt-4">
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
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="pie">
            <div className="h-[520px] pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={140}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={(props: TooltipProps<number, string>) => (
                      <CustomTooltipWrapper {...props} type="category" />
                    )}
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => {
                      return (
                        <span style={{ color: '#282828', marginRight: 10 }}>
                          {value}
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
