import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { getSvgPath } from 'figma-squircle';
import { MinusIcon, PlusIcon, TrashIcon } from '../icons';
import './AddToCart.css';

function useSquircleClipPath(radius: number, smoothing: number) {
  const ref = useRef<HTMLElement | null>(null);
  const [clipPath, setClipPath] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const path = getSvgPath({
        width,
        height,
        cornerRadius: radius,
        cornerSmoothing: smoothing,
        preserveSmoothing: true,
      });
      setClipPath(`path("${path}")`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius, smoothing]);

  return [ref, clipPath] as const;
}

interface AddToCartProps {
  count: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function AddToCart({ count, onAdd, onRemove }: AddToCartProps) {
  const [idleRef, idleClip] = useSquircleClipPath(8, 1);
  const [activeRef, activeClip] = useSquircleClipPath(8, 1);

  function handleAddClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onAdd();
  }

  function handleRemoveClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    onRemove();
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {count === 0 ? (
        <motion.button
          key="idle"
          ref={idleRef as React.RefObject<HTMLButtonElement>}
          className="atc atc--idle"
          onClick={handleAddClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ clipPath: idleClip, WebkitClipPath: idleClip }}
          aria-label="Add to cart"
        >
          <PlusIcon size={24} color="var(--blue-600)" />
        </motion.button>
      ) : (
        <motion.div
          key="active"
          ref={activeRef as React.RefObject<HTMLDivElement>}
          className="atc atc--active"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0, scaleX: 0.6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 1, clipPath: activeClip, WebkitClipPath: activeClip }}
        >
          <button
            className="atc__action"
            onClick={handleRemoveClick}
            aria-label="Remove one"
          >
            {count === 1
              ? <TrashIcon size={20} color="#fff" />
              : <MinusIcon size={24} color="#fff" />
            }
          </button>
          <motion.span
            className="atc__count"
            key={count}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
          >
            {count}
          </motion.span>
          <button
            className="atc__action"
            onClick={handleAddClick}
            aria-label="Add one more"
          >
            <PlusIcon size={24} color="#fff" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
