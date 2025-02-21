import { cn } from '@/lib/utils';

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div
        className={cn('container max-w-7xl flex flex-col gap-4', className)}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
