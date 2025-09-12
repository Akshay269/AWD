import { useRef } from "react";
import { useLightbox } from "./../components/LightboxContext";
import LazyImage from "./LazyImage";
import LazyVideo from "./LazyVideo";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
};

export const Carousel = ({ items }: { items: MediaItem[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { open } = useLightbox();
  const scrollBy = (delta: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  };
  const handleOpen = (item: MediaItem) => () => open(item);
  return (
    <div className="carousel">
      <button
        className="carousel__btn"
        aria-label="Previous"
        onClick={() => scrollBy(-360)}
      >
        ‹
      </button>
      <div ref={trackRef} className="carousel__track">
        {items.map((item, idx) => (
          <div key={idx} className="carousel__slide">
            <figure
              className="carousel__item"
              role="button"
              tabIndex={0}
              onClick={handleOpen(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(item);
                }
              }}
            >
              {item.type === "image" ? (
                <LazyImage src={item.src} alt={item.alt || ""} />
              ) : (
                <LazyVideo src={item.src} poster={item.alt} />
              )}
            </figure>

            {item.caption && (
              <figcaption className="carousel__caption">
                {item.caption}
              </figcaption>
            )}
          </div>
        ))}
      </div>
      <button
        className="carousel__btn"
        aria-label="Next"
        onClick={() => scrollBy(360)}
      >
        ›
      </button>
    </div>
  );
};
