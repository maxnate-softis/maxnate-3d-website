// =============================================================================
// SOUND TOGGLE COMPONENT
// =============================================================================

'use client';

import { motion } from 'framer-motion';
import { useSoundStore } from '@/stores/useSoundStore';
import { cn } from '@/lib/utils';

export const SoundToggle = () => {
  const { isMuted, toggleMute } = useSoundStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleMute}
      className={cn(
        'p-2 rounded-lg transition-colors duration-200',
        'hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-accent-gold/50'
      )}
      aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
      title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
    >
      {isMuted ? (
        // Muted icon
        <svg
          className="w-5 h-5 text-text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        // Unmuted icon
        <svg
          className="w-5 h-5 text-accent-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </motion.button>
  );
};
