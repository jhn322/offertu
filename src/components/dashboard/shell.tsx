import { cn } from '@/lib/utils';

export function DashboardShell({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex-1 space-y-4 py-12">
      <div
        className={cn('container max-w-7xl flex flex-col gap-4', className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
