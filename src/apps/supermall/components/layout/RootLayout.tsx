import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Retune } from 'retune';
import { WishlistOverlay } from './WishlistOverlay';
import { BottomNav } from '@ui/BottomNav';
import type { Tab } from '@ui/BottomNav/BottomNav';
import { useCartStore } from '@state/cartStore';
import { useUIStore } from '@state/uiStore';
import { useWishlistStore } from '@state/wishlistStore';
import { NavDirectionContext } from '../../lib/navDirection';
import type { PageDirection } from '../../lib/transitions';

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
  const navType = useNavigationType();
  const cartCount = useCartStore((s) => s.itemCount());
  const sheetOpen = useUIStore((s) => s.sheetCount > 0);
  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);
  const [noonOneHidesNav, setNoonOneHidesNav] = useState(false);

  // Track navigation direction synchronously during render so AnimatePresence
  // sees the right `custom` value when the new <Outlet> mounts. POP (browser
  // back/forward) → 'back'. PUSH or REPLACE → 'forward'. We hold the resolved
  // direction in a ref so re-renders that don't change pathname keep it stable.
  const prevPathRef = useRef(location.pathname);
  const directionRef = useRef<PageDirection>('forward');
  if (prevPathRef.current !== location.pathname) {
    directionRef.current = navType === 'POP' ? 'back' : 'forward';
    prevPathRef.current = location.pathname;
  }
  const direction = directionRef.current;

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
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <NavDirectionContext.Provider value={direction}>
          <AnimatePresence mode="sync" initial={false} custom={direction}>
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </NavDirectionContext.Provider>
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
