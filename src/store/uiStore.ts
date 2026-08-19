// src/store/uiStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      // set() takes a FUNCTION when the new value depends on the old one
      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    { name: "photobook-ui" }
  )
);

export default useUiStore;