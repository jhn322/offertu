'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
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
import { DeleteConfirmDialog } from './delete-confirm-dialog';
import { LeadResponse } from '@/types';
import { columns } from './leads-columns';
import { LeadsToolbar } from './leads-toolbar';
import { LeadsPagination } from './leads-pagination';
import { LeadsTableSkeleton } from './leads-table-skeleton';
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 15;

export function LeadsTable({
  onLeadsUpdate,
}: {
  onLeadsUpdate: (leads: LeadResponse[]) => void;
}) {
  const [leads, setLeads] = useState<LeadResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(
    new Set()
  );
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    leadIds: string[];
  }>({
    isOpen: false,
    leadIds: [],
  });
  const [sort, setSort] = useState<{
    column: string;
    direction: 'asc' | 'desc';
  }>({
    column: 'createdAt',
    direction: 'desc',
  });

  React.useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter]);

  // Handler for sorting
  const handleSort = (column: string) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  // Get all categories
  const categories = React.useMemo(
    () => Array.from(new Set(leads.map((lead) => lead.category))),
    [leads]
  );

  const filteredLeads = React.useMemo(() => {
    if (!searchQuery && categoryFilter === 'all') {
      return leads;
    }
    return leads.filter((lead) => {
      const searchLower = searchQuery.toLowerCase().trim();
      if (searchLower) {
        // Email search
        const matchesEmail = lead.email.toLowerCase().includes(searchLower);

        // Phone search - handle null/undefined cases
        const matchesPhone = lead.phone
          ? lead.phone.toLowerCase().includes(searchLower)
          : false;

        // Check if either email or phone matches
        const matchesSearch = matchesEmail || matchesPhone;
        if (categoryFilter !== 'all') {
          return matchesSearch && lead.category === categoryFilter;
        }
        return matchesSearch;
      }
      if (categoryFilter !== 'all') {
        return lead.category === categoryFilter;
      }
      return true;
    });
  }, [leads, searchQuery, categoryFilter]);

  // Sort and filter leads
  const sortedAndFilteredLeads = React.useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      const modifier = sort.direction === 'desc' ? -1 : 1;

      switch (sort.column) {
        case 'email':
          return modifier * a.email.localeCompare(b.email);
        case 'phone':
          return modifier * (a.phone || '').localeCompare(b.phone || '');
        case 'id':
          return modifier * a.id.localeCompare(b.id);
        case 'referenceId':
          return (
            modifier * (a.referenceId || '').localeCompare(b.referenceId || '')
          );
        case 'category':
          return modifier * a.category.localeCompare(b.category);
        case 'createdAt':
          return (
            modifier *
            (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
          );
        default:
          return 0;
      }
    });
  }, [filteredLeads, sort]);

  const paginatedLeads = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedAndFilteredLeads.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedAndFilteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);

  // Handler for selecting all leads on current page
  const handleSelectAll = React.useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedLeads(new Set(paginatedLeads.map((lead) => lead.id)));
      } else {
        setSelectedLeads(new Set());
      }
    },
    [paginatedLeads]
  );

  // Handler for selecting individual lead
  const handleSelectLead = React.useCallback(
    (checked: boolean, leadId: string) => {
      setSelectedLeads((prev) => {
        const next = new Set(prev);
        if (checked) {
          next.add(leadId);
        } else {
          next.delete(leadId);
        }
        return next;
      });
    },
    []
  );

  // Handler for deleting one or more leads
  const handleDeleteLeads = async (ids: string[]) => {
    setIsLoading(true);
    try {
      const deletePromises = ids.map(async (id) => {
        const response = await fetch(`/api/leads/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error(`Failed to delete lead ${id}`);
        return response.json();
      });

      await Promise.all(deletePromises);

      // Refresh the leads data
      const response = await fetch('/api/leads');
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch leads');
      }
      setLeads(data.data);
      setSelectedLeads(new Set());

      // Update the leads in the overview
      onLeadsUpdate(data.data);

      // Success toast
      toast.success(
        ids.length === 1
          ? 'Lead har tagits bort'
          : `${ids.length} leads har tagits bort`
      );
    } catch (error) {
      console.error('Error deleting leads:', error);
      setError('Could not delete leads');

      // Error toast
      toast.error('Kunde inte ta bort leads');
    } finally {
      setIsLoading(false);
    }
  };

  // Pop up to confirm deletion of leads
  const openDeleteDialog = (ids: string[]) => {
    setDeleteDialog({
      isOpen: true,
      leadIds: ids,
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({
      isOpen: false,
      leadIds: [],
    });
  };

  const confirmDelete = async () => {
    await handleDeleteLeads(deleteDialog.leadIds);
    closeDeleteDialog();
  };

  const deleteSelectedLeads = () => {
    openDeleteDialog(Array.from(selectedLeads));
  };

  useEffect(() => {
    async function fetchLeadData() {
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) throw new Error('Failed to fetch leads');

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch leads');
        }
        setLeads(data.data);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setError('Could not load leads data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeadData();
  }, []);

  if (isLoading) return <LeadsTableSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        itemCount={deleteDialog.leadIds.length}
      />
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
          <CardDescription>
            Hantera dina leads och förfrågningar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeadsToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            categories={categories}
            selectedCount={selectedLeads.size}
            onDeleteSelected={deleteSelectedLeads}
          />
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns({
                    onDelete: (ids) => openDeleteDialog(ids),
                    sort,
                    onSort: handleSort,
                  }).map((column) => (
                    <TableHead key={column.id}>
                      {column.id === 'select' &&
                      typeof column.header === 'function'
                        ? column.header({
                            checked:
                              paginatedLeads.length > 0 &&
                              paginatedLeads.every((lead) =>
                                selectedLeads.has(lead.id)
                              ),
                            onCheckedChange: handleSelectAll,
                          })
                        : typeof column.header === 'function'
                        ? column.header({
                            isSorted: sort.column === column.id,
                            isDesc: sort.direction === 'desc',
                            onSort: () => handleSort(column.id),
                            children:
                              typeof column.header === 'function'
                                ? null
                                : column.header,
                          })
                        : column.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    {columns({
                      onDelete: (ids) => openDeleteDialog(ids),
                      sort,
                      onSort: handleSort,
                    }).map((column) => (
                      <TableCell key={`${lead.id}-${column.id}`}>
                        {column.id === 'select'
                          ? column.cell({
                              checked: selectedLeads.has(lead.id),
                              onCheckedChange: (checked) =>
                                handleSelectLead(checked, lead.id),
                            })
                          : column.cell(lead)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {paginatedLeads.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Inga leads hittades.
                    </TableCell>
                  </TableRow>
                )}
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
    </main>
  );
}
