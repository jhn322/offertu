'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { InfoIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { jobs } from '@/app/karriarer/data';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { LeadResponse } from '@/types';

// Specific interfaces for the header props
interface CheckboxHeaderProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

interface SortHeaderProps {
  isSorted: boolean;
  isDesc: boolean;
  onSort: () => void;
  children: React.ReactNode;
}

// Update the Column interface to use the specific types
interface Column {
  id: string;
  header:
    | string
    | React.ReactNode
    | ((props: CheckboxHeaderProps | SortHeaderProps) => React.ReactNode);
  cell: (props: CellProps) => React.ReactNode;
}

// Type guard to differentiate between CheckboxHeaderProps and SortHeaderProps
function isCheckboxHeaderProps(
  props: CheckboxHeaderProps | SortHeaderProps
): props is CheckboxHeaderProps {
  return (props as CheckboxHeaderProps).onCheckedChange !== undefined;
}

// Column types
type CellProps =
  | LeadResponse
  | {
      checked: boolean;
      onCheckedChange: (checked: boolean) => void;
    };

// Sort by desc/asc
const SortableHeader = ({
  children,
  isSorted,
  isDesc,
  onSort,
}: SortHeaderProps) => (
  <Button
    variant="ghost"
    size="sm"
    className="-ml-3 h-8 data-[state=open]:bg-accent"
    onClick={onSort}
  >
    <span>{children}</span>
    {isSorted && (
      <span className="ml-2">
        {isDesc ? (
          <ArrowDownIcon className="h-4 w-4" />
        ) : (
          <ArrowUpIcon className="h-4 w-4" />
        )}
      </span>
    )}
  </Button>
);

export const columns = ({
  onDelete,
  sort,
  onSort,
}: {
  onDelete: (id: string[]) => void;
  sort: { column: string; direction: 'asc' | 'desc' };
  onSort: (column: string) => void;
}): Column[] => [
  {
    id: 'select',
    header: (props) => {
      if (isCheckboxHeaderProps(props)) {
        return (
          <Checkbox
            checked={props.checked}
            onCheckedChange={props.onCheckedChange}
            aria-label="Select all"
          />
        );
      }
      return null;
    },
    cell: (props: CellProps) => {
      if ('checked' in props) {
        return (
          <Checkbox
            checked={props.checked}
            onCheckedChange={props.onCheckedChange}
            aria-label="Select row"
          />
        );
      }
      return null;
    },
  },
  {
    id: 'email',
    header: () => (
      <SortableHeader
        isSorted={sort.column === 'email'}
        isDesc={sort.direction === 'desc'}
        onSort={() => onSort('email')}
      >
        Email
      </SortableHeader>
    ),
    cell: (props: CellProps) => {
      if ('email' in props) {
        return props.email;
      }
      return null;
    },
  },
  {
    id: 'phone',
    header: () => (
      <SortableHeader
        isSorted={sort.column === 'phone'}
        isDesc={sort.direction === 'desc'}
        onSort={() => onSort('phone')}
      >
        Telefon
      </SortableHeader>
    ),
    cell: (props: CellProps) => {
      if ('phone' in props) {
        return props.phone || 'N/A';
      }
      return null;
    },
  },
  {
    id: 'id',
    header: () => (
      <SortableHeader
        isSorted={sort.column === 'id'}
        isDesc={sort.direction === 'desc'}
        onSort={() => onSort('id')}
      >
        ID
      </SortableHeader>
    ),
    cell: (props: CellProps) => {
      if ('id' in props) {
        const handleClick = async () => {
          await navigator.clipboard.writeText(props.id);
          // Create a temporary span
          const span = document.createElement('span');
          span.textContent = 'Kopierad';
          span.className =
            'absolute -top-6 left-0 text-xs text-green-500 bg-white px-2 py-1 rounded shadow-sm';

          // Get the clicked element and append
          const element = document.activeElement;
          if (element instanceof HTMLElement) {
            element.style.position = 'relative';
            element.appendChild(span);

            // 2 second timeout
            setTimeout(() => span.remove(), 2000);
          }
        };

        return (
          <span
            className="font-mono text-xs text-muted-foreground cursor-pointer hover:text-primary"
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
          >
            {props.id}
          </span>
        );
      }
      return null;
    },
  },
  {
    id: 'referenceId',
    header: () => (
      <SortableHeader
        isSorted={sort.column === 'referenceId'}
        isDesc={sort.direction === 'desc'}
        onSort={() => onSort('referenceId')}
      >
        Referens ID
      </SortableHeader>
    ),
    cell: (props: CellProps) => {
      if ('referenceId' in props) {
        const job = jobs.find((job) => job.id === props.referenceId);
        return (
          <div className="flex items-center">
            <Badge variant="outline">{props.referenceId || 'N/A'}</Badge>
            {job && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-black cursor-help ml-1" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white">
                    <p>
                      {' '}
                      <span className="font-bold">Tjänst:</span> {job.title}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        );
      }
      return null;
    },
  },
  {
    id: 'category',
    header: () => (
      <SortableHeader
        isSorted={sort.column === 'category'}
        isDesc={sort.direction === 'desc'}
        onSort={() => onSort('category')}
      >
        Kategori
      </SortableHeader>
    ),
    cell: (props: CellProps) => {
      if ('category' in props) {
        // Category translation
        const categoryTranslations: Record<string, string> = {
          careers: 'Karriär',
          news: 'Nyheter',
          service: 'Service',
          api: 'API',
          templates: 'Mallar',
          tools: 'Verktyg',
        };

        const translatedCategory =
          categoryTranslations[props.category] || props.category;
        return <Badge variant="outline">{translatedCategory}</Badge>;
      }
      return null;
    },
  },
  {
    id: 'createdAt',
    header: () => (
      <SortableHeader
        isSorted={sort.column === 'createdAt'}
        isDesc={sort.direction === 'desc'}
        onSort={() => onSort('createdAt')}
      >
        Datum
      </SortableHeader>
    ),
    cell: (props: CellProps) => {
      if ('createdAt' in props) {
        return format(new Date(props.createdAt), 'PPP', { locale: sv });
      }
      return null;
    },
  },
  {
    id: 'actions',
    header: '',
    cell: (props: CellProps) => {
      if ('email' in props) {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Öppna meny</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Åtgärder</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigator.clipboard.writeText(props.email)}
              >
                Kopiera email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-500 focus:bg-accent focus:text-accent-foreground"
                onClick={() => onDelete([props.id])}
              >
                Ta bort
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
      return null;
    },
  },
];
