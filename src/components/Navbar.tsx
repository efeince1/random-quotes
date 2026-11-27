'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const linkStyles =
  'text-sm font-semibold text-foreground underline-offset-4 hover:underline';

const userLinks = [
  { href: '/user/quotes/new', label: 'New quote' },
  { href: '/user/quotes/mine', label: 'My quotes' },
  { href: '/user/quotes/liked', label: 'Liked quotes' },
];

export function Navbar() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const authLinks =
    !isLoading &&
    (user ? (
      <a href='/auth/logout' className={linkStyles}>
        Logout
      </a>
    ) : (
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
    ));

  return (
    <header className='fixed inset-x-0 top-0 z-10 border-b bg-background/90 backdrop-blur'>
      <nav aria-label='Main' className='mx-auto max-w-4xl px-4'>
        <div className='flex h-14 items-center justify-between gap-4'>
          <Link href='/' className='font-semibold text-foreground'>
            Random Quotes
          </Link>

          <div className='hidden items-center gap-5 md:flex'>
            {user &&
              userLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={linkStyles}
                >
                  {link.label}
                </Link>
              ))}
            {!isLoading && user && (
              <span className='max-w-40 truncate text-sm text-muted-foreground'>
                {user.name}
              </span>
            )}
            {authLinks}
            <ThemeToggle />
          </div>

          <div className='flex items-center gap-2 md:hidden'>
            <ThemeToggle />
            <Button
              variant='outline'
              size='icon'
              className='size-10'
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls='mobile-menu'
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {open && (
          <div
            id='mobile-menu'
            className='flex flex-col gap-3 border-t py-4 md:hidden'
          >
            {!isLoading && user && (
              <p className='text-sm text-muted-foreground'>
                Signed in as {user.name}
              </p>
            )}
            {user &&
              userLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={`${linkStyles} py-2`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <div className='flex flex-wrap items-center gap-4 py-2'>
              {authLinks}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}