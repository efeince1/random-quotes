'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/QuoteCard';
import { useQuotes } from '@/app/QuotesContext';

export default function Home() {
  const { user, isLoading } = useUser();
  const {
    quotes,
    quoteIndex,
    nextQuote,
    previousQuote,
    likeQuote,
    unlikeQuote,
  } = useQuotes();
const { quote, author, likedBy, category } = quotes[quoteIndex];

  const isLiked = !!user && likedBy.includes(user.sub);

  function handleLike() {
    if (!user) return;
    if (isLiked) {
      unlikeQuote(quoteIndex, user.sub);
    } else {
      likeQuote(quoteIndex, user.sub);
    }
  }

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4 py-20'>
      <h1 className='sr-only'>Random Quotes</h1>
      <QuoteCard
        quote={quote}
        author={author}
        likeCount={likedBy.length}
        isLiked={isLiked}
        likeDisabled={!user}
        onLike={handleLike}
        category={category}
      >
        <div className='flex flex-wrap gap-3'>
          <Button variant='secondary' onClick={previousQuote}>
            Previous
          </Button>
          <Button onClick={nextQuote}>Next Quote</Button>
        </div>
      </QuoteCard>

      {!isLoading && !user && (
        <p className='text-foreground'>
          <a
            href='/auth/login'
            className='font-semibold underline underline-offset-4'
          >
            Log in
          </a>{' '}
          to like quotes.
        </p>
      )}

      {user && (
        <Link
          href='/user/quotes/liked'
          className='font-semibold text-foreground underline underline-offset-4'
        >
          View liked quotes
        </Link>
      )}
    </main>
  );
}