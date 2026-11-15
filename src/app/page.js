'use client';

import { quotes as initialQuotes } from '@/quotes';
import { Button } from '@/components/Button';
import { QuoteCard } from '@/components/QuoteCard';
import { useState } from 'react';

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const { quote, author, likeCount } = initialQuotes[quoteIndex];

  function handleClick() {
  setQuoteIndex((quoteIndex + 1) % initialQuotes.length);
}

  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-200'>
      <QuoteCard quote={quote} author={author} likeCount={likeCount}>
        <Button variant={'primary'} onClick={handleClick}>
          Next Quote
        </Button>
      </QuoteCard>
    </main>
  );
}