import { useMotionValue, useTransform } from "motion/react"
import Header from "../components/orders/Header"
import ActiveOrdersSection from "../components/orders/ActiveOrdersSection"
import OrderHistorySection, { SHEET_DELTA } from "../components/orders/OrderHistorySection"

interface OrdersScreenProps {
  onExit?: () => void
}

// Orders screen layout — three z-stacked surfaces:
//   • Header (z-30): always on top, never moves
//   • OrderHistorySection (z-20): the draggable sheet that overlays the
//     active section when expanded
//   • ActiveOrdersSection (z-10): drops + breathes as the sheet expands
//
// Sheet position state is owned here so the active section can react to it
// (translate down, breathe its inner gap) as the sheet animates.
export default function OrdersScreen({ onExit }: OrdersScreenProps) {
  const sheetY = useMotionValue(0)
  // 0 = collapsed, 1 = fully expanded. Single source of truth for any UI
  // that should breathe alongside the sheet.
  const progress = useTransform(sheetY, [0, -SHEET_DELTA], [0, 1])

  return (
    <div className="relative h-full w-full overflow-hidden bg-surface-tertiary">
      <div className="absolute inset-x-0 top-0 z-30">
        <Header onBack={onExit} />
      </div>
      <div className="absolute inset-x-0 top-[100px] z-10">
        <ActiveOrdersSection progress={progress} />
      </div>
      <OrderHistorySection sheetY={sheetY} />
    </div>
  )
}
