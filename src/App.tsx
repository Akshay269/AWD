import "./styles.css";
import { Navbar } from "./components/Navbar";
import { Intro } from "./sections/Intro";
import { About } from "./sections/About";
import { Expertise } from "./sections/Expertise";
import { Work } from "./sections/Work";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { LightboxProvider } from "./components/LightboxContext";
import { CubeSection } from "./sections/CubeSection";

function App() {
  return (
    <LightboxProvider>
      <div className="app-root">
        <Navbar />
        <main>
          <Intro videoSrc="https://res.cloudinary.com/dsgbgr8or/video/upload/v1757688408/Hero_xvrxvt.mp4" poster="/assets/images/LOGO_WHITE.png" />
          <CubeSection />
          <About />
          <Expertise />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </LightboxProvider>
  );
}

export default App;
