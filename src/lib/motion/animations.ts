import { easings, durations } from "./gsap-config";

type Direction = "up" | "down" | "left" | "right";

interface RevealConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  distance?: number;
}

/**
 * Element slides up with fade-in.
 */
export function revealUp(config: RevealConfig = {}): gsap.TweenVars {
  const {
    duration = durations.standard,
    delay = 0,
    ease = easings.industrial,
    distance = 60,
  } = config;

  return {
    y: distance,
    opacity: 0,
    duration,
    delay,
    ease,
  };
}

/**
 * Element slides in from the specified direction with fade-in.
 */
export function revealSlide(
  direction: Direction = "left",
  config: RevealConfig = {}
): gsap.TweenVars {
  const {
    duration = durations.standard,
    delay = 0,
    ease = easings.industrial,
    distance = 80,
  } = config;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const sign =
    direction === "left" || direction === "up" ? -distance : distance;

  return {
    [axis]: sign,
    opacity: 0,
    duration,
    delay,
    ease,
  };
}

/**
 * Staggered reveal for a group of children elements.
 */
export function staggerReveal(
  config: RevealConfig & { stagger?: number } = {}
): gsap.TweenVars {
  const {
    duration = durations.standard,
    delay = 0,
    ease = easings.industrial,
    distance = 40,
    stagger = 0.1,
  } = config;

  return {
    y: distance,
    opacity: 0,
    duration,
    delay,
    ease,
    stagger,
  };
}

/**
 * Parallax scrolling effect configuration.
 */
export function parallaxDepth(
  config: { speed?: number; ease?: string } = {}
): gsap.TweenVars {
  const { speed = 0.3, ease = "none" } = config;

  return {
    yPercent: speed * 100,
    ease,
  };
}

/**
 * Text reveal animation setup -- from config object to be applied to split text.
 */
export function textReveal(config: RevealConfig = {}): gsap.TweenVars {
  const {
    duration = durations.dramatic,
    delay = 0,
    ease = easings.cinematic,
    distance = 100,
  } = config;

  return {
    y: distance,
    opacity: 0,
    duration,
    delay,
    ease,
    stagger: 0.03,
  };
}
