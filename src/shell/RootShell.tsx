import { useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from '@ui/BottomNav';
import type { Tab } from '@ui/BottomNav/BottomNav';
import { useCartStore } from '@state/cartStore';
import { useWishlistStore } from '@state/wishlistStore';

function tabForPath(p: string): Tab | undefined {
  if (p === '/' || p === '') return 'home';
  if (p.startsWith('/categories')) return 'categories';
  if (p === '/account') return 'profile';
  if (p === '/cart') return 'cart';
  return undefined;
}

const TAB_ROUTES: Record<Tab, string> = {
  home: '/',
  categories: '/categories',
  deals: '/',
  profile: '/account',
  cart: '/cart',
};

// The bottom nav is shared chrome across the whole app. It hides on:
//   - any PDP (sticky add-to-cart owns the bottom there)
//   - /share-address (modal-style flow, full-bleed)
//   - /account when the embedded noon-one iframe enters its immersive
//     flow (splash + post-splash). The iframe posts a message when it
//     transitions; we listen and toggle.
//   - any time we're rendered inside an iframe (?embedded=1) — the
//     host page owns the nav in that case.
function shouldHide(pathname: string, search: string, noonOneShowsNav: boolean): boolean {
  if (new URLSearchParams(search).get('embedded') === '1') return true;
  if (pathname === '/' || pathname === '') return true;
  if (pathname.startsWith('/product/')) return true;
  if (pathname.startsWith('/share-address')) return true;
  if (pathname === '/account' && !noonOneShowsNav) return true;
  return false;
}

export function RootShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = useCartStore((s) => s.itemCount());
  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);

  const [noonOneShowsNav, setNoonOneShowsNav] = useState(true);

  useEffect(() => {
    if (location.pathname !== '/account') setNoonOneShowsNav(true);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.source === 'noon-one' && typeof e.data.showHostNav === 'boolean') {
        setNoonOneShowsNav(e.data.showHostNav);
      }
      if (e.data?.source === 'noon-one' && e.data.action === 'open-wishlist') {
        openFullWishlist();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [openFullWishlist]);

  const activeTab = tabForPath(location.pathname);
  const hidden = shouldHide(location.pathname, location.search, noonOneShowsNav);

  return (
    <>
      {children}
      {/* BottomNav moved into shop RootLayout so it lives inside .app-frame */}
    </>
  );
}
