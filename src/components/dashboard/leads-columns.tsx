'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';

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

// Column types
type CellProps =
  | LeadResponse
  | {
      checked: boolean;
      onCheckedChange: (checked: boolean) => void;
    };

interface Column {
  id: string;
  header: string | React.ReactNode | ((props: any) => React.ReactNode);
  cell: (
    props:
      | LeadResponse
      | {
          checked: boolean;
          onCheckedChange: (checked: boolean) => void;
        }
  ) => React.ReactNode;
}
interface ColumnProps extends Column {
  onDelete?: (ids: string[]) => void;
}

interface SortableHeaderProps {
  children: React.ReactNode;
  isSorted: boolean;
  isDesc: boolean;
  onSort: () => void;
}

// Sort by desc/asc
const SortableHeader = ({
  children,
  isSorted,
  isDesc,
  onSort,
}: SortableHeaderProps) => (
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
}): ColumnProps[] => [
  {
    id: 'select',
    header: ({
      checked,
      onCheckedChange,
    }: {
      checked: boolean;
      onCheckedChange: (checked: boolean) => void;
    }) => (
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label="Select all"
      />
    ),
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
        return <Badge variant="outline">{props.category}</Badge>;
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
        return format(new Date(props.createdAt), 'PPP');
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
