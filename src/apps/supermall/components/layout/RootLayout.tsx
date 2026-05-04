import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Retune } from 'retune';
import { BottomNav } from '../../../../shell/BottomNav';
import { WishlistOverlay } from './WishlistOverlay';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/cartStore';

export function RootLayout() {
  const location = useLocation();
  // The embedded noon-one-flows iframe posts a message whenever it
  // transitions between the AccountsPage landing and the immersive
  // noon One flow (splash + everything after). We mirror that into
  // local state and use it to toggle our bottom nav on /account.
  const [noonOneShowsNav, setNoonOneShowsNav] = useState(true);

  useEffect(() => {
    // Reset when the user leaves /account so a future return starts
    // with the nav visible (matches the AccountsPage landing default).
    if (location.pathname !== '/account') setNoonOneShowsNav(true);
  }, [location.pathname]);

  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);
  const cartCount = useCartStore((s) => s.itemCount());

  const tabFor = (p: string) => {
    if (p === '/') return 'home';
    if (p.startsWith('/shop')) return 'categories';
    if (p === '/account') return 'account';
    if (p === '/cart') return 'cart';
    return undefined;
  };
  const activeTab = tabFor(location.pathname);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (
        e.data &&
        e.data.source === 'noon-one' &&
        typeof e.data.showHostNav === 'boolean'
      ) {
        setNoonOneShowsNav(e.data.showHostNav);
      }
      if (
        e.data &&
        e.data.source === 'noon-one' &&
        e.data.action === 'open-wishlist'
      ) {
        openFullWishlist();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [openFullWishlist]);

  // PDP hides the nav so the sticky add-to-cart can sit at the bottom.
  // On /account the iframe drives visibility — nav stays for the
  // AccountsPage landing, hides for splash + all post-splash noon One
  // screens (immersive flow).
  const hideBottomNav =
    location.pathname.startsWith('/product/') ||
    (location.pathname === '/account' && !noonOneShowsNav);

  return (
    <div className="root-layout">
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      {!hideBottomNav && <BottomNav active={activeTab} cartCount={cartCount} />}
      <WishlistOverlay />
      <Retune />
    </div>
  );
}
