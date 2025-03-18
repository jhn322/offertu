'use client';

import { TrendingUp } from 'lucide-react';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

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
  ChartTooltipContent,
} from '@/components/ui/chart';
import { categoryTranslations } from '@/lib/constants';
import { LeadResponse } from '@/types';
import { format, startOfMonth, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';

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

export function RadialChart({ leads }: RadialChartProps) {
  // Get category distribution data
  const categoryData: CategoryData[] = Object.entries(
    leads.reduce((acc, lead) => {
      acc[lead.category] = (acc[lead.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([category, count]) => ({
    name: categoryTranslations[category] || category,
    value: count,
    color: categoryColors[category] || '#E4E4E4',
  }));

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

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Inkomna leads per kategori</CardTitle>
        <CardDescription>{currentMonthName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          className="mx-auto aspect-square w-full max-w-[250px]"
          config={chartConfig}
        >
          <RadialBarChart
            data={categoryData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalLeads.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Leads
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            {categoryData.map((category, index) => (
              <RadialBar
                key={index}
                dataKey="value"
                stackId="a"
                cornerRadius={5}
                fill={category.color}
                className="stroke-transparent stroke-2"
                name={category.name}
              />
            ))}
          </RadialBarChart>
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
