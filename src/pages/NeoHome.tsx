import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../animation/gsapSetup";


const getReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ThreeHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const panel = panelRef.current;
    if (!container || !title || !panel) return;

    const reduced = getReducedMotion();

    // Subtle float
    const float = gsap.to(panel, { y: -12, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    // Title glow pulse
    const glow = gsap.to(title, { textShadow: "0 0 24px rgba(255,105,130,0.6)", duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

    if (!reduced) {
      const onMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;
        gsap.to(panel, { rotateY: dx * 12, rotateX: -dy * 8, transformPerspective: 900, transformOrigin: "center", duration: 0.4, ease: "sine.out" });
      };
      window.addEventListener("mousemove", onMove);
      return () => {
        window.removeEventListener("mousemove", onMove);
        float.kill();
        glow.kill();
      };
    }
    return () => {
      float.kill();
      glow.kill();
    };
  }, []);

  return (
    <section id="intro" className="neo-hero">
      <video className="neo-hero__video" autoPlay muted loop playsInline poster="">
        <source src="https://res.cloudinary.com/dsgbgr8or/video/upload/v1757789868/main_video-1_1_huokhx.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

const SectionPanel: React.FC<{ id: string; title: string; children: React.ReactNode; flip?: boolean }> = ({ id, title, children, flip = false }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 20%", toggleActions: "play none none reverse" } });
    tl.fromTo(el, { y: 60, rotateX: flip ? -12 : 12, opacity: 0 }, { y: 0, rotateX: 0, opacity: 1, duration: 0.9, ease: "power2.out" });
    return () => { tl.kill(); };
  }, [flip]);

  return (
    <section id={id} className="neo-section">
      <div ref={ref} className={`panel3d ${flip ? "panel3d--flip" : ""}`}>
        <h2 className="neo-h2">{title}</h2>
        <div className="neo-body">{children}</div>
      </div>
    </section>
  );
};

export const NeoHome: React.FC = () => {
  return (
    <div className="neo-root">
      <ThreeHero />

      <SectionPanel id="about" title="About Us">
        <p>
          I'm Ar. Apurva Wasule, founder of AW Designers — a studio built on a single vision: turning ideas into impactful spaces and visuals.
          With 3+ years of experience and over 50 completed projects in 3D visualization and façade designing, I combine architectural precision with visual storytelling to shape spaces that resonate.
        </p>
        <p>
          At AW Designers, we craft thoughtful, functional designs that respond to context and client aspirations. Under this umbrella, AW Renders brings those designs to life through high‑end 3D visualization — translating concepts into compelling, photorealistic experiences.
        </p>
      </SectionPanel>

      <SectionPanel id="expertise" title="Our Expertise" flip>
        <ul className="neo-list">
          <li>Visualize Before You Build — stunning 3D renders & facade concepts.</li>
          <li>Architecture that Breathes — from urban homes to countryside retreats.</li>
          <li>Design. Build. Deliver. — end‑to‑end turnkey solutions.</li>
          <li>Interiors with Intent — spaces that feel right.</li>
          <li>Collaboration with Purpose — co‑create with clients.</li>
        </ul>
      </SectionPanel>

      <SectionPanel id="work" title="Our Creation">
        <div className="depth-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="depth-card" key={i} style={{ "--d": `${(i % 3) + 1}` } as React.CSSProperties} >
              <div className="depth-card__inner">Project {i + 1}</div>
            </div>
          ))}
        </div>
      </SectionPanel>

      <SectionPanel id="contact" title="Contact" flip>
        <form className="neo-form" onSubmit={(e) => e.preventDefault()}>
          <input placeholder="Full Name" required />
          <input placeholder="Email" type="email" required />
          <textarea placeholder="Tell us about your project" rows={5} />
          <button className="btn btn--primary" type="submit">Send Message</button>
        </form>
      </SectionPanel>
    </div>
  );
};

export default NeoHome;


