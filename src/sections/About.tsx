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

//  const JcbMarquee = () => {
//   return (
//     <div className="about__jcb-track">
//       <div className="about__jcb">
//         <div className="about__jcb-bob">
//           <svg width="110" height="62" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//             {/* ground */}
//             <line x1="0" y1="90" x2="180" y2="90" className="about__jcb-line about__jcb-ground" />

//             {/* machine */}
//             <g className="about__jcb-line about__jcb-body">
//               {/* body block */}
//               <rect x="14" y="48" width="70" height="34" rx="5" />
//               {/* cabin */}
//               <rect x="32" y="34" width="32" height="18" rx="3" />
//               {/* cabin pane divider */}
//               <line x1="48" y1="34" x2="48" y2="52" />
//               {/* headlight */}
//               <circle cx="80" cy="62" r="2.5" />
//               {/* grille */}
//               <line x1="18" y1="54" x2="18" y2="76" />
//               <line x1="22" y1="54" x2="22" y2="76" />
//               <line x1="26" y1="54" x2="26" y2="76" />

//               {/* arm segments */}
//               <path d="M84 58 L116 46 L152 54 L144 64 L118 60 L88 64 Z" />
//               {/* arm joints */}
//               <circle cx="84" cy="58" r="3" />
//               <circle cx="116" cy="46" r="3" />
//               <circle cx="152" cy="54" r="3" />
//               <circle cx="144" cy="64" r="3" />
//               {/* bucket with teeth */}
//               <path d="M150 54 Q164 52 168 62 Q164 70 150 68 Z" />
//               <path d="M154 66 l4 6 M159 66 l4 6 M164 65 l4 6" />

//               {/* wheels */}
//               <circle cx="38" cy="84" r="13" />
//               <circle cx="68" cy="84" r="13" />
//               {/* inner tyres */}
//               <circle cx="38" cy="84" r="8" />
//               <circle cx="68" cy="84" r="8" />
//               {/* hubs */}
//               <circle cx="38" cy="84" r="3" />
//               <circle cx="68" cy="84" r="3" />

//               {/* rotating spokes */}
//               <g className="about__jcb-wheel">
//                 <line x1="38" y1="71" x2="38" y2="97" />
//                 <line x1="25" y1="84" x2="51" y2="84" />
//               </g>
//               <g className="about__jcb-wheel">
//                 <line x1="68" y1="71" x2="68" y2="97" />
//                 <line x1="55" y1="84" x2="81" y2="84" />
//               </g>
//             </g>
//           </svg>
//         </div>
//       </div>

//       {/* Road roller follower */}
//       <div className="about__roller">
//         <div className="about__roller-bob">
//           <svg width="110" height="62" viewBox="0 0 180 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//             {/* ground */}
//             <line x1="0" y1="90" x2="180" y2="90" className="about__jcb-line about__jcb-ground" />

//             {/* roller body */}
//             <g className="about__jcb-line">
//               {/* rear body */}
//               <rect x="16" y="52" width="66" height="28" rx="5" />
//               {/* cabin */}
//               <rect x="30" y="40" width="26" height="16" rx="3" />
//               <line x1="43" y1="40" x2="43" y2="56" />

//               {/* rear wheels */}
//               <circle cx="34" cy="84" r="10" />
//               <circle cx="62" cy="84" r="10" />
//               <g className="about__jcb-wheel">
//                 <line x1="34" y1="74" x2="34" y2="94" />
//                 <line x1="24" y1="84" x2="44" y2="84" />
//               </g>
//               <g className="about__jcb-wheel">
//                 <line x1="62" y1="74" x2="62" y2="94" />
//                 <line x1="52" y1="84" x2="72" y2="84" />
//               </g>

//               {/* arm to drum */}
//               <line x1="82" y1="66" x2="104" y2="72" />
//               <line x1="82" y1="66" x2="82" y2="80" />

//               {/* front drum */}
//               <circle cx="120" cy="82" r="16" className="about__jcb-line about__jcb-wheel" />
//             </g>
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

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
              <p>
                I'm Ar. Apurva Wasule, founder of AW Designers — a studio built on a
                single vision: turning ideas into impactful spaces and visuals. With
                3+ years of experience and over 50 completed projects in 3D
                visualization and façade designing, I combine architectural
                precision with visual storytelling to shape spaces that resonate.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                At AW Designers, we craft thoughtful, functional designs that
                respond to context and client aspirations. Under this umbrella, AW
                Renders brings those designs to life through high‑end 3D
                visualization — translating concepts into compelling, photorealistic
                experiences.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
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
      {/* <JcbMarquee /> */}
    </section>
  );
};
