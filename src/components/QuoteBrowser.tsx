'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/QuoteCard';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import { setQuoteLike } from '@/app/actions';
import type { Quote } from '@/types/quotes';

type QuoteBrowserProps = {
  quotes: Quote[];
  userId: string | null;
};

export function QuoteBrowser({ quotes, userId }: QuoteBrowserProps) {
  const [index, setIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  if (quotes.length === 0) {
    return <P>There are no quotes yet.</P>;
  }

  const currentIndex = Math.min(index, quotes.length - 1);
const { id, quote, author, category, likedBy, createdBy } =
  quotes[currentIndex];
    const isLiked = userId !== null && likedBy.includes(userId);
    const isOwner = userId !== null && createdBy === userId;

  function handleLike() {
    if (!userId) return;
    startTransition(async () => {
      await setQuoteLike(id, !isLiked);
    });
  }

  return (
    <>
      <QuoteCard
        quote={quote}
        author={author}
        category={category}
        likeCount={likedBy.length}
        isLiked={isLiked}
        likeDisabled={!userId || isPending}
        onLike={handleLike}
      >
        <div className='flex w-full flex-col gap-3'>
  <div className='flex flex-wrap gap-3'>
    <Button
      variant='secondary'
      onClick={() =>
        setIndex((current) => (current - 1 + quotes.length) % quotes.length)
      }
    >
      Previous
    </Button>
    <Button
      onClick={() => setIndex((current) => (current + 1) % quotes.length)}
    >
      Next Quote
    </Button>
  </div>
  {isOwner && (
    <TextLink href={`/user/quotes/${id}/edit`}>Edit this quote</TextLink>
  )}
</div>
      </QuoteCard>

      {userId ? (
        <TextLink href='/user/quotes/liked'>View liked quotes</TextLink>
      ) : (
        <P>
          <TextLink href='/auth/login'>Log in</TextLink> to like quotes.
        </P>
      )}
    </>
  );
}