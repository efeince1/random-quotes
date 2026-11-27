'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth0 } from '@/lib/auth0';
import { updateQuote } from '@/lib/quotes-db';
import { newQuoteSchema } from '@/types/quotes';
import type { AddNewQuoteState } from '@/types/quotes';

export async function updateQuoteAction(
  quoteId: string,
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: 'Please log in to edit a quote.',
    };
  }

  const rawData = {
    author: String(formData.get('author') ?? ''),
    quote: String(formData.get('quote') ?? ''),
    category: String(formData.get('category') ?? ''),
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    return {
      success: false,
      errors: z.flattenError(validationOutput.error),
      data: rawData,
    };
  }

  let updated = false;

  try {
    updated = await updateQuote(
      quoteId,
      validationOutput.data,
      session.user.sub,
    );
  } catch {
    return {
      success: false,
      message: 'Something went wrong while saving your changes. Please try again.',
      data: rawData,
    };
  }

  if (!updated) {
    return {
      success: false,
      message: 'You can only edit quotes that you created.',
      data: rawData,
    };
  }

  revalidatePath('/');
  revalidatePath('/user/quotes/liked');
  redirect('/');
  revalidatePath('/');
revalidatePath('/user/quotes/liked');
revalidatePath('/user/quotes/mine');
redirect('/user/quotes/mine');
}