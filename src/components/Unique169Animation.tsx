import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useMemo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SwipeTextReveal } from './SwipeAnimations';

interface Unique169AnimationProps {
  title?: string;
  subtitle?: string;
  items?: string[];
  className?: string;
  style?: React.CSSProperties;
}

// 16:9 unique animation showcase preserving existing codebase style
export const Unique169Animation = ({
  title = 'Our Expertise',
  subtitle = 'Motion design & web animations',
  items = ['GSAP', 'Framer Motion', 'SVG', 'ScrollTrigger', 'WebGL'],
  className = '',
  style
}: Unique169AnimationProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.2 });

  // Staggered chips animation
  const chipsContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const chip: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  // Precompute orbit dots angles
  const orbitAngles = useMemo(() => Array.from({ length: 10 }, (_, i) => (i * 36)), []);

  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 16,
        overflow: 'hidden',
        background: 'radial-gradient(1200px 600px at 20% 20%, rgba(255,105,130,0.18), transparent), radial-gradient(1000px 500px at 80% 70%, rgba(108,139,253,0.18), transparent), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        ...style
      }}
    >
      {/* Animated gradient wash */}
      <motion.div
        aria-hidden
        style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 80% at 0% 0%, rgba(255,105,130,0.15), transparent 60%), radial-gradient(60% 80% at 100% 100%, rgba(108,139,253,0.15), transparent 60%)' }}
        animate={{
          backgroundPosition: ['0% 0%, 100% 100%', '10% 6%, 90% 94%', '0% 0%, 100% 100%']
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting dots layer */}
      <motion.div
        aria-hidden
        style={{ position: 'absolute', inset: 0 }}
        animate={{ rotate: isInView ? 360 : 0 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        {orbitAngles.map((deg, idx) => (
          <motion.div
            key={deg}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 6,
              height: 6,
              borderRadius: 9999,
              background: idx % 2 === 0 ? 'rgba(255,255,255,0.65)' : 'rgba(108,139,253,0.9)',
              boxShadow: '0 0 12px rgba(108,139,253,0.7)',
              transform: `rotate(${deg}deg) translateX(36%) rotate(-${deg}deg)`
            }}
            animate={{
              y: [0, idx % 2 === 0 ? -4 : 4, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 3 + (idx % 5) * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      {/* Border glow */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          padding: 1,
          borderRadius: 16,
          background: 'linear-gradient(90deg, rgba(255,105,130,0.6), rgba(108,139,253,0.6))',
          WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor' as any,
          maskComposite: 'exclude'
        }}
        animate={{ opacity: isInView ? [0.4, 0.9, 0.4] : 0.2 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateRows: '1fr auto 1fr',
          padding: '32px',
          color: 'var(--text, #fff)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div />
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, opacity: 0.8, letterSpacing: 2, textTransform: 'uppercase' }}>{subtitle}</div>
          <div style={{ height: 8 }} />
          <SwipeTextReveal text={title} className="h2" />
          <div style={{ height: 14 }} />
          <div style={{ maxWidth: 760, margin: '0 auto', opacity: 0.8, fontSize: 16 }}>
            We craft smooth, accessible, and high-performance motion systems for modern web apps.
          </div>
        </div>
        <div style={{ alignSelf: 'end' }}>
          <motion.div
            variants={chipsContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}
          >
            {items.map((label) => (
              <motion.div
                key={label}
                variants={chip}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  padding: '10px 14px',
                  borderRadius: 999,
                  background: 'rgba(0,0,0,0.35)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(6px)',
                  fontSize: 14
                }}
              >
                {label}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}; 