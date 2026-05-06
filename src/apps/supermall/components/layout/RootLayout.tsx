import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Retune } from 'retune';
import { WishlistOverlay } from './WishlistOverlay';
import { BottomNav } from '@ui/BottomNav';
import type { Tab } from '@ui/BottomNav/BottomNav';
import { useCartStore } from '@state/cartStore';
import { useAddressSheetStore } from '@state/addressSheetStore';
import { AddressBottomSheet } from '@/apps/share-address/screens/AddressBottomSheet';

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
  const activeTab = tabForPath(location.pathname);
  const hideNav = shouldHideNav(location.pathname);
  const addressSheetOpen = useAddressSheetStore((s) => s.open);
  const closeAddressSheet = useAddressSheetStore((s) => s.closeSheet);

  return (
    <div className="root-layout">
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <WishlistOverlay />
      <AddressBottomSheet open={addressSheetOpen} onClose={closeAddressSheet} />
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
