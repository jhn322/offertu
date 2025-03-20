import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface LeadsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function LeadsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: LeadsPaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-2 sm:py-3 gap-2">
      <div className="text-xs sm:text-sm text-muted-foreground">
        Sida {currentPage} av {totalPages}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className="h-8 w-8 sm:h-9 sm:w-9"
          aria-label="Gå till första sidan"
        >
          <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm"
          aria-label="Gå till föregående sida"
        >
          <ChevronLeftIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline ml-1">Föregående</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm"
          aria-label="Gå till nästa sida"
        >
          <span className="hidden sm:inline mr-1">Nästa</span>
          <ChevronRightIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="h-8 w-8 sm:h-9 sm:w-9"
          aria-label="Gå till sista sidan"
        >
          <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
}
