import { motion, useMotionValue } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import {  useRef, useState, useEffect } from 'react';
import type {ReactNode} from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

// Hook for detecting screen size
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

// Swipe Reveal Component - reveals content with swipe-like animation
interface SwipeRevealProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
  delay?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export const SwipeReveal = ({
  children,
  direction = 'right',
  className = '',
  delay = 0,
  duration = 1.2,
  style
}: SwipeRevealProps) => {
  const { ref, isInView } = useScrollAnimation();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const getInitialTransform = () => {
    // Reduce movement distance on mobile and for users who prefer reduced motion
    const distance = reduceMotion ? 30 : isMobile ? 50 : 100;
    
    switch (direction) {
      case 'left': return { x: -distance, opacity: 0 };
      case 'right': return { x: distance, opacity: 0 };
      case 'up': return { y: -distance, opacity: 0 };
      case 'down': return { y: distance, opacity: 0 };
      default: return { x: distance, opacity: 0 };
    }
  };

  const getAnimateTransform = () => {
    return { x: 0, y: 0, opacity: 1 };
  };

  // Adjust duration for mobile and reduced motion
  const adjustedDuration = reduceMotion ? 0.6 : isMobile ? 0.8 : duration;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={getInitialTransform()}
      animate={isInView ? getAnimateTransform() : getInitialTransform()}
      transition={{
        duration: adjustedDuration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      {children}
    </motion.div>
  );
};

// Swipe Cards Component - interactive swipeable cards
interface SwipeCardsProps {
  items: Array<{
    id: string;
    content: ReactNode;
    background?: string;
  }>;
  className?: string;
}

export const SwipeCards = ({ items, className = '' }: SwipeCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTouch = useMediaQuery('(pointer: coarse)');

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    // Adjust threshold based on device type
    const threshold = isMobile || isTouch ? 30 : 50;
    
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={`swipe-cards-container ${className}`}>
      <div className="swipe-cards-track">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="swipe-card"
            style={{
              background: item.background || 'var(--surface)',
            }}
            animate={{
              x: `${(index - currentIndex) * 100}%`,
              opacity: Math.abs(index - currentIndex) <= 1 ? 1 : 0.3,
              scale: index === currentIndex ? 1 : 0.9,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 0.95 }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
      
      {/* Indicators */}
      <div className="swipe-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`swipe-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Magnetic Swipe Effect - elements that follow cursor/touch
interface MagneticSwipeProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticSwipe = ({ 
  children, 
  className = '', 
  strength = 0.3 
}: MagneticSwipeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouse = (event: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic-element ${className}`}
      style={{ x, y }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  );
};

// Swipe to Reveal Text - text that reveals on scroll with swipe effect
interface SwipeTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export const SwipeTextReveal = ({ 
  text, 
  className = '', 
  delay = 0 
}: SwipeTextRevealProps) => {
  const { ref, isInView } = useScrollAnimation();
  const words = text.split(' ');

  return (
    <div ref={ref} className={`swipe-text-reveal ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="swipe-word"
          initial={{ 
            opacity: 0,
            y: 100,
            rotateX: -90
          }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            rotateX: 0
          } : {
            opacity: 0,
            y: 100,
            rotateX: -90
          }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{
            display: 'inline-block',
            marginRight: '0.3em',
            transformOrigin: 'bottom',
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

// Page Transition Swipe - smooth page-like transitions
interface PageSwipeProps {
  children: ReactNode;
  isActive: boolean;
  direction?: 'left' | 'right';
  className?: string;
}

export const PageSwipe = ({
  children,
  isActive,
  direction = 'right',
  className = ''
}: PageSwipeProps) => {
  return (
    <motion.div
      className={`page-swipe ${className}`}
      initial={{
        x: direction === 'right' ? '100%' : '-100%',
        opacity: 0
      }}
      animate={{
        x: isActive ? 0 : (direction === 'right' ? '100%' : '-100%'),
        opacity: isActive ? 1 : 0
      }}
      exit={{
        x: direction === 'right' ? '-100%' : '100%',
        opacity: 0
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};

// Gesture Swipe - handles various gesture interactions
interface GestureSwipeProps {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  className?: string;
  threshold?: number;
}

export const GestureSwipe = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  className = '',
  threshold = 50
}: GestureSwipeProps) => {
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset } = info;
    
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      // Horizontal swipe
      if (offset.x > threshold && onSwipeRight) {
        onSwipeRight();
      } else if (offset.x < -threshold && onSwipeLeft) {
        onSwipeLeft();
      }
    } else {
      // Vertical swipe
      if (offset.y > threshold && onSwipeDown) {
        onSwipeDown();
      } else if (offset.y < -threshold && onSwipeUp) {
        onSwipeUp();
      }
    }
  };

  return (
    <motion.div
      className={`gesture-swipe ${className}`}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
};
