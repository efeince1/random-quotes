import { Heart } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { H3 } from '@/components/typography/H3';

type QuoteCardProps = {
  quote: string;
  author: string;
  likeCount: number;
  onLike: () => void;
  children: ReactNode;
};

export function QuoteCard({
  quote,
  author,
  likeCount,
  onLike,
  children,
}: QuoteCardProps) {
  return (
    <Card className='w-full max-w-xl'>
      <CardContent className='flex flex-col gap-4'>
        <H3 element='p'>{quote}</H3>
        <span className='self-end font-semibold text-foreground'>
          - {author}
        </span>
        <div className='flex items-center gap-3'>
          <Button variant='outline' onClick={onLike}>
            <Heart className={likeCount > 0 ? 'fill-current' : ''} />
            Like
          </Button>
          <span className='font-semibold text-foreground'>
            {likeCount} likes
          </span>
        </div>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}