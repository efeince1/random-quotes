'use client';

import { startTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { H1 } from '@/components/typography/H1';
import { P } from '@/components/typography/P';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  function retry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <main className='min-h-dvh bg-background px-4 pt-20 pb-10 flex flex-col items-center gap-6 text-center'>
      <H1>Something went wrong</H1>
      <P>
        We could not load this page. Please check your connection and try
        again.
      </P>
      <Button onClick={retry}>Try again</Button>
    </main>
  );
}