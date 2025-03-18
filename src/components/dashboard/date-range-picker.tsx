'use client';

import * as React from 'react';
import { CalendarIcon, Check, X } from 'lucide-react';
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

interface DateRangePickerProps {
  className?: string;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  dateRange,
  onDateRangeChange,
}: DateRangePickerProps) {
  // Control the popover and prevent it from closing automatically
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState<Date | undefined>(
    dateRange?.from || new Date()
  );

  const [tempDateRange, setTempDateRange] = React.useState<
    DateRange | undefined
  >(dateRange);

  React.useEffect(() => {
    if (dateRange?.from) {
      setCurrentMonth(dateRange.from);
    }

    setTempDateRange(dateRange);
  }, [dateRange]);

  // Handle date range selection without applying it yet
  const handleSelect = (range: DateRange | undefined) => {
    setTempDateRange(range);
  };

  const handleApply = () => {
    onDateRangeChange(tempDateRange);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempDateRange(dateRange);
    setIsOpen(false);
  };

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
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'PPP', { locale: sv })} -{' '}
                  {format(dateRange.to, 'PPP', { locale: sv })}
                </>
              ) : (
                format(dateRange.from, 'PPP', { locale: sv })
              )
            ) : (
              <span>Välj datumintervall</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-white rounded-lg"
          align="start"
        >
          <div className="flex flex-col">
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
            />

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
