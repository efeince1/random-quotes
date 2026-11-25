'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/QuoteCard';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
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
      <H1 className='sr-only'>Random Quotes</H1>
      <QuoteCard
        quote={quote}
        author={author}
        category={category}
        likeCount={likedBy.length}
        isLiked={isLiked}
        likeDisabled={!user}
        onLike={handleLike}
      >
        <div className='flex flex-wrap gap-3'>
          <Button variant='secondary' onClick={previousQuote}>
            Previous
          </Button>
          <Button onClick={nextQuote}>Next Quote</Button>
        </div>
      </QuoteCard>

      {!isLoading && !user && (
        <P>
          <TextLink href='/auth/login'>Log in</TextLink> to like quotes.
        </P>
      )}

      {user && <TextLink href='/user/quotes/liked'>View liked quotes</TextLink>}
    </main>
  );
}