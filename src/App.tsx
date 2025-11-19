import "./styles.css";
import { Navbar } from "./components/Navbar";
import Intro from "./sections/Intro";
import { LightboxProvider } from "./components/LightboxContext";
import { Suspense, lazy } from "react";
import { useInView } from "react-intersection-observer";

// Lazy load sections
const CubeSection = lazy(() => import("./sections/CubeSection"));
import About from "./sections/About";
import Expertise from "./sections/Expertise";
import Work from "./sections/Work";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
// const About =  import("./sections/About");
// const Expertise =  import("./sections/Expertise");
// const Work = import("./sections/Work");
// const Contact =  import("./sections/Contact");
// const Footer =  import("./sections/Footer");
import { SpeedInsights } from "@vercel/speed-insights/react";

// Wrapper for intersection-based lazy rendering
function LazySection({
  children,
  height = "400px",
}: {
  children: React.ReactNode;
  height?: string;
}) {
  const { ref, inView } = useInView({
    triggerOnce: true, // load only once
    rootMargin: "200px", // preload before visible
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<div style={{ height }} />}>{children}</Suspense>
      ) : (
        <div style={{ height }} />
      )}
    </div>
  );
}

function App() {
  return (
    <>
      <LightboxProvider>
        <div className="app-root">
          <Navbar />
          <main>
            {/* Hero Section loads immediately */}
            <Intro
              desktopVideo="https://res.cloudinary.com/dsgbgr8or/video/upload/f_auto,q_auto:best,w_auto,dpr_auto/v1758097779/website_avhwvn.webm"
              mobileVideo="https://res.cloudinary.com/dsgbgr8or/video/upload/f_auto,q_auto:best,w_auto,dpr_auto/v1758132494/website-mobile_vih5nc.webm"
              poster="https://res.cloudinary.com/dsgbgr8or/image/upload/f_auto,q_auto:best,w_auto,dpr_auto/v1758273485/LOGO_uhfbf5.png"
            />

            {/* Lazy sections (load only when scrolled near) */}
            <LazySection>
              <CubeSection />
            </LazySection>

            {/* <LazySection> */}
            <About />
            {/* </LazySection> */}

            {/* <LazySection> */}
            <Expertise />
            {/* </LazySection> */}

            {/* <LazySection> */}
            <Work />
            {/* </LazySection> */}

            {/* <LazySection> */}
            <Contact />
            {/* </LazySection> */}

            {/* <LazySection> */}
            <Footer />
            {/* </LazySection> */}
          </main>
        </div>
      </LightboxProvider>
      <SpeedInsights />
    </>
  );
}

export default App;
