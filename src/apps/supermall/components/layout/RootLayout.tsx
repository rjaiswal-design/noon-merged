import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Retune } from 'retune';
import { WishlistOverlay } from './WishlistOverlay';

export function RootLayout() {
  const location = useLocation();

  return (
    <div className="root-layout">
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <WishlistOverlay />
      <Retune />
    </div>
  );
}
