import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;

export function initSmoothScroll() {
	if (typeof window === "undefined") return;
	if (lenisInstance) return lenisInstance;

	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis({
		smoothWheel: true,
		wheelMultiplier: 1.0,
		lerp: 0.1,
		duration: 1.1,
	});

	function raf(time: number) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	lenis.on("scroll", () => {
		ScrollTrigger.update();
	});

	// Refresh ScrollTrigger so positions are recalculated with Lenis running
	ScrollTrigger.refresh();

	lenisInstance = lenis;
	return lenis;
}

export function getLenis() {
	return lenisInstance;
}


