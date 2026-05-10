import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { HeartOutline, HeartFilled } from '../icons';
import './WishlistHeart.css';

export interface WishlistHeartProps {
  wishlisted?: boolean;
  onToggle?: (next: boolean) => void;
  className?: string;
}

export function WishlistHeart({
  wishlisted = false,
  onToggle,
  className,
}: WishlistHeartProps) {
  const [isSpilling, setIsSpilling] = useState(false);
  const filled = wishlisted || isSpilling;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsSpilling(true);
    onToggle?.(!wishlisted);
    window.setTimeout(() => setIsSpilling(false), 500);
  }

  return (
    <motion.button
      type="button"
      className={`wh ${className ?? ''}`}
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={wishlisted}
    >
      <span className="wh__stack">
        <HeartOutline size={16} color="var(--grey-700)" />
        <motion.span
          className="wh__fill"
          initial={false}
          animate={{ clipPath: filled ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeartFilled size={16} color="var(--red-600)" />
        </motion.span>
      </span>
    </motion.button>
  );
}
