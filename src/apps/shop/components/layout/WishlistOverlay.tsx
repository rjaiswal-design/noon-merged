import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWishlistStore } from '@state/wishlistStore';
import { useSheetOpen } from '@state/uiStore';
import CollectionDrawer from '@/apps/wishlist/components/CollectionDrawer';
import './WishlistOverlay.css';

// Time the bottom sheet waits before sliding in. Long enough that the
// WishlistHeart's clip-path fill animation (≈500ms) is visibly underway
// before the scrim covers the card. The sheet itself springs in over the
// rest of the fill.
const ENTRY_DELAY_MS = 280;

export function WishlistOverlay() {
  const mode = useWishlistStore((s) => s.mode);
  const productImage = useWishlistStore((s) => s.productImage);
  const productCollection = useWishlistStore((s) => s.productCollection);
  const closeDrawer = useWishlistStore((s) => s.closeDrawer);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Stagger drawer appearance so the heart-fill animation lands first.
  useEffect(() => {
    if (mode === 'drawer') {
      const t = setTimeout(() => setDrawerVisible(true), ENTRY_DELAY_MS);
      return () => clearTimeout(t);
    }
    setDrawerVisible(false);
  }, [mode]);

  // Hide the BottomNav while the sheet is up, the same way other sheets do.
  useSheetOpen(drawerVisible);

  return (
    <AnimatePresence>
      {drawerVisible && (
        <div className="wishlist-sheet-root">
          <motion.button
            type="button"
            aria-label="Close"
            onClick={closeDrawer}
            className="wishlist-sheet-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />
          <motion.div
            className="wishlist-sheet-card"
            role="dialog"
            aria-modal="true"
            aria-label="Add to wishlist"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.85 }}
          >
            <CollectionDrawer
              product={
                productImage || productCollection
                  ? {
                      image: productImage ?? undefined,
                      collectionName: productCollection ?? undefined,
                    }
                  : undefined
              }
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
