import {
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
} from "../components/ScrollAnimations";
import { SwipeReveal, SwipeTextReveal } from "../components/SwipeAnimations";
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
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

 const Contact = () => {
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <section id="contact" className="section section--light">
      <div className={`container ${isMobile ? "grid" : "grid grid--2"}`}>
        <SlideInLeft
          className="contact-form-1"
          style={{
            order: isMobile ? 1 : 2,
            marginTop: isMobile ? "32px" : "0",
          }}
        >
          <StaggerContainer staggerDelay={0.2}>
            <StaggerItem>
              <SwipeReveal direction="up" duration={1}>
                <SwipeTextReveal text="Contact Us" className="h2" />
              </SwipeReveal>
              <p className="subtitle">
                Ready to bring your vision to life? Let's start the
                conversation.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="contact-list">
                <div style={{ fontFamily: "MyFont3" }}>
                  📧 awdesigner.in@gmail.com
                </div>
                <div style={{ fontFamily: "MyFont3" }}>📱 +91 9960155654</div>
                <div style={{ fontFamily: "MyFont3" }}>📍 India</div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="help-box">
                <h4>What We Can Help With</h4>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <li style={{ fontFamily: "MyFont3" }}>
                    Architectural Design & Planning
                  </li>
                  <li style={{ fontFamily: "MyFont3" }}>
                    3D Visualization & Rendering
                  </li>
                  <li style={{ fontFamily: "MyFont3" }}>
                    Interior Design & Renovation
                  </li>
                  <li style={{ fontFamily: "MyFont3" }}>
                    Turnkey Project Execution
                  </li>
                  <li style={{ fontFamily: "MyFont3" }}>Design Consultation</li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </SlideInLeft>

        <SlideInRight
          delay={0.3}
          style={{
            order: isMobile ? 1 : 2,
          }}
        >
        <form className="contact-form" action="https://formsubmit.co/awdesigner.in@gmail.com" method="POST" >
            <div className={isMobile ? "grid" : "grid grid--2"}>
              <input
              name="Full-Name"
                required
                placeholder="Full Name *"
                style={{
                  marginBottom: isMobile ? "12px" : "10px",
                  fontSize: isMobile ? "16px" : "14px",
                }}
              />
              <input
               name="EmailId"
                type="email"
                required
                placeholder="Email Address *"
                style={{
                  marginBottom: isMobile ? "12px" : "10px",
                  fontSize: isMobile ? "16px" : "14px",
                }}
              />
            </div>
            <div className={isMobile ? "grid" : "grid grid--2"}>
              <input
               name="PhoneNumber"
                required
                placeholder="Phone Number *"
                style={{
                  marginBottom: isMobile ? "12px" : "10px",
                  fontSize: isMobile ? "16px" : "14px",
                }}
              />
              <select
              name="Work"
                required
                defaultValue=""
                style={{
                  marginBottom: isMobile ? "12px" : "10px",
                  fontSize: isMobile ? "16px" : "14px",
                }}
              >
                <option value="" disabled>
                  Select project type
                </option>
                <option>Architecture</option>
                <option>Interior Design</option>
                <option>3D Visualization</option>
              </select>
            </div>
            <textarea
              name="Description"
              placeholder="Tell us about your project..."
              rows={isMobile ? 4 : 6}
              style={{
                marginBottom: isMobile ? "12px" : "10px",
                fontSize: isMobile ? "16px" : "14px",
                resize: "vertical",
              }}
            />
            <button
              className="btn btn--dark"
              type="submit"
              style={{
                width: isMobile ? "100%" : "auto",
                fontSize: isMobile ? "16px" : "14px",
                padding: isMobile ? "14px 18px" : "12px 18px",
              }}
            >
              Send Message
            </button>
            <div
              className="disclaimer"
              style={{
                fontSize: isMobile ? "12px" : "14px",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              * Required fields. We'll respond within 24 hours.
            </div>
          </form>
        </SlideInRight>
      </div>
    </section>
  );
};

export default Contact;