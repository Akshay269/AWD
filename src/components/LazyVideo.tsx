import { useState, useEffect, useRef } from "react";

type LazyVideoProps = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

 const LazyVideo = ({
  src,
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className,
  style,
}: LazyVideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // stop observing after visible
          }
        });
      },
      { threshold: 0.25 } // load when 25% of video is visible
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      poster={poster}
      preload="none"
      autoPlay={autoPlay && isVisible}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      controls={!autoPlay} // show controls if not autoplay
    >
      {isVisible && <source src={src} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
