import BulletDotIcon from "../../icons/BulletDotIcon"
import ChevronRightIcon from "../../icons/ChevronRightIcon"
import MarketplaceTag from "./MarketplaceTag"

// Single active-order card: tagged product thumb + arrival metadata.
export default function ActiveOrderCard() {
  return (
    <div className="mx-3 flex items-center gap-3 rounded-2xl bg-surface-primary px-2.5 pt-2.5 pb-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
      <ThumbWithTag />
      <ArrivalMeta />
      <div className="flex pt-1">
        <CloseIndicator />
      </div>
    </div>
  )
}

// Product image inside a 57×76 surface, with the express tag pinned to the
// bottom of the thumb (54×16 strip, 1.5px inset on left/right).
function ThumbWithTag() {
  return (
    <div className="relative shrink-0">
      <div className="grid h-[76px] w-[57px] place-items-center rounded-xl bg-surface-tertiary">
        <img
          src="/reviews-flow/products/sample-product.png"
          alt=""
          className="block size-full object-contain"
        />
      </div>
      <div className="absolute top-[66px] right-[1.5px] left-[1.5px] h-[16px]">
        <MarketplaceTag variant="express" />
      </div>
    </div>
  )
}

// Affordance to navigate into the order details page (Frame 2147241256 / Close).
function CloseIndicator() {
  return (
    <div
      role="button"
      aria-label="Open order details"
      className="grid size-8 shrink-0 place-items-center rounded-full border border-[#EAECF0]"
    >
      <ChevronRightIcon size={16} color="#1D2539" />
    </div>
  )
}

function ArrivalMeta() {
  return (
    <div className="flex flex-1 flex-col gap-[4px] pt-1.5">
      <div className="text-[16px] font-bold leading-[20px] text-text-primary">
        Arriving Apr 18 - Apr 21
      </div>
      <div className="flex items-center gap-[6px] text-[12px] leading-[16px]">
        <span className="font-medium text-[#475067]">1 item</span>
        <BulletDotIcon />
        <span className="font-medium text-[#475067]">Processing</span>
        <BulletDotIcon />
        <span className="shrink-0 font-bold text-status-delivered">On time</span>
      </div>
    </div>
  )
}
