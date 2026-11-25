import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PProps = {
  children: ReactNode;
  className?: string;
};

export function P({ children, className }: PProps) {
  return <p className={cn('text-foreground', className)}>{children}</p>;
}