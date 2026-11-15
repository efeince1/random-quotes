import { H3 } from '@/components/typography/H3';
import { Button } from '@/components/Button';
import { Heart } from 'lucide-react';

export function QuoteCard({ quote, author, likeCount, onLike, children }) {
  return (
    <section className='bg-white shadow-md rounded-md p-10 flex flex-col'>
      <H3 element='p'>{quote}</H3>
      <span className='text-md font-semibold text-slate-900 self-end'>
        - {author}
      </span>
      <div className='mt-4 flex items-center gap-3'>
        <Button variant='secondary' onClick={onLike}>
  <Heart size={18} className={likeCount > 0 ? 'fill-current' : ''} />
  Like
</Button>
        <span className='text-md font-semibold text-slate-900'>
          {likeCount} likes
        </span>
      </div>
      <div className='mt-6 flex flex-col'>{children}</div>
    </section>
  );
}