import { useState, useEffect } from "react";
import { Carousel } from "../components/Carousel";
import { vizExterior } from "../assetComponents/vizExterior";
import { vizInterior } from "../assetComponents/vizInterior";
import { archInterior } from "../assetComponents/archInterior";
import { archExterior } from "../assetComponents/archExterior";
import { SwipeReveal, SwipeTextReveal } from "../components/SwipeAnimations";

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

const Work = () => {
  const [active, setActive] = useState<"architectural" | "visualization">(
    "visualization"
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  const data =
    active === "architectural"
      ? { interior: archInterior, exterior: archExterior }
      : { interior: vizInterior, exterior: vizExterior };

  return (
    <section id="work" className="section section--primary">
      <div className="container">
        <SwipeReveal direction="up" duration={1}>
          <SwipeTextReveal text="Our Creation" className="h2" />
        </SwipeReveal>

        {/* Tabs */}
        <div
          className="tabs"
          style={{
            flexDirection: isMobile ? "column" : "row",
            gap: "12px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <button
            className={`tab ${active === "visualization" ? "tab--active" : ""}`}
            onClick={() => setActive("visualization")}
            style={{
              fontSize: isMobile ? "14px" : "16px",
              padding: isMobile ? "12px 16px" : "10px 14px",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
            }}
          >
            {isMobile ? "3D VISUALIZATION" : "3D VISUALIZATION PROJECT"}
          </button>
          <button
            className={`tab ${active === "architectural" ? "tab--active" : ""}`}
            onClick={() => setActive("architectural")}
            style={{
              fontSize: isMobile ? "14px" : "16px",
              padding: isMobile ? "12px 16px" : "10px 14px",
              width: isMobile ? "100%" : "auto",
              textAlign: "center",
            }}
          >
            {isMobile ? "ARCHITECTURAL" : "ARCHITECTURAL PROJECT"}
          </button>
        </div>

        {/* Interior Projects Carousel */}
        <div className="work-carousel-section" style={{ marginBottom: "48px" }}>
          <h3 style={{ color: "var(--text)", marginBottom: "16px" }}>
            Interior Projects
          </h3>
          <Carousel items={data.interior} />
        </div>

        {/* Exterior Projects Carousel */}
        <div className="work-carousel-section" style={{ marginBottom: "48px" }}>
          <h3 style={{ color: "var(--text)", marginBottom: "16px" }}>
            Exterior Projects
          </h3>
          <Carousel items={data.exterior} />
        </div>
      </div>
    </section>
  );
};
export default Work;