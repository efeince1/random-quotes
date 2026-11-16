'use client';

import Link from 'next/link';
import { useQuotes } from '@/app/QuotesContext';
import { LikedQuoteCard } from '@/components/LikedQuoteCard';

export default function LikedQuotesPage() {
  const { quotes, unlikeQuote } = useQuotes();

  const likedQuotes = quotes
    .map((q, index) => ({ ...q, index }))
    .filter((q) => q.likeCount > 0);

  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 sm:px-10 flex flex-col items-center gap-6'>
      <h1 className='text-3xl font-semibold text-foreground'>Liked Quotes</h1>

      {likedQuotes.length === 0 ? (
        <p className='text-foreground'>You have not liked any quotes yet.</p>
      ) : (
        <ul className='flex flex-col gap-4 w-full max-w-xl'>
          {likedQuotes.map((q) => (
            <LikedQuoteCard
              key={q.index}
              quote={q.quote}
              author={q.author}
              likeCount={q.likeCount}
              onUnlike={() => unlikeQuote(q.index)}
            />
          ))}
        </ul>
      )}

      <Link
        href='/'
        className='font-semibold text-foreground underline underline-offset-4'
      >
        Back to quotes
      </Link>
    </main>
  );
}