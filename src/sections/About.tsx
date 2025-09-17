import { StaggerContainer, StaggerItem } from "../components/ScrollAnimations";
import { SwipeReveal, SwipeTextReveal } from "../components/SwipeAnimations";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";


interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
  durationMs?: number;
}

const StatCounter = ({ end, label, suffix = "+", durationMs = 1200 }: StatCounterProps) => {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3, triggerOnce: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let rafId: number;
    const start = performance.now();

    const animate = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * end));
      if (t < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, durationMs]);

  return (
    <div ref={ref} className="stat">
      <div style={{ fontSize: '40px', fontWeight: 800, lineHeight: 1 }}>{value}{suffix}</div>
      <div style={{ opacity: 0.8 }}>{label}</div>
    </div>
  );
};


export const About = () => {
  return (
    <section id="about" className="section section--light">
      <div className={`container`}>
        <SwipeReveal 
          direction={"up"} 
          className="prose about__content" 
          duration={1.2}
        >
          <StaggerContainer staggerDelay={0.2}>
            <StaggerItem>
              <SwipeTextReveal text="About Us" className="h2" />
            </StaggerItem>
            <StaggerItem>
              <p style={{color:'#0e0c0a', fontFamily:'MyFont3'}}>
                I'm Ar. Apurva Wasule, founder of AW Designer — a studio built on a
                single vision: turning ideas into impactful spaces and visuals. With
                3+ years of experience and over 50 completed projects in 3D
                visualization and façade designing, I combine architectural
                precision with visual storytelling to shape spaces that resonate.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p style={{color:'#000000', fontFamily:'MyFont3'}}>
                At AW Designer, we craft thoughtful, functional designs that
                respond to context and client aspirations. Under this umbrella, AW
                Renders brings those designs to life through high‑end 3D
                visualization — translating concepts into compelling, photorealistic
                experiences.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p style={{color:'#0e0c0a', fontFamily:'MyFont3'}}>
                Together, both reflect my belief that good design isn't just seen —
                it's felt.
              </p>
            </StaggerItem>
            <StaggerItem>
              <div className={`about__stats grid grid--2`}>
                <StatCounter end={3} label="Years Experience" />
                <StatCounter end={50} label="Projects Completed" />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </SwipeReveal>
      </div>
    </section>
  );
};
