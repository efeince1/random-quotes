import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const styles = 'font-semibold text-foreground underline underline-offset-4';

export function TextLink({ href, children, className }: TextLinkProps) {
  
  if (href.startsWith('/auth/')) {
    return (
      <a href={href} className={cn(styles, className)}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(styles, className)}>
      {children}
    </Link>
  );
}