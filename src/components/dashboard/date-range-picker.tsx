'use client';

import * as React from 'react';
import { CalendarIcon, Check, X, ChevronDown, ClockIcon } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface DateRangePickerProps {
  className?: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  comparisonDateRange?: DateRange | undefined;
  onComparisonDateRangeChange?: (range: DateRange | undefined) => void;
  showComparison?: boolean;
  onComparisonToggle?: (enabled: boolean) => void;
}

export function DateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
  comparisonDateRange,
  onComparisonDateRangeChange,
  showComparison = false,
  onComparisonToggle,
}: DateRangePickerProps) {
  // Add state to control the popover and prevent it from closing automatically
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(
    dateRange?.from || new Date()
  );
  const [isComparisonMode, setIsComparisonMode] =
    React.useState(showComparison);

  // Keep track of temporary selection before applying
  const [tempDateRange, setTempDateRange] = React.useState<
    DateRange | undefined
  >(dateRange);

  const [tempComparisonDateRange, setTempComparisonDateRange] = React.useState<
    DateRange | undefined
  >(comparisonDateRange);

  // Update current month when dateRange.from changes
  React.useEffect(() => {
    if (dateRange?.from) {
      setCurrentMonth(dateRange.from);
    }

    // Update temp selection when props change
    setTempDateRange(dateRange);
  }, [dateRange]);

  // Update comparison state when prop changes
  React.useEffect(() => {
    setIsComparisonMode(showComparison);
    setTempComparisonDateRange(comparisonDateRange);
  }, [showComparison, comparisonDateRange]);

  // Handle date range selection without applying it yet
  const handleSelect = (range: DateRange | undefined) => {
    setTempDateRange(range);
  };

  // Handle comparison date range selection
  const handleComparisonSelect = (range: DateRange | undefined) => {
    setTempComparisonDateRange(range);
  };

  // Toggle comparison mode
  const handleComparisonToggle = () => {
    const newValue = !isComparisonMode;
    setIsComparisonMode(newValue);

    if (onComparisonToggle) {
      onComparisonToggle(newValue);
    }

    // If enabling comparison and no comparison date range exists, create a default one
    if (newValue && !tempComparisonDateRange && tempDateRange?.from) {
      const defaultComparisonEnd = new Date(tempDateRange.from);
      defaultComparisonEnd.setDate(defaultComparisonEnd.getDate() - 1);

      const defaultComparisonStart = new Date(defaultComparisonEnd);
      if (tempDateRange.to && tempDateRange.from) {
        // Match the length of the main range
        const daysDiff = Math.round(
          (tempDateRange.to.getTime() - tempDateRange.from.getTime()) /
            (1000 * 60 * 60 * 24)
        );
        defaultComparisonStart.setDate(
          defaultComparisonStart.getDate() - daysDiff
        );
      } else {
        // Default to 30 days
        defaultComparisonStart.setDate(defaultComparisonStart.getDate() - 30);
      }

      setTempComparisonDateRange({
        from: defaultComparisonStart,
        to: defaultComparisonEnd,
      });
    }
  };

  // Apply the selected range and close popover
  const handleApply = () => {
    onDateRangeChange(tempDateRange);

    if (isComparisonMode && onComparisonDateRangeChange) {
      onComparisonDateRangeChange(tempComparisonDateRange);
    } else if (!isComparisonMode && onComparisonDateRangeChange) {
      onComparisonDateRangeChange(undefined);
    }

    setIsOpen(false);
  };

  // Cancel selection and close popover
  const handleCancel = () => {
    setTempDateRange(dateRange);
    setTempComparisonDateRange(comparisonDateRange);
    setIsComparisonMode(showComparison);
    setIsOpen(false);
  };

  // Handle button click to open the popover
  const handleButtonClick = () => {
    setIsOpen(true);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground'
            )}
            onClick={handleButtonClick}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              <span className="flex items-center gap-2">
                <span>
                  {dateRange.to ? (
                    <>
                      {format(dateRange.from, 'PPP', { locale: sv })} -{' '}
                      {format(dateRange.to, 'PPP', { locale: sv })}
                    </>
                  ) : (
                    format(dateRange.from, 'PPP', { locale: sv })
                  )}
                </span>
                {showComparison && comparisonDateRange?.from && (
                  <Badge
                    variant="outline"
                    className="ml-2 flex items-center gap-1 text-xs"
                  >
                    <ClockIcon className="h-3 w-3" />
                    Jämför
                  </Badge>
                )}
              </span>
            ) : (
              <span>Välj datumintervall</span>
            )}
            <ChevronDown
              className={cn(
                'ml-auto h-4 w-4 transition-transform duration-200',
                isOpen && 'transform rotate-180'
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white rounded-lg"
          align="start"
        >
          <div className="flex flex-col">
            <div className="p-3 border-b">
              <h3 className="font-medium mb-2">Primärt datumintervall</h3>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                selected={tempDateRange}
                onSelect={handleSelect}
                numberOfMonths={2}
                locale={sv}
                todayClassName="bg-blue-100 text-blue-700 font-semibold border border-blue-300 hover:bg-blue-200 hover:text-blue-800"
              />
            </div>

            <div className="px-3 py-2 border-b">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="comparison"
                  checked={isComparisonMode}
                  onCheckedChange={() => handleComparisonToggle()}
                />
                <Label htmlFor="comparison" className="text-sm font-medium">
                  Jämför med tidigare period
                </Label>
              </div>
            </div>

            {isComparisonMode && (
              <div className="p-3 border-b">
                <h3 className="font-medium mb-2 text-muted-foreground">
                  Jämförelseperiod
                </h3>
                <Calendar
                  mode="range"
                  defaultMonth={
                    tempComparisonDateRange?.from ||
                    (tempDateRange?.from
                      ? new Date(
                          tempDateRange.from.getFullYear(),
                          tempDateRange.from.getMonth() - 1,
                          1
                        )
                      : undefined)
                  }
                  selected={tempComparisonDateRange}
                  onSelect={handleComparisonSelect}
                  numberOfMonths={2}
                  locale={sv}
                  todayClassName="bg-blue-100 text-blue-700 font-semibold border border-blue-300 hover:bg-blue-200 hover:text-blue-800"
                />
              </div>
            )}

            <div className="flex justify-between p-3 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex items-center hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Avbryt
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleApply}
                className="flex items-center"
              >
                <Check className="h-4 w-4 mr-1" />
                Tillämpa
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
