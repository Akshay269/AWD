import { useState, useEffect, useRef } from "react";

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

const LazyImage = ({ src, alt, ...props }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible? src:"null"}
      alt={alt}
      loading="lazy"
      {...props}
      style={{
        width: "100%",
        height: "auto",
        background: "#f0f0f0", // placeholder bg
        ...props.style,
      }}
    />
  );
};

export default LazyImage;
