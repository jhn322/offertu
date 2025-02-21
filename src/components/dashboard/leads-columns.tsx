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

export const columns = [
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
    cell: ({
      checked,
      onCheckedChange,
    }: {
      checked: boolean;
      onCheckedChange: (checked: boolean) => void;
    }) => (
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label="Select row"
      />
    ),
  },
  {
    id: 'email',
    header: 'Email',
    cell: (lead: LeadResponse) => lead.email,
  },
  {
    id: 'phone',
    header: 'Telefon',
    cell: (lead: LeadResponse) => lead.phone || 'N/A',
  },
  {
    id: 'category',
    header: 'Kategori',
    cell: (lead: LeadResponse) => (
      <Badge variant="outline">{lead.category}</Badge>
    ),
  },
  {
    id: 'createdAt',
    header: 'Datum',
    cell: (lead: LeadResponse) => format(new Date(lead.createdAt), 'PPP'),
  },
  {
    id: 'actions',
    cell: (lead: LeadResponse) => (
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
            onClick={() => navigator.clipboard.writeText(lead.email)}
          >
            Kopiera email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground cursor-pointer">
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
