'use client';

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ThemeToggle } from '@/components/ThemeToggle';

const linkStyles =
  'text-sm font-semibold text-foreground underline-offset-4 hover:underline';

export function Navbar() {
  const { user, isLoading } = useUser();

  return (
    <header className='fixed inset-x-0 top-0 z-10 border-b bg-background/90 backdrop-blur'>
      <nav
        aria-label='Main'
        className='mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3'
      >
        <div className='flex items-center gap-4'>
          <Link href='/' className='font-semibold text-foreground'>
            Random Quotes
          </Link>
          {user && (
  <>
    <Link href='/user/quotes/new' className={linkStyles}>
      New quote
    </Link>
    <Link href='/user/quotes/liked' className={linkStyles}>
      Liked quotes
    </Link>
  </>
)}
        </div>

        <div className='flex items-center gap-3'>
          {!isLoading && user && (
            <>
              <span className='hidden text-sm text-foreground sm:inline'>
                {user.name}
              </span>
              <a href='/auth/logout' className={linkStyles}>
                Logout
              </a>
            </>
          )}
          {!isLoading && !user && (
            <>
              <a href='/auth/login' className={linkStyles}>
                Login
              </a>
              <a
                href='/auth/login?screen_hint=signup'
                className='rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground'
              >
                Sign up
              </a>
            </>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}