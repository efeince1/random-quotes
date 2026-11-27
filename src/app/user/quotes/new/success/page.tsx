import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';

export default function NewQuoteSuccessPage() {
  return (
    <main className='min-h-screen bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6 text-center'>
      <H1>Thank you!</H1>
      <P>Your quote was added.</P>
      <div className='flex flex-wrap justify-center gap-6'>
  <TextLink href='/user/quotes/new'>Add another quote</TextLink>
  <TextLink href='/user/quotes/mine'>View my quotes</TextLink>
  <TextLink href='/'>Back to quotes</TextLink>
</div>
    </main>
  );
}