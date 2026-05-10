import { useEffect, useRef, useState } from "react"
import { motion, type Transition } from "framer-motion"
import StarIcon from "../../icons/StarIcon"
import { ratingColor, ratingLoadingFill, type Rating } from "../../utils/ratingColors"

interface Props {
  // Currently committed rating (0 = no selection yet).
  rating: 0 | Rating
  // Called whenever a star is tapped — parent owns rating state.
  onTap?: (r: Rating) => void
  size?: number
}

// Per-star animation budget (must keep total ≤ 290ms worst case).
const STAGGER_MS = 35
const POP_MS = 80
const SETTLE_MS = 70
const SHIMMER_TOTAL_MS = STAGGER_MS * 4 + POP_MS + SETTLE_MS // 290ms

// back.out easing for the pop — overshoots slightly before settling.
const POP_EASE: [number, number, number, number] = [0.34, 1.56, 0.64, 1]
const SETTLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Five-star row with cascade-fill shimmer. Each star pops to 1.20 with
// back.out easing for 80ms, then settles to 1.0 over 70ms. Stagger of 35ms
// means worst-case (5★) finishes in 290ms. Filled stars render in loading
// grey for the full shimmer window, then settle to the sentiment color.
// Re-tap cancels the running shimmer and restarts at the new rating.
export default function RatingInputStars({ rating, onTap, size = 20 }: Props) {
  // Animation token — bumping this value cancels any in-flight per-star
  // delay timer and restarts the shimmer (no overlapping animations).
  const [shimmerToken, setShimmerToken] = useState(0)
  const lastRatingRef = useRef<0 | Rating>(rating)

  useEffect(() => {
    if (rating !== lastRatingRef.current && rating > 0) {
      setShimmerToken((n) => n + 1)
    }
    lastRatingRef.current = rating
  }, [rating])

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <RatingStar
          key={i}
          index={i as Rating}
          rating={rating}
          shimmerToken={shimmerToken}
          size={size}
          onTap={onTap}
        />
      ))}
    </div>
  )
}

interface StarProps {
  index: Rating
  rating: 0 | Rating
  shimmerToken: number
  size: number
  onTap?: (r: Rating) => void
}

function RatingStar({ index, rating, shimmerToken, size, onTap }: StarProps) {
  const active = index <= rating
  const [phase, setPhase] = useState<"idle" | "pop" | "settle" | "done">("idle")

  useEffect(() => {
    if (!active || shimmerToken === 0) {
      setPhase("done")
      return
    }
    setPhase("idle")
    // Stagger the pop start by index — left-to-right cascade.
    const delay = (index - 1) * STAGGER_MS
    const popTimer = window.setTimeout(() => setPhase("pop"), delay)
    const settleTimer = window.setTimeout(() => setPhase("settle"), delay + POP_MS)
    const doneTimer = window.setTimeout(() => setPhase("done"), delay + POP_MS + SETTLE_MS)
    return () => {
      window.clearTimeout(popTimer)
      window.clearTimeout(settleTimer)
      window.clearTimeout(doneTimer)
    }
  }, [active, shimmerToken, index])

  // Color: while shimmering use loading grey, then settle to sentiment color.
  const fillColor = !active
    ? "#FFFFFF"
    : phase === "done"
      ? ratingColor(rating as Rating)
      : ratingLoadingFill
  const strokeColor = !active
    ? "#D0D4DD"
    : phase === "done"
      ? ratingColor(rating as Rating)
      : ratingLoadingFill

  // Scale: pop phase = 1.20 (back.out), settle phase = 1 (smooth settle).
  const scale = phase === "pop" ? 1.2 : 1
  const transition: Transition =
    phase === "pop"
      ? { duration: POP_MS / 1000, ease: POP_EASE }
      : phase === "settle"
        ? { duration: SETTLE_MS / 1000, ease: SETTLE_EASE }
        : { duration: 0 }

  return (
    <motion.button
      type="button"
      aria-label={`Rate ${index} of 5`}
      onClick={() => onTap?.(index)}
      animate={{ scale }}
      transition={transition}
      className="cursor-pointer outline-none"
      style={{ originX: 0.5, originY: 0.5 }}
    >
      <StarIcon size={size} fill={fillColor} stroke={strokeColor} strokeWidth={1} />
    </motion.button>
  )
}

// Total shimmer duration — exported for callers that want to defer
// follow-up transitions (e.g. the OrdersScreen → ReviewTextEntry morph).
export const RATING_SHIMMER_DURATION_MS = SHIMMER_TOTAL_MS
