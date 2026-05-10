import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { HeartOutline, HeartFilled } from '../icons';
import './WishlistHeart.css';

export interface WishlistHeartProps {
  wishlisted?: boolean;
  onToggle?: (next: boolean) => void;
  size?: number;
  buttonSize?: number;
  outlineColor?: string;
  filledColor?: string;
  variant?: 'tile' | 'bare';
  className?: string;
  ariaLabel?: string;
}

export function WishlistHeart({
  wishlisted = false,
  onToggle,
  size = 16,
  buttonSize,
  outlineColor = 'var(--grey-700)',
  filledColor = 'var(--red-600)',
  variant = 'tile',
  className,
  ariaLabel,
}: WishlistHeartProps) {
  const [isSpilling, setIsSpilling] = useState(false);
  const filled = wishlisted || isSpilling;
  const dim = buttonSize ?? size + 8;

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setIsSpilling(true);
    onToggle?.(!wishlisted);
    window.setTimeout(() => setIsSpilling(false), 500);
  }

  return (
    <motion.button
      type="button"
      className={`wh wh--${variant} ${className ?? ''}`}
      style={{ width: dim, height: dim }}
      onClick={handleClick}
      whileTap={{ scale: 0.85 }}
      aria-label={ariaLabel ?? (wishlisted ? 'Remove from wishlist' : 'Add to wishlist')}
      aria-pressed={wishlisted}
    >
      <span className="wh__stack" style={{ width: size, height: size }}>
        <HeartOutline size={size} color={outlineColor} />
        <motion.span
          className="wh__fill"
          initial={false}
          animate={{ clipPath: filled ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeartFilled size={size} color={filledColor} />
        </motion.span>
      </span>
    </motion.button>
  );
}
