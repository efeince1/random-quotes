import { H3 } from '@/components/typography/H3';

export function QuoteCard({ quote, author, children }) {
  return (
    <section className='bg-slate-50/50 rounded-md p-10 flex flex-col'>
      <H3 element='p'>{quote}</H3>
      <span className='text-md font-semibold text-slate-900 self-end'>
        - {author}
      </span>
      <div className='mt-6 flex flex-col'>{children}</div>
    </section>
  );
}