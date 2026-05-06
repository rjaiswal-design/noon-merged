import { forwardRef } from "react"
import ChevronRightIcon from "../../icons/ChevronRightIcon"
import DeliveredTickIcon from "../../icons/DeliveredTickIcon"
import RewindCheckIcon from "../../icons/RewindCheckIcon"
import MarketplaceTag from "./MarketplaceTag"
import RatingInputStars from "./RatingInputStars"
import type { Shipment } from "../../data/orders"
import type { Rating } from "../../utils/ratingColors"

interface Props {
  shipment: Shipment
  rating: 0 | Rating
  onRate: (r: Rating) => void
  // True while the morph is flying this card's product/stars to the next
  // screen — the originals are hidden so the flying copies own the visual.
  isFlying?: boolean
  productImageRef?: React.Ref<HTMLDivElement>
  starsContainerRef?: React.Ref<HTMLDivElement>
}

// Single delivered shipment card: status row, product row, divider, rating row.
// Layout follows Figma `My orders / Shipments` (351×196 with rating row).
export default function ShipmentCard({
  shipment,
  rating,
  onRate,
  isFlying,
  productImageRef,
  starsContainerRef,
}: Props) {
  return (
    <div className="mx-3 shrink-0 overflow-hidden rounded-2xl border border-border-subtle bg-surface-primary">
      <DeliveredStatusRow date={shipment.deliveredOn} marketplace={shipment.marketplace} />
      <ProductRow shipment={shipment} isFlying={isFlying} productImageRef={productImageRef} />
      <DottedDivider />
      <RatingRow rating={rating} onRate={onRate} isFlying={isFlying} starsContainerRef={starsContainerRef} />
    </div>
  )
}

interface StatusProps { date: string; marketplace: Shipment["marketplace"] }

function DeliveredStatusRow({ date, marketplace }: StatusProps) {
  return (
    <div className="flex h-10 items-center justify-between bg-surface-secondary px-3">
      <div className="flex items-center gap-1">
        <DeliveredTickIcon size={14} />
        <div className="flex items-baseline gap-0.5">
          <span className="text-[12px] font-bold leading-[16px] text-status-delivered">
            Delivered
          </span>
          <span className="text-[12px] font-medium leading-[16px] text-text-primary">
            on {date}
          </span>
        </div>
      </div>
      <MarketplaceTag variant={marketplace} size="sm" />
    </div>
  )
}

function ProductRow({
  shipment,
  isFlying,
  productImageRef,
}: {
  shipment: Shipment
  isFlying?: boolean
  productImageRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div className="flex items-center justify-start gap-3 px-3 pt-3 pb-3">
      <ProductImage src={shipment.productImage} isFlying={isFlying} ref={productImageRef} />
      <div className="flex flex-1 flex-col gap-2 pr-2">
        <p className="line-clamp-2 text-[12px] font-normal leading-[16px] text-[#475067]">
          {shipment.productName}
        </p>
        <ReturnabilityPill>{shipment.returnLabel}</ReturnabilityPill>
      </div>
      <CardChevron />
    </div>
  )
}

// 60×80 thumb surface with subtle border, rounded-lg. Image fills the surface.
// While flying, the original is hidden so the MorphLayer's flying copy owns
// the visual. Ref exposes the wrapping div so the orchestrator can capture
// its rect on tap.
const ProductImage = forwardRef<HTMLDivElement, { src: string; isFlying?: boolean }>(
  function ProductImage({ src, isFlying }, ref) {
    return (
      <div
        ref={ref}
        style={{ visibility: isFlying ? "hidden" : "visible" }}
        className="h-[80px] w-[60px] shrink-0 overflow-hidden rounded-lg border border-border-subtle bg-surface-primary"
      >
        <img src={src} alt="" className="block size-full object-cover" draggable={false} />
      </div>
    )
  },
)

// Soft white→mint gradient pill carrying return-window status.
function ReturnabilityPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex w-[188px] shrink-0 items-center gap-1 self-start rounded-lg bg-[image:linear-gradient(225deg,#ffffff_0%,#e3fcf2_100%)] p-1">
      <RewindCheckIcon size={12} />
      <span className="text-[11px] font-semibold leading-[14px] text-status-delivered">
        {children}
      </span>
    </div>
  )
}

// Right-aligned chevron affordance for opening the order details page.
function CardChevron() {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center self-center rounded-full border border-[#EAECF0]">
      <ChevronRightIcon size={16} color="#1D2539" />
    </div>
  )
}

function DottedDivider() {
  return (
    <div
      className="mx-3 h-px pb-1"
      style={{
        backgroundImage:
          "linear-gradient(to right, #E1E3EB 50%, transparent 50%)",
        backgroundSize: "6px 1px",
        backgroundRepeat: "repeat-x",
      }}
    />
  )
}

interface RatingRowProps {
  rating: 0 | Rating
  onRate: (r: Rating) => void
  isFlying?: boolean
  starsContainerRef?: React.Ref<HTMLDivElement>
}

function RatingRow({ rating, onRate, isFlying, starsContainerRef }: RatingRowProps) {
  return (
    <div className="flex h-12 items-center justify-between px-3">
      <span className="text-[14px] font-medium leading-[18px] text-text-primary">
        What would you rate it?
      </span>
      <div ref={starsContainerRef} style={{ visibility: isFlying ? "hidden" : "visible" }}>
        <RatingInputStars rating={rating} onTap={onRate} />
      </div>
    </div>
  )
}
