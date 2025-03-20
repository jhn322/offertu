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
    <div className="flex flex-col sm:flex-row items-center justify-between px-2 py-3 gap-2">
      <div className="text-sm text-muted-foreground">
        Sida {currentPage} av {totalPages}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className="px-2"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-2 sm:px-3"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Föregående</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2 sm:px-3"
        >
          <span className="hidden sm:inline mr-1">Nästa</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-2"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
