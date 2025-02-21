import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

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
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex w-[100px] items-center justify-center text-sm text-muted-foreground">
        Sida {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Föregående
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Nästa
          <ChevronRightIcon className="h-4 w-4 " />
        </Button>
      </div>
    </div>
  );
}
