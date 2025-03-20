'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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
import { categoryTranslations, categoryOrder } from '@/lib/constants';
import { DateRange } from 'react-day-picker';
import { Badge } from '@/components/ui/badge';
import { InfoIcon } from 'lucide-react';

interface LeadsChartsProps {
  leads: LeadResponse[];
  dateRange?: DateRange;
  comparisonDateRange?: DateRange;
}

interface MonthlyData {
  month: string;
  count: number;
  comparisonCount?: number;
}

interface CategoryData {
  name: string;
  value: number;
  comparisonValue?: number;
  color: string;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  type: 'monthly' | 'category';
  showComparison: boolean;
}

// tailwind colors
export const categoryColors: Record<string, string> = {
  service: 'primary',
  api: 'success',
  careers: 'destructive',
  templates: 'secondary',
  news: 'outline',
  tools: 'tertiary',
};

export const getCategoryColorValue = (category: string): string => {
  const colorMap: Record<string, string> = {
    primary: '#FFAE00',
    success: '#06643D',
    destructive: '#AB2222',
    secondary: '#2252B1',
    accent: '#FF7164',
    tertiary: '#030712',
    muted: '#E4E4E4',
  };

  return colorMap[categoryColors[category] || 'muted'];
};

export function LeadsCharts({
  leads,
  dateRange,
  comparisonDateRange,
}: LeadsChartsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const hasComparison =
    !!comparisonDateRange?.from && !!comparisonDateRange?.to;

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

  // Filter comparison leads
  const comparisonLeads = React.useMemo(() => {
    if (
      !hasComparison ||
      !comparisonDateRange?.from ||
      !comparisonDateRange?.to
    )
      return [];

    const from = new Date(comparisonDateRange.from);
    from.setHours(0, 0, 0, 0);

    const to = new Date(comparisonDateRange.to);
    to.setHours(23, 59, 59, 999);

    return leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= from && leadDate <= to;
    });
  }, [leads, comparisonDateRange, hasComparison]);

  // Format date ranges for display
  const primaryDateLabel = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return '';

    if (
      dateRange.from.getMonth() === dateRange.to.getMonth() &&
      dateRange.from.getFullYear() === dateRange.to.getFullYear()
    ) {
      // Same month
      return format(dateRange.from, 'MMMM yyyy', { locale: sv });
    } else {
      // Different months
      return `${format(dateRange.from, 'd MMM', {
        locale: sv,
      })} - ${format(dateRange.to, 'd MMM yyyy', { locale: sv })}`;
    }
  }, [dateRange]);

  const comparisonDateLabel = React.useMemo(() => {
    if (
      !hasComparison ||
      !comparisonDateRange?.from ||
      !comparisonDateRange?.to
    )
      return '';

    if (
      comparisonDateRange.from.getMonth() ===
        comparisonDateRange.to.getMonth() &&
      comparisonDateRange.from.getFullYear() ===
        comparisonDateRange.to.getFullYear()
    ) {
      // Same month
      return format(comparisonDateRange.from, 'MMMM yyyy', { locale: sv });
    } else {
      // Different months
      return `${format(comparisonDateRange.from, 'd MMM', {
        locale: sv,
      })} - ${format(comparisonDateRange.to, 'd MMM yyyy', { locale: sv })}`;
    }
  }, [comparisonDateRange, hasComparison]);

  // Get monthly data for the past 12 months
  const monthlyData = React.useMemo(() => {
    const now = new Date();
    const monthsInterval = eachMonthOfInterval({
      start: subMonths(now, 11),
      end: now,
    });

    const monthlyLeads = monthsInterval.map((month) => {
      const monthStart = startOfMonth(month);
      const primaryCount = filteredLeads.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return startOfMonth(leadDate).getTime() === monthStart.getTime();
      }).length;

      const comparisonCount = hasComparison
        ? comparisonLeads.filter((lead) => {
            const leadDate = new Date(lead.createdAt);
            return startOfMonth(leadDate).getTime() === monthStart.getTime();
          }).length
        : undefined;

      return {
        month: format(month, 'MMM yyyy', { locale: sv }),
        count: primaryCount,
        ...(hasComparison && { comparisonCount }),
      };
    });

    return monthlyLeads;
  }, [filteredLeads, comparisonLeads, hasComparison]);

  const categoryData = React.useMemo(() => {
    // Primary category counts
    const categoryCounts = filteredLeads.reduce((acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Comparison category counts if needed
    const comparisonCategoryCounts = hasComparison
      ? comparisonLeads.reduce((acc, lead) => {
          acc[lead.category] = (acc[lead.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      : {};

    // Combine data
    const unsortedData = Object.entries(categoryCounts).map(
      ([category, count]) => ({
        name: categoryTranslations[category] || category,
        value: count,
        comparisonValue: hasComparison
          ? comparisonCategoryCounts[category] || 0
          : undefined,
        color: getCategoryColorValue(category),
        category,
      })
    );

    // Sort by the predefined order
    return unsortedData.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return b.value - a.value;
    });
  }, [filteredLeads, comparisonLeads, hasComparison]);

  if (isLoading) return <LeadsChartsSkeleton />;

  const CustomTooltip = ({
    active,
    payload,
    type,
    showComparison,
  }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      let displayValue: string;
      let primaryValue: number;
      let comparisonValue: number | undefined;

      if (type === 'monthly') {
        const monthData = data as MonthlyData;
        displayValue = monthData.month;
        primaryValue = monthData.count;
        comparisonValue = monthData.comparisonCount;
      } else {
        const categoryData = data as CategoryData;
        displayValue = categoryData.name;
        primaryValue = categoryData.value;
        comparisonValue = categoryData.comparisonValue;
      }

      const percentChange =
        comparisonValue && comparisonValue > 0
          ? ((primaryValue - comparisonValue) / comparisonValue) * 100
          : 0;

      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm max-w-[280px]">
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
                Aktuell period
              </span>
              <span className="font-bold">{primaryValue}</span>
            </div>
          </div>

          {showComparison && comparisonValue !== undefined && (
            <div className="mt-2 pt-2 border-t">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      Jämförelseperiod
                    </span>
                    <div className="font-medium">{comparisonValue}</div>
                  </div>
                  <div>
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                      Förändring
                    </span>
                    <div
                      className={`font-medium ${
                        percentChange >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {percentChange >= 0 ? '+' : ''}
                      {percentChange.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-[0.65rem] text-muted-foreground font-normal mt-1">
                  {Math.abs(percentChange) > 0
                    ? `${
                        percentChange >= 0 ? 'Ökning' : 'Minskning'
                      } med ${Math.abs(percentChange).toFixed(
                        1
                      )}% från jämförelseperioden`
                    : 'Ingen förändring mellan perioderna'}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomTooltipWrapper = (
    props: TooltipProps<number, string> & { type: 'monthly' | 'category' }
  ) => {
    return (
      <CustomTooltip
        {...props}
        type={props.type}
        showComparison={hasComparison}
      />
    );
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
    <Card className="h-full flex flex-col w-full min-w-0 overflow-hidden">
      <CardHeader className="px-3 sm:px-6">
        <CardTitle>Leads statistik</CardTitle>
        {hasComparison && (
          <CardDescription className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-800 text-xs border-amber-200"
              >
                Aktuell: {primaryDateLabel}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 text-xs border-purple-200"
              >
                Jämförelse: {comparisonDateLabel}
              </Badge>
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex-grow px-3 sm:px-6">
        <Tabs defaultValue="monthly" className="w-full h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
            <TabsTrigger value="monthly" className="px-1 sm:px-3">
              Linjediagram
            </TabsTrigger>
            <TabsTrigger value="category" className="px-1 sm:px-3">
              Stapeldiagram
            </TabsTrigger>
            <TabsTrigger value="pie" className="px-1 sm:px-3">
              Cirkeldiagram
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            <div className="min-h-[520px] h-full pt-4">
              {hasComparison && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Diagrammet visar data från båda perioderna - hållet musen
                    över linjen för att se detaljerad jämförelse
                  </span>
                </div>
              )}
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={monthlyData}>
                  <XAxis
                    dataKey="month"
                    stroke="#282828"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: '10px' }}
                    interval="preserveStartEnd"
                    minTickGap={5}
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
                    name="Aktuell period"
                    stroke="#FFAE00"
                    strokeWidth={2}
                    dot={true}
                  />
                  {hasComparison && (
                    <Line
                      type="monotone"
                      dataKey="comparisonCount"
                      name="Jämförelseperiod"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={true}
                    />
                  )}
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => {
                      return (
                        <span
                          className="text-xs font-medium text-foreground px-2 py-1 rounded-sm"
                          style={{
                            backgroundColor:
                              value === 'Aktuell period'
                                ? '#FFF3D6'
                                : '#F3E8FF',
                          }}
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="category">
            <div className="min-h-[520px] h-full pt-4">
              {hasComparison && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Diagrammet visar data från båda perioderna - prickade
                    staplar representerar jämförelseperioden
                  </span>
                </div>
              )}
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  data={categoryData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <XAxis
                    dataKey="name"
                    stroke="#282828"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: '10px' }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={50}
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
                  <Bar
                    dataKey="value"
                    name="Aktuell period"
                    radius={[4, 4, 0, 0]}
                    barSize={30}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                  {hasComparison && (
                    <Bar
                      dataKey="comparisonValue"
                      name="Jämförelseperiod"
                      fill="#8B5CF6"
                      radius={[4, 4, 0, 0]}
                      fillOpacity={0.7}
                      stroke="#8B5CF6"
                      strokeDasharray="3 3"
                      barSize={30}
                    />
                  )}
                  <Legend
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => {
                      return (
                        <span
                          className="text-xs font-medium text-foreground px-2 py-1 rounded-sm"
                          style={{
                            backgroundColor:
                              value === 'Aktuell period'
                                ? '#FFF3D6'
                                : '#F3E8FF',
                          }}
                        >
                          {value}
                        </span>
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="pie">
            <div className="min-h-[520px] h-full pt-4">
              {hasComparison && (
                <div className="mb-4 flex items-center gap-2 text-sm">
                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Cirkeldiagrammet visar kategorifördelning för aktuell period
                    - för detaljerad jämförelse, håll musen över en sektion
                  </span>
                </div>
              )}
              <ResponsiveContainer width="100%" height={500}>
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
                    nameKey="name"
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
                    wrapperStyle={{ paddingTop: '10px' }}
                    formatter={(value) => {
                      return (
                        <span
                          className="text-xs font-medium text-foreground px-2 py-1 rounded-sm"
                          style={{
                            backgroundColor: '#FFF3D6',
                            marginRight: 10,
                          }}
                        >
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
