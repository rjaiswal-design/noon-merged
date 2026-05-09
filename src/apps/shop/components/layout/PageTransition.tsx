// Re-export of the canonical shared PageTransition. Kept here so existing
// imports under `./components/layout/PageTransition` keep working.
// Per docs/INTERACTION_DESIGN.md §1, all page transitions in the app are
// horizontal iOS-style slides driven by `@ui/PageTransition`.
export { PageTransition } from '@ui';
export type { PageTransitionProps, PageDirection } from '@ui';
