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
import { categoryTranslations, categoryOrder } from '@/lib/constants';

interface LeadsToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  selectedCount: number;
  onDeleteSelected: () => void;
  onDeselectAll: () => void;
}

export function LeadsToolbar({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  categories,
  selectedCount,
  onDeleteSelected,
  onDeselectAll,
}: LeadsToolbarProps) {
  // Sort categories based on the predefined order
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);

    // If both categories are in the order array, sort by their position
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }

    // If only one is in the array, prioritize the one in the array
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;

    // If neither is in the array, maintain alphabetical order
    return a.localeCompare(b);
  });

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mb-2 sm:mb-3">
      <div className="flex flex-1 flex-wrap gap-1 sm:gap-2">
        <Input
          placeholder="Filtrera leads..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 min-w-[120px] flex-1 text-xs sm:text-sm sm:max-w-[250px]"
        />
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-8 w-full text-xs sm:text-sm sm:w-[150px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all" className="cursor-pointer">
              Alla kategorier
            </SelectItem>
            {sortedCategories.map((category) => (
              <SelectItem
                key={category}
                value={category}
                className="cursor-pointer"
              >
                {categoryTranslations[category] || category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex h-8 items-center">
        {selectedCount > 0 ? (
          <div className="flex gap-2">
            {selectedCount > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onDeselectAll}
                className="flex items-center"
                aria-label="Avmarkera alla valda leads"
              >
                Avmarkera
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteSelected}
              className="flex items-center"
              aria-label={`Ta bort ${selectedCount} valda leads`}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Ta bort ({selectedCount})
            </Button>
          </div>
        ) : (
          <div className="w-[100px]" />
        )}
      </div>
    </div>
  );
}
