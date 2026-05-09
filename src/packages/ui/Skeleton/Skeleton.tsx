import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { motion } from 'framer-motion';

export interface SkelProps {
  className?: string;
  style?: CSSProperties;
}

/** Marks the subtree inside an active SkeletonGate. Used to detect nested
 *  gates — an anti-pattern that causes two skeletons in series. */
const InsideSkeletonGate = createContext(false);

export function Skel({ className='', style }: SkelProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#eef0f3] ${className}`}
      style={style}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/55 to-transparent" />
    </div>
  );
}

export interface SkeletonGateProps {
  skeleton: ReactNode;
  children: ReactNode;
  /** Minimum visible time for the skeleton, ms. */
  holdMs?: number;
  /** Crossfade duration, ms. */
  fadeMs?: number;
  /** Optional readiness signal — when supplied, the gate waits for both
   *  `holdMs` AND `ready === true` before mounting children. */
  ready?: boolean;
}

export function SkeletonGate({
  skeleton,
  children,
  holdMs = 380,
  fadeMs = 220,
  ready: externalReady,
}: SkeletonGateProps) {
  const insideAnotherGate = useContext(InsideSkeletonGate);
  const [held, setHeld] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeld(true), holdMs);
    return () => clearTimeout(t);
  }, [holdMs]);

  // Dev guardrail: nested gates create a double-flash. Lift child loading
  // state into the parent gate's `ready` prop instead.
  if (import.meta.env?.DEV && insideAnotherGate) {
    console.warn(
      '[SkeletonGate] Nested gate detected. A screen must run exactly one ' +
        'SkeletonGate; lift child loading states into the parent’s `ready` ' +
        'prop. See docs/INTERACTION_DESIGN.md §2.',
    );
  }

  const visible = held && (externalReady ?? true);

  return (
    <InsideSkeletonGate.Provider value={true}>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: visible ? 0 : 1 }}
        transition={{ duration: fadeMs / 1000, ease: 'easeOut' }}
      >
        {skeleton}
      </motion.div>
      {visible && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeMs / 1000, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </InsideSkeletonGate.Provider>
  );
}
