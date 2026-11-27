'use server';

import { revalidatePath } from 'next/cache';
import { auth0 } from '@/lib/auth0';
import { addLike, removeLike } from '@/lib/quotes-db';

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

  return { success: true };
}