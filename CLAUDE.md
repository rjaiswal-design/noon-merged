# CLAUDE.md

Project-wide guidance for AI agents (Claude Code, etc.) working in this repo.

## Interaction design rules — required for every screen

This repo has **four non-negotiable interaction rules**. Every new screen, sheet, or flow you ship must follow them. Existing code that doesn't is being retrofitted.

1. **Forward-step screens slide in right-to-left.** New screen enters from the right edge; outgoing screen parallaxes to the left.
2. **Back-step screens slide in left-to-right.** Returning screen enters from the left; outgoing screen exits to the right.
3. **Every screen renders a loading skeleton on first paint.** No screen ever flashes empty.
4. **Bottom sheets slide up from the bottom AND hide the bottom navigation while open.**

Use the shared primitives. Do not reach for `framer-motion` directly to animate pages, sheets, or skeletons.

```tsx
import { PageTransition, SkeletonGate, Skel, BottomSheet, backState } from '@ui';
```

| Need | Use | Don't |
|------|-----|-------|
| Page transition | `<PageTransition>` (wraps the page; auto-detects forward/back from router) | hand-rolled `motion.div` with `y` or `opacity` |
| In-app back nav | `navigate(path, { state: backState() })` | letting the page slide forward when it should slide back |
| Loading state | `<SkeletonGate skeleton={<XxxSkeleton />} ready={!isLoading}>` | bare loaders, spinners, blank flashes |
| Skeleton block | `<Skel className="..." />` | bare `<div className="bg-gray-200">` |
| Bottom sheet | `<BottomSheet open onClose={...}>` (calls `useSheetOpen` internally) | hand-rolled slide-up; the BottomNav won't hide |

The full guide is at **`docs/INTERACTION_DESIGN.md`** — read it before adding any screen, sheet, or transition. The new-screen checklist is in §6.

## Repo structure cheat sheet

- `src/apps/<name>/` — separate app surfaces, each with its own routes, components, and assets.
- `src/packages/ui/` — shared component primitives. Exported via `@ui`.
- `src/packages/state/` — shared Zustand stores. Exported via `@state`. Includes `useSheetOpen` (used internally by `BottomSheet`).
- `src/packages/tokens/` — design tokens / CSS variables. Exported via `@tokens`.
- `src/shell/` — the outer `RootShell` that mounts `<Outlet />` and orchestrates cross-app chrome.

Path aliases (vite + tsconfig): `@`, `@ui`, `@state`, `@tokens`.

## Running locally

```sh
npm run dev          # Vite dev server
npm run build        # production build
npm run storybook    # component sandbox
```
