'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/QuoteCard';
import { useQuotes } from '@/app/QuotesContext';

export default function Home() {
  const { quotes, quoteIndex, nextQuote, previousQuote, likeQuote } =
    useQuotes();
  const { quote, author, likeCount } = quotes[quoteIndex];

  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4 py-20'>
      <h1 className='sr-only'>Random Quotes</h1>
      <QuoteCard
        quote={quote}
        author={author}
        likeCount={likeCount}
        onLike={() => likeQuote(quoteIndex)}
      >
        <div className='flex flex-wrap gap-3'>
          <Button variant='secondary' onClick={previousQuote}>
            Previous
          </Button>
          <Button onClick={nextQuote}>Next Quote</Button>
        </div>
      </QuoteCard>
      <Link
        href='/user/quotes/liked'
        className='font-semibold text-foreground underline underline-offset-4'
      >
        View liked quotes
      </Link>
    </main>
  );
}