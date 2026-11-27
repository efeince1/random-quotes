'use client';

import { useState, useTransition } from 'react';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/QuoteCard';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import { deleteQuoteAction, setQuoteLike } from '@/app/actions';
import { randomIndex } from '@/lib/random';
import { quoteCategories } from '@/types/quotes';
import type { Quote } from '@/types/quotes';
import { toast } from 'sonner';

type QuoteBrowserProps = {
  quotes: Quote[];
  userId: string | null;
  initialIndex?: number;
};

export function QuoteBrowser({
  quotes,
  userId,
  initialIndex = 0,
}: QuoteBrowserProps) {
  const [index, setIndex] = useState(initialIndex);
  const [filter, setFilter] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  if (quotes.length === 0) {
    return <P>There are no quotes yet.</P>;
  }

  const availableCategories = quoteCategories.filter((category) =>
    quotes.some((q) => q.category === category),
  );
  const activeFilter = availableCategories.some(
    (category) => category === filter,
  )
    ? filter
    : null;

  const visibleQuotes = activeFilter
    ? quotes.filter((q) => q.category === activeFilter)
    : quotes;

  const currentIndex = Math.min(index, visibleQuotes.length - 1);
  const { id, quote, author, category, likedBy, createdBy } =
    visibleQuotes[currentIndex];
  const isLiked = userId !== null && likedBy.includes(userId);
  const isOwner = userId !== null && createdBy === userId;

  function handleLike() {
  if (!userId) return;
  startTransition(async () => {
    const result = await setQuoteLike(id, !isLiked);
    if (!result.success) {
      toast.error(result.message ?? 'Could not update your like.');
    }
  });
}

function handleDelete() {
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

  function handlePrevious() {
    setMessage(null);
    setIndex((currentIndex - 1 + visibleQuotes.length) % visibleQuotes.length);
  }

  function handleNext() {
    setMessage(null);
    setIndex((currentIndex + 1) % visibleQuotes.length);
  }

  function handleRandom() {
    if (visibleQuotes.length < 2) return;

    let next = currentIndex;
    while (next === currentIndex) {
      next = randomIndex(visibleQuotes.length);
    }

    setMessage(null);
    setIndex(next);
  }

  function handleFilter(next: string | null) {
    const pool = next ? quotes.filter((q) => q.category === next) : quotes;

    setMessage(null);
    setFilter(next);
    setIndex(randomIndex(pool.length));
  }

  return (
    <>
      <div
        role='group'
        aria-label='Filter quotes by category'
        className='flex flex-wrap justify-center gap-2'
      >
        <Button
          size='sm'
          variant={activeFilter === null ? 'default' : 'outline'}
          aria-pressed={activeFilter === null}
          onClick={() => handleFilter(null)}
        >
          All
        </Button>
        {availableCategories.map((categoryName) => (
          <Button
            key={categoryName}
            size='sm'
            variant={activeFilter === categoryName ? 'default' : 'outline'}
            aria-pressed={activeFilter === categoryName}
            onClick={() => handleFilter(categoryName)}
          >
            {categoryName}
          </Button>
        ))}
      </div>

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
            <Button variant='secondary' onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant='outline' onClick={handleRandom}>
              <Shuffle />
              Random quote
            </Button>
            <Button onClick={handleNext}>Next Quote</Button>
          </div>

          <p className='text-sm text-muted-foreground'>
            Quote {currentIndex + 1} of {visibleQuotes.length}
          </p>

          {isOwner && (
            <div className='flex flex-wrap items-center gap-4'>
              <TextLink href={`/user/quotes/${id}/edit`}>
                Edit this quote
              </TextLink>
              <Button
                variant='outline'
                onClick={handleDelete}
                disabled={isPending}
              >
                Delete this quote
              </Button>
            </div>
          )}

          {message && (
            <p
              role='alert'
              className='text-sm font-semibold text-destructive'
            >
              {message}
            </p>
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