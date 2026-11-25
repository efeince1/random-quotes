import { NewQuoteForm } from '@/components/NewQuoteForm';
import { H1 } from '@/components/typography/H1';

export default function NewQuotePage() {
  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6'>
      <H1>Add a new quote</H1>
      <NewQuoteForm />
    </main>
  );
}