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
import { toast } from 'sonner';

const ITEMS_PER_PAGE = 10;

export function LeadsTable() {
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

  if (isLoading) return <div>Laddar...</div>;
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
                  {columns({ onDelete: (ids) => openDeleteDialog(ids) }).map(
                    (column) => (
                      <TableHead key={column.id}>
                        {column.id === 'select' &&
                        typeof column.header === 'function'
                          ? (column.header({
                              checked:
                                paginatedLeads.length > 0 &&
                                paginatedLeads.every((lead) =>
                                  selectedLeads.has(lead.id)
                                ),
                              onCheckedChange: handleSelectAll,
                            }) as React.ReactNode)
                          : (column.header as React.ReactNode)}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    {columns({ onDelete: (ids) => openDeleteDialog(ids) }).map(
                      (column) => (
                        <TableCell key={`${lead.id}-${column.id}`}>
                          {column.id === 'select'
                            ? column.cell({
                                checked: selectedLeads.has(lead.id),
                                onCheckedChange: (checked) =>
                                  handleSelectLead(checked, lead.id),
                              })
                            : column.cell(lead)}
                        </TableCell>
                      )
                    )}
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
