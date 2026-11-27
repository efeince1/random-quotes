'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import { deleteQuoteAction } from '@/app/actions';
import type { Quote } from '@/types/quotes';
import { toast } from 'sonner';

export function MyQuotesList({ quotes }: { quotes: Quote[] }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  if (quotes.length === 0) {
    return (
      <div className='flex flex-col items-center gap-3'>
        <P>You have not added any quotes yet.</P>
        <TextLink href='/user/quotes/new'>Add your first quote</TextLink>
      </div>
    );
  }

 function handleDelete(id: string) {
  if (!window.confirm('Delete this quote? This cannot be undone.')) return;

  startTransition(async () => {
    const result = await deleteQuoteAction(id);
    if (result.success) {
      setMessage(null);
      toast.success('Quote deleted.');
    } else {
      setMessage(result.message ?? 'Could not delete.');
    }
  });
}

  return (
    <div className='flex w-full max-w-xl flex-col gap-4'>
      {message && (
        <p role='alert' className='text-sm font-semibold text-destructive'>
          {message}
        </p>
      )}

      <ul className='flex flex-col gap-4'>
        {quotes.map((q) => (
          <li key={q.id}>
            <Card>
              <CardContent className='flex flex-col gap-3'>
                {q.category && (
                  <span className='self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground'>
                    {q.category}
                  </span>
                )}
                <p className='text-lg font-semibold text-foreground break-words'>
                     {q.quote}
                </p>
                <span className='self-end font-semibold text-foreground'>
                  - {q.author}
                </span>
                <p className='text-sm text-muted-foreground'>
                  {q.likedBy.length} {q.likedBy.length === 1 ? 'like' : 'likes'}
                </p>
                <div className='flex flex-wrap items-center gap-4'>
                  <TextLink href={`/user/quotes/${q.id}/edit`}>
                    Edit
                    <span className='sr-only'> quote by {q.author}</span>
                  </TextLink>
                  <Button
                    variant='outline'
                    disabled={isPending}
                    onClick={() => handleDelete(q.id)}
                  >
                    Delete
                    <span className='sr-only'> quote by {q.author}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}