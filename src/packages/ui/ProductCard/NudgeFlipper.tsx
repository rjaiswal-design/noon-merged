import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

const ITEM_HEIGHT = 16;
const ANIM_MS = 400;

interface NudgeFlipperProps {
  /** Seed used to stagger the cycle so cards in a grid don't all flip in sync. */
  seed?: number;
  /** Milliseconds between flips. */
  interval?: number;
}

export function NudgeFlipper({ seed = 0, interval = 2800 }: NudgeFlipperProps) {
  // displayIndex can run past NUDGES.length-1 to allow a smooth wrap to the duplicated first item.
  const [displayIndex, setDisplayIndex] = useState(seed % NUDGES.length);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAnimated(true);
      setDisplayIndex((i) => i + 1);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval]);

  // When we land on the duplicated tail item, snap back to 0 with no animation.
  useEffect(() => {
    if (displayIndex !== NUDGES.length) return;
    const id = window.setTimeout(() => {
      setAnimated(false);
      setDisplayIndex(0);
    }, ANIM_MS);
    return () => window.clearTimeout(id);
  }, [displayIndex]);

  // Render NUDGES + first item duplicated at the end for seamless wrap-around.
  const items = [...NUDGES, NUDGES[0]];

  return (
    <div className="nudge-flipper">
      <motion.div
        className="nudge-flipper__track"
        animate={{ y: -displayIndex * ITEM_HEIGHT }}
        transition={animated ? { duration: ANIM_MS / 1000, ease: [0.4, 0, 0.2, 1] } : { duration: 0 }}
      >
        {items.map((n, i) => (
          <div key={i} className="nudge-flipper__item">
            <span className="nudge-flipper__icon">{n.icon}</span>
            <span className="nudge-flipper__text">{n.text}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
