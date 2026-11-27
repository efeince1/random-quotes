'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

type CopyQuoteButtonProps = {
  quote: string;
  author: string;
};

export function CopyQuoteButton({ quote, author }: CopyQuoteButtonProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`"${quote}" - ${author}`);
      toast.success('Quote copied to clipboard.');
    } catch {
      toast.error('Could not copy the quote.');
    }
  }

  return (
    <Button
      variant='outline'
      onClick={handleCopy}
      aria-label='Copy quote to clipboard'
    >
      <Copy />
      Copy
    </Button>
  );
}