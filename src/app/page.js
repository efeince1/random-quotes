'use client';

import { quotes as initialQuotes } from '@/quotes';
import { Button } from '@/components/Button';
import { QuoteCard } from '@/components/QuoteCard';
import { useState } from 'react';

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { quote, author, likeCount } = quotes[quoteIndex];

  function handleClick() {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
  }

  function handleLike() {
    setQuotes(
      quotes.map((q, index) =>
        index === quoteIndex ? { ...q, likeCount: q.likeCount + 1 } : q
      )
    );
  }

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-200'>
      <QuoteCard
        quote={quote}
        author={author}
        likeCount={likeCount}
        onLike={handleLike}
      >
        <Button variant={'primary'} onClick={handleClick}>
          Next Quote
        </Button>
      </QuoteCard>
    </main>
  );
}