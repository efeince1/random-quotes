import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';
import { TextLink } from '@/components/typography/TextLink';

export default function NotFound() {
  return (
    <main className='min-h-dvh bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6 text-center'>
      <H1>Page not found</H1>
      <P>The page you are looking for does not exist or was removed.</P>
      <TextLink href='/'>Back to quotes</TextLink>
    </main>
  );
}