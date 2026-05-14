import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  _hasHydrated: boolean;
};

type AuthActions = {
  setAuth: (user: AuthUser, accessToken: string) => void;
  logout: () => void;
  setHasHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      _hasHydrated: false,

      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),

      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),

      setHasHydrated: (v) => set({ _hasHydrated: v }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist auth data, not ephemeral flags
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
