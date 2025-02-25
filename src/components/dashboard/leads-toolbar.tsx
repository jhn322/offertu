'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@radix-ui/react-icons';

interface LeadsToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  selectedCount: number;
  onDeleteSelected: () => void;
}

export function LeadsToolbar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  selectedCount,
  onDeleteSelected,
}: LeadsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-1 flex-wrap gap-2">
        <Input
          placeholder="Filtrera leads..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 min-w-[150px] flex-1 sm:max-w-[250px]"
        />
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-8 w-full sm:w-[150px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all" className="cursor-pointer">
              Alla kategorier
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="cursor-pointer"
              >
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex h-8 items-center">
        {selectedCount > 0 ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteSelected}
            className="flex items-center"
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            Ta bort ({selectedCount})
          </Button>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>
    </div>
  );
}
