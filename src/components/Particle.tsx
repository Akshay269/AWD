
import {motion,MotionValue, useTransform} from 'framer-motion';


const Particle = ({ i, y, scrollYProgress, floatX, color }: {
  i: number,
  y: MotionValue<number>,
  scrollYProgress: MotionValue<number>,
  floatX: number,
  color: string
}) => {
  const particleY = useTransform(y, latest => latest - (i * 30) - 10);
  const particleOpacity = useTransform(scrollYProgress, [0, 1], [
    0.8 - i * 0.15,
    0.2 - i * 0.05,
  ]);

  return (
    <motion.div
      className="cube-particle"
      style={{
        y: particleY,
        x: floatX * (1 - i * 0.1),
        opacity: particleOpacity,
        scale: 1 - i * 0.15,
        backgroundColor: color,
      }}
    />
  );
};

export default Particle;
