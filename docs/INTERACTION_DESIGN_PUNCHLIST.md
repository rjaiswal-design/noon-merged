# Interaction Design — Rollout Punch List

Tracks the gap between current state and `docs/INTERACTION_DESIGN.md`. Tick items off as they land.

## ✅ Foundations (done)

- [x] Guide written: `docs/INTERACTION_DESIGN.md`
- [x] `CLAUDE.md` at repo root, so future agents inherit the rules
- [x] Shared primitives in `@ui`:
  - [x] `PageTransition` (directional iOS-style horizontal slide; auto-detects forward/back from router; honors `prefers-reduced-motion`)
  - [x] `backState()`, `forwardState()` helpers for in-app navigation that bypasses history
  - [x] `Skel`, `SkeletonGate` (promoted from `one-flows/components/Skeleton.tsx`)
  - [x] `BottomSheet` shell (bundles `useSheetOpen` so nav-hide is automatic)

## ✅ Rule 1 — Horizontal page slide

- [x] **supermall**: all 8 pages now slide horizontally (`PageTransition` re-export points at the shared component). Forward = right→left, back = left→right, auto-detected from `useNavigationType()`.
- [x] **one-flows**: already implements the same pattern natively (kept as-is).
- [ ] **share-address**: multi-step flow (`AddressBookList` → `AddNewAddress` → `LocationSearch` → etc.) is NOT wrapped in `PageTransition`. Wrap each step in `<PageTransition>` and pass an explicit `direction="forward"|"back"` prop based on the wizard's step direction.
- [ ] **wishlist**: standalone preview pages don't use `PageTransition`. Wrap if the surface ever has more than one screen at the same depth. (Embedded iframe contexts use the host's transition — no change needed.)

## 🐛 Rule 2 bugs — duplicate / non-contextual skeletons

These are violations of the "one skeleton, contextual" rule (`docs/INTERACTION_DESIGN.md` §2). Fix before authoring more skeletons.

### A. Duplicate skeletons in series (double-flash)

- [x] **Home → MallStore** — deleted the pre-nav `SupermallSkeleton` (and the 900ms artificial delay it gated). Tile tap now navigates immediately; the destination owns its own loading state. (`pages/Home/index.tsx`, `pages/Home/Home.css`)
- [x] **Account host skeleton** — was paired with concern about double-flash through the iframe boundary. Verified: `AccountsPage` (the iframe's first screen) does NOT mount a `SkeletonGate`, so there is no actual stacking on initial load. Issue was conflated with Problem B below; resolved by that fix.

### B. Non-contextual skeletons (don't match the real layout)

- [x] **`AccountPage` skeleton is generic** — replaced the profile + banner + tiles silhouette with a *neutral chrome-only* host skeleton (status bar + one full-bleed content rectangle), per §2 "Iframe boundaries". The host now makes no claim about the iframe's inner layout. (`pages/Account/index.tsx`, `pages/Account/Account.css`)
- [x] **`SupermallSkeleton` doesn't match Home** — deleted along with the pre-nav usage in (A). Home no longer paints any skeleton over itself; if a future need reintroduces one, it must match Home's morphing header and chip-row first-paint state per §2 "Skeleton authoring rules".

## ⚠️ Rule 2 — Loading skeletons (every screen)

Each row below needs a per-screen `XxxSkeleton.tsx` plus a `<SkeletonGate>` wrapping the real content.

| Screen                          | Has skeleton? | Needs |
|---------------------------------|---------------|-------|
| supermall / Home                | partial — `SupermallSkeleton` triggers on tile tap, no first-paint silhouette | first-paint skeleton |
| supermall / MallStore           | ❌            | new skeleton |
| supermall / PLP                 | ✅ (`PLPSkeleton`) | — |
| supermall / PDP                 | ❌            | new skeleton |
| supermall / Cart                | ❌            | new skeleton |
| supermall / Checkout            | ❌            | new skeleton |
| supermall / Account             | ✅ (`AccountSkeleton.css`) | — |
| supermall / Search              | ❌            | new skeleton |
| share-address / AddressBookList | ❌            | new skeleton |
| share-address / AddNewAddress   | ❌            | new skeleton |
| share-address / LocationSearch  | ❌            | new skeleton |
| wishlist / Wishlist             | ✅            | — |
| wishlist / Collection           | ✅            | — |
| one-flows / *                   | ✅ (per-screen via `SkeletonGate`) | — |

## ✅ Rule 4 — Bottom sheets hide the nav

| Sheet                                   | Slides up? | Hides BottomNav? |
|-----------------------------------------|------------|------------------|
| supermall / Cart / `CouponBottomSheet`  | ✅         | ✅ (uses `useSheetOpen`) |
| share-address / `AddressBottomSheet`    | ✅         | ✅ (uses `useSheetOpen`) |
| one-flows / `AccountSheets`             | ✅         | ✅ (now wired to `useSheetOpen`) |
| one-flows / `DeliveryPreferenceSheet`   | ✅         | ✅ (now wired to `useSheetOpen`) |
| one-flows / `ReviewAndConfirmSheet`     | ✅         | ⚠️ standalone only — see iframe note |
| one-flows / `AddNewCardSheet`           | ✅         | ⚠️ standalone only — see iframe note |
| wishlist / sheets (`Bulk`, `Move`, …)   | ✅         | n/a — wishlist nav is owned by host iframe |

### Iframe gotcha (one-flows under supermall Account tab)

`one-flows` is mounted inside an iframe at `/one-flows?embedded=1` from the supermall Account page. `useSheetOpen` only affects the iframe's own state, so it cannot hide the **host's** BottomNav. To complete rule 4 in this context, the iframe must `postMessage({ source: 'noon-one', showHostNav: false })` when a sheet opens and `showHostNav: true` when it closes — `RootLayout` already listens for this. (TODO if not wired everywhere.)

## Suggested rollout order

1. **Skeletons for the four most-visible blank flashes**: PDP, Cart, Search, Checkout. (Authoring needed; ~30–60min each.)
2. **share-address PageTransition wrap**: feed the wizard step-direction into the prop. (Mechanical.)
3. **one-flows iframe → host nav-hide postMessage**: tighten the bottom-sheet rule across the iframe boundary. (One useEffect inside `BottomSheet`/`SheetShell` when embedded.)
4. **Migrate stand-alone hand-rolled `SheetShell`s to `<BottomSheet>` from `@ui`**: deletes ~80 LOC of duplication, guarantees consistent spring timings.

Each cluster is an independently shippable PR.
