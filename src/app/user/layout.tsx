import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth0 } from '@/lib/auth0';

async function RequireSession({ children }: { children: ReactNode }) {
  const session = await auth0.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return <>{children}</>;
}

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <main className='min-h-screen bg-background px-4 pt-20 flex justify-center'>
          <p className='text-foreground'>Loading...</p>
        </main>
      }
    >
      <RequireSession>{children}</RequireSession>
    </Suspense>
  );
}