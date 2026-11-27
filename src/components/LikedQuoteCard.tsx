import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type LikedQuoteCardProps = {
  quote: string;
  author: string;
  likeCount: number;
  disabled?: boolean;
  onUnlike: () => void;
};

export function LikedQuoteCard({
  quote,
  author,
  likeCount,
  disabled, 
  onUnlike,
}: LikedQuoteCardProps) {
  return (
    <li>
      <Card>
        <CardContent className='flex flex-col gap-3'>
          <p className='text-lg font-semibold text-foreground break-words'>{quote}</p>
          <span className='self-end font-semibold text-foreground'>
            - {author}
          </span>
          <div className='flex items-center gap-3'>
            <Button variant='outline' onClick={onUnlike} disabled={disabled}>
              <Heart className='fill-current' />
              Unlike
            </Button>
            <span className='font-semibold text-foreground'>
              {likeCount} likes
            </span>
          </div>
        </CardContent>
      </Card>
    </li>
  );
}