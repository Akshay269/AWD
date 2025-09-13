import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface IntroProps {
  videoSrc: string; 
  poster?: string;  
}

// Hook for detecting screen size
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

// LazyVideo component
const LazyVideo = ({
  src,
  poster,
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement> & { src: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return <video ref={ref} src={isVisible ? src : undefined} poster={poster} {...props} />;
};

export const Intro: React.FC<IntroProps> = ({ videoSrc, poster }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isLandscape = useMediaQuery("(orientation: landscape) and (max-height: 500px)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const parallaxIntensity = isMobile ? 0.1 : isTablet ? 0.2 : 0.3;
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${parallaxIntensity * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.03 : 1.07]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-6%" : "-14%"]);

  return (
    <section
      ref={ref}
      className="section section--hero"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        height: "100vh",
        minHeight: isLandscape ? "500px" : isMobile ? "600px" : "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hero Video */}
      <motion.div className="hero__media" style={{ y, scale }}>
        <LazyVideo
          src={videoSrc}
          poster={poster || ""}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="hero__video"
        />
      </motion.div>

      {/* Overlay */}
      <div className="hero__overlay" style={{ position: "absolute", inset: 0 }} />

      {/* Hero Content */}
      <motion.div
        className="container hero__content"
        style={{ y: contentY, textAlign: isMobile ? "center" : "left", padding: isMobile ? "0 16px" : 0 }}
      >
        {/* <FadeIn duration={1} delay={0.3}>
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            A.W Designers
          </motion.h1>
        </FadeIn> */}

        {/* <SlideUp duration={1} delay={0.8}>
          <TypingText
            texts={["Envision.", "Design.", "Build."]}
            speed={100}
            fontSize={isMobile ? "clamp(16px,4.8vw,26px)" : "clamp(18px,2.2vw,28px)"}
            align={isMobile ? "center" : "left"}
          />
        </SlideUp> */}

        {/* Floating Decorations */}
        {/* {!isMobile && (
          <>
            <motion.div
              className="hero-decoration"
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: isTablet ? "15%" : "20%",
                right: isTablet ? "5%" : "10%",
                width: isTablet ? "80px" : "100px",
                height: isTablet ? "80px" : "100px",
                background: "rgba(108, 139, 253, 0.1)",
                borderRadius: "50%",
                filter: "blur(20px)",
                zIndex: -1,
              }}
            />
            <motion.div
              className="hero-decoration"
              animate={{ y: [0, 30, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{
                position: "absolute",
                bottom: isTablet ? "25%" : "30%",
                left: isTablet ? "10%" : "15%",
                width: isTablet ? "60px" : "80px",
                height: isTablet ? "60px" : "80px",
                background: "rgba(156, 108, 251, 0.15)",
                borderRadius: "50%",
                filter: "blur(15px)",
                zIndex: -1,
              }}
            />
          </>
        )} */}
      </motion.div>
      
    </section>
  );
};
