// Spring/easing presets aligned with the Emil Kowalski / Field DS playbook.
// Centralized here so timing stays consistent across all motion in the app.

import type { Transition } from "motion/react"

// Drawer-style: subtle but perceptible overshoot, ~500ms feel, interruptible.
// Apple's API form. 0.25 sits in the upper end of Emil's 0.1–0.3 "subtle" band.
export const SHEET_SPRING: Transition = {
  type: "spring",
  duration: 0.5,
  bounce: 0.3,
}

// Tactile button/morph: snappier, slight overshoot for press releases.
export const TACTILE_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.9,
}

// Soft ambient motion (slot opens, sheet snaps without bounce).
export const SOFT_SPRING: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
}

// Cross-screen morph (stars → pill, product card → circular hero). Slow
// enough to read clearly (~1.2s), with a touch of bounce to feel tactile.
export const MORPH_SPRING: Transition = {
  type: "spring",
  duration: 1.2,
  bounce: 0.18,
}

// Reduced-motion fallback: brief opacity-friendly tween, no overshoot.
export const REDUCED_TWEEN: Transition = {
  duration: 0.18,
  ease: "easeOut",
}

// iOS-style drawer cubic-bezier — matches our Tailwind --ease-drawer token.
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1]
