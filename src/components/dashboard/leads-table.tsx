'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { LeadResponse } from '@/types';
import { columns } from './leads-columns';
import { LeadsToolbar } from './leads-toolbar';
import { LeadsPagination } from './leads-pagination';

const ITEMS_PER_PAGE = 10;

interface LeadsTableProps {
  leads: LeadResponse[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);

  const categories = React.useMemo(
    () => Array.from(new Set(leads.map((lead) => lead.category))),
    [leads]
  );

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = lead.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || lead.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [leads, searchQuery, categoryFilter]);

  const paginatedLeads = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredLeads.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads</CardTitle>
        <CardDescription>Hantera dina leads och förfrågningar.</CardDescription>
      </CardHeader>
      <CardContent>
        <LeadsToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          categories={categories}
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.id}>
                    {typeof column.header === 'function'
                      ? column.header({
                          checked: false,
                          onCheckedChange: () => {},
                        })
                      : column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLeads.map((lead) => (
                <TableRow key={lead.id}>
                  {columns.map((column) => (
                    <TableCell key={`${lead.id}-${column.id}`}>
                      {column.id === 'select'
                        ? column.cell({
                            ...lead,
                            checked: false,
                            onCheckedChange: () => {},
                          })
                        : typeof column.cell === 'function'
                        ? column.cell({
                            ...lead,
                            checked: false,
                            onCheckedChange: () => {},
                          })
                        : column.cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <LeadsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </CardContent>
    </Card>
  );
}
