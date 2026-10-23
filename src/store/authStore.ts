// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  userName: string | null;
  // CHANGED: login now takes the REAL token the backend signed, plus the name
  login: (token: string, name: string) => void;
  logout: () => void;
}

// note the extra () right after create<AuthState>() -- TypeScript needs
// that empty call when middleware wraps the store, or the generic breaks
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      login: (token, name) => set({ token, userName: name }),
      logout: () => set({ token: null, userName: null }),
    }),
    {
      name: "photobook-auth",           // the localStorage key it writes to
      partialize: (state) => ({          // save ONLY these two fields
        token: state.token,
        userName: state.userName,
      }),
    }
  )
);

export default useAuthStore;