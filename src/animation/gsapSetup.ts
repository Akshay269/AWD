import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins once and set sensible defaults for the whole app
if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
	// Smooth out small hitches without masking bugs
	gsap.ticker.lagSmoothing(500, 33);
	ScrollTrigger.defaults({
		markers: false,
		invalidateOnRefresh: true,
		fastScrollEnd: true,
		preventOverlaps: true,
		anticipatePin: 1,
	});
	// Allow nested sections without bounce at edges
	ScrollTrigger.config({ ignoreMobileResize: true });
}

export {}; 

