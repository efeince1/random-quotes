'use client';

import { useTransition } from 'react';
import { LikedQuoteCard } from '@/components/LikedQuoteCard';
import { P } from '@/components/typography/P';
import { setQuoteLike } from '@/app/actions';
import type { Quote } from '@/types/quotes';

export function LikedQuotesList({ quotes }: { quotes: Quote[] }) {
  const [isPending, startTransition] = useTransition();

  if (quotes.length === 0) {
    return <P>You have not liked any quotes yet.</P>;
  }

  return (
    <ul className='flex flex-col gap-4 w-full max-w-xl'>
      {quotes.map((q) => (
        <LikedQuoteCard
          key={q.id}
          quote={q.quote}
          author={q.author}
          likeCount={q.likedBy.length}
          disabled={isPending}
          onUnlike={() =>
            startTransition(async () => {
              await setQuoteLike(q.id, false);
            })
          }
        />
      ))}
    </ul>
  );
}