'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { addNewQuote } from '@/app/user/quotes/new/actions';
import type { AddNewQuoteState } from '@/types/quotes';
import { useQuotes } from '@/app/QuotesContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@auth0/nextjs-auth0/client';

const initialState: AddNewQuoteState = { success: false };

export function NewQuoteForm() {
  const { addQuote } = useQuotes();
  const router = useRouter();
  const { user, isLoading } = useUser();

  async function handleSubmit(
    previousState: AddNewQuoteState,
    formData: FormData,
  ) {
    const result = await addNewQuote(previousState, formData);

    if (result.success && result.data) {
      addQuote(result.data.quote, result.data.author);
      router.push('/');
    }

    return result;
  }

  const [state, formAction, isPending] = useActionState(
    handleSubmit,
    initialState,
  );

  const quoteErrors = state.errors?.fieldErrors.quote;
  const authorErrors = state.errors?.fieldErrors.author;
  if (isLoading) {
  return <p className='text-foreground'>Loading...</p>;
}

if (!user) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <p className='text-foreground'>Please log in to add a new quote.</p>
      <a
        href='/auth/login?returnTo=/user/quotes/new'
        className='font-semibold text-foreground underline underline-offset-4'
      >
        Log in
      </a>
    </div>
  );
}

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form action={formAction} className='flex flex-col gap-5' noValidate>
          {state.message && (
            <p role='alert' className='text-sm font-semibold text-destructive'>
              {state.message}
            </p>
          )}

          <div className='flex flex-col gap-2'>
            <Label htmlFor='quote'>Quote</Label>
            <Textarea
              id='quote'
              name='quote'
              rows={4}
              defaultValue={state.data?.quote}
              aria-invalid={!!quoteErrors}
              aria-describedby={quoteErrors ? 'quote-error' : undefined}
            />
            {quoteErrors && (
              <p id='quote-error' className='text-sm text-destructive'>
                {quoteErrors.join(' ')}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-2'>
            <Label htmlFor='author'>Author</Label>
            <Input
              id='author'
              name='author'
              defaultValue={state.data?.author}
              aria-invalid={!!authorErrors}
              aria-describedby={authorErrors ? 'author-error' : undefined}
            />
            {authorErrors && (
              <p id='author-error' className='text-sm text-destructive'>
                {authorErrors.join(' ')}
              </p>
            )}
          </div>

          <Button type='submit' disabled={isPending}>
            {isPending ? 'Adding...' : 'Add quote'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}