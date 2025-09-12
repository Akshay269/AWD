import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LOGO_WHITE from "/assets/images/LOGO_WHITE.png";


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

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section by picking the section whose center is closest to viewport center
  useEffect(() => {
    const ids = ["intro", "about", "expertise", "work", "contact"];

    const compute = () => {
      const vh = window.innerHeight || 1;
      const viewCenter = vh / 2;
      let bestId = ids[0];
      let bestDist = Number.POSITIVE_INFINITY;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // skip if completely out of view
        if (rect.bottom <= 0 || rect.top >= vh) continue;
        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - viewCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      }
      setActiveSection(bestId);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          compute();
        });
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const navItems = [
    { href: "#intro", label: "Intro", id: "intro" },
    { href: "#about", label: "About Us", id: "about" },
    { href: "#expertise", label: "Our Expertise", id: "expertise" },
    { href: "#work", label: "Our Creation", id: "work" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // Close mobile menu when clicking on a nav item
  const handleNavClick = () => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      // Lock body scroll when menu is open to avoid layout shift; allow horizontal hidden
      document.documentElement.style.overflowY = isMobileMenuOpen
        ? "hidden"
        : "";
      document.body.style.overflowY = isMobileMenuOpen ? "hidden" : "";
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflowX = "hidden";
      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, isMobileMenuOpen]);

  // Close mobile menu when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <motion.header
        className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}
        initial={false}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      >
        <div className="navbar__inner" style={{ maxWidth: "100%" }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? "8px" : "12px",
              flex: 1,
            }}
          >
            <motion.img
              src={LOGO_WHITE}
              style={{
                width: isMobile ? "60px" : "90px",
                height: "auto",
              }}
              alt="AW Designers Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
            <motion.a
              href="#intro"
              className="brand"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              style={{
                fontSize: isMobile ? "20px" : "30px",
              }}
            >
              A.W Designers
            </motion.a>
          </motion.div>

          {/* Desktop Navigation */}
          {!isMobile && (
            <motion.nav
              className="nav"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={item.href}
                  className={activeSection === item.id ? "nav-active" : ""}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{
                    scale: 1.05,
                    color: "#ff4a63",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ position: "relative" }}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                  {/* underline handled by CSS ::after for nav-active */}
                </motion.a>
              ))}
            </motion.nav>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <motion.button
              className={`nav-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </motion.button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
      </motion.header>
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.nav
            className="nav nav--open"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={item.href}
               
                onClick={handleNavClick}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.2,
                  delay: 0.05 * index,
                  ease: "easeOut",
                }}
                whileHover={{
                  x: 5,
                  color: "#ff4a63",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};
