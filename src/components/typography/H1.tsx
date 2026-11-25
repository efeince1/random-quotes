import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type H1Props = {
  children: ReactNode;
  className?: string;
};

export function H1({ children, className }: H1Props) {
  return (
    <h1 className={cn('text-3xl font-semibold text-foreground', className)}>
      {children}
    </h1>
  );
}