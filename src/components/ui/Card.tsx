// =============================================================================
// CARD COMPONENT
// =============================================================================

'use client';

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUISound } from '@/hooks/useSoundManager';

type CardVariant = 'default' | 'elevated' | 'outlined' | 'interactive';

interface CardProps {
  variant?: CardVariant;
  withSound?: boolean;
  as3D?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-primary-navy-light border-border',
  elevated: 'bg-primary-navy-light border-border shadow-xl shadow-black/20',
  outlined: 'bg-transparent border-accent-gold/30',
  interactive:
    'bg-primary-navy-light border-border hover:border-accent-gold/50 cursor-pointer',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      withSound = true,
      as3D = false,
      className,
      children,
    },
    ref
  ) => {
    const { playHover } = useUISound();

    const handleMouseEnter = () => {
      if (withSound && variant === 'interactive') playHover();
    };

    if (as3D) {
      return (
        <motion.div
          ref={ref}
          className={cn(
            'rounded-xl border p-6 transition-colors duration-300',
            variantStyles[variant],
            className
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{
            scale: 1.02,
            rotateX: 2,
            rotateY: 2,
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
          }}
          onMouseEnter={handleMouseEnter}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-xl border p-6 transition-colors duration-300',
          variantStyles[variant],
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={
          variant === 'interactive'
            ? { scale: 1.02 }
            : undefined
        }
        onMouseEnter={handleMouseEnter}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
interface CardSubProps {
  className?: string;
  children?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardSubProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn('mb-4', className)}>{children}</div>
  )
);
CardHeader.displayName = 'CardHeader';

// Card Title
export const CardTitle = forwardRef<HTMLHeadingElement, CardSubProps>(
  ({ className, children }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-text-primary', className)}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

// Card Description
export const CardDescription = forwardRef<HTMLParagraphElement, CardSubProps>(
  ({ className, children }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary mt-1', className)}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

// Card Content
export const CardContent = forwardRef<HTMLDivElement, CardSubProps>(
  ({ className, children }, ref) => (
    <div ref={ref} className={cn('', className)}>{children}</div>
  )
);
CardContent.displayName = 'CardContent';

// Card Footer
export const CardFooter = forwardRef<HTMLDivElement, CardSubProps>(
  ({ className, children }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-border', className)}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';
