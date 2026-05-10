import { motion } from 'framer-motion';
import { HeartOutline, HeartFilled } from '../icons';
import './WishlistHeart.css';

export interface WishlistHeartProps {
  wishlisted: boolean;
  onToggle: (next: boolean) => void;
  size?: number;
  /** Diameter of the surrounding pressable disc. Defaults to size + 8. */
  buttonSize?: number;
  /** Outline stroke colour when not wishlisted. */
  outlineColor?: string;
  /** Filled colour when wishlisted. */
  filledColor?: string;
  /** Variant changes the disc background. */
  variant?: 'tile' | 'bare';
  className?: string;
  ariaLabel?: string;
}

/**
 * Heart toggle with a bottom-up liquid fill on activation. Stack the outline
 * underneath and reveal a filled heart via a clip-path that animates from
 * `inset(100% 0 0 0)` (hidden) to `inset(0 0 0 0)` (fully shown).
 */
export function WishlistHeart({
  wishlisted,
  onToggle,
  size = 16,
  buttonSize,
  outlineColor = 'var(--grey-700)',
  filledColor = 'var(--blue-700, #0f61ff)',
  variant = 'tile',
  className = '',
  ariaLabel,
}: WishlistHeartProps) {
  const dim = buttonSize ?? size + 8;

  return (
    <motion.button
      type="button"
      className={`wh wh--${variant} ${className}`}
      style={{ width: dim, height: dim }}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(!wishlisted);
      }}
      whileTap={{ scale: 0.82 }}
      aria-pressed={wishlisted}
      aria-label={ariaLabel ?? (wishlisted ? 'Remove from wishlist' : 'Add to wishlist')}
    >
      <motion.span
        className="wh__pulse"
        animate={wishlisted ? { scale: [1, 1.18, 1] } : { scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ width: size, height: size }}
      >
        <span className="wh__layer wh__outline">
          <HeartOutline size={size} color={outlineColor} />
        </span>
        <motion.span
          className="wh__layer wh__fill"
          initial={false}
          animate={{ clipPath: wishlisted ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeartFilled size={size} color={filledColor} />
        </motion.span>
      </motion.span>
    </motion.button>
  );
}
