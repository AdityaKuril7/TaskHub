import { create } from "zustand";
interface UiStore {
  isShowAddCard: boolean;
  showAddCard: () => void;
  hideAddCard: () => void;
  isShowSingleCard: boolean;
  showSingleTaskCard: () => void;
  hideSingleTaskCard: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isShowAddCard: false,
  showAddCard: () => set({ isShowAddCard: true }),
  hideAddCard: () => set({ isShowAddCard: false }),
  isShowSingleCard: false,
  showSingleTaskCard: ()=> set({ isShowSingleCard: true }),
  hideSingleTaskCard: ()=> set({ isShowSingleCard: false }),
}));
