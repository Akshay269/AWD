import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useState, useEffect } from "react";

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

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  margin?: string;
  style?: React.CSSProperties;
}

// Fade In Animation
export const FadeIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

// Slide Up Animation
export const SlideUp = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  style
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Reduce animation intensity on mobile and for users who prefer reduced motion
  const yOffset = reduceMotion ? 20 : isMobile ? 40 : 60;
  const animationDuration = reduceMotion ? 0.3 : isMobile ? 0.5 : duration;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: yOffset }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : yOffset,
      }}
      transition={{ duration: animationDuration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Slide In from Left
export const SlideInLeft = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  style
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Reduce animation intensity on mobile and for users who prefer reduced motion
  const xOffset = reduceMotion ? -20 : isMobile ? -40 : -60;
  const animationDuration = reduceMotion ? 0.3 : isMobile ? 0.5 : duration;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: xOffset }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : xOffset,
      }}
      transition={{ duration: animationDuration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Slide In from Right
export const SlideInRight = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  style
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Reduce animation intensity on mobile and for users who prefer reduced motion
  const xOffset = reduceMotion ? 20 : isMobile ? 40 : 60;
  const animationDuration = reduceMotion ? 0.3 : isMobile ? 0.5 : duration;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, x: xOffset }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : xOffset,
      }}
      transition={{ duration: animationDuration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Scale In Animation
export const ScaleIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}: ScrollAnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8,
      }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Stagger Container for animating children in sequence
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
  margin?: string;
}

export const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.1,
  threshold = 0.1,
}: StaggerContainerProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

// Stagger Item (to be used inside StaggerContainer)
export const StaggerItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: reduceMotion ? 10 : isMobile ? 15 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0.3 : isMobile ? 0.4 : 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// Parallax Component
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export const Parallax = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}: ParallaxProps) => {
  const { ref, isInView } = useScrollAnimation({
    threshold: 0,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: isInView ? (direction === "up" ? -speed * 100 : speed * 100) : 0,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
