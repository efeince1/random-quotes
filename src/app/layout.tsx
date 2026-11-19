import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QuotesProvider } from '@/app/QuotesContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar'; 

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Random Quotes',
  description: 'Browse random quotes, like them and see your liked quotes.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <QuotesProvider>
            <Navbar />
            {children}
          </QuotesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}