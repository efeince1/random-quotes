'use client';

import { useState, useTransition } from 'react';
import { Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/QuoteCard';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import { deleteQuoteAction, setQuoteLike } from '@/app/actions';
import type { Quote } from '@/types/quotes';

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
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

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

  function handleDelete() {
    if (!window.confirm('Delete this quote? This cannot be undone.')) return;

    startTransition(async () => {
      const result = await deleteQuoteAction(id);
      setMessage(
        result.success ? null : (result.message ?? 'Could not delete.'),
      );
    });
  }

  function handlePrevious() {
    setMessage(null);
    setIndex((currentIndex - 1 + quotes.length) % quotes.length);
  }

  function handleNext() {
    setMessage(null);
    setIndex((currentIndex + 1) % quotes.length);
  }

  function handleRandom() {
    if (quotes.length < 2) return;

    let next = currentIndex;
    while (next === currentIndex) {
      next = Math.floor(Math.random() * quotes.length);
    }

    setMessage(null);
    setIndex(next);
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
            <Button variant='secondary' onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant='outline' onClick={handleRandom}>
              <Shuffle />
              Random quote
            </Button>
            <Button onClick={handleNext}>Next Quote</Button>
          </div>

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