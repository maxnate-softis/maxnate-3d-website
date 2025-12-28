// =============================================================================
// SOUND STATE STORE
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SOUND_CONFIG } from '@/lib/constants';

interface SoundState {
  // Mute state (persisted)
  isMuted: boolean;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;

  // Volume levels
  masterVolume: number;
  setMasterVolume: (volume: number) => void;

  // Currently playing
  currentAmbient: string | null;
  setCurrentAmbient: (sound: string | null) => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      // Muted by default (as per requirement)
      isMuted: SOUND_CONFIG.defaultMuted,
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
      setMuted: (muted) => set({ isMuted: muted }),

      // Master volume
      masterVolume: 1,
      setMasterVolume: (volume) => set({ masterVolume: Math.max(0, Math.min(1, volume)) }),

      // Ambient sound tracking
      currentAmbient: null,
      setCurrentAmbient: (sound) => set({ currentAmbient: sound }),
    }),
    {
      name: 'maxnate-sound-preferences',
      partialize: (state) => ({
        isMuted: state.isMuted,
        masterVolume: state.masterVolume,
      }),
    }
  )
);
