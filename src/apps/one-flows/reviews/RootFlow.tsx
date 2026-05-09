import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { motion } from "motion/react"
import OrdersScreen from "./screens/OrdersScreen"
import ReviewTextEntryScreen from "./screens/ReviewTextEntryScreen"
import MorphLayer from "./flows/MorphLayer"
import { useReviewStore } from "./store/reviewStore"

interface Props {
  // Called when the user backs out of OrdersScreen — wires the in-flow
  // back button to the host app's screen stack so we land back on the
  // AccountsPage that launched this flow.
  onExit?: () => void
}

// Screen switcher with an explicit MorphLayer overlay. While the morph is
// flying, both screens stay mounted underneath (orders source / review
// target) and the overlay renders flying copies of the product image + 5
// stars from captured source rects to target positions. Once the morph
// completes, the orders screen fades out and the review screen takes over.
export default function RootFlow({ onExit }: Props) {
  const screen = useReviewStore((s) => s.screen)
  const morphPhase = useReviewStore((s) => s.morphPhase)
  const resetFlow = useReviewStore((s) => s.resetFlow)

  // Reset transient flow state on mount so each entry from My Orders
  // starts in a clean "orders / no rating selected" state.
  useEffect(() => {
    resetFlow()
  }, [resetFlow])

  // The DeviceFrame's bounding rect — needed to translate viewport-captured
  // source rects into the device's local coordinate space.
  const containerRef = useRef<HTMLDivElement>(null)
  const [deviceRect, setDeviceRect] = useState<DOMRect | null>(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setDeviceRect(el.getBoundingClientRect())
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Keep orders mounted while the morph flies on top so the source rects
  // don't change underneath the captured snapshot.
  const showOrders = screen === "orders" || morphPhase === "flying"
  const showReview = screen === "review-text"

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-surface-tertiary">
      {showOrders && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: morphPhase === "flying" ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <OrdersScreen onExit={onExit} />
        </motion.div>
      )}
      {showReview && (
        <div className="absolute inset-0">
          <ReviewTextEntryScreen />
        </div>
      )}
      {deviceRect && <MorphLayer deviceRect={deviceRect} />}
    </div>
  )
}
