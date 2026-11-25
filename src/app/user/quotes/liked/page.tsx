'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuotes } from '@/app/QuotesContext';
import { LikedQuoteCard } from '@/components/LikedQuoteCard';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';

export default function LikedQuotesPage() {
  const { user, isLoading } = useUser();
  const { quotes, unlikeQuote } = useQuotes();

  if (isLoading) {
    return (
      <main className='min-h-screen bg-background px-4 pt-20 flex justify-center'>
        <P>Loading...</P>
      </main>
    );
  }

  if (!user) {
    return (
      <main className='min-h-screen bg-background px-4 pt-20 flex flex-col items-center gap-4'>
        <H1>Liked Quotes</H1>
        <P>Please log in to see the quotes you liked.</P>
        <TextLink href='/auth/login'>Log in</TextLink>
      </main>
    );
  }

  const likedQuotes = quotes
    .map((q, index) => ({ ...q, index }))
    .filter((q) => q.likedBy.includes(user.sub));

  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 sm:px-10 flex flex-col items-center gap-6'>
      <H1>Liked Quotes</H1>

      {likedQuotes.length === 0 ? (
        <P>You have not liked any quotes yet.</P>
      ) : (
        <ul className='flex flex-col gap-4 w-full max-w-xl'>
          {likedQuotes.map((q) => (
            <LikedQuoteCard
              key={q.index}
              quote={q.quote}
              author={q.author}
              likeCount={q.likedBy.length}
              onUnlike={() => unlikeQuote(q.index, user.sub)}
            />
          ))}
        </ul>
      )}

      <TextLink href='/'>Back to quotes</TextLink>
    </main>
  );
}