import { z } from 'zod';

export const quoteCategories = [
  'Motivation',
  'Life',
  'Wisdom',
  'Success',
  'Other',
] as const;

export const newQuoteSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, { message: 'Author name should be at least 2 characters long' })
    .max(50, {
      message:
        'Author name should be 50 characters long maximum. Please try a shorter name.',
    }),
  quote: z
    .string()
    .trim()
    .min(5, { message: 'Quote should be at least 5 characters long' })
    .max(300, {
      message:
        'Quote should be 300 characters long maximum. Please try a shorter one.',
    }),
  category: z.enum(quoteCategories, { message: 'Please select a category' }),
});

export type NewQuoteInput = z.infer<typeof newQuoteSchema>;

export type AddNewQuoteState = {
  success: boolean;
  errors?: {
    formErrors: string[];
    fieldErrors: {
      author?: string[];
      quote?: string[];
      category?: string[];
    };
  };
  message?: string;
  data?: {
    author: string;
    quote: string;
    category: string;
  };
};
export type Quote = {
  id: string;
  quote: string;
  author: string;
  category?: string;
  likedBy: string[];
  createdBy: string | null;
};