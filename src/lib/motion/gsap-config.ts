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

export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}
