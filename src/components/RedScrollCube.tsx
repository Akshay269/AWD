import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../animation/gsapSetup";

// Detailed blueprint construction timelapse on the right (looping)
// Left: equally animated highlighted text

const computeResponsiveSize = (): number => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1024;
  const h = typeof window !== "undefined" ? window.innerHeight : 768;
  const shortSide = Math.min(w, h);
  if (w <= 480) return Math.max(220, Math.round(shortSide * 0.7));
  if (w <= 900) return Math.max(340, Math.round(shortSide * 0.6));
  return Math.max(420, Math.round(shortSide * 0.52));
};

const RedScrollCube: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // Left text
  const textWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  // Right blueprint scene
  const sceneRef = useRef<SVGGElement>(null);
  const hScanRef = useRef<SVGRectElement>(null);
  const vScanRef = useRef<SVGRectElement>(null);
  const craneRef = useRef<SVGGElement>(null);
  const craneHookRef = useRef<SVGRectElement>(null);
  const craneBlockRef = useRef<SVGRectElement>(null);

  // Buildings (5)
  const outline1Ref = useRef<SVGPathElement>(null);
  const outline2Ref = useRef<SVGPathElement>(null);
  const outline3Ref = useRef<SVGPathElement>(null);
  const outline4Ref = useRef<SVGPathElement>(null);
  const outline5Ref = useRef<SVGPathElement>(null);
  const fill1Ref = useRef<SVGRectElement>(null);
  const fill2Ref = useRef<SVGRectElement>(null);
  const fill3Ref = useRef<SVGRectElement>(null);
  const fill4Ref = useRef<SVGRectElement>(null);
  const fill5Ref = useRef<SVGRectElement>(null);
  const winG1Ref = useRef<SVGGElement>(null);
  const winG2Ref = useRef<SVGGElement>(null);
  const winG3Ref = useRef<SVGGElement>(null);
  const winG4Ref = useRef<SVGGElement>(null);
  const winG5Ref = useRef<SVGGElement>(null);
  const beacon1Ref = useRef<SVGCircleElement>(null);
  const beacon2Ref = useRef<SVGCircleElement>(null);
  const beacon3Ref = useRef<SVGCircleElement>(null);
  const beacon4Ref = useRef<SVGCircleElement>(null);
  const beacon5Ref = useRef<SVGCircleElement>(null);

  const [baseSize, setBaseSize] = useState<number>(computeResponsiveSize());
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const textWrap = textWrapRef.current;
    const headline = headlineRef.current;
    if (!textWrap || !headline) return;

    // Text shimmer + shared float (keeps lines aligned)
    headline.style.backgroundSize = "200% 100%";
    headline.style.textShadow =
      "0 3px 14px rgba(255,105,130,0.45), 0 0 28px rgba(255,105,130,0.3)";
    const shimmer = gsap.to(headline, {
      backgroundPosition: "100% 50%",
      duration: 2.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    const float = gsap.to(textWrap, {
      y: -10,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Scene elements
    const outlines = [
      outline1Ref.current,
      outline2Ref.current,
      outline3Ref.current,
      outline4Ref.current,
      outline5Ref.current,
    ] as (SVGPathElement | null)[];
    const fills = [
      fill1Ref.current,
      fill2Ref.current,
      fill3Ref.current,
      fill4Ref.current,
      fill5Ref.current,
    ] as (SVGRectElement | null)[];
    const windows = [
      winG1Ref.current,
      winG2Ref.current,
      winG3Ref.current,
      winG4Ref.current,
      winG5Ref.current,
    ] as (SVGGElement | null)[];
    const beacons = [
      beacon1Ref.current,
      beacon2Ref.current,
      beacon3Ref.current,
      beacon4Ref.current,
      beacon5Ref.current,
    ] as (SVGCircleElement | null)[];
    const hScan = hScanRef.current;
    const vScan = vScanRef.current;
    const scene = sceneRef.current;
    const crane = craneRef.current;
    const hook = craneHookRef.current;
    const block = craneBlockRef.current;
    if (!scene || !hScan || !vScan || !crane || !hook || !block) return;
    if (
      outlines.some((o) => !o) ||
      fills.some((f) => !f) ||
      windows.some((w) => !w) ||
      beacons.some((b) => !b)
    )
      return;

    // Prep
    const lengths = outlines.map((p) => (p as SVGPathElement).getTotalLength());
    outlines.forEach((p, i) =>
      gsap.set(p, {
        strokeDasharray: lengths[i],
        strokeDashoffset: lengths[i],
        opacity: 1,
      })
    );
    fills.forEach((r) =>
      gsap.set(r, { transformOrigin: "50% 100%", scaleY: 0, opacity: 0.32 })
    );
    windows.forEach((g) => gsap.set(g, { opacity: 0 }));
    beacons.forEach((b) =>
      gsap.set(b, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" })
    );
    gsap.set([hScan, vScan], { opacity: 0.22 });
    gsap.set(hook, { transformOrigin: "50% 0%", y: 0 });
    gsap.set(block, { opacity: 0, y: -40 });

    // Subtle scene sway
    gsap.to(scene, {
      rotation: 0.2,
      transformOrigin: "740px 380px",
      yoyo: true,
      repeat: -1,
      duration: 6,
      ease: "sine.inOut",
    });

    // Positions (roof tops) for crane target
    const roofTargets = [
      { x: 590, y: 500 },
      { x: 675, y: 460 },
      { x: 762, y: 440 },
      { x: 845, y: 480 },
      { x: 905, y: 520 },
    ];

    // Master loop (start paused; controlled by scroll visibility)
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: true });
    loopRef.current = tl;
    const riseDur = 1.1;
    const drawDur = 1.2;

    // Scanner sweeps
    tl.to(hScan, { x: 520, duration: 0 });
    tl.to(hScan, { x: 940, duration: 2.4, ease: "sine.inOut" }, 0)
      .set(hScan, { x: 520 }, ">-0.1")
      .to(vScan, { y: 120, duration: 0 })
      .to(vScan, { y: 640, duration: 2.4, ease: "sine.inOut" }, "<0.2");

    const build = (idx: number, offset = "<0.4") => {
      const o = outlines[idx] as SVGPathElement;
      const f = fills[idx] as SVGRectElement;
      const w = windows[idx] as SVGGElement;
      const b = beacons[idx] as SVGCircleElement;
      const roof = roofTargets[idx];

      // Outline + rise
      tl.to(
        o,
        { strokeDashoffset: 0, duration: drawDur, ease: "power2.out" },
        offset
      )
        .to(f, { scaleY: 1, duration: riseDur, ease: "power2.out" }, offset)
        // Windows appear after partial rise
        .to(w, { opacity: 1, duration: 0.6, ease: "sine.out" }, "<0.5")
        // Beacon pulse
        .to(b, { opacity: 1, duration: 0.2 }, "<0.2")
        .to(
          b,
          {
            scale: 1.3,
            duration: 0.25,
            yoyo: true,
            repeat: 3,
            ease: "sine.inOut",
          },
          "<0.0"
        )
        // Crane move + drop block
        .to(
          crane,
          { x: roof.x - 520 - 30, duration: 0.5, ease: "sine.inOut" },
          "<0.0"
        )
        .to(
          [hook, block],
          { y: roof.y - 140, duration: 0.5, ease: "power1.in" },
          "<0.0"
        )
        .to(block, { opacity: 1, duration: 0.05 }, "<")
        .to(
          block,
          { y: roof.y - 100, duration: 0.35, ease: "bounce.out" },
          "<0.05"
        )
        .to(block, { opacity: 0, duration: 0.15 }, ">-0.05")
        .to(
          [hook, block],
          { y: 0, duration: 0.5, ease: "power1.out" },
          ">-0.1"
        );
    };

    // Stage builds L->R with overlaps
    build(0, ">0.2");
    build(1, "<0.5");
    build(2, "<0.5");
    build(3, "<0.5");
    build(4, "<0.5");

    // Reset for next loop
    tl.to(fills, { opacity: 0.22, duration: 0.6, ease: "sine.out" }, ">0.3");
    tl.set(outlines, { strokeDashoffset: (i: number) => lengths[i] }, ">0.1");
    tl.set(fills, { scaleY: 0 }, ">");
    tl.set(windows, { opacity: 0 }, ">");
    tl.set(beacons, { opacity: 0, scale: 0.6 }, ">");
    tl.set(crane, { x: 0 }, ">");

    // Scroll visibility control
    try {
      gsap.registerPlugin(ScrollTrigger);
      stRef.current = ScrollTrigger.create({
        trigger: sectionRef.current as Element,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      });
    } catch (err) {
      console.log("err", err);
    }

    // Respect reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion) {
      // Small delay to avoid jank on first paint
      requestAnimationFrame(() => tl.play());
    }

    const onResize = () => setBaseSize(computeResponsiveSize());
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize as EventListener);
      if (loopRef.current) loopRef.current.kill();
      if (stRef.current) stRef.current.kill(true);
      [shimmer, float].forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      const box = sceneRef.current.getBBox();
      const svgW = 997;
      const svgH = 822;
      const offsetX = svgW / 2 - (box.x + box.width / 2);
      const offsetY = svgH / 2 - (box.y + box.height / 2);
      sceneRef.current.setAttribute(
        "transform",
        `translate(${offsetX}, ${offsetY})`
      );
    }
  }, []);

  const isMobileWidth =
    typeof window !== "undefined" && window.innerWidth <= 600;
  const size = Math.round(baseSize * (isMobileWidth ? 0.9 : 1.2));
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const svgTargetWidth = Math.round(size * 1.6);
  const svgMaxWidth = Math.round(vw * (isMobileWidth ? 0.9 : 0.46));
  const svgWidth = Math.min(svgTargetWidth, svgMaxWidth);
  const svgHeight = Math.round(svgWidth * (822 / 997));

  const isNarrow =
    typeof window !== "undefined" ? window.innerWidth <= 900 : false;

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        height: isMobileWidth ? "58vh" : "100vh",
        width: "100%",
        overflow: "hidden",
        background: "#000000ff",
		alignItems:"center"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: isNarrow ? "1fr" : "minmax(0,1fr) minmax(0,1fr)",
          alignItems: "center",
          rowGap: isNarrow ? 24 : 0,
        }}
      >
        {/* Left: Text */}
        <div
          style={{
            display: "grid",
            justifyItems: isNarrow ? "center" : "start",
            paddingInline: isNarrow ? "5vw" : "6vw",
            pointerEvents: "none",
          }}
        >
          <div
            ref={textWrapRef}
            style={{ width: "100%", maxWidth: isNarrow ? 500 : 560 }}
          >
            <div
              ref={headlineRef}
              style={{
                display: "block",
                margin: 0,
                opacity: 1,
                color: "transparent",
                backgroundImage:
                  "linear-gradient(90deg,#ffe2e7,#ffb4c1,#ff7b8f)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                backgroundRepeat: "no-repeat",
                backgroundSize: "200% 100%",
                backgroundPosition: "0% 50%",
                fontFamily: "MyFont1",
                fontWeight: 1000,
                fontSize: "clamp(24px,3.8vw,52px)",
                lineHeight: 1.08,
                willChange: "transform, background-position",
                textAlign: isNarrow ? "center" : "left",
                whiteSpace: "pre-line",
              }}
            >
              {`We don’t follow trends.\nWe design for the next horizon.`}
            </div>
          </div>
        </div>

        {/* Right: Blueprint grid, scanners, crane, buildings */}
        <div
          style={{
            display: "grid",
            placeItems: isNarrow ? "center" : "end center",
            paddingBottom: isNarrow ? 0 : "6vh",
            paddingRight: isNarrow ? "0" : "2vw",
            overflow: "hidden",
            maxWidth: "100%",
          }}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox="0 0 997 822"
            style={{
              overflow: "visible",
              maxWidth: isNarrow ? "88vw" : "46vw",
              maxHeight: "100%",
            }}
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#1e2633"
                  strokeWidth="1"
                />
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#273041"
                  strokeWidth="0.5"
                  opacity="0.5"
                  transform="scale(0.5)"
                />
              </pattern>
              <linearGradient
                id="blueprintStroke"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#94b6ff" />
                <stop offset="100%" stopColor="#b391ff" />
              </linearGradient>
            </defs>

            {/* Scene group for subtle sway */}
            <g ref={sceneRef}>
              {/* Grid background */}
              <rect
                x="520"
                y="120"
                width="440"
                height="520"
                fill="url(#grid)"
                stroke="#1e2633"
                strokeWidth="2"
              />
              {/* Scanner sweeps */}
              <rect
                ref={hScanRef}
                x="520"
                y="120"
                width="60"
                height="520"
                fill="#3a4b66"
                opacity="0.22"
              />
              <rect
                ref={vScanRef}
                x="520"
                y="120"
                width="440"
                height="50"
                fill="#3a4b66"
                opacity="0.22"
              />

              {/* Baseline dimensions */}
              <path d="M 520 650 L 960 650" stroke="#2a3750" strokeWidth="2" />
              <path
                d="M 520 660 L 520 640 M 960 660 L 960 640"
                stroke="#2a3750"
                strokeWidth="2"
              />

              {/* Crane */}
              <g ref={craneRef} transform="translate(0,0)">
                <path
                  d="M 540 120 L 540 520"
                  stroke="#2f3f5e"
                  strokeWidth="4"
                />
                <path
                  d="M 540 140 L 700 140"
                  stroke="#2f3f5e"
                  strokeWidth="4"
                />
                <circle cx="700" cy="140" r="4" fill="#2f3f5e" />
                <rect
                  ref={craneHookRef}
                  x="698"
                  y="140"
                  width="4"
                  height="120"
                  fill="#2f3f5e"
                />
                <rect
                  ref={craneBlockRef}
                  x="690"
                  y="260"
                  width="20"
                  height="14"
                  fill="#3a4b66"
                />
              </g>

              {/* Buildings (fills + outlines + windows + beacons) */}
              {/* B1 */}
              <rect
                ref={fill1Ref}
                x="560"
                y="480"
                width="60"
                height="160"
                fill="#3a4b66"
                opacity="0.35"
              />
              <path
                ref={outline1Ref}
                d="M 560 640 L 560 500 L 590 480 L 620 500 L 620 640 Z"
                fill="none"
                stroke="url(#blueprintStroke)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g ref={winG1Ref} fill="#2f3f5e">
                {Array.from({ length: 3 }).map((_, r) => (
                  <g key={r}>
                    {Array.from({ length: 2 }).map((__, c) => (
                      <rect
                        key={c}
                        x={565 + c * 28}
                        y={520 + r * 34}
                        width={10}
                        height={10}
                      />
                    ))}
                  </g>
                ))}
              </g>
              <circle ref={beacon1Ref} cx="590" cy="480" r="4" fill="#94b6ff" />

              {/* B2 */}
              <rect
                ref={fill2Ref}
                x="640"
                y="440"
                width="70"
                height="200"
                fill="#3a4b66"
                opacity="0.35"
              />
              <path
                ref={outline2Ref}
                d="M 640 640 L 640 460 L 675 440 L 710 460 L 710 640 Z"
                fill="none"
                stroke="url(#blueprintStroke)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g ref={winG2Ref} fill="#2f3f5e">
                {Array.from({ length: 4 }).map((_, r) => (
                  <g key={r}>
                    {Array.from({ length: 3 }).map((__, c) => (
                      <rect
                        key={c}
                        x={646 + c * 22}
                        y={474 + r * 34}
                        width={9}
                        height={9}
                      />
                    ))}
                  </g>
                ))}
              </g>
              <circle ref={beacon2Ref} cx="675" cy="440" r="4" fill="#94b6ff" />

              {/* B3 */}
              <rect
                ref={fill3Ref}
                x="720"
                y="420"
                width="85"
                height="220"
                fill="#3a4b66"
                opacity="0.35"
              />
              <path
                ref={outline3Ref}
                d="M 720 640 L 720 440 L 762 420 L 805 440 L 805 640 Z"
                fill="none"
                stroke="url(#blueprintStroke)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g ref={winG3Ref} fill="#2f3f5e">
                {Array.from({ length: 5 }).map((_, r) => (
                  <g key={r}>
                    {Array.from({ length: 3 }).map((__, c) => (
                      <rect
                        key={c}
                        x={728 + c * 26}
                        y={448 + r * 34}
                        width={10}
                        height={10}
                      />
                    ))}
                  </g>
                ))}
              </g>
              <circle ref={beacon3Ref} cx="762" cy="420" r="4" fill="#94b6ff" />

              {/* B4 */}
              <rect
                ref={fill4Ref}
                x="815"
                y="460"
                width="60"
                height="180"
                fill="#3a4b66"
                opacity="0.35"
              />
              <path
                ref={outline4Ref}
                d="M 815 640 L 815 480 L 845 460 L 875 480 L 875 640 Z"
                fill="none"
                stroke="url(#blueprintStroke)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g ref={winG4Ref} fill="#2f3f5e">
                {Array.from({ length: 4 }).map((_, r) => (
                  <g key={r}>
                    {Array.from({ length: 2 }).map((__, c) => (
                      <rect
                        key={c}
                        x={820 + c * 28}
                        y={494 + r * 36}
                        width={10}
                        height={10}
                      />
                    ))}
                  </g>
                ))}
              </g>
              <circle ref={beacon4Ref} cx="845" cy="460" r="4" fill="#94b6ff" />

              {/* B5 */}
              <rect
                ref={fill5Ref}
                x="885"
                y="500"
                width="50"
                height="140"
                fill="#3a4b66"
                opacity="0.35"
              />
              <path
                ref={outline5Ref}
                d="M 885 640 L 885 520 L 905 500 L 935 520 L 935 640 Z"
                fill="none"
                stroke="url(#blueprintStroke)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g ref={winG5Ref} fill="#2f3f5e">
                {Array.from({ length: 3 }).map((_, r) => (
                  <g key={r}>
                    {Array.from({ length: 2 }).map((__, c) => (
                      <rect
                        key={c}
                        x={890 + c * 24}
                        y={536 + r * 30}
                        width={9}
                        height={9}
                      />
                    ))}
                  </g>
                ))}
              </g>
              <circle ref={beacon5Ref} cx="905" cy="520" r="4" fill="#94b6ff" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RedScrollCube;
