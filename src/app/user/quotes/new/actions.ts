'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth0 } from '@/lib/auth0';
import { createQuote } from '@/lib/quotes-db';
import { newQuoteSchema } from '@/types/quotes';
import type { AddNewQuoteState } from '@/types/quotes';

export async function addNewQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();

  if (!session) {
    return {
      success: false,
      message: 'Please log in to add a quote.',
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

  try {
    await createQuote(validationOutput.data, session.user.sub);
  } catch {
    return {
      success: false,
      message: 'Something went wrong while saving your quote. Please try again.',
      data: rawData,
    };
  }

  revalidatePath('/');
  redirect('/user/quotes/new/success');
}