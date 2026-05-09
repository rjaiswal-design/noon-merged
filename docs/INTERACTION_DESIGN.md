# Interaction Design Guide

This is the source of truth for how screens, sheets, and loading states behave across every Noon storefront app in this repo (`supermall`, `share-address`, `one-flows`, `wishlist`, and any future surface). New code MUST follow it. Existing code is being retrofitted to it — see `docs/INTERACTION_DESIGN_PUNCHLIST.md` for the rollout status.

The four rules are non-negotiable:

1. **Forward-step screens slide in right-to-left.** A new screen entering the stack comes in from the right edge.
2. **Back-step screens slide in left-to-right.** A returning screen comes in from the left edge.
3. **Every screen has a loading skeleton.** No screen ever flashes empty; the silhouette is visible from first paint.
4. **Bottom sheets slide up from the bottom — and the bottom navigation hides while a sheet is open.**

---

## 1. Page transitions

### The shape

We use an iOS-style horizontal page slide. The incoming page travels 100% of viewport width; the outgoing page parallaxes 25% in the same direction so the new page reads as sitting on top of the stack.

| Action          | Incoming page | Outgoing page | Feels like                |
|-----------------|---------------|---------------|---------------------------|
| Forward step    | enters from right (x: 100% → 0)  | drifts left (x: 0 → -25%) | tapping into a new screen |
| Back step       | enters from left  (x: -25% → 0)  | drifts right (x: 0 → 100%) | popping the stack         |

Curve: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo). Duration: **360ms**.

Vertical (`y`) and crossfade (`opacity`) page transitions are deprecated. Replace any you find.

### How to implement

Use the shared component. Do not roll your own:

```tsx
import { PageTransition } from '@ui';

<AnimatePresence mode="sync" initial={false}>
  <PageTransition key={location.pathname}>
    <YourScreen />
  </PageTransition>
</AnimatePresence>
```

`PageTransition` auto-detects direction from React Router's navigation type:

| `useNavigationType()` | Direction |
|-----------------------|-----------|
| `PUSH`                | forward   |
| `REPLACE`             | forward   |
| `POP` (browser/system back) | back   |

### When auto-detection isn't enough

Some in-app back buttons call `navigate('/cart')` instead of `navigate(-1)`. Auto-detection will pick `forward`, which is wrong. Use `backState()` to override:

```tsx
import { backState } from '@ui';

navigate('/supermall/cart', { state: backState() });
```

For non-router navigation (state-driven screens like the one-flows wizard), pass an explicit prop:

```tsx
<PageTransition direction={dir}>...</PageTransition>
```

### Wiring inside an app

The page-transition wrapper belongs in the layout that owns `<Outlet />`. Wrap the outlet in `<AnimatePresence mode="sync" initial={false}>` and key it on `location.pathname` (already done in `src/apps/supermall/components/layout/RootLayout.tsx`). Each route's element wraps its content in `<PageTransition>`.

The container that holds the animating page **must** be `position: relative; overflow: hidden;` because `PageTransition` renders absolutely-positioned children.

### Reduced motion

Respect `prefers-reduced-motion`. When set, `PageTransition` falls back to an instantaneous swap (no slide, no fade). This is handled inside the component — callers don't need to do anything.

---

## 2. Loading skeletons

### The rule

**Every screen renders a loading skeleton on first paint.** No exceptions: PDP, Cart, Checkout, Search, account, settings — all of them. A user must never see a blank rectangle followed by a sudden hydration.

A skeleton is the silhouette of the eventual layout: blocks where the cards go, lines where the headlines go. It uses the shimmer animation (already configured in Tailwind as `animate-shimmer`).

### How to implement

Use the shared `SkeletonGate` and `Skel` primitives:

```tsx
import { Skel, SkeletonGate } from '@ui';

function MyScreenSkeleton() {
  return (
    <div className="px-4 pt-12 flex flex-col gap-3">
      <Skel className="h-7 w-48 rounded-md" />
      <Skel className="h-44 w-full rounded-2xl" />
      <Skel className="h-44 w-full rounded-2xl" />
    </div>
  );
}

export default function MyScreen() {
  const { data, isLoading } = useQuery(...);

  return (
    <SkeletonGate
      skeleton={<MyScreenSkeleton />}
      ready={!isLoading}
    >
      <RealContent data={data} />
    </SkeletonGate>
  );
}
```

Behaviour:

- **Hold time:** 380ms minimum (the silhouette is always visible long enough to register as intentional, even if data is already cached).
- **Fade:** 220ms crossfade between skeleton and real content.
- **Ready signal:** when `ready` is supplied, the gate waits for **both** the hold AND `ready === true` before mounting children.
- **Fake-load default:** if no `ready` prop is passed, the gate fires after the hold timer alone — fine for static screens.

### Skeleton authoring rules

- **Contextual, not generic.** A skeleton is a silhouette of *this specific screen* — its sticky header, its hero, its grid columns, its sticky CTA, the morphing chrome. Never a row of generic rounded rectangles applied to whatever happens to mount. If a screen has a sticky bottom CTA, the skeleton has one. If the header morphs on scroll, the skeleton matches its first-paint state.
- **Block sizes match the real components.** Heights, corner radii, paddings, gaps — all of them. A wrong-shaped block causes a visible layout jolt the moment the skeleton fades out.
- **One skeleton per screen, co-located with it.** `Cart/CartSkeleton.tsx` next to `Cart/index.tsx`. Reusing one screen's skeleton on another screen is a bug; both sides will mismatch.
- Use `Skel` for every block — never a bare `<div className="bg-gray-200">`.
- Keep skeletons cheap: no images, no Lottie, no real components. Plain divs only.

### One skeleton per screen load — the no-stacking rule

A user navigating from screen A → screen B must see **exactly one** skeleton fade in and one skeleton fade out. Never two skeletons in series.

Common ways this rule gets broken:

- **Pre-nav skeleton + post-nav skeleton.** Screen A shows a "loading the next thing" overlay for ~1s, then navigates to Screen B which fires its own skeleton for another ~1.5s. Result: two consecutive skeletons of different shapes. → Fix: pick one. Either delay navigation while showing B's skeleton in place (rare), OR navigate immediately and let only B's skeleton run. Don't show a pre-emptive skeleton on A.
- **Parent gate + child gate.** `<SkeletonGate><MyPage /></SkeletonGate>` where `MyPage` internally renders its own `SkeletonGate` or `isLoading && <FooSkeleton />`. → Fix: lift the child's `isLoading` up to the parent gate via the `ready` prop. One gate, multiple inputs:
  ```tsx
  <SkeletonGate
    skeleton={<MyPageSkeleton />}
    ready={!parentLoading && !childLoading}
  >
    <MyPage />
  </SkeletonGate>
  ```
- **Suspense fallback + manual skeleton.** A `<Suspense fallback={<XxxSkeleton />}>` whose child also renders a skeleton during data fetch. → Fix: use Suspense for code-split boundaries OR for data-loading, not both. Pick one pattern per screen.
- **Iframe-bridge skeleton + inner-screen skeleton.** A host paints a skeleton while an iframe loads; the iframe's first screen paints its own skeleton on mount. → Fix: the host's skeleton must match the iframe's *initial* screen exactly, and the iframe's first screen must skip its own gate (it just got mounted into a fade-in container that already held a skeleton).

If you find yourself looking at two skeletons in a row, one of them is wrong. Delete it.

### Where to place the gate

Inside the screen component, **inside** the `PageTransition` wrapper. The gate handles the swap from silhouette to content; the page transition handles the swap from one screen to another. They are independent — and exactly one of each runs per navigation.

### Iframe boundaries

When an app embeds another via iframe (e.g. supermall/Account embeds one-flows), the host renders a skeleton matching the iframe's *first* screen, then crossfades to the iframe content once it posts a `ready` message. The iframe must NOT run its own first-screen `SkeletonGate` — the host already covered that frame. From the second screen onward inside the iframe, gates run normally.

If the host doesn't know which inner screen will mount first (e.g. deep-links), it should render a *neutral chrome-only* silhouette (status bar + back chevron + title block + a single content rectangle the size of the viewport), never a guess at the inner layout. A neutral host skeleton is honest; a guessed-wrong one jolts.

### One-flows: existing implementation

`src/apps/one-flows/components/Skeleton.tsx` already has a full set of per-screen skeletons (Home, Manage, ChangePlan, Cancel, etc.). They are now imported via `@ui` and the local `SkeletonGate` re-exports it.

---

## 3. Bottom sheets

### The rule

A bottom sheet:

- Slides up from the bottom edge (Y: 100% → 0).
- Renders a scrim above the content beneath.
- **Hides the bottom navigation while it is open.** Tapping the scrim or dismissing the sheet restores the nav.
- Snap-springs into place. Curve: `spring(damping: 32, stiffness: 320, mass: 0.85)`.

A bottom sheet is **not**: a modal that fades in, a centered card, or a side drawer. Use the right pattern for each.

### How to implement

Use the shared `BottomSheet` shell. It bundles slide-up, scrim, drag handle, and — crucially — `useSheetOpen` so the BottomNav hides automatically:

```tsx
import { BottomSheet } from '@ui';

<BottomSheet
  open={isOpen}
  onClose={() => setIsOpen(false)}
  ariaLabel="Apply coupon"
>
  <YourSheetContent />
</BottomSheet>
```

Variants:

| Prop          | Default | Purpose                                                 |
|---------------|---------|---------------------------------------------------------|
| `floating`    | `false` | When `true`, sheet has all four corners rounded and sits with side margins. Otherwise it sits flush at the bottom edge. |
| `showHandle`  | `true`  | Drag-notch handle at the top.                           |
| `dismissOnScrimTap` | `true` | Tap-outside dismisses.                              |

### Why the BottomNav hides

A bottom sheet covers the nav. If we left the nav painted, taps on the nav would either pass through (frustrating) or compete with sheet controls (broken). The shell calls `useSheetOpen(true)` for its lifetime; `RootLayout` reads `sheetCount > 0` and unmounts the nav. Multiple open sheets nest cleanly because `sheetCount` is a counter, not a boolean.

### What you MUST NOT do

- **Do not animate `y: '100%' → 0` by hand.** Use `BottomSheet`. Hand-rolled sheets miss the nav-hide and grow stale.
- **Do not render `BottomNav` inside or above the sheet.** It belongs to the layout, not the screen.
- **Do not use a bottom sheet for transient feedback.** That's a toast.
- **Do not use a bottom sheet for navigation between equal peer screens.** That's a tab or a page slide.

---

## 4. Composition: how the four rules fit together

A screen's lifecycle, top to bottom:

```
RootLayout
  └─ <main> with AnimatePresence mode="wait" key={pathname}
       └─ <PageTransition>                     ← rule 1: horizontal slide
            └─ <SkeletonGate skeleton={...}>   ← rule 2: silhouette → content
                 └─ <YourScreen>
                      └─ ...
                      └─ <BottomSheet open={...}>  ← rule 3+4: slide up + nav hides
                           └─ ...
```

The transition wrapper is owned by the layout. The skeleton gate is owned by the screen. The bottom sheet is owned by whichever component opens it. Nothing else needs to know about navigation direction or nav visibility.

---

## 5. Touch & gesture detail

| Element              | Tap target | Notes                                            |
|----------------------|------------|--------------------------------------------------|
| Page back button     | 44×44 min  | Always top-left. Calls `navigate(-1)` or passes `backState()`. |
| Bottom sheet handle  | 40px wide  | Tap-and-drag dismisses (downward velocity > 200px/s). |
| Bottom sheet scrim   | full       | Tap dismisses unless `dismissOnScrimTap={false}`. |
| BottomNav tabs       | 56×56 min  | Hidden whenever a sheet is open or the route opts out. |

---

## 6. Checklist for any new screen

Before you ship a screen, every box must be ticked:

- [ ] Wrapped in `<PageTransition>` inside an `AnimatePresence mode="sync" initial={false}` parent
- [ ] Renders a per-screen `<XxxSkeleton>` whose silhouette matches **this** screen — its sticky header, hero, grid, and sticky CTA, at the right block sizes
- [ ] Mounts the skeleton via `<SkeletonGate skeleton={...} ready={!isLoading}>` — exactly **one** gate per screen
- [ ] No nested skeletons: child components inside the gate do NOT render their own loading skeleton; their loading state is lifted into the parent gate's `ready` prop
- [ ] No pre-nav skeleton on the previous screen (don't paint "I'm loading the next page" overlays — let the next screen's skeleton do its job)
- [ ] If it has back/forward navigation that doesn't use the router history, calls `navigate(...)` with `state: backState()` or passes an explicit `direction` prop
- [ ] Any bottom sheet uses `<BottomSheet>` from `@ui` — never a hand-rolled slide-up
- [ ] No `<BottomNav>` rendered inside the screen — the layout owns it
- [ ] Honours `prefers-reduced-motion` (handled by `PageTransition`; sheets degrade automatically)

---

## 7. Where the primitives live

| Pattern         | Import                          | File                                                    |
|-----------------|---------------------------------|---------------------------------------------------------|
| Page transition | `import { PageTransition } from '@ui'` | `src/packages/ui/PageTransition/PageTransition.tsx` |
| Back-state nav  | `import { backState } from '@ui'`      | same file                                               |
| Skeleton block  | `import { Skel } from '@ui'`           | `src/packages/ui/Skeleton/Skeleton.tsx`                 |
| Skeleton gate   | `import { SkeletonGate } from '@ui'`   | same file                                               |
| Bottom sheet    | `import { BottomSheet } from '@ui'`    | `src/packages/ui/BottomSheet/BottomSheet.tsx`           |
| Sheet → nav-hide | `import { useSheetOpen } from '@state/uiStore'` | bundled inside `BottomSheet` already         |

If you ever find yourself reaching for `framer-motion` directly to animate a page, a sheet, or a skeleton, **stop** — there's a shared primitive that already does it correctly.

---

## 8. Adding a new app or surface

A new app under `src/apps/<name>` adopts the rules by:

1. Mounting its routes inside an `AnimatePresence` + `PageTransition` (copy the pattern from `src/apps/supermall/components/layout/RootLayout.tsx`).
2. Authoring a skeleton per route and gating with `SkeletonGate`.
3. Composing all sheets via `<BottomSheet>` from `@ui`.
4. Allowing the host's BottomNav to hide on its routes if it presents a full-bleed flow (see `RootShell` for the pathname allowlist).

That's all. If your new screen feels different from the rest of the app, you've broken one of the four rules; go back to the checklist.
