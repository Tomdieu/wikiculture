import { cn } from '@/lib/utils';
import { ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';

type AnimatedLikeButtonProps = {
    articleLikes?: { likes: number,hasLike:boolean }
    onClick?:()=>void;
}

const AnimatedLikeButton = ({ articleLikes,onClick }: AnimatedLikeButtonProps) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        if(onClick){
            onClick()
        }
        setTimeout(() => setIsClicked(false), 300); // Reset animation state after 300ms
    };

    return (
        <div
            onClick={handleClick}
            className={cn("flex items-center justify-center py-1 space-x-2 border rounded-full px-2 cursor-pointer text-muted-foreground select-none",{'bg-emerald-500 text-white':articleLikes?.hasLike})}
        >
            {articleLikes && (
                <span className={cn('transition-opacity duration-300 text-blue-500',{'text-white':articleLikes?.hasLike})}>{articleLikes?.likes}</span>
            )}
            <ThumbsUpIcon
                className={cn(`w-5 h-5 text-blue-500 transition-transform duration-300`, { 'transform scale-150': isClicked,'text-white':articleLikes?.hasLike })}
            />
        </div>
    );
};

export default AnimatedLikeButton;
