import { type ReactNode } from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';
import { useLocation, useNavigationType, type NavigationType } from 'react-router-dom';

export type PageDirection = 'forward' | 'back';

const SLIDE_TRANSITION: Transition = {
  duration: 0.36,
  ease: [0.22, 1, 0.36, 1],
};

const variants = {
  initial: (dir: PageDirection) => ({ x: dir === 'forward' ? '100%' : '-25%' }),
  animate: { x: '0%' },
  exit:    (dir: PageDirection) => ({ x: dir === 'forward' ? '-25%' : '100%' }),
};

export interface PageTransitionProps {
  children: ReactNode;
  /** Override the auto-detected direction. Pass when an in-app
   *  back button navigates without using the browser's back stack. */
  direction?: PageDirection;
}

/**
 * iOS-style horizontal page slide. Forward steps slide in from the right;
 * back steps slide in from the left, with the outgoing page parallaxing
 * 25% so the incoming page reads as "on top of the stack".
 *
 * Direction is detected automatically from React Router navigation type:
 *   PUSH    → forward
 *   REPLACE → forward (treated as a fresh step)
 *   POP     → back (browser/system back)
 *
 * For in-app back buttons that use `navigate(...)` without going through
 * history, pass `direction="back"` explicitly OR pass
 * `state: { __dir: 'back' }` on the navigate call (we read that here).
 */
export function PageTransition({ children, direction }: PageTransitionProps) {
  const navType = useNavigationType();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  // Read direction live, NOT at mount. Inside an AnimatePresence with
  // `mode="sync"`, both the outgoing and incoming pages re-render during the
  // navigation event; both call `useNavigationType()` and see the same value.
  // The outgoing page's exit variant must reflect the CURRENT navigation
  // (the one causing it to leave), not the one that brought it in. Caching
  // direction in a ref at mount time would invert the parallax on back-nav.
  const dir = direction ?? deriveDirection(navType, location.state);

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  if (reduceMotion) {
    return <div style={baseStyle}>{children}</div>;
  }

  return (
    <motion.div
      custom={dir}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={SLIDE_TRANSITION}
      style={baseStyle}
    >
      {children}
    </motion.div>
  );
}

function deriveDirection(navType: NavigationType, state: unknown): PageDirection {
  if (state && typeof state === 'object' && '__dir' in state) {
    const v = (state as { __dir?: unknown }).__dir;
    if (v === 'forward' || v === 'back') return v;
  }
  if (navType === 'POP') return 'back';
  return 'forward';
}

/** Helper to build a navigation `state` payload that forces back-direction
 *  animation regardless of router history. Use when an in-app back button
 *  calls `navigate(...)` instead of `navigate(-1)`.
 *
 *    navigate('/cart', { state: backState() })
 */
export function backState<T extends object = Record<string, never>>(extra?: T) {
  return { __dir: 'back' as const, ...(extra ?? ({} as T)) };
}

/** Inverse of `backState` — explicitly forward. Rarely needed since
 *  `forward` is the default, but available for symmetry. */
export function forwardState<T extends object = Record<string, never>>(extra?: T) {
  return { __dir: 'forward' as const, ...(extra ?? ({} as T)) };
}
