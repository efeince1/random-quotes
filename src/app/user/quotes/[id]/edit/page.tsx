import { Suspense } from 'react';
import { connection } from 'next/server';
import { notFound } from 'next/navigation';
import { auth0 } from '@/lib/auth0';
import { getQuoteById } from '@/lib/quotes-db';
import { QuoteForm } from '@/components/QuoteForm';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';
import { updateQuoteAction } from './actions';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Edit quote' };

async function EditQuote({ params }: { params: Promise<{ id: string }> }) {
  await connection();

  const { id } = await params;
  const [quote, session] = await Promise.all([
    getQuoteById(id),
    auth0.getSession(),
  ]);

  if (!quote) {
    notFound();
  }

  if (!session || quote.createdBy !== session.user.sub) {
    return <P>You can only edit quotes that you created.</P>;
  }

  return (
    <QuoteForm
      action={updateQuoteAction.bind(null, quote.id)}
      initialValues={{
        quote: quote.quote,
        author: quote.author,
        category: quote.category,
      }}
      submitLabel='Save changes'
      pendingLabel='Saving...'
      resetLabel='Reset'
    />
  );
}

export default function EditQuotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6'>
      <H1>Edit quote</H1>
      <Suspense fallback={<P>Loading...</P>}>
        <EditQuote params={params} />
      </Suspense>
      <TextLink href='/user/quotes/mine'>Back to my quotes</TextLink>
    </main>
  );
}