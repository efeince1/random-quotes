import { Heart } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { H3 } from '@/components/typography/H3';


type QuoteCardProps = {
  quote: string;
  author: string;
  category?: string;
  likeCount: number;
  isLiked: boolean;
  likeDisabled: boolean;
  onLike: () => void;
  children: ReactNode;
  extraActions?: ReactNode;
};

export function QuoteCard({
  quote,
  author,
  likeCount,
  category,
  isLiked,
  likeDisabled,
  onLike,
  children,
  extraActions,
}: QuoteCardProps) {
  return (
    <Card className='w-full max-w-xl'>
      <CardContent className='flex flex-col gap-4'>
        {category && (
  <span className='self-start rounded-full border px-2.5 py-0.5 text-xs font-semibold text-foreground'>
    {category}
  </span>
)}
        <H3 element='p'>{quote}</H3>
        <span className='self-end font-semibold text-foreground'>
          - {author}
        </span>
        <div className='flex flex-wrap items-center gap-3'>
  <Button
    variant='outline'
    onClick={onLike}
    disabled={likeDisabled}
    aria-pressed={isLiked}
  >
    <Heart className={isLiked ? 'fill-current' : ''} />
    Like
  </Button>
  <span className='font-semibold text-foreground'>{likeCount} likes</span>
  {extraActions}
</div>
      </CardContent>
      <CardFooter>{children}</CardFooter>
    </Card>
  );
}