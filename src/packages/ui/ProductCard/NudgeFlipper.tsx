import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownCircleSolid,
  TruckSolid,
  BoltSolid,
  ShoppingCartSolid,
  CheckBadgeSolid,
} from '../icons';
import './NudgeFlipper.css';

interface Nudge {
  icon: React.ReactNode;
  text: string;
}

const NUDGES: Nudge[] = [
  { icon: <ArrowDownCircleSolid size={14} color="var(--red-600)" />, text: 'Lowest price in 30 days' },
  { icon: <TruckSolid size={14} color="var(--emerald-700)" />,       text: 'Free delivery' },
  { icon: <BoltSolid size={14} color="var(--red-600)" />,            text: 'Selling out fast' },
  { icon: <ShoppingCartSolid size={14} color="var(--green-700)" />,  text: '5k+ units sold' },
  { icon: <CheckBadgeSolid size={14} color="var(--green-700)" />,    text: '#2 Bestseller' },
];

interface NudgeFlipperProps {
  /** Seed used to stagger the cycle so cards in a grid don't all flip in sync. */
  seed?: number;
  /** Milliseconds between flips. */
  interval?: number;
}

export function NudgeFlipper({ seed = 0, interval = 2800 }: NudgeFlipperProps) {
  const [index, setIndex] = useState(seed % NUDGES.length);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % NUDGES.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval]);

  const current = NUDGES[index];

  return (
    <div className="nudge-flipper">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          className="nudge-flipper__item"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="nudge-flipper__icon">{current.icon}</span>
          <span className="nudge-flipper__text">{current.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
