import { NewQuoteForm } from '@/components/NewQuoteForm';

export default function NewQuotePage() {
  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6'>
      <h1 className='text-3xl font-semibold text-foreground'>
        Add a new quote
      </h1>
      <NewQuoteForm />
    </main>
  );
}