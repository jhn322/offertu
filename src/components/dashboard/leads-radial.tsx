'use client';

import { TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Sector } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart';
import { categoryTranslations } from '@/lib/constants';
import { LeadResponse } from '@/types';
import { format, startOfMonth, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useState } from 'react';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface RadialChartProps {
  leads: LeadResponse[];
}

const categoryColors: Record<string, string> = {
  service: '#FFAE00',
  templates: '#4683FF',
  api: '#10B981',
  careers: '#EF4444',
  tools: '#030712',
  news: '#E4E4E4',
};

const chartConfig: ChartConfig = {
  categories: categoryColors,
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-[0.70rem] font-medium text-muted-foreground">
                KATEGORI
              </div>
            </div>
            <div>
              <div className="text-[0.70rem] font-medium text-muted-foreground">
                ANTAL
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-lg font-bold text-muted-foreground">
                {payload[0].name}
              </div>
            </div>
            <div>
              <div className="text-lg font-bold">{payload[0].value}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
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

export function RadialChart({ leads }: RadialChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
    }))
    .sort((a, b) => b.value - a.value);

  const totalLeads = categoryData.reduce(
    (sum, category) => sum + category.value,
    0
  );

  // Calculate trend
  const now = new Date();
  const currentMonth = startOfMonth(now);
  const previousMonth = startOfMonth(subMonths(now, 1));

  const currentMonthLeads = leads.filter(
    (lead) =>
      startOfMonth(new Date(lead.createdAt)).getTime() ===
      currentMonth.getTime()
  ).length;

  const previousMonthLeads = leads.filter(
    (lead) =>
      startOfMonth(new Date(lead.createdAt)).getTime() ===
      previousMonth.getTime()
  ).length;

  const trend =
    previousMonthLeads > 0
      ? ((currentMonthLeads - previousMonthLeads) / previousMonthLeads) * 100
      : 0;

  const currentMonthName = format(now, 'MMMM yyyy', { locale: sv });

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Leads kategorifördelning</CardTitle>
        <CardDescription>{currentMonthName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          className="mx-auto aspect-auto w-full -mb-16 h-[180px] sm:h-[220px]"
          config={chartConfig}
        >
          <PieChart margin={{ top: 30, right: 20, bottom: 30, left: 20 }}>
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
                y="calc(50% - 10px)"
                className="fill-foreground text-2xl font-bold"
              >
                {totalLeads.toLocaleString()}
              </tspan>
              <tspan
                x="50%"
                y="calc(60% + 20px)"
                className="fill-muted-foreground text-xs"
              >
                Leads
              </tspan>
            </text>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trend >= 0 ? 'Ökning med ' : 'Minskning med '}
          {Math.abs(trend).toFixed(1)}% jämfört med förra månaden{' '}
          <TrendingUp className={`h-4 w-4 ${trend < 0 ? 'rotate-180' : ''}`} />
        </div>
        <div className="leading-none text-muted-foreground">
          Visar alla leads kategorier för {currentMonthName}
        </div>
      </CardFooter>
    </Card>
  );
}
