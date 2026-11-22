'use client';

import { startTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@auth0/nextjs-auth0/client';
import { addNewQuote } from '@/app/user/quotes/new/actions';
import { useQuotes } from '@/app/QuotesContext';
import { newQuoteSchema } from '@/types/quotes';
import type { AddNewQuoteState, NewQuoteInput } from '@/types/quotes';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const initialState: AddNewQuoteState = { success: false };

export function NewQuoteForm() {
  const { addQuote } = useQuotes();
  const router = useRouter();
  const { user, isLoading } = useUser();

  async function submitToServer(
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
    submitToServer,
    initialState,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewQuoteInput>({
    mode: 'onBlur',
    resolver: zodResolver(newQuoteSchema),
    defaultValues: { author: '', quote: '' },
  });

  function onValid(values: NewQuoteInput) {
    const formData = new FormData();
    formData.append('author', values.author);
    formData.append('quote', values.quote);
    startTransition(() => formAction(formData));
  }

  const authorErrors = errors.author
    ? [errors.author]
    : state.errors?.fieldErrors.author?.map((message) => ({ message }));
  const quoteErrors = errors.quote
    ? [errors.quote]
    : state.errors?.fieldErrors.quote?.map((message) => ({ message }));

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
        <form onSubmit={handleSubmit(onValid)} noValidate>
          <FieldGroup>
            {state.message && (
              <p
                role='alert'
                className='text-sm font-semibold text-destructive'
              >
                {state.message}
              </p>
            )}

            <Field data-invalid={!!quoteErrors}>
              <FieldLabel htmlFor='quote'>Quote</FieldLabel>
              <Textarea
                id='quote'
                rows={4}
                aria-invalid={!!quoteErrors}
                {...register('quote')}
              />
              {quoteErrors && <FieldError errors={quoteErrors} />}
            </Field>

            <Field data-invalid={!!authorErrors}>
              <FieldLabel htmlFor='author'>Author</FieldLabel>
              <Input
                id='author'
                aria-invalid={!!authorErrors}
                {...register('author')}
              />
              {authorErrors && <FieldError errors={authorErrors} />}
            </Field>

            <Field orientation='horizontal'>
              <Button type='submit' disabled={isPending}>
                {isPending ? 'Adding...' : 'Add quote'}
              </Button>
              <Button type='button' variant='outline' onClick={() => reset()}>
                Clear
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}