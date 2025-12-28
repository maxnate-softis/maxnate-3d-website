// =============================================================================
// BUTTON COMPONENT
// =============================================================================

'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUISound } from '@/hooks/useSoundManager';
import { useMagneticButton } from '@/hooks/useCustomCursor';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
  withSound?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-gold text-primary-navy hover:bg-accent-gold/90 border-transparent',
  secondary:
    'bg-transparent text-text-primary border-accent-gold hover:bg-accent-gold/10',
  ghost:
    'bg-transparent text-text-primary border-transparent hover:bg-white/5',
  danger:
    'bg-semantic-error text-white border-transparent hover:bg-semantic-error/90',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      magnetic = true,
      withSound = true,
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      onClick,
      disabled,
      ...props
    },
    ref
  ) => {
    const { playHover, playClick } = useUISound();
    const magneticRef = useMagneticButton(magnetic ? 0.3 : 0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (withSound) playClick();
      onClick?.(e);
    };

    const handleMouseEnter = () => {
      if (withSound) playHover();
    };

    return (
      <motion.button
        ref={magnetic ? magneticRef : ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'relative inline-flex items-center justify-center gap-2',
          'font-medium rounded-lg border-2 transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-accent-gold/50 focus:ring-offset-2 focus:ring-offset-primary-navy',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )}
        <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
