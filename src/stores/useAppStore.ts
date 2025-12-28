// =============================================================================
// GLOBAL APP STATE STORE
// =============================================================================

import { create } from 'zustand';
import { PerformanceTier } from '@/lib/constants';

interface AppState {
  // Loading state
  isLoading: boolean;
  loadingProgress: number;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;

  // Performance tier
  performanceTier: PerformanceTier;
  setPerformanceTier: (tier: PerformanceTier) => void;

  // Navigation state
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;

  // Chatbot state
  isChatbotOpen: boolean;
  toggleChatbot: () => void;
  closeChatbot: () => void;

  // Cursor state
  cursorType: 'default' | 'pointer' | 'loading' | 'drag' | 'text';
  cursorScale: number;
  setCursorType: (type: AppState['cursorType']) => void;
  setCursorScale: (scale: number) => void;

  // Scroll state
  scrollY: number;
  scrollDirection: 'up' | 'down';
  setScrollY: (y: number) => void;
  setScrollDirection: (direction: 'up' | 'down') => void;

  // Active section (for scroll spy)
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Loading state
  isLoading: true,
  loadingProgress: 0,
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  // Performance tier
  performanceTier: 'medium',
  setPerformanceTier: (tier) => set({ performanceTier: tier }),

  // Navigation state
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  // Chatbot state
  isChatbotOpen: false,
  toggleChatbot: () => set((state) => ({ isChatbotOpen: !state.isChatbotOpen })),
  closeChatbot: () => set({ isChatbotOpen: false }),

  // Cursor state
  cursorType: 'default',
  cursorScale: 1,
  setCursorType: (type) => set({ cursorType: type }),
  setCursorScale: (scale) => set({ cursorScale: scale }),

  // Scroll state
  scrollY: 0,
  scrollDirection: 'down',
  setScrollY: (y) => set({ scrollY: y }),
  setScrollDirection: (direction) => set({ scrollDirection: direction }),

  // Active section
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}));
