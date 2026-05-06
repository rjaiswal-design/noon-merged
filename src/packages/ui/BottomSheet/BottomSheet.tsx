import { type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSheetOpen } from '@state/uiStore';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Floating variant: rounded all four corners with side margins.
   *  Otherwise the card sits flush at the bottom edge. */
  floating?: boolean;
  /** Show the small drag-notch handle. Defaults to true. */
  showHandle?: boolean;
  /** Optional className applied to the inner card. */
  className?: string;
  /** Disable the scrim tap-to-close behaviour. */
  dismissOnScrimTap?: boolean;
  /** ARIA label for the dialog surface. */
  ariaLabel?: string;
}

/**
 * Canonical bottom-sheet shell. Slides up from the bottom of the viewport,
 * paints a scrim above content, and — via `useSheetOpen` — automatically
 * hides the BottomNav for the duration it is open.
 *
 * All bottom sheets in the app should compose this shell. Do not roll
 * your own slide-up animation; it makes nav-hiding inconsistent.
 */
export function BottomSheet({
  open,
  onClose,
  children,
  floating = false,
  showHandle = true,
  className='',
  dismissOnScrimTap = true,
  ariaLabel,
}: BottomSheetProps) {
  useSheetOpen(open);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={dismissOnScrimTap ? onClose : undefined}
            className="absolute inset-0 z-30 bg-black/40 rounded-16"
          />
          <motion.div
            key="card"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320, mass: 0.85 }}
            className={`absolute z-40 ${
              floating ? 'left-3 right-3 bottom-4' : 'left-0 right-0 bottom-0'
            }`}
          >
            <div
              className={`relative overflow-hidden bg-white shadow-sheet ${
                floating ? 'rounded-16' : 'rounded-tl-16 rounded-tr-16'
              } ${className}`}
            >
              {showHandle && (
                <div className="flex justify-center pt-2.5 pb-1.5">
                  <div className="bg-blue-gray-400 h-1 w-10 rounded-4" />
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
