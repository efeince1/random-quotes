'use client';

import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { quotes as initialQuotes } from '@/quotes';
import type { Quote } from '@/quotes';

type QuotesContextType = {
  quotes: Quote[];
  quoteIndex: number;
  nextQuote: () => void;
  previousQuote: () => void;
  likeQuote: (index: number) => void;
  unlikeQuote: (index: number) => void;
};

const QuotesContext = createContext<QuotesContextType | null>(null);

export function QuotesProvider({ children }: { children: ReactNode }) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);

  function nextQuote() {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
  }

  function previousQuote() {
    setQuoteIndex((quoteIndex - 1 + quotes.length) % quotes.length);
  }

  function likeQuote(index: number) {
    setQuotes(
      quotes.map((q, i) =>
        i === index ? { ...q, likeCount: q.likeCount + 1 } : q
      )
    );
  }

  function unlikeQuote(index: number) {
    setQuotes(
      quotes.map((q, i) =>
        i === index ? { ...q, likeCount: Math.max(0, q.likeCount - 1) } : q
      )
    );
  }

  return (
    <QuotesContext.Provider
      value={{
        quotes,
        quoteIndex,
        nextQuote,
        previousQuote,
        likeQuote,
        unlikeQuote,
      }}
    >
      {children}
    </QuotesContext.Provider>
  );
}

export function useQuotes() {
  const context = useContext(QuotesContext);
  if (!context) {
    throw new Error('useQuotes must be used within a QuotesProvider');
  }
  return context;
}