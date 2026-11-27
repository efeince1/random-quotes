import { Suspense } from 'react';
import { auth0 } from '@/lib/auth0';
import { getQuotes } from '@/lib/quotes-db';
import { QuoteBrowser } from '@/components/QuoteBrowser';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { connection } from 'next/server';

async function Quotes() {
  await connection();

  const [quotes, session] = await Promise.all([
    getQuotes(),
    auth0.getSession(),
  ]);

  return <QuoteBrowser quotes={quotes} userId={session?.user.sub ?? null} />;
}

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4 py-20'>
      <H1 className='sr-only'>Random Quotes</H1>
      <Suspense fallback={<P>Loading quotes...</P>}>
        <Quotes />
      </Suspense>
    </main>
  );
}