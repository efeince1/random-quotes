'use client';

import { Button } from '@/components/Button';
import { QuoteCard } from '@/components/QuoteCard';
import { useQuotes } from '@/app/QuotesContext';

export default function Home() {
  const { quotes, quoteIndex, nextQuote, previousQuote, likeQuote } =
    useQuotes();
  const { quote, author, likeCount } = quotes[quoteIndex];

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-200'>
      <QuoteCard
        quote={quote}
        author={author}
        likeCount={likeCount}
        onLike={() => likeQuote(quoteIndex)}
      >
        <div className='flex gap-3'>
          <Button variant='secondary' onClick={previousQuote}>
            Previous
          </Button>
          <Button variant='primary' onClick={nextQuote}>
            Next Quote
          </Button>
        </div>
      </QuoteCard>
    </main>
  );
}