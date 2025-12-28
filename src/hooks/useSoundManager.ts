// =============================================================================
// SOUND MANAGER HOOK
// =============================================================================

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { useSoundStore } from '@/stores/useSoundStore';
import { SOUND_CONFIG } from '@/lib/constants';

// Sound definitions
const soundDefinitions: Record<string, { src: string[]; volume: number; loop?: boolean }> = {
  hover: { src: ['/sounds/hover.mp3'], volume: SOUND_CONFIG.volumes.hover },
  click: { src: ['/sounds/click.mp3'], volume: SOUND_CONFIG.volumes.click },
  whoosh: { src: ['/sounds/whoosh.mp3'], volume: SOUND_CONFIG.volumes.whoosh },
  ambient: {
    src: ['/sounds/ambient.mp3'],
    volume: SOUND_CONFIG.volumes.ambient,
    loop: true,
  },
  chime: { src: ['/sounds/chime.mp3'], volume: SOUND_CONFIG.volumes.chime },
  success: { src: ['/sounds/success.mp3'], volume: SOUND_CONFIG.volumes.click },
};

type SoundName = keyof typeof soundDefinitions;

export const useSoundManager = () => {
  const soundsRef = useRef<Map<string, Howl>>(new Map());
  const { isMuted, masterVolume, setCurrentAmbient } = useSoundStore();

  // Initialize sounds on mount
  useEffect(() => {
    const sounds = soundsRef.current;

    // Create Howl instances for each sound
    Object.entries(soundDefinitions).forEach(([name, config]) => {
      if (!sounds.has(name)) {
        const howl = new Howl({
          src: config.src,
          volume: config.volume,
          loop: config.loop || false,
          preload: true,
          html5: name === 'ambient', // Use HTML5 for streaming ambient sound
        });
        sounds.set(name, howl);
      }
    });

    // Cleanup on unmount
    return () => {
      sounds.forEach((sound) => {
        sound.unload();
      });
      sounds.clear();
    };
  }, []);

  // Update global mute state
  useEffect(() => {
    Howler.mute(isMuted);
  }, [isMuted]);

  // Update master volume
  useEffect(() => {
    Howler.volume(masterVolume);
  }, [masterVolume]);

  // Play a sound
  const play = useCallback(
    (soundName: SoundName) => {
      if (isMuted) return;

      const sound = soundsRef.current.get(soundName);
      if (sound) {
        sound.play();
      }
    },
    [isMuted]
  );

  // Stop a sound
  const stop = useCallback((soundName: SoundName) => {
    const sound = soundsRef.current.get(soundName);
    if (sound) {
      sound.stop();
    }
  }, []);

  // Fade out a sound
  const fadeOut = useCallback(
    (soundName: SoundName, duration: number = 1000) => {
      const sound = soundsRef.current.get(soundName);
      if (sound) {
        sound.fade(sound.volume(), 0, duration);
        setTimeout(() => sound.stop(), duration);
      }
    },
    []
  );

  // Start ambient sound
  const startAmbient = useCallback(() => {
    if (isMuted) return;

    const ambient = soundsRef.current.get('ambient');
    if (ambient && !ambient.playing()) {
      ambient.play();
      setCurrentAmbient('ambient');
    }
  }, [isMuted, setCurrentAmbient]);

  // Stop ambient sound
  const stopAmbient = useCallback(() => {
    const ambient = soundsRef.current.get('ambient');
    if (ambient) {
      ambient.fade(ambient.volume(), 0, 1000);
      setTimeout(() => {
        ambient.stop();
        setCurrentAmbient(null);
      }, 1000);
    }
  }, [setCurrentAmbient]);

  return {
    play,
    stop,
    fadeOut,
    startAmbient,
    stopAmbient,
    isMuted,
  };
};

// Simplified hook for UI sound effects
export const useUISound = () => {
  const { play } = useSoundManager();

  return {
    playHover: () => play('hover'),
    playClick: () => play('click'),
    playWhoosh: () => play('whoosh'),
    playChime: () => play('chime'),
    playSuccess: () => play('success'),
  };
};
