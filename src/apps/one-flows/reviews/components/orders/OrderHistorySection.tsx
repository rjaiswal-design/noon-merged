import { useRef } from "react"
import {
  motion,
  useDragControls,
  useReducedMotion,
  useTransform,
  animate,
  type MotionValue,
  type PanInfo,
} from "framer-motion"
import CaretDownIcon from "../../icons/CaretDownIcon"
import FilterIcon from "../../icons/FilterIcon"
import ShipmentCard from "./ShipmentCard"
import { SHIPMENTS } from "../../data/orders"
import { REDUCED_TWEEN, SHEET_SPRING } from "../../motion/springs"
import { useReviewStore } from "../../store/reviewStore"
import { RATING_SHIMMER_DURATION_MS } from "./RatingInputStars"
import type { Rating } from "../../utils/ratingColors"

// ── Sheet geometry ───────────────────────────────────────────────────────
// Device frame is 375×812. Collapsed top sits below the active block;
// expanded top reaches the device top, with the header (z-30) overlaying
// the sheet (z-20) — sheet's white shows through the header's transparent
// regions when expanded.
const HEADER_HEIGHT = 100
const ACTIVE_BLOCK_HEIGHT = 150
const SHEET_TOP_COLLAPSED = HEADER_HEIGHT + ACTIVE_BLOCK_HEIGHT // 250 (8px higher than before)
export const SHEET_DELTA = SHEET_TOP_COLLAPSED // 250 — full drag throw
const SHEET_HEIGHT = 812 // expanded covers the whole device frame

// Visible handle bar + title block. They sit absolutely at the top of the
// sheet so they translate with the sheet rather than collapsing in place.
const HANDLE_HEIGHT = 28
const TITLE_HEIGHT = 24
const HANDLE_TITLE_BLOCK = HANDLE_HEIGHT + TITLE_HEIGHT // 52 — handle and title flush, no gap
const TITLE_TO_FILTERS_GAP = 12

// Sheet's top padding (above the filters):
//   collapsed: handle+title (52) + 12px gap to filters = 64
//   expanded:  100 — filters land flush below the header
const SHEET_PT_COLLAPSED = HANDLE_TITLE_BLOCK + TITLE_TO_FILTERS_GAP // 64
const SHEET_PT_EXPANDED = HEADER_HEIGHT // 100

const FLICK_VELOCITY = 250

// Pointer-move threshold (px) before we lock in a direction for the
// list→sheet drag handoff.
const DIRECTION_LOCK_PX = 6

interface Props {
  // Lifted-state motion value driven by drag/animations here. Owning
  // OrdersScreen reads it (via a derived `progress`) to drive the active
  // section's drop+breathe animation.
  sheetY: MotionValue<number>
}

export default function OrderHistorySection({ sheetY }: Props) {
  const reduced = useReducedMotion()
  const dragControls = useDragControls()
  const stateRef = useRef<"collapsed" | "expanded">("collapsed")
  const listRef = useRef<HTMLDivElement>(null)

  // 0 = collapsed, 1 = expanded — single source of truth for derived values.
  const progress = useTransform(sheetY, [0, -SHEET_DELTA], [0, 1])
  const sheetPaddingTop = useTransform(progress, [0, 1], [SHEET_PT_COLLAPSED, SHEET_PT_EXPANDED])
  const sheetBorderRadius = useTransform(progress, [0, 1], [16, 0])
  const handleTitleOpacity = useTransform(progress, [0, 0.6], [1, 0])

  function snapTo(state: "collapsed" | "expanded") {
    stateRef.current = state
    const target = state === "expanded" ? -SHEET_DELTA : 0
    animate(sheetY, target, reduced ? REDUCED_TWEEN : SHEET_SPRING)
  }

  function handleDragEnd(_e: unknown, info: PanInfo) {
    const flickUp = info.velocity.y < -FLICK_VELOCITY
    const flickDown = info.velocity.y > FLICK_VELOCITY
    if (flickUp) snapTo("expanded")
    else if (flickDown) snapTo("collapsed")
    else if (sheetY.get() < -SHEET_DELTA / 2) snapTo("expanded")
    else snapTo("collapsed")
  }

  // Plain "always start sheet drag" handler — used on the top overlay and
  // on the filters row. Drag only commits on movement, so taps on filter
  // chips still register as clicks.
  function startDrag(e: React.PointerEvent) {
    dragControls.start(e)
  }

  // Smart handoff for the shipment list: only hijack into a sheet drag if
  // the list is scrolled to the top AND the first significant pointer move
  // is downward. Upward intent (i.e. scrolling further into the list)
  // defers to the native scroll.
  function startDragIfListAtTop(e: React.PointerEvent) {
    const list = listRef.current
    if (!list || list.scrollTop > 0) return

    const startY = e.clientY
    let resolved = false

    const onMove = (ev: PointerEvent) => {
      if (resolved) return
      const dy = ev.clientY - startY
      if (Math.abs(dy) < DIRECTION_LOCK_PX) return
      resolved = true
      if (dy > 0) dragControls.start(ev)
      cleanup()
    }
    const onUp = () => cleanup()
    const cleanup = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
  }

  return (
    <motion.section
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: -SHEET_DELTA, bottom: 0 }}
      dragElastic={{ top: 0.05, bottom: 0.15 }}
      onDragEnd={handleDragEnd}
      style={{
        y: sheetY,
        paddingTop: sheetPaddingTop,
        borderTopLeftRadius: sheetBorderRadius,
        borderTopRightRadius: sheetBorderRadius,
        position: "absolute",
        left: 0,
        right: 0,
        top: SHEET_TOP_COLLAPSED,
        height: SHEET_HEIGHT,
        zIndex: 20,
        willChange: "transform",
      }}
      className="flex flex-col gap-4 overflow-hidden bg-surface-primary shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
    >
      {/* Top drag-initiator overlay — covers the sheet's top-padding region.
          Visible handle+title sit beneath it in collapsed state; the bottom
          ~35px of the overlay is the user-visible drag zone in expanded. */}
      <motion.div
        onPointerDown={startDrag}
        style={{ height: sheetPaddingTop, touchAction: "none" }}
        className="absolute inset-x-0 top-0 z-10 cursor-grab"
      />

      {/* Visual handle + title — absolutely positioned, translates with the
          sheet and fades via opacity. No gap between them, per the spec. */}
      <motion.div
        style={{ opacity: handleTitleOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 flex flex-col"
      >
        <SheetDragHandle />
        <h2 className="px-3 text-[18px] font-bold leading-[24px] tracking-[-0.2px] text-text-primary">
          Order history
        </h2>
      </motion.div>

      {/* Filters — start sheet drag on press (downward intent collapses,
          upward is clamped by drag constraints). Chip taps still register. */}
      <div onPointerDown={startDrag}>
        <FiltersRow />
      </div>

      {/* Scrollable shipment list — drag-aware handoff: pulling down from
          scrollTop=0 collapses the sheet, pulling up scrolls the list. */}
      <div
        ref={listRef}
        onPointerDown={startDragIfListAtTop}
        className="flex flex-1 flex-col gap-4 overflow-y-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <ShipmentList />
      </div>
    </motion.section>
  )
}

// Reads ratings from store + handles tap-to-review handoff. Each card owns
// its own rating; rating tap kicks off the shimmer, and once the worst-case
// shimmer settles we navigate to the review screen so the morph picks up
// from the final rendered state.
function ShipmentList() {
  const ratings = useReviewStore((s) => s.ratings)
  const setRating = useReviewStore((s) => s.setRating)
  const markActive = useReviewStore((s) => s.markActive)
  const startMorph = useReviewStore((s) => s.startMorph)
  const morphPhase = useReviewStore((s) => s.morphPhase)
  const activeShipmentId = useReviewStore((s) => s.activeShipmentId)

  // Refs per shipment so we can capture rects right before the morph fires.
  const productRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const starsRefs = useRef<Record<string, HTMLDivElement | null>>({})

  function handleRate(shipmentId: string, r: Rating) {
    setRating(shipmentId, r)
    markActive(shipmentId)
    // After the shimmer settles, snapshot source rects and kick off the
    // morph. The flying overlay (MorphLayer) animates from these rects to
    // the review screen's hero/pill targets, then flips the screen.
    window.setTimeout(() => {
      const productEl = productRefs.current[shipmentId]
      const starsEl = starsRefs.current[shipmentId]
      if (!productEl || !starsEl) return
      const productRect = productEl.getBoundingClientRect()
      const starButtons = starsEl.querySelectorAll('button[aria-label^="Rate"]')
      const starRects = Array.from(starButtons).map((b) => b.getBoundingClientRect())
      startMorph({ productImage: productRect, stars: starRects })
    }, RATING_SHIMMER_DURATION_MS)
  }

  return (
    <>
      {SHIPMENTS.map((s) => (
        <ShipmentCard
          key={s.id}
          shipment={s}
          rating={ratings[s.id] ?? 0}
          onRate={(r) => handleRate(s.id, r)}
          isFlying={morphPhase === "flying" && s.id === activeShipmentId}
          productImageRef={(el) => {
            productRefs.current[s.id] = el
          }}
          starsContainerRef={(el) => {
            starsRefs.current[s.id] = el
          }}
        />
      ))}
    </>
  )
}

// Frame 2147225824 — 32×4 grey pill centered, 12px above and below.
function SheetDragHandle() {
  return (
    <div className="grid h-7 w-full place-items-center pt-3 pb-3">
      <div className="h-1 w-8 rounded-full bg-[#E1E3EB]" />
    </div>
  )
}

function FiltersRow() {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <FilterChip leadingIcon={<FilterIcon size={14} />} trailingIcon={<CaretDownIcon size={14} />}>
        Filter
      </FilterChip>
      <FilterChip>Delivered</FilterChip>
      <FilterChip>Cancelled</FilterChip>
      <FilterChip>Returns</FilterChip>
      <MarketplaceFilterChip src="/reviews-flow/marketplace-tags/express-filter.png" alt="express" />
      <MarketplaceFilterChip src="/reviews-flow/marketplace-tags/supermall-filter.png" alt="supermall" />
    </div>
  )
}

interface ChipProps {
  children: React.ReactNode
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
}

function FilterChip({ children, leadingIcon, trailingIcon }: ChipProps) {
  return (
    <button
      type="button"
      className="flex h-8 shrink-0 items-center gap-1 rounded-lg border border-border-subtle bg-surface-primary p-2 text-text-primary"
    >
      {leadingIcon}
      <span className="shrink-0 self-start text-[12px] font-semibold leading-[16px]">
        {children}
      </span>
      {trailingIcon}
    </button>
  )
}

function MarketplaceFilterChip({ src, alt }: { src: string; alt: string }) {
  return (
    <button
      type="button"
      aria-label={`Filter by ${alt}`}
      className="flex h-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-primary p-2"
    >
      <img src={src} alt="" className="block h-3.5 w-auto" />
    </button>
  )
}
