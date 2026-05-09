import { useEffect } from 'react';
import { useWishlistStore } from '@state/wishlistStore';
import './WishlistOverlay.css';

export function WishlistOverlay() {
  const mode = useWishlistStore((s) => s.mode);
  const productImage = useWishlistStore((s) => s.productImage);
  const closeDrawer = useWishlistStore((s) => s.closeDrawer);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'wishlist:close') closeDrawer();
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [closeDrawer]);

  if (!mode) return null;

  const params = new URLSearchParams();
  if (mode === 'drawer') params.set('drawer', '1');
  else params.set('embedded', '1');
  if (productImage) params.set('image', productImage);

  const src = `/wishlist?${params.toString()}`;

  return (
    <iframe
      key={`${mode}-${productImage ?? 'no-image'}`}
      src={src}
      title="Wishlist"
      className={`wishlist-overlay wishlist-overlay--${mode}`}
    />
  );
}
