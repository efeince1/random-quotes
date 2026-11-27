'use server';

import { revalidatePath } from 'next/cache';
import { auth0 } from '@/lib/auth0';
import { addLike, deleteQuote, removeLike } from '@/lib/quotes-db';

export async function setQuoteLike(quoteId: string, liked: boolean) {
  const session = await auth0.getSession();

  if (!session) {
    return { success: false, message: 'Please log in to like quotes.' };
  }

  const userId = session.user.sub;

  if (liked) {
    await addLike(quoteId, userId);
  } else {
    await removeLike(quoteId, userId);
  }

  revalidatePath('/');
  revalidatePath('/user/quotes/liked');
  revalidatePath('/user/quotes/mine');

  return { success: true };
}
export async function deleteQuoteAction(
  quoteId: string,
): Promise<{ success: boolean; message?: string }> {
  const session = await auth0.getSession();

  if (!session) {
    return { success: false, message: 'Please log in to delete a quote.' };
  }

  let deleted = false;

  try {
    deleted = await deleteQuote(quoteId, session.user.sub);
  } catch {
    return {
      success: false,
      message: 'Something went wrong while deleting the quote. Please try again.',
    };
  }

  if (!deleted) {
    return {
      success: false,
      message: 'You can only delete quotes that you created.',
    };
  }

  revalidatePath('/');
  revalidatePath('/user/quotes/liked');
  revalidatePath('/user/quotes/mine');

  return { success: true };
}