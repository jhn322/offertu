'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
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

type CellProps =
  | LeadResponse
  | {
      checked: boolean;
      onCheckedChange: (checked: boolean) => void;
    };

interface Column {
  id: string;
  header:
    | string
    | React.ReactNode
    | ((props: {
        checked: boolean;
        onCheckedChange: (checked: boolean) => void;
      }) => React.ReactNode);
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

export const columns = ({
  onDelete,
}: {
  onDelete: (id: string[]) => void;
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
    header: 'Email',
    cell: (props: CellProps) => {
      if ('email' in props) {
        return props.email;
      }
      return null;
    },
  },
  {
    id: 'phone',
    header: 'Telefon',
    cell: (props: CellProps) => {
      if ('phone' in props) {
        return props.phone || 'N/A';
      }
      return null;
    },
  },
  {
    id: 'category',
    header: 'Kategori',
    cell: (props: CellProps) => {
      if ('category' in props) {
        return <Badge variant="outline">{props.category}</Badge>;
      }
      return null;
    },
  },
  {
    id: 'createdAt',
    header: 'Datum',
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
