'use server';

import { z } from 'zod';
import { auth0 } from '@/lib/auth0';
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
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    return {
      success: false,
      errors: z.flattenError(validationOutput.error),
      data: rawData,
    };
  }

 
  return {
    success: true,
    data: validationOutput.data,
  };
}