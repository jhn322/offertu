'use client';

import { PieChart, Pie, Cell, Sector } from 'recharts';
import React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { categoryTranslations, categoryOrder } from '@/lib/constants';
import { LeadResponse } from '@/types';
import { format, formatDistance } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CategoryData {
  name: string;
  value: number;
  color: string;
  category: string;
}

interface RadialChartProps {
  leads: LeadResponse[];
  dateRange?: DateRange;
  comparisonLeads?: LeadResponse[];
  comparisonDateRange?: DateRange;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    dataKey?: string;
  }>;
}

const categoryColors: Record<string, string> = {
  service: '#FFAE00',
  templates: '#2252B1',
  api: '#06643D',
  careers: '#AB2222',
  tools: '#030712',
  news: '#E4E4E4',
};

const chartConfig: ChartConfig = {
  categories: categoryColors,
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // Check if this is a comparison tooltip
    const hasComparison =
      payload.length > 1 || (payload[0] && payload[0].dataKey === 'comparison');
    const currentPayload =
      payload.find((p) => p.dataKey === 'current') || payload[0];
    const comparisonPayload = payload.find((p) => p.dataKey === 'comparison');

    // Get the category name and values
    const categoryName = currentPayload.name;
    const currentValue = currentPayload.value;

    // Calculate percentage change if comparison data exists
    let percentChange = 0;
    let comparisonValue = 0;

    if (comparisonPayload) {
      comparisonValue = comparisonPayload.value;
      if (comparisonValue > 0) {
        percentChange =
          ((currentValue - comparisonValue) / comparisonValue) * 100;
      }
    }

    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm max-w-[280px]">
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[0.70rem] font-medium text-muted-foreground">
                KATEGORI
              </div>
            </div>
            <div>
              <div className="text-[0.70rem] font-medium text-muted-foreground">
                AKTUELL PERIOD
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-lg font-bold text-muted-foreground">
                {categoryName}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold">{currentValue}</div>
            </div>
          </div>
          {hasComparison && comparisonValue > 0 && (
            <div className="mt-2 pt-2 border-t">
              <div className="grid grid-cols-1 gap-2">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-[0.70rem] font-medium text-muted-foreground">
                      JÄMFÖRELSEPERIOD
                    </div>
                    <div className="text-sm font-medium">
                      {comparisonValue} leads
                    </div>
                  </div>
                  <div>
                    <div className="text-[0.70rem] font-medium text-muted-foreground">
                      FÖRÄNDRING
                    </div>
                    <div
                      className={`text-sm font-medium ${
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
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function RadialChart({
  leads,
  dateRange,
  comparisonLeads,
  comparisonDateRange,
}: RadialChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hasComparison = !!comparisonLeads && comparisonLeads.length > 0;

  // Get category distribution data
  const categoryData: CategoryData[] = Object.entries(
    leads.reduce((acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([category, count]) => ({
      name: categoryTranslations[category] || category,
      value: count,
      color: categoryColors[category] || '#E4E4E4',
      category,
    }))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return b.value - a.value;
    });

  // Get comparison category distribution data
  const comparisonCategoryData: Record<string, number> = hasComparison
    ? comparisonLeads.reduce((acc, lead) => {
        acc[lead.category] = (acc[lead.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const totalLeads = categoryData.reduce(
    (sum, category) => sum + category.value,
    0
  );

  const totalComparisonLeads = hasComparison
    ? Object.values(comparisonCategoryData).reduce(
        (acc, count) => acc + count,
        0
      )
    : 0;

  // Calculate trend based on total leads
  const trend =
    totalComparisonLeads > 0
      ? ((totalLeads - totalComparisonLeads) / totalComparisonLeads) * 100
      : 0;

  let periodLabel;
  let comparisonPeriodLabel = '';

  if (dateRange?.from && dateRange?.to) {
    // Create a descriptive label for the selected period
    periodLabel = formatDistance(dateRange.from, dateRange.to, {
      locale: sv,
      addSuffix: false,
    });

    if (
      dateRange.from.getMonth() === dateRange.to.getMonth() &&
      dateRange.from.getFullYear() === dateRange.to.getFullYear()
    ) {
      // Same month
      periodLabel = format(dateRange.from, 'MMMM yyyy', { locale: sv });
    } else {
      // Different months
      periodLabel = `${format(dateRange.from, 'd MMM', {
        locale: sv,
      })} - ${format(dateRange.to, 'd MMM yyyy', { locale: sv })}`;
    }

    // Create comparison period label if applicable
    if (hasComparison && comparisonDateRange?.from && comparisonDateRange?.to) {
      if (
        comparisonDateRange.from.getMonth() ===
          comparisonDateRange.to.getMonth() &&
        comparisonDateRange.from.getFullYear() ===
          comparisonDateRange.to.getFullYear()
      ) {
        // Same month
        comparisonPeriodLabel = format(comparisonDateRange.from, 'MMMM yyyy', {
          locale: sv,
        });
      } else {
        // Different months
        comparisonPeriodLabel = `${format(comparisonDateRange.from, 'd MMM', {
          locale: sv,
        })} - ${format(comparisonDateRange.to, 'd MMM yyyy', { locale: sv })}`;
      }
    }
  } else {
    // Default to monthly comparison if no date range is selected
    const now = new Date();
    periodLabel = format(now, 'MMMM yyyy', { locale: sv });
  }

  const onPieEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="flex flex-col w-full min-w-0 overflow-hidden">
      <CardHeader className="items-center pb-0 px-3 sm:px-6">
        <CardTitle className="text-xl">Leads kategorifördelning</CardTitle>
        {hasComparison && (
          <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground">
            <span>Jämför:</span>
            <span className="font-medium text-amber-600">{periodLabel}</span>
            <span>mot</span>
            <span className="font-medium text-purple-600">
              {comparisonPeriodLabel}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 px-3 sm:px-6">
        <ChartContainer
          className="mx-auto aspect-auto w-full -mb-8 h-[180px] sm:h-[220px]"
          config={chartConfig}
        >
          <PieChart margin={{ top: 30, right: 5, bottom: 30, left: 5 }}>
            <ChartTooltip content={<CustomTooltip />} />
            <Pie
              data={categoryData}
              cx="50%"
              cy="60%"
              startAngle={180}
              endAngle={0}
              innerRadius={50}
              outerRadius={100}
              paddingAngle={1}
              dataKey="value"
              nameKey="name"
              activeIndex={activeIndex !== null ? activeIndex : undefined}
              // @ts-expect-error - Unsolvable Recharts typing incompatibility, works fine.
              activeShape={renderActiveShape}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              label={false}
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
              <tspan
                x="50%"
                y="45%"
                className="fill-foreground text-2xl font-bold"
              >
                {totalLeads.toLocaleString()}
              </tspan>
              <tspan x="50%" y="60%" className="fill-muted-foreground text-xs">
                Leads
              </tspan>
              {hasComparison && (
                <tspan
                  x="50%"
                  y="75%"
                  className="fill-purple-500 text-xs font-normal"
                >
                  {totalComparisonLeads > 0
                    ? `jämfört med ${totalComparisonLeads} tidigare`
                    : ''}
                </tspan>
              )}
            </text>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {hasComparison && (
          <div className="flex items-center gap-2 font-medium leading-none">
            {trend >= 0 ? (
              <>
                <span className="text-green-600">
                  {Math.abs(trend).toFixed(1)}% ökning
                </span>
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-xs text-muted-foreground font-normal">
                  (jämfört med tidigare period)
                </span>
              </>
            ) : (
              <>
                <span className="text-red-600">
                  {Math.abs(trend).toFixed(1)}% minskning
                </span>
                <TrendingDown className="h-4 w-4 text-red-600" />
                <span className="text-xs text-muted-foreground font-normal">
                  (jämfört med tidigare period)
                </span>
              </>
            )}
          </div>
        )}
        <div className="leading-none text-muted-foreground text-xs">
          {hasComparison ? (
            <>
              Jämför leads kategorier för{' '}
              <span className="font-medium">{periodLabel}</span> med{' '}
              <span className="font-medium">{comparisonPeriodLabel}</span>
            </>
          ) : (
            <>Visar alla leads kategorier för {periodLabel}</>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
