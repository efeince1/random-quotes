'use client';

import { startTransition, useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addNewQuote } from '@/app/user/quotes/new/actions';
import { useQuotes } from '@/app/QuotesContext';
import { newQuoteSchema, quoteCategories } from '@/types/quotes';
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

  const [state, formAction, isPending] = useActionState(
    addNewQuote,
    initialState,
  );

  const handledState = useRef<AddNewQuoteState | null>(null);

  useEffect(() => {
    if (handledState.current === state) return;
    handledState.current = state;

    if (state.success && state.data) {
      addQuote(state.data.quote, state.data.author, state.data.category);
      router.push('/');
    }
  }, [state, addQuote, router]);

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
    formData.append('category', values.category);
    startTransition(() => formAction(formData));
  }

  const authorErrors = errors.author
    ? [errors.author]
    : state.errors?.fieldErrors.author?.map((message) => ({ message }));
  const quoteErrors = errors.quote
    ? [errors.quote]
    : state.errors?.fieldErrors.quote?.map((message) => ({ message }));
  const categoryErrors = errors.category
    ? [errors.category]
    : state.errors?.fieldErrors.category?.map((message) => ({ message }));

  return (
    <Card className='w-full max-w-xl'>
      <CardContent>
        <form
          action={formAction}
          onSubmit={handleSubmit(onValid)}
          noValidate
        >
          <FieldGroup>
            {state.message && (
              <p
                role='alert'
                className='text-sm font-semibold text-destructive'
              >
                {state.message}
              </p>
            )}

            {state.success && (
              <p
                role='status'
                className='text-sm font-semibold text-foreground'
              >
                Quote added.
              </p>
            )}

            <Field data-invalid={!!quoteErrors}>
              <FieldLabel htmlFor='quote'>Quote</FieldLabel>
              <Textarea
                id='quote'
                rows={4}
                defaultValue={state.data?.quote}
                aria-invalid={!!quoteErrors}
                {...register('quote')}
              />
              {quoteErrors && <FieldError errors={quoteErrors} />}
            </Field>

            <Field data-invalid={!!authorErrors}>
              <FieldLabel htmlFor='author'>Author</FieldLabel>
              <Input
                id='author'
                defaultValue={state.data?.author}
                aria-invalid={!!authorErrors}
                {...register('author')}
              />
              {authorErrors && <FieldError errors={authorErrors} />}
            </Field>

            <Field data-invalid={!!categoryErrors}>
              <FieldLabel htmlFor='category'>Category</FieldLabel>
              <select
                id='category'
                defaultValue={state.data?.category ?? ''}
                aria-invalid={!!categoryErrors}
                className='h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive'
                {...register('category')}
              >
                <option value=''>Select a category</option>
                {quoteCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {categoryErrors && <FieldError errors={categoryErrors} />}
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