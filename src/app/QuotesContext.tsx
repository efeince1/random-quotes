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
  likeQuote: (index: number, userId: string) => void;
unlikeQuote: (index: number, userId: string) => void;
addQuote: (quote: string, author: string) => void;
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

  function likeQuote(index: number, userId: string) {
  setQuotes(
    quotes.map((q, i) =>
      i === index && !q.likedBy.includes(userId)
        ? { ...q, likedBy: [...q.likedBy, userId] }
        : q
    )
  );
}

function unlikeQuote(index: number, userId: string) {
  setQuotes(
    quotes.map((q, i) =>
      i === index
        ? { ...q, likedBy: q.likedBy.filter((id) => id !== userId) }
        : q
    )
  );
}
function addQuote(quote: string, author: string) {
  setQuotes([...quotes, { quote, author, likedBy: [] }]);
  setQuoteIndex(quotes.length);
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
        addQuote,
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