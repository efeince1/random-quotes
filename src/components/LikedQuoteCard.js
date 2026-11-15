import { Heart } from 'lucide-react';
import { Button } from '@/components/Button';

export function LikedQuoteCard({ quote, author, likeCount, onUnlike }) {
  return (
    <li className='bg-white shadow-md rounded-md p-6 flex flex-col gap-3'>
      <p className='text-lg font-semibold text-slate-900'>{quote}</p>
      <span className='text-md font-semibold text-slate-900 self-end'>
        - {author}
      </span>
      <div className='flex items-center gap-3'>
        <Button variant='secondary' onClick={onUnlike}>
          <Heart size={18} className='fill-current' />
          Unlike
        </Button>
        <span className='text-md font-semibold text-slate-900'>
          {likeCount} likes
        </span>
      </div>
    </li>
  );
}