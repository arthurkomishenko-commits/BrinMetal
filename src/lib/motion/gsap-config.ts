import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const easings = {
  industrial: "power3.out",
  heavy: "power4.inOut",
  precise: "power2.out",
  cinematic: "expo.out",
} as const;

export const durations = {
  micro: 0.2,
  standard: 0.6,
  dramatic: 1.2,
  cinematic: 1.8,
} as const;

export const defaultScrollTriggerConfig: ScrollTrigger.Vars = {
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none none",
};

export { gsap, ScrollTrigger };
