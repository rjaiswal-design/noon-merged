import { create } from 'zustand';

interface AddressSheetStore {
  open: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

export const useAddressSheetStore = create<AddressSheetStore>((set) => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}));
