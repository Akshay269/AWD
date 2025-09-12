import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
}

export const useScrollAnimation = ({
  threshold = 0.1,
  triggerOnce = false,
}: UseScrollAnimationProps = {}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: triggerOnce
    // margin is omitted because useInView does not accept a string margin
  });

  return { ref, isInView };
};
