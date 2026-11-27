import { Suspense } from 'react';
import { connection } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { getLikedQuotes } from '@/lib/quotes-db';
import { LikedQuotesList } from '@/components/LikedQuotesList';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Liked quotes' };

async function LikedQuotes() {
  await connection();

  const session = await auth0.getSession();

  if (!session) {
    return (
      <P>
        Please <TextLink href='/auth/login'>log in</TextLink> to see the quotes
        you liked.
      </P>
    );
  }

  const quotes = await getLikedQuotes(session.user.sub);

  return <LikedQuotesList quotes={quotes} />;
}

export default function LikedQuotesPage() {
  return (
    <main className='min-h-dvh bg-background px-4 pt-20 pb-10 sm:px-10 flex flex-col items-center gap-6'>
      <H1>Liked Quotes</H1>
      <Suspense fallback={<P>Loading...</P>}>
        <LikedQuotes />
      </Suspense>
      <TextLink href='/'>Back to quotes</TextLink>
    </main>
  );
}