import { QuoteForm } from '@/components/QuoteForm';
import { H1 } from '@/components/typography/H1';
import { addNewQuote } from './actions';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Add a new quote' };

export default function NewQuotePage() {
  return (
    <main className='min-h-dvh bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6'>
      <H1>Add a new quote</H1>
      <QuoteForm
        action={addNewQuote}
        submitLabel='Add quote'
        pendingLabel='Adding...'
      />
    </main>
  );
}