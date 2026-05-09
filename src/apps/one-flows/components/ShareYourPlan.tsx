import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";


import { T } from '../lib/dsTokens';
/* ---------- Inline icons ---------- */

function BackChevron({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke={T.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkleIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M7 1.5L8.1 5.4L12 6.5L8.1 7.6L7 11.5L5.9 7.6L2 6.5L5.9 5.4L7 1.5Z"
        fill={T.color.brand.green}
      />
    </svg>
  );
}

function InfoIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="5" stroke={T.color.brand.green} strokeWidth="1.2" />
      <path d="M6 5v3.2M6 3.5v.01" stroke={T.color.brand.green} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function CheckMark({ className="", color = T.color.text.body }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 8.5L6.5 12L13 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RadioCircle({ selected }: { selected: boolean }) {
  return selected ? (
    <div className="size-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: T.color.brand.green }}>
      <div className="size-2 rounded-full bg-white" />
    </div>
  ) : (
    <div className="size-5 rounded-full border-[1.5px] shrink-0" style={{ borderColor: T.color.border.muted }} />
  );
}

const AED_GLYPH = "";
function Aed({ className="" }: { className?: string }) {
  return (
    <span aria-label="AED" className={`font-noontree tracking-[0] inline-block align-baseline mr-[2px] ${className}`}>
      {AED_GLYPH}
    </span>
  );
}

/* ---------- Avatar cluster (visual zone) ---------- */
function AvatarCluster({ tier }: { tier: "duo" | "family" }) {
  const seats = tier === "duo" ? 2 : 5;
  const palette = tier === "duo"
    ? [T.color.accent.duo, "#FF6FA3"]
    : [T.color.accent.family, T.color.accent.duo, "#FF6FA3", "#FFB547", T.color.brand.green];
  const initials = tier === "duo" ? ["R", "A"] : ["R", "A", "M", "J", "S"];
  return (
    <div className="flex items-center -space-x-2">
      {Array.from({ length: seats }).map((_, i) => (
        <div
          key={i}
          className="size-6 rounded-full border-[2px] border-white flex items-center justify-center text-tiny font-noontree font-bold text-white"
          style={{ backgroundColor: palette[i % palette.length] }}
        >
          {initials[i]}
        </div>
      ))}
    </div>
  );
}

/* ---------- Plan model + data ---------- */

type SharedPlan = {
  id: "duo" | "family";
  name: string;
  totalPrice: string;
  seats: number;
  perMember: string;
  tagline: string;
  benefits: string[];
  badge?: string;
};

const SHARED_PLANS: SharedPlan[] = [
  {
    id: "duo",
    name: "Duo Plan",
    totalPrice: "39.99",
    seats: 2,
    perMember: "20.00",
    tagline: "Share with 1 other",
    badge: "Best for pairs",
    benefits: [
      "Unlimited free delivery for both",
      "Get 10% off, 1st of every month",
      "Each member uses their own account",
    ],
  },
  {
    id: "family",
    name: "Family Plan",
    totalPrice: "54.99",
    seats: 5,
    perMember: "11.00",
    tagline: "Share with up to 4",
    badge: "Best value",
    benefits: [
      "Unlimited free delivery for all",
      "Get 10% off, 1st of every month",
      "Up to 5 separate noon accounts",
    ],
  },
];

/* ---------- Plan card ---------- */

function SharedPlanCard({
  plan,
  selected,
  savingsVsCurrent,
  onSelect,
}: {
  plan: SharedPlan;
  selected: boolean;
  /** Pre-formatted savings string ("4.99") computed from current personal price. */
  savingsVsCurrent?: string;
  onSelect: () => void;
}) {
  const tone = plan.id === "duo"
    ? { soft: T.color.accent.duoSoft, ink: T.color.accent.duo }
    : { soft: T.color.accent.familySoft, ink: T.color.accent.family };

  const wrapperClass = `rounded-[16px] w-full self-stretch transition-shadow duration-150 ${
    selected ? "shadow-[0_0_0_4px_rgba(16,135,87,0.08)]" : ""
  }`;

  return (
    <div className={wrapperClass}>
      <SmoothCorners
        as="button"
        radius={16}
        onClick={onSelect}
        className="bg-white border-[1.5px] rounded-16 w-full flex flex-col text-left cursor-pointer relative transition-colors duration-150 overflow-hidden"
        style={{ borderColor: selected ? T.color.brand.green : T.color.border.hairline }}
      >
        {/* Tinted header strip — visual zone */}
        <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: tone.soft }}>
          <div className="flex items-center gap-2.5">
            <AvatarCluster tier={plan.id} />
            <p className="font-noontree font-semibold text-b12" style={{ color: tone.ink }}>
              {plan.seats} seats · {plan.tagline}
            </p>
          </div>
          {plan.badge && (
            <span
              className="font-noontree font-semibold text-tiny leading-none px-2 py-1 rounded-4 whitespace-nowrap"
              style={{ backgroundColor: T.color.surface.canvas, color: tone.ink }}
            >
              {plan.badge}
            </span>
          )}
        </div>

        {/* System zone — body */}
        <div className="flex flex-col gap-2 px-4 pt-3.5 pb-4">
          <div className="flex items-center justify-between w-full">
            <p className="font-bold text-h16" style={{ color: T.color.text.heading }}>
              {plan.name}
            </p>
            <RadioCircle selected={selected} />
          </div>

          {/* Per-member math is the headline number */}
          <div className="flex items-baseline gap-1">
            <Aed className="text-h16" />
            <p className="font-noontree font-bold text-h20" style={{ color: T.color.text.heading }}>
              {plan.perMember}
            </p>
            <p className="font-noontree font-medium text-b12" style={{ color: T.color.text.muted }}>
              /member/month
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-y-1.5">
            <p className="font-noontree text-label-4p" style={{ color: T.color.text.muted }}>
              <Aed />
              {plan.totalPrice}/month total · billed to plan owner
            </p>
            {savingsVsCurrent && (
              <span
                className="font-noontree font-semibold text-b11 leading-none px-2 py-1 rounded-4 whitespace-nowrap"
                style={{ backgroundColor: T.color.brand.greenSoft, color: T.color.brand.green }}
              >
                Save {savingsVsCurrent}/mo
              </span>
            )}
          </div>

          <div className="h-px w-full border-t border-dashed" style={{ borderColor: T.color.border.divider }} />

          <div className="flex flex-col gap-2.5">
            {plan.benefits.map((b, i) => (
              <div key={i} className="flex gap-2.5 items-center">
                <CheckMark className="size-4 shrink-0" />
                <p className="font-noontree font-medium text-label-4p" style={{ color: T.color.text.body }}>
                  {b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SmoothCorners>
    </div>
  );
}

/* ---------- Compare bottom sheet ---------- */
function CompareSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 z-30 bg-black/40 rounded-16"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320, mass: 0.9 }}
            className="absolute bottom-0 left-0 right-0 z-40 bg-white rounded-tl-16 rounded-tr-16 px-5 pt-3 pb-7 flex flex-col"
            style={{ boxShadow: "0 -8px 24px rgba(15,15,25,0.08)" }}
          >
            <div className="self-center bg-blue-gray-400 h-1 w-10 rounded-4 mb-3.5" />
            <p className="font-bold text-h16 text-center mb-4" style={{ color: T.color.text.heading }}>
              Duo vs Family
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-12 p-3 flex flex-col gap-2" style={{ backgroundColor: T.color.accent.duoSoft }}>
                <p className="font-noontree font-semibold text-b12" style={{ color: T.color.accent.duo }}>Duo · 2 seats</p>
                <div className="flex items-baseline gap-0.5">
                  <Aed className="text-b14" />
                  <p className="font-noontree font-bold text-h18" style={{ color: T.color.text.heading }}>20.00</p>
                </div>
                <p className="font-noontree text-b11" style={{ color: T.color.text.muted }}>per member / month</p>
              </div>
              <div className="rounded-12 p-3 flex flex-col gap-2" style={{ backgroundColor: T.color.accent.familySoft }}>
                <p className="font-noontree font-semibold text-b12" style={{ color: T.color.accent.family }}>Family · 5 seats</p>
                <div className="flex items-baseline gap-0.5">
                  <Aed className="text-b14" />
                  <p className="font-noontree font-bold text-h18" style={{ color: T.color.text.heading }}>11.00</p>
                </div>
                <p className="font-noontree text-b11" style={{ color: T.color.text.muted }}>per member / month</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              {[
                "Each member uses their own noon account",
                "Only the owner's payment is charged",
                "All members get full noon One benefits",
                "Members must be in the same country as the owner",
              ].map((line, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckMark className="size-3.5 shrink-0 mt-0.5" color={T.color.brand.green} />
                  <p className="font-noontree text-b12" style={{ color: T.color.text.body }}>
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full bg-black text-white font-bold text-b14 rounded-12 py-4 cursor-pointer"
            >
              Got it
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Screen ---------- */

export default function ShareYourPlan({
  onBack,
  onSkip,
  onContinue,
  entry = "home",
  /** User's current personal-plan price as a numeric string (e.g. "24.99").
   *  Drives the per-card savings pill and the eyebrow framing line. */
  currentPrice = "24.99",
}: {
  onBack: () => void;
  /** Skip the upsell — distinct from back. In post-purchase flow this
   *  finalises the personal plan; in discovery flow it returns home. */
  onSkip?: () => void;
  onContinue?: (tier: "duo" | "family") => void;
  /** Where this screen was reached from. Tunes hero copy + skip label. */
  entry?: "home" | "postPurchase";
  currentPrice?: string;
}) {
  const [selectedId, setSelectedId] = useState<"duo" | "family" | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const canConfirm = selectedId !== null;

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{ backgroundImage: `linear-gradient(180deg, ${T.color.surface.canvas} 31%, ${T.color.surface.scrim} 100%)` }}
    >
      <StatusBar />

      <div
        className="relative h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
      >
        <div className={`w-full ${canConfirm ? "pb-28" : "pb-5"}`}>
          {/* Sticky header — Skip text-link sits top-right when this screen
              is being shown as a post-purchase upsell, so the user has a
              clear "no thanks, just confirm my plan" exit. */}
          <div
            className={`sticky top-0 z-10 flex items-center gap-[8px] px-[18px] pt-[52px] pb-[12px] w-full transition-[background-color,border-color] duration-150 border-b ${
              scrolled ? "bg-white" : "bg-transparent"
            }`}
            style={{ borderColor: scrolled ? T.color.border.divider : "transparent" }}
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bg-white flex items-center justify-center p-2 rounded-16 cursor-pointer shrink-0 border"
              style={{ borderColor: T.color.border.subtle }}
            >
              <BackChevron className="size-5" />
            </button>
            <p className="flex-1 font-bold text-h16" style={{ color: T.color.text.primary }}>
              {entry === "postPurchase" ? "One more thing" : "Share your plan"}
            </p>
            {entry === "postPurchase" && onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="bg-white flex items-center justify-center px-3.5 h-9 rounded-full cursor-pointer shrink-0 border font-noontree font-semibold text-label-3"
                style={{
                  borderColor: T.color.border.subtle,
                  color: T.color.text.heading,
                }}
              >
                Skip
              </button>
            )}
          </div>

          {/* Eyebrow savings framing — tells the user the size of the prize
              before they read the cards. Quiet, single line, no second
              "section header" feel. The biggest possible savings (Family
              tier) is the anchor number; cards then show per-tier savings. */}
          {(() => {
            const cur = Number.parseFloat(currentPrice);
            const maxSavings = SHARED_PLANS.reduce((acc, p) => {
              const s = cur - Number.parseFloat(p.perMember);
              return s > acc ? s : acc;
            }, 0);
            if (maxSavings <= 0) return null;
            return (
              <div className="px-5 mt-1.5 mb-3.5 flex items-center gap-2">
                <SparkleIcon className="size-3.5 shrink-0" />
                <p className="font-noontree text-b12" style={{ color: T.color.text.body }}>
                  <span className="font-semibold" style={{ color: T.color.text.heading }}>
                    Save up to <Aed />{maxSavings.toFixed(2)}/mo
                  </span>{" "}
                  vs your current plan
                </p>
              </div>
            );
          })()}

          <div className="flex flex-col px-4 gap-3">
            {SHARED_PLANS.map((plan) => {
              const cur = Number.parseFloat(currentPrice);
              const savings = cur - Number.parseFloat(plan.perMember);
              const savingsStr = savings > 0
                ? `${savings.toFixed(2)}`
                : undefined;
              return (
                <SharedPlanCard
                  key={plan.id}
                  plan={plan}
                  selected={selectedId === plan.id}
                  savingsVsCurrent={savingsStr}
                  onSelect={() => setSelectedId(plan.id)}
                />
              );
            })}
          </div>

          {/* Compare plans — quiet ghost link below the cards. Optional;
              users who want side-by-side detail can pull up the sheet. */}
          <div className="px-4 mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setCompareOpen(true)}
              className="font-noontree font-semibold text-label-4p cursor-pointer flex items-center gap-1.5"
              style={{ color: T.color.brand.green }}
            >
              <InfoIcon className="size-3" />
              Compare Duo vs Family
            </button>
          </div>
        </div>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {canConfirm && (
          <motion.div
            key="share-plan-cta"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320, mass: 0.9 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t rounded-tl-12 rounded-tr-12 px-4 pt-3 pb-9"
            style={{ borderColor: T.color.border.divider }}
          >
            <button
              type="button"
              onClick={() => selectedId && onContinue?.(selectedId)}
              className="w-full bg-black text-white font-bold text-b14 rounded-12 py-4 cursor-pointer"
            >
              Continue with {selectedId === "duo" ? "Duo" : "Family"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>

      <CompareSheet open={compareOpen} onClose={() => setCompareOpen(false)} />
    </div>
  );
}
