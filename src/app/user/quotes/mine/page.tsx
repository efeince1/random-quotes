import { Suspense } from 'react';
import { connection } from 'next/server';
import { auth0 } from '@/lib/auth0';
import { getQuotesByCreator } from '@/lib/quotes-db';
import { MyQuotesList } from '@/components/MyQuotesList';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'My quotes' };

async function MyQuotes() {
  await connection();

  const session = await auth0.getSession();

  if (!session) {
    return (
      <P>
        Please <TextLink href='/auth/login'>log in</TextLink> to see your
        quotes.
      </P>
    );
  }

  const quotes = await getQuotesByCreator(session.user.sub);

  return <MyQuotesList quotes={quotes} />;
}

export default function MyQuotesPage() {
  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 sm:px-10 flex flex-col items-center gap-6'>
      <H1>My quotes</H1>
      <Suspense fallback={<P>Loading...</P>}>
        <MyQuotes />
      </Suspense>
      <div className='flex flex-wrap justify-center gap-6'>
        <TextLink href='/user/quotes/new'>Add a new quote</TextLink>
        <TextLink href='/'>Back to quotes</TextLink>
      </div>
    </main>
  );
}