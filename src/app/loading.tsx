import { P } from '@/components/typography/P';

export default function Loading() {
  return (
    <main
      aria-busy='true'
      className='min-h-dvh bg-background px-4 pt-20 flex justify-center'
    >
      <P>Loading...</P>
    </main>
  );
}