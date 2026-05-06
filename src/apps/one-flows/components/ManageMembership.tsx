import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";
import applePayLogo from "../assets/apple-pay.svg";

/* ---------- Inline icons (kept local so this screen has no extra assets) ---------- */

function BackChevron({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="#0E0E0E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RightChevron({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.5 3.5L9 7L5.5 10.5"
        stroke="#1d2539"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckMark({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 8.5L6.5 12L13 5"
        stroke="#108757"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossX({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
        stroke="#1d2539"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Apple Pay payment badge — Font Awesome 6 brands Apple Pay glyph (black,
 * viewBox 640×512) centred inside a 32×32 container, image height 28px so
 * it fills the box visually without crowding the edges.
 */
function ApplePayBadge() {
  return (
    <div className="size-8 flex items-center justify-center shrink-0">
      <img
        src={applePayLogo}
        alt="Apple Pay"
        // FA Apple Pay viewBox is 640×512 (≈ 1.25:1). h-[22px] gives natural
        // width ≈ 27.5px, fits comfortably inside the 32×32 container with
        // breathing room and no horizontal squashing.
        className="block h-5 w-auto max-w-none"
      />
    </div>
  );
}

/* ---------- Sub-cards ---------- */

export type PlanState = "monthly" | "bundle" | "annual";

const PLAN_INFO: Record<
  PlanState,
  {
    name: string;
    benefits: string[];
    price: string;
    /** When set, the right-side tag reads "Free trial for N days" instead of "Active". */
    trialDays?: number;
  }
> = {
  monthly: {
    name: "One Monthly",
    price: "24.99",
    benefits: [
      "Unlimited free delivery",
      "Get 10% cashback, 1st of every month",
    ],
  },
  bundle: {
    name: "One & OSN+ Monthly",
    price: "24.99",
    trialDays: 14,
    benefits: [
      "Unlimited free delivery",
      "Watch HBO, OSN+ originals on demand.",
    ],
  },
  annual: {
    name: "One Annual",
    price: "11.99",
    trialDays: 14,
    benefits: [
      "Unlimited free delivery",
      "Get 10% off, 1st of every month",
    ],
  },
};

function CurrentPlanBlock({
  planId,
  isUpgraded,
  onChangePlan,
}: {
  planId: PlanState;
  isUpgraded?: boolean;
  onChangePlan?: () => void;
}) {
  const plan = PLAN_INFO[planId];
  const leftTagLabel = isUpgraded ? "Upgraded plan" : "Current plan";
  const rightTag = plan.trialDays
    ? `Free trial for ${plan.trialDays} days`
    : "Active";

  return (
    <SmoothCorners
      radius={16}
      className="bg-blue-gray-100 border-[1.5px] border-blue-gray-300 rounded-16 w-[343px] flex flex-col gap-3.5 pb-4"
    >
      {/* Inner white card */}
      <SmoothCorners
        radius={16}
        className="bg-white rounded-16 flex flex-col gap-1.5 items-start pb-4 px-4 relative w-full"
      >
        {/* Left tag — "Current plan" or "Upgraded plan" depending on state */}
        <div className="bg-green-600 flex h-6 items-center justify-center px-3 py-1 rounded-bl-12 rounded-br-12 shrink-0">
          <p className="font-noontree font-semibold text-white text-b12 leading-none whitespace-nowrap shrink-0">
            {leftTagLabel}
          </p>
        </div>

        {/* Right-aligned tag — "Active" or "Free trial for N days" */}
        <div className="absolute right-0 top-6 bg-bluegray-50 border border-green-100 flex items-center px-3 py-1 rounded-bl-12 rounded-tl-12">
          <p className="font-noontree font-semibold text-label-4p whitespace-nowrap">
            {plan.trialDays ? (
              <>
                <span className="text-green-600">Free trial </span>
                <span className="text-blue-gray-700">
                  for {plan.trialDays} days
                </span>
              </>
            ) : (
              <span className="text-green-600">{rightTag}</span>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-3.5 w-full">
          <p className="flex-1 font-bold text-blue-gray-900 text-h16">
            {plan.name}
          </p>

          <div className="h-px w-full border-t border-dashed border-blue-gray-300" />

          <div className="flex flex-col gap-2.5">
            {plan.benefits.map((b, i) => (
              <div key={i} className="flex gap-2.5 items-center">
                <CheckMark className="size-4 shrink-0" />
                <p className="font-noontree font-medium text-blue-gray-700 text-label-4p">
                  {b}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px w-full border-t border-dashed border-blue-gray-300" />

          <p className="font-noontree font-semibold text-blue-gray-600 text-label-4p">
            Auto renews on xx-xx-xx at AED {plan.price}
          </p>
        </div>
      </SmoothCorners>

      {/* Change Plan row */}
      <button
        type="button"
        onClick={onChangePlan}
        className="flex items-center justify-between px-4 w-full cursor-pointer"
      >
        <p className="font-noontree font-medium text-blue-gray-1000 text-b14">
          Change Plan
        </p>
        <RightChevron className="size-3.5" />
      </button>
    </SmoothCorners>
  );
}

function PaymentMethodBlock({ onChangeMethod }: { onChangeMethod?: () => void }) {
  return (
    <SmoothCorners
      radius={16}
      className="bg-blue-gray-100 border-[1.5px] border-blue-gray-300 rounded-16 w-[343px] flex flex-col gap-3.5 pb-4"
    >
      <SmoothCorners
        radius={16}
        className="bg-white rounded-16 p-4 w-full"
      >
        <div className="flex flex-col gap-1.5">
          <p className="font-noontree text-blue-gray-700 text-label-4p">
            Payment Method
          </p>
          <div className="flex gap-2.5 items-center">
            <ApplePayBadge />
            <p className="font-bold text-blue-gray-900 text-h16">
              Apple Pay
            </p>
          </div>
        </div>
      </SmoothCorners>

      <button
        type="button"
        onClick={onChangeMethod}
        className="flex items-center justify-between px-4 w-full cursor-pointer"
      >
        <p className="font-noontree font-medium text-bluegray-800 text-b14">
          Change payment method
        </p>
        <RightChevron className="size-3.5" />
      </button>
    </SmoothCorners>
  );
}

function CancelMembershipBlock({ onCancel }: { onCancel?: () => void }) {
  return (
    <SmoothCorners
      as="button"
      radius={16}
      onClick={onCancel}
      className="bg-white border border-blue-gray-200 rounded-16 w-[343px] flex items-start gap-2 p-3 text-left cursor-pointer"
    >
      <div className="flex items-center justify-center size-5 shrink-0 mt-px">
        <CrossX className="size-3.5" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="font-noontree font-semibold text-bluegray-800 text-label-3p">
          Cancel membership
        </p>
        <p className="font-noontree font-medium text-blue-gray-600 text-label-4p">
          We will notify you 2 days before your trial ends
        </p>
      </div>
      <RightChevron className="size-3.5 mt-1" />
    </SmoothCorners>
  );
}

/* ---------- Screen ---------- */

export default function ManageMembership({
  onBack,
  onChangePlan,
  onCancelMembership,
  onChangePaymentMethod,
  planId = "monthly",
  isUpgraded = false,
}: {
  onBack: () => void;
  onChangePlan?: () => void;
  onCancelMembership?: () => void;
  onChangePaymentMethod?: () => void;
  planId?: PlanState;
  isUpgraded?: boolean;
}) {
  // When the user scrolls past the header band, fill it with the page colour
  // and add a subtle separator line so it visually anchors above content.
  const [scrolled, setScrolled] = useState(false);

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{
        backgroundImage: "linear-gradient(180deg, #ffffff 31%, #f3f3f5 100%)",
      }}
    >
      {/* Status bar floats above everything (incl. the sticky header) so the
          system clock + signal icons remain visible at all times. */}
      <StatusBar />

      {/*
        Scroll container. `relative` (not absolute) per Retune visual change.
        h-full so it still fills the iPhone frame; overflow-y-auto enables
        sticky positioning of the header within this scroll context.
      */}
      <div
        className="relative h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
      >
        <div className="w-full pb-6">
          {/* Sticky header — sits below the status bar, transparent at rest,
              fills with the page colour + bottom hairline once content
              starts scrolling under it. */}
          <div
            className={`sticky top-0 z-10 flex items-center gap-[8px] px-[18px] pt-[52px] pb-[12px] w-full transition-[background-color,border-color] duration-150 border-b ${
              scrolled
                ? "bg-white border-blue-gray-300"
                : "bg-transparent border-transparent"
            }`}
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bg-white border border-blue-gray-200 flex items-center justify-center p-2 rounded-16 cursor-pointer shrink-0"
            >
              <BackChevron className="size-5" />
            </button>
            <p className="flex-1 font-bold text-[#0e0e0e] text-h16">
              Manage Membership
            </p>
          </div>

          {/* Cards stack — tightened from mt-[42px] to mt-[16px] so the gap
              under the header isn't gaping. */}
          <div className="flex flex-col items-center gap-6 mt-4">
            <CurrentPlanBlock
              planId={planId}
              isUpgraded={isUpgraded}
              onChangePlan={onChangePlan}
            />
            <PaymentMethodBlock onChangeMethod={onChangePaymentMethod} />
            <CancelMembershipBlock onCancel={onCancelMembership} />
          </div>
        </div>
      </div>

      {/* iPhone home indicator */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>
    </div>
  );
}
