import { create } from 'zustand';

export type WishlistMode = 'drawer' | 'page';

interface WishlistStore {
  mode: WishlistMode | null;
  productId: string | null;
  productImage: string | null;
  /** Backend-derived "smart" collection name suggested for this product
   *  (e.g. HomePod → "Smart Speakers"). Powers the suggested row label in
   *  the bottom sheet. */
  productCollection: string | null;
  wishlistedIds: Set<string>;
  /** Open the contextual collection drawer. Accepts an optional product id
   *  so generic "wishlist" buttons (in headers) can open the same sheet. */
  openDrawer: (
    productId?: string,
    productImage?: string,
    productCollection?: string,
  ) => void;
  /** Legacy: full-page wishlist iframe. Kept for back-compat — alias of
   *  openDrawer so heart icons everywhere open the bottom sheet. */
  openFullWishlist: () => void;
  closeDrawer: () => void;
}

export const useWishlistStore = create<WishlistStore>((set) => ({
  mode: null,
  productId: null,
  productImage: null,
  productCollection: null,
  wishlistedIds: new Set(),
  openDrawer: (productId, productImage, productCollection) =>
    set((state) => {
      // Optimistic add — flip the heart to filled the moment the user taps,
      // so the bottom-up fill animation fires before the sheet finishes
      // sliding in. closeDrawer is now a pure dismissal.
      const next = new Set(state.wishlistedIds);
      if (productId) next.add(productId);
      return {
        mode: 'drawer',
        productId: productId ?? null,
        productImage: productImage ?? null,
        productCollection: productCollection ?? null,
        wishlistedIds: next,
      };
    }),
  openFullWishlist: () =>
    set({ mode: 'drawer', productId: null, productImage: null, productCollection: null }),
  closeDrawer: () =>
    set({ mode: null, productId: null, productImage: null, productCollection: null }),
}));
