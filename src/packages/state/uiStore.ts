import { useEffect } from 'react';
import { create } from 'zustand';

interface UIStore {
  cartOpen: boolean;
  menuOpen: boolean;
  activeModal: string | null;
  sheetCount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleMenu: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  openSheet: () => void;
  closeSheet: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  cartOpen: false,
  menuOpen: false,
  activeModal: null,
  sheetCount: 0,
  openCart: () => set({ cartOpen: true }),
  closeCart: () => set({ cartOpen: false }),
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
  openSheet: () => set((s) => ({ sheetCount: s.sheetCount + 1 })),
  closeSheet: () => set((s) => ({ sheetCount: Math.max(0, s.sheetCount - 1) })),
}));

/** Marks a bottom sheet as visible while `open` is true. RootLayout hides the
 *  BottomNav whenever sheetCount > 0, so any sheet using this hook gets the
 *  nav hidden for free. */
export function useSheetOpen(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const { openSheet, closeSheet } = useUIStore.getState();
    openSheet();
    return () => closeSheet();
  }, [open]);
}
