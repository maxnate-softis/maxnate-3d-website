// =============================================================================
// THEME STATE STORE
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: Theme;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (theme: 'dark' | 'light') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // Dark mode first (as per requirement)
      theme: 'dark',
      resolvedTheme: 'dark',
      setTheme: (theme) => set({ theme }),
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
    }),
    {
      name: 'maxnate-theme',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
