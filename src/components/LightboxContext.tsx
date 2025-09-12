/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import type { MediaItem } from "./Carousel";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

type LightboxContextValue = {
  open: (item: MediaItem) => void;
};

export const LightboxContext = createContext<LightboxContextValue | null>(null);

export const useLightbox = () => {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return ctx;
};

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [item, setItem] = useState<MediaItem | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);

  const close = useCallback(() => {
    setItem(null);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const open = useCallback((it: MediaItem) => {
    setItem(it);
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (!item || item.type !== "image") return;
      if (e.key === "+") setScale((s) => Math.min(4, s + 0.2));
      if (e.key === "-") setScale((s) => Math.max(1, s - 0.2));
      if (e.key === "0") {
        setScale(1);
        setOffset({ x: 0, y: 0 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, item]);

  const onWheel: React.WheelEventHandler = (e) => {
    if (!item || item.type !== "image") return;
    const target = e.target as HTMLElement;
    if (target.closest(".lightbox__toolbar")) return;
    e.preventDefault();
    setScale((s) => {
      const next = Math.min(4, Math.max(1, s + (e.deltaY > 0 ? -0.15 : 0.15)));
      return next;
    });
  };
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!item || item.type !== "image" || scale <= 1) return;
    const target = e.target as HTMLElement;
    if (target.closest(".lightbox__toolbar")) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragStart.current) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    dragStart.current = null;
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!dragStart.current) return;
    const { x, y, ox, oy } = dragStart.current;
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    setOffset({ x: ox + dx, y: oy + dy });
  };

  const value = useMemo(() => ({ open }), [open]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {item && (
        <div className="lightbox" onClick={close}>
          <div
            className="lightbox__inner"
            onClick={(e) => e.stopPropagation()}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {item.type === "image" ? (
              <img
                className="lightbox__img"
                src={item.src}
                alt={item.alt || ""}
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                }}
              />
            ) : (
              <video className="lightbox__video" controls playsInline>
                <source src={item.src} />
              </video>
            )}
            <div
              className="lightbox__toolbar"
              onClick={(e) => e.stopPropagation()}
            >
              {item.type === "image" && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setScale((s) => Math.max(1, s - 0.2));
                    }}
                    aria-label="Zoom out"
                  >
                    –
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setScale(1);
                      setOffset({ x: 0, y: 0 });
                    }}
                    aria-label="Reset zoom"
                  >
                   {Math.round(scale * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setScale((s) => Math.min(4, s + 0.2));
                    }}
                    aria-label="Zoom in"
                  >
                    +
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </LightboxContext.Provider>
  );
};
