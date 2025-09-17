import { StaggerContainer, StaggerItem } from "../components/ScrollAnimations";
import { SwipeReveal, MagneticSwipe, SwipeTextReveal } from "../components/SwipeAnimations";
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

 const Expertise = () => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  const categories = [
    { key: 'arch', title: 'Architecture', desc: 'Context-driven planning and facades.' },
     { key: 'int', title: 'Interior Design', desc: 'Human-centered spaces with detail.' },
    { key: 'viz', title: '3D Visualization', desc: 'Photorealistic interiors and exteriors.' },
    
  ];

  const marqueeWords = [
    '3D VISUALIZATION', 'ARCHITECTURE', 'INTERIORS', 'FACADE', 'CONCEPTS', 'DETAILING', 'LIGHTING', 'MATERIALS'
  ];
  
  return (
    <section id="expertise" className="section section--primary">
      <div className={`container`}>
        <SwipeReveal direction={isMobile ? "up" : "up"} className="prose" duration={1.0}>
          <StaggerContainer staggerDelay={0.12}>
            <StaggerItem>
              <SwipeTextReveal text="Our Expertise" className="h2" />
              <p>From concept to craft — elegant by design, precise in execution.</p>
            </StaggerItem>

            {/* Mesmerizing infinite marquee */}
            <StaggerItem>
              <div className="expertise-marquee">
                <div className="expertise-marquee__track" aria-hidden="true">
                  {[...marqueeWords, ...marqueeWords].map((w, i) => (
                    <span className="expertise-marquee__word" key={i}>{w}</span>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Animated category cards */}
            <StaggerItem>
              <div className="expertise-grid">
                {categories.map(cat => (
                  <MagneticSwipe key={cat.key} strength={0.12}>
                    <a className={`expertise-card is-${cat.key}`} href="#work" aria-label={cat.title}>
                      <div className="expertise-card__inner">
                        <div className="expertise-card__icon" aria-hidden="true">
                          {cat.key === 'viz' && (
                            <svg className="viz-cube" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <g>
                                <rect className="draw" x="10" y="10" width="14" height="14" rx="1" />
                                <rect className="draw" x="16" y="16" width="14" height="14" rx="1" />
                                <line className="draw" x1="10" y1="10" x2="16" y2="16" />
                                <line className="draw" x1="24" y1="10" x2="30" y2="16" />
                                <line className="draw" x1="10" y1="24" x2="16" y2="30" />
                                <line className="draw" x1="24" y1="24" x2="30" y2="30" />
                              </g>
                            </svg>
                          )}
                          {cat.key === 'arch' && (
                            <div className="arch-blueprint">
                              <svg className="arch-house" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                  <path className="draw" d="M8 20 L20 10 L32 20" />
                                  <rect className="draw" x="11" y="20" width="18" height="12" />
                                  <rect className="draw" x="18" y="24" width="4" height="8" />
                                </g>
                              </svg>
                              <div className="blueprint-scan" />
                            </div>
                          )}
                          {cat.key === 'int' && (
                            <svg className="int-lamp" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <g>
                                <path className="draw" d="M14 24 L26 24" />
                                <rect className="draw" x="16" y="20" width="8" height="4" rx="1" />
                                <line className="draw" x1="20" y1="20" x2="20" y2="14" />
                                <circle className="draw" cx="20" cy="12" r="4" />
                                <circle className="glow" cx="20" cy="12" r="8" />
                              </g>
                            </svg>
                          )}
                        </div>
                        <div className="expertise-card__text">
                          <h4 className="expertise-card__title">{cat.title}</h4>
                          <p className="expertise-card__desc">{cat.desc}</p>
                        </div>
                      </div>
                    </a>
                  </MagneticSwipe>
                ))}
              </div>
            </StaggerItem>

            {/* Soft callout */}
            <StaggerItem>
              <div className="expertise-note">
                Built to be fast, accessible, and delightful — even on mobile.
              </div>
            </StaggerItem>
          </StaggerContainer>
        </SwipeReveal>
      </div>
    </section>
  );
};
export default Expertise;