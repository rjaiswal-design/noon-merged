import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Retune } from 'retune';
import { WishlistOverlay } from './WishlistOverlay';
import { BottomNav } from '@ui/BottomNav';
import type { Tab } from '@ui/BottomNav/BottomNav';
import { useCartStore } from '@state/cartStore';
import { useUIStore } from '@state/uiStore';
import { useWishlistStore } from '@state/wishlistStore';

const TAB_ROUTES: Record<Tab, string> = {
  home: '/supermall',
  categories: '/supermall/shop',
  deals: '/supermall',
  profile: '/supermall/account',
  cart: '/supermall/cart',
};

function tabForPath(p: string): Tab | undefined {
  if (p === '/supermall' || p === '/supermall/') return 'home';
  if (p.startsWith('/supermall/shop')) return 'categories';
  if (p === '/supermall/account') return 'profile';
  if (p === '/supermall/cart') return 'cart';
  return undefined;
}

function shouldHideNav(pathname: string): boolean {
  if (pathname.startsWith('/supermall/product/')) return true;
  if (pathname.startsWith('/supermall/checkout')) return true;
  return false;
}

export function RootLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.itemCount());
  const sheetOpen = useUIStore((s) => s.sheetCount > 0);
  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);
  const [noonOneHidesNav, setNoonOneHidesNav] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      const data = e.data;
      if (!data || data.source !== 'noon-one') return;
      if (typeof data.showHostNav === 'boolean') {
        setNoonOneHidesNav(!data.showHostNav);
      }
      if (data.action === 'open-wishlist') {
        openFullWishlist();
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [openFullWishlist]);

  // Reset noon-one's nav-hide request when navigating away from /account.
  useEffect(() => {
    if (location.pathname !== '/supermall/account') setNoonOneHidesNav(false);
  }, [location.pathname]);

  const activeTab = tabForPath(location.pathname);
  const hideNav = shouldHideNav(location.pathname) || sheetOpen || noonOneHidesNav;

  return (
    <div className="root-layout">
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <WishlistOverlay />
      <Retune />
      {!hideNav && (
        <BottomNav
          activeTab={activeTab}
          cartCount={cartCount}
          onTabChange={(tab) => navigate(TAB_ROUTES[tab])}
        />
      )}
    </div>
  );
}
