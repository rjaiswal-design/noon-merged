import { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"
import StarIcon from "../icons/StarIcon"
import { SHIPMENTS } from "../data/orders"
import { ratingColor, type Rating } from "../utils/ratingColors"
import { useReviewStore } from "../store/reviewStore"

// Emil Kowalski's iOS-drawer easing — soft weighted, no spring overshoot.
const EMIL_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]
const DEFAULT_DURATION_MS = 800
// Pixel offset added to the linear midpoint Y to bow the path. Positive
// dips DOWN (concave-up valley) — the image sinks below the straight line
// before rising into the hero circle.
const DEFAULT_ARC_DIP = 90

// Target geometry — measured against the device frame's local coordinate
// space (375×812). Values are taken from runtime measurement of the
// rendered ProductRatingHero so the morph stars/image land EXACTLY on
// top of the static pill stars/image (no sub-pixel jerk on handoff).
const HERO_SIZE = 84
const HERO_TOP = 62
const HERO_LEFT = (375 - HERO_SIZE) / 2 // 145.5
// Static pill star is the 14×14 StarIcon inside the rendered RatingPill.
// All five stars share the same wrapper position (`-mr-[16px]` overlap),
// so the morph layer also lands them stacked at this exact x/y.
const PILL_STAR_SIZE = 14
const PILL_STAR_X = 173.93
const PILL_STAR_Y = 142

interface Props {
  // The DeviceFrame's bounding rect, used to translate viewport-captured
  // source rects into the device's local coordinate space.
  deviceRect: DOMRect
  // Pixel offset added to the linear midpoint Y to bow the path; positive
  // dips down (concave-up valley). Default 90.
  arcDip?: number
  // Total flight duration in ms. Default 800.
  durationMs?: number
}

// Renders flying copies of the active shipment's product image and 5 stars
// along a parabolic arc that dips DOWN through the midpoint before settling
// into the review screen's hero/pill positions. A single timing-driven
// progress value (Emil's iOS-drawer ease) feeds useTransform-derived x/y/
// size, giving a deterministic 800ms flight with a soft weighted feel and
// no spring oscillation.
export default function MorphLayer({
  deviceRect,
  arcDip = DEFAULT_ARC_DIP,
  durationMs = DEFAULT_DURATION_MS,
}: Props) {
  const phase = useReviewStore((s) => s.morphPhase)
  const sources = useReviewStore((s) => s.morphSources)
  const completeMorph = useReviewStore((s) => s.completeMorph)
  const activeShipmentId = useReviewStore((s) => s.activeShipmentId)
  const ratings = useReviewStore((s) => s.ratings)

  if (phase !== "flying" || !sources || !activeShipmentId) return null

  const shipment = SHIPMENTS.find((s) => s.id === activeShipmentId)
  if (!shipment) return null

  const rating = (ratings[activeShipmentId] ?? 0) as 0 | Rating
  const starColor = rating > 0 ? ratingColor(rating as Rating) : "#D0D4DD"

  const productSrc = sources.productImage
  const productSrcLocal = {
    x: productSrc.x - deviceRect.x,
    y: productSrc.y - deviceRect.y,
    width: productSrc.width,
    height: productSrc.height,
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      <FlyingProduct
        src={productSrcLocal}
        image={shipment.productImage}
        arcDip={arcDip}
        durationMs={durationMs}
        onComplete={completeMorph}
      />
      {sources.stars.map((srcRect, i) => (
        <FlyingStar
          key={i}
          src={{
            x: srcRect.x - deviceRect.x,
            y: srcRect.y - deviceRect.y,
          }}
          color={starColor}
          stackIndex={i}
          arcDip={arcDip}
          durationMs={durationMs}
        />
      ))}
    </div>
  )
}

// Parabolic blending: passes through srcY at t=0, peakY at t=0.5
// (= midY + arcDip), and dstY at t=1, with a smooth quadratic curve.
function arcY(t: number, srcY: number, dstY: number, arcDip: number) {
  const linear = srcY + (dstY - srcY) * t
  return linear + 4 * t * (1 - t) * arcDip
}

interface FlyingProductProps {
  src: { x: number; y: number; width: number; height: number }
  image: string
  arcDip: number
  durationMs: number
  onComplete: () => void
}

function FlyingProduct({
  src,
  image,
  arcDip,
  durationMs,
  onComplete,
}: FlyingProductProps) {
  const progress = useMotionValue(0)

  const x = useTransform(progress, [0, 1], [src.x, HERO_LEFT])
  const y = useTransform(progress, (t) => arcY(t, src.y, HERO_TOP, arcDip))
  const width = useTransform(progress, [0, 1], [src.width, HERO_SIZE])
  const height = useTransform(progress, [0, 1], [src.height, HERO_SIZE])
  const borderRadius = useTransform(progress, [0, 1], [8, 62.16])

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: durationMs / 1000,
      ease: EMIL_EASE,
      onComplete,
    })
    return () => controls.stop()
    // Animation parameters are fixed for the lifetime of one morph; this
    // component is mounted/unmounted by phase changes in the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      style={{ x, y, width, height, borderRadius }}
      className="absolute top-0 left-0 overflow-hidden border-[0.742px] border-border-subtle bg-surface-primary"
    >
      <img
        src={image}
        alt=""
        className="block size-full object-cover"
        draggable={false}
      />
    </motion.div>
  )
}

interface FlyingStarProps {
  src: { x: number; y: number }
  color: string
  stackIndex: number
  arcDip: number
  durationMs: number
}

function FlyingStar({
  src,
  color,
  stackIndex,
  arcDip,
  durationMs,
}: FlyingStarProps) {
  const progress = useMotionValue(0)

  const x = useTransform(progress, [0, 1], [src.x, PILL_STAR_X])
  const y = useTransform(progress, (t) => arcY(t, src.y, PILL_STAR_Y, arcDip))
  const scale = useTransform(progress, [0, 1], [20 / PILL_STAR_SIZE, 1])

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: durationMs / 1000,
      ease: EMIL_EASE,
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      style={{ x, y, scale, zIndex: 5 - stackIndex }}
      className="absolute top-0 left-0"
    >
      <StarIcon
        size={PILL_STAR_SIZE}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </motion.div>
  )
}
