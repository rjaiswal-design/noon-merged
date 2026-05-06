import { useState } from "react";
import chevronDown1 from "../assets/chevron-down-1.svg";
import chevronStroke from "../assets/chevron-stroke.svg";
import visualTvEn from "../assets/visual-tv-en.png";
import osnPlus from "../assets/osn-plus.svg";
import ellipse3931 from "../assets/ellipse3931.svg";
import ellipse3930 from "../assets/ellipse3930.svg";
import lines from "../assets/lines.svg";
import ellipse2080 from "../assets/ellipse2080.svg";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import heroLogoLottie from "../assets/lottie/hero-logo.lottie?url";
import SmoothCorners from "@ui/SmoothCorners";
import SlotNumber from "./SlotNumber";
import ShareWithOthersCard from "./ShareWithOthersCard";
import iconTruck from "../assets/icon-truck.svg";
import seprator from "../assets/seprator.svg";
import seprator2 from "../assets/seprator2.svg";
import ticketVec1 from "../assets/ticket-vec1.svg";
import ticketVec2 from "../assets/ticket-vec2.svg";
import ticketVec3 from "../assets/ticket-vec3.svg";
import ticketPercent from "../assets/ticket-percent.svg";
import namshiG1 from "../assets/namshi-g1.svg";
import namshiG2 from "../assets/namshi-g2.svg";
import foodLogo from "../assets/food-logo.svg";
import foodFrame from "../assets/food-frame.svg";

// Brand carousel tiles — pre-composited 76×76 PNGs from the Field DS Figma
import brandTrail from "../assets/brand-trail.svg";
import layer2 from "../assets/layer2.svg";
import star from "../assets/star.svg";
import ellipse24014 from "../assets/ellipse24014.svg";
import giftBox from "../assets/gift-box.svg";
import couponGroup from "../assets/coupon-group.svg";
import couponPercent from "../assets/coupon-percent.svg";
import couponVec1 from "../assets/coupon-vec1.svg";
import couponVec2 from "../assets/coupon-vec2.svg";
import cap from "../assets/cap.svg";
import wifi from "../assets/wifi.svg";
import cellular from "../assets/cellular.svg";
import brandTags from "../assets/brand-tags.png";

function StatusBar() {
  return (
    <div className="absolute h-11 left-0 top-0 w-[375px] z-10">
      {/* Time */}
      <div className="absolute h-5 left-5 top-1.5 w-14">
        <p className="-translate-x-1/2 absolute font-semibold leading-none left-7 text-b14 text-black text-center top-[calc(50%-3.5px)] w-14">
          9:41
        </p>
      </div>
      {/* Cellular */}
      <div className="absolute inset-[40.15%_17.07%_35.61%_78.4%]">
        <img alt="" className="absolute block inset-0 w-full h-full" src={cellular} />
      </div>
      {/* Wifi */}
      <div className="absolute inset-[39.39%_11.64%_35.61%_84.27%]">
        <img alt="" className="absolute block inset-0 w-full h-full" src={wifi} />
      </div>
      {/* Battery */}
      <div className="absolute right-3.5 top-4">
        <div className="absolute border border-black border-solid h-3 opacity-35 right-0.5 rounded-4 top-0 w-5" />
        <div className="absolute h-1 right-0 top-1 w-px">
          <img alt="" className="absolute block inset-0 w-full h-full" src={cap} />
        </div>
        <div className="absolute bg-black h-2 right-1 rounded-4 top-0.5 w-4" />
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="h-[139.844px] relative shrink-0 w-80">
      {/* Noon One logo — Ripple Lottie. Moved to position 0 so it renders
          BEHIND the rest (DOM order = z-stacking for absolute siblings).
          Container size matches the canvas dims requested in Retune (665×377)
          so the ripple animation has its full breathing room. Centred
          horizontally on the parent (left-1/2). */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[377px] left-1/2 top-[calc(50%-40.65px)] w-[665px] pointer-events-none">
        <DotLottieReact
          src={heroLogoLottie}
          autoplay
          loop={false}
          className="block w-full h-full"
        />
      </div>
      {/* Soft glow ellipse behind logo */}
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-2.17px)] w-48 h-48 top-[calc(50%-29.64px)]">
        <img alt="" className="absolute block inset-0 w-full h-full" src={ellipse2080} />
      </div>
      {/* Name */}
      <p className="-translate-x-1/2 absolute font-extrabold left-[calc(50%+1px)] text-h28 text-black text-center top-[77px] w-80">
        Rahul Jaiswal
      </p>
      {/* Subtitle */}
      <p className="-translate-x-1/2 absolute font-normal left-[calc(50%+1px)] text-label-2 text-black/75 text-center top-28 whitespace-nowrap">
        One member since 5th Jan, 2026
      </p>
    </div>
  );
}

function CurrentPlanCard({ onManage }: { onManage?: () => void }) {
  return (
    <SmoothCorners
      radius={12}
      className="bg-blue-gray-100 border border-blue-gray-100 border-solid drop-shadow-[0px_2px_20px_rgba(0,0,0,0.02)] flex flex-col gap-3 items-start pb-3.5 relative shrink-0 w-[346px]"
    >
      {/* Inner white block */}
      <SmoothCorners
        radius={12}
        className="bg-white flex flex-col gap-1.5 items-center justify-center relative shadow-[0px_2px_40px_0px_rgba(0,0,0,0.01)] shrink-0 w-full"
      >
        <div className="flex items-center p-3 relative shrink-0 w-full">
          <div className="flex flex-col gap-0.5 items-start relative shrink-0 text-left w-[166px]">
            <p className="font-normal text-b11 text-black/75 w-full">
              Current plan
            </p>
            <p className="font-bold text-h16 text-[#02060c]/90 w-full">
              One Monthly
            </p>
          </div>
        </div>
        {/* Dashed separator */}
        <div className="h-px w-full border-t border-dashed border-neutral-200" />
        <div className="bg-white flex gap-1 items-center pb-3 pt-1 px-3 relative rounded-bl-12 rounded-br-12 shrink-0 w-full">
          <div className="relative shrink-0 size-4">
            {/* Clean inline calendar-with-check icon. Replaced the original
                Figma SVG that had `preserveAspectRatio="none"` distortion and
                opaque #0E0E0E fills. */}
            <svg
              viewBox="0 0 16 16"
              className="block w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Calendar body */}
              <rect
                x="1.5"
                y="3"
                width="13"
                height="11.5"
                rx="2.2"
                stroke="#8A8A8A"
                strokeWidth="1.2"
              />
              {/* Top binding (date header strip) */}
              <line
                x1="1.5"
                y1="6.2"
                x2="14.5"
                y2="6.2"
                stroke="#8A8A8A"
                strokeWidth="1.2"
              />
              {/* Hangers */}
              <line
                x1="5"
                y1="1.5"
                x2="5"
                y2="4.5"
                stroke="#8A8A8A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="1.5"
                x2="11"
                y2="4.5"
                stroke="#8A8A8A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              {/* Checkmark inside */}
              <path
                d="M5 10.5L7 12.2L11 8.5"
                stroke="#8A8A8A"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="font-normal text-b12 text-black/75 whitespace-nowrap">
            Auto renews on 24 May 2026 at <Aed />
            24.99/month
          </p>
        </div>
        {/* Active tag */}
        <div className="absolute bg-bluegray-50 border border-green-100 flex h-6 items-center justify-end overflow-clip px-3 py-1 right-0 rounded-bl-12 rounded-tl-12 top-5">
          <p className="font-semibold leading-none text-green-600 text-b12 text-right whitespace-nowrap">
            Active
          </p>
        </div>
      </SmoothCorners>
      {/* Manage membership row — the only clickable surface */}
      <button
        type="button"
        onClick={onManage}
        className="flex items-center justify-between px-4 relative shrink-0 w-full cursor-pointer text-left"
      >
        <p className="font-medium text-[#262626] text-label-3 whitespace-nowrap">
          Manage membership
        </p>
        <div className="overflow-clip relative shrink-0 size-3.5 flex items-center justify-center">
          <img alt="" className="block w-1.5 h-2.5 rotate-180" src={chevronStroke} />
        </div>
      </button>
    </SmoothCorners>
  );
}

/**
 * AED dirham mark, rendered with Noontree's PUA glyph U+E001 (the "Dh"
 * ligature). Noontree is loaded via @font-face in index.css and exposed
 * as `font-noontree` in tailwind.config.js. To use the newer 2024 official
 * UAE dirham symbol instead, swap the inner glyph to U+E000.
 */
/**
 * OSN+ wordmark — the real SVG pulled from Figma node 3383:15486 (OsnCard).
 * The asset's native viewBox is 29.87×20.18 (≈ 1.48:1). Pass `className` with
 * a height utility (e.g. `h-[14px]`) — width is auto from the aspect ratio.
 */
function OsnPlusMark({ className="" }: { className?: string }) {
  return (
    <img
      src={osnPlus}
      alt="OSN+"
      className={`block w-auto ${className}`}
    />
  );
}

function Aed({ className="" }: { className?: string }) {
  return (
    <span
      aria-label="AED"
      className={`font-noontree tracking-[0] inline-block align-baseline mr-[2px] ${className}`}
    >
      {""}
    </span>
  );
}

function SavingsRow({
  iconNode,
  title,
  meta,
  amount,
}: {
  iconNode: React.ReactNode;
  title: string;
  meta: string;
  amount: string;
}) {
  return (
    <div className="flex gap-1.5 items-center relative shrink-0 w-full">
      {iconNode}
      <div className="flex flex-1 items-center justify-between min-w-0 relative">
        <div className="flex flex-col gap-1 items-start">
          <p className="font-semibold text-blue-gray-900 text-h16">
            {title}
          </p>
          <p className="font-medium text-blue-gray-600 text-label-4p">
            {meta}
          </p>
        </div>
        <p className="font-bold text-blue-gray-900 text-h18 whitespace-nowrap">
          <Aed />
          {amount}
        </p>
      </div>
    </div>
  );
}

export function SavingsCard() {
  return (
    <SmoothCorners
      radius={16}
      className="bg-white flex flex-col gap-1.5 items-start pb-2 pt-4 relative shrink-0 w-[346px]"
    >
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="flex items-center pl-4 pr-[120px] relative shrink-0 w-full">
          <div className="flex flex-col gap-1 items-start relative shrink-0 w-[235px]">
            <p className="font-medium text-blue-gray-900 text-b12 whitespace-nowrap">
              With noon One you have saved
            </p>
            <div className="flex items-center relative shrink-0">
              <p className="font-bold text-blue-gray-900 text-h28 whitespace-nowrap">
                <Aed />
                <SlotNumber value="124.34" height={38} shimmer delay={0.3} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8 relative shrink-0 w-fit flex items-center pl-3 pr-[60px] bg-gradient-to-r from-green-100 from-[24%] to-white/0 to-[135%]">
        <p className="font-medium text-green-600 text-label-3p whitespace-nowrap">
          That’s 3X of what you paid for!
        </p>
      </div>
      <div className="flex flex-col gap-4 items-start overflow-clip px-4 py-3 relative rounded-16 shrink-0 w-full">
        <SavingsRow
          iconNode={
            <div className="flex flex-col items-center justify-center p-2 relative rounded-8 shrink-0 size-11">
              <img alt="" src={iconTruck} className="size-7" />
            </div>
          }
          title="Free deliveries"
          meta="Used 21 times"
          amount="79.22"
        />
        <img alt="" src={seprator} className="w-full h-px" />
        <SavingsRow
          iconNode={
            <div className="flex items-center justify-center relative shrink-0 size-10">
              <svg
                viewBox="0 0 40 40"
                className="block size-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Ticket body — dark rounded shape with semicircular notches */}
                <path
                  d="M5 12a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4v3.5a3 3 0 0 0 0 6V25a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-3.5a3 3 0 0 0 0-6V12Z"
                  fill="#1d2539"
                />
                {/* Percent sign in white */}
                <g fill="#ffffff">
                  <circle cx="16" cy="16.5" r="1.6" />
                  <circle cx="24" cy="20.5" r="1.6" />
                  <rect
                    x="13.4"
                    y="17.6"
                    width="13.2"
                    height="1.6"
                    rx="0.8"
                    transform="rotate(-40 20 18.5)"
                  />
                </g>
              </svg>
            </div>
          }
          title="Member-only deals"
          meta="Used 3 times"
          amount="48.22"
        />
        <img alt="" src={seprator} className="w-full h-px" />
        <SavingsRow
          iconNode={
            <div className="flex items-center justify-center relative shrink-0 size-10">
              <OsnPlusMark className="h-3.5" />
            </div>
          }
          title="OSN+ subscriptions"
          meta="Activated"
          amount="29.99"
        />
      </div>
    </SmoothCorners>
  );
}

/* ---------- Brand ticker ---------- */

/**
 * Auto-scrolling brand ticker. The carousel content is now a single composite
 * SVG (`brand-trail.svg` — supplied by the user, native dimensions 345×81).
 * The track holds two side-by-side copies; the `marquee` keyframe in
 * tailwind.config.js translates 0 → -50% so the second copy lands exactly
 * where the first started — a seamless infinite loop. No JS / RAF needed
 * because the SVG is one composited image — per-tile centre-scaling no
 * longer applies (it's baked into the SVG instead).
 */
export function PromoStrip() {
  // Matches Figma node 20787:4759 — white card with the brand trail on top
  // and the "Unlimited same day free delivery" headline + subtext below.
  return (
    <SmoothCorners
      radius={12}
      className="h-[166px] relative shrink-0 w-full"
      style={{
        background:
          "radial-gradient(ellipse 173px 83px at 50% 50%, #fcfcfc 0%, #ffffff 100%)",
      }}
    >
      {/* Headline + subtext, anchored to the lower portion of the card */}
      <div className="-translate-x-1/2 absolute flex flex-col gap-1 items-center justify-center left-1/2 text-center top-[100px] w-full px-4">
        <p className="font-bold text-[#171717] text-h16 w-full">
          Unlimited same day free delivery
        </p>
        <p className="font-normal text-[#3d3d3d] text-label-4p w-full">
          exclusive member deals
        </p>
      </div>

      {/* Brand trail viewport */}
      <div
        className="absolute left-0 right-0 top-2 h-[88px] overflow-hidden"
        aria-label="Brand partners ticker"
      >
        <div className="absolute inset-y-0 left-0 flex w-max items-center animate-marquee">
          <img
            src={brandTrail}
            alt="noon brand partners"
            draggable={false}
            className="block h-20 w-[345px] shrink-0 select-none"
          />
          <img
            src={brandTrail}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="block h-20 w-[345px] shrink-0 select-none"
          />
        </div>
      </div>
    </SmoothCorners>
  );
}

export function OsnCard() {
  return (
    <SmoothCorners
      radius={12}
      className="bg-white h-[139px] relative w-[346px]"
    >
      <div className="absolute flex flex-wrap gap-[6px_10px] items-start left-3 top-4 w-56">
        <p className="font-bold shrink-0 text-h16 text-[#02060c]/90 w-[200px]">
          OSN+ is available now
        </p>
        <div className="flex items-center justify-center w-[155px]">
          <p className="flex-1 font-normal text-label-4p text-[#02060c]/75">
            Watch your favourite shows!
          </p>
        </div>
      </div>
      {/* OSN+ pill — circular badge with the OSN+ wordmark properly sized */}
      <div className="absolute right-3 top-2 size-10 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-center">
        <OsnPlusMark className="h-3.5" />
      </div>
      {/* Activate button */}
      <button className="absolute bg-black flex items-center justify-center left-3 px-5 py-2 rounded-8 top-[86.21px] cursor-pointer">
        <p className="font-bold leading-none text-b14 text-center text-white whitespace-nowrap">
          Activate now
        </p>
      </button>
      {/* TV illustration */}
      <div className="absolute h-[115.59px] left-52 overflow-clip top-6 w-[183.349px]">
        <div className="absolute h-[99px] left-5 top-8 w-[109px] overflow-hidden">
          <img
            alt=""
            src={visualTvEn}
            className="absolute h-[127.08%] left-[-11.15%] top-[-10.17%] w-[130.85%] max-w-none"
          />
        </div>
      </div>
    </SmoothCorners>
  );
}

function ValuePropsRow({
  title,
  subtitle,
  trailing,
}: {
  title: string;
  subtitle: string;
  trailing: React.ReactNode;
}) {
  return (
    <div className="flex h-10 items-center justify-between relative shrink-0 w-full">
      <div className="flex flex-1 gap-2 items-start min-w-0 relative">
        <div className="relative shrink-0 size-4">
          <div className="absolute inset-[-31.25%_-62.5%_-68.75%_-37.5%]">
            <img alt="" src={star} className="block w-full h-full" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0 relative">
          <p className="font-bold text-[#02060c]/90 text-h16 w-full">
            {title}
          </p>
          <p className="font-normal text-[#02060c]/75 text-label-4p w-full">
            {subtitle}
          </p>
        </div>
      </div>
      {trailing}
    </div>
  );
}

export function ValuePropsCard() {
  const trailingGift = (
    <div className="relative shrink-0 size-11">
      <img alt="" src={ellipse24014} className="absolute inset-0 w-full h-full" />
      <img alt="" src={giftBox} className="absolute left-3 top-3 w-5 h-5" />
    </div>
  );
  const trailingCoupon = (
    <div className="relative shrink-0 size-11">
      <img alt="" src={ellipse24014} className="absolute inset-0 w-full h-full" />
      <div className="absolute left-2 top-2 w-7 h-7">
        <img alt="" src={couponVec1} className="absolute left-1.5 top-1.5 w-5 h-4" />
        <img alt="" src={couponVec2} className="absolute left-0 top-1.5 w-1.5 h-4" />
        <img alt="" src={couponGroup} className="absolute left-3 top-2.5 w-2 h-2" />
        <img alt="" src={couponPercent} className="absolute left-6 top-5 w-1 h-1" />
      </div>
    </div>
  );
  const brandStack = (
    <div className="flex flex-col h-11 items-end justify-center shrink-0">
      <div className="flex flex-col items-start w-28">
        <div className="flex items-start pr-3.5 relative">
          {/* yellow noon */}
          <div className="bg-[#f7e628] border-[0.747px] border-[#02060c]/5 -mr-3.5 relative rounded-full shrink-0 size-9">
            <img alt="" src={foodLogo} className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 h-1.5 w-5" />
          </div>
          {/* food red */}
          <div className="bg-[#e5004e] border-[0.747px] border-[#02060c]/5 -mr-3.5 relative rounded-full shrink-0 size-9 overflow-clip">
            <img alt="" src={foodFrame} className="absolute inset-0 size-full" />
          </div>
          {/* namshi blue */}
          <div className="bg-[#2122b8] border-[0.747px] border-[#02060c]/5 -mr-3.5 relative rounded-full shrink-0 size-9 overflow-clip">
            <img alt="" src={namshiG1} className="absolute inset-[36.89%_29.11%_50%_29.11%]" />
            <img alt="" src={namshiG2} className="absolute inset-[50%_41.28%_36.9%_29.11%]" />
          </div>
          {/* orange */}
          <div className="bg-[#ef5227] -mr-3.5 overflow-clip relative rounded-full shrink-0 size-8">
            <img alt="" src={layer2} className="absolute -translate-x-1/2 -translate-y-1/2 left-[calc(50%-2px)] top-1/2 h-6 w-5" />
          </div>
          {/* dark red */}
          <div className="bg-[#d22d29] border-[0.747px] border-[#02060c]/5 -mr-3.5 relative rounded-full shrink-0 size-9 overflow-clip">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-7 h-1.5 overflow-hidden">
              <img alt="" src={brandTags} className="absolute h-full -left-[81.72%] w-[181.72%] max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SmoothCorners
      radius={12}
      className="bg-white flex flex-col gap-5 items-start px-3 py-5 relative shrink-0 w-full"
    >
      <ValuePropsRow
        title="Free 15 Days trial"
        subtitle="Risk free, you can cancel anytime"
        trailing={trailingGift}
      />
      <img alt="" src={seprator2} className="w-full h-px" />
      <ValuePropsRow
        title="Unlimited Free Delivery"
        subtitle="On food, groceries, & shopping"
        trailing={brandStack}
      />
      <img alt="" src={seprator2} className="w-full h-px" />
      <ValuePropsRow
        title="Member-Only Deals"
        subtitle="Big savings, every month"
        trailing={trailingCoupon}
      />
    </SmoothCorners>
  );
}

export function FaqCard() {
  const items: { q: string; a: string }[] = [
    {
      q: "What is noon One?",
      a: "noon One is noon's premium membership. It bundles unlimited free delivery, exclusive member deals, and 10% cashback every month — plus benefits across noon Food, noon Daily, and noon Minutes.",
    },
    {
      q: "How much does noon One cost?",
      a: "AED 24.99/month or AED 11.99/month when billed yearly (AED 143.88/year — saves you AED 156). You can switch between monthly and yearly any time.",
    },
    {
      q: "Do I get a free trial? If yes, what does it include?",
      a: "Yes — new members get a 15-day free trial with full access to every noon One benefit. Cancel any time during the trial and you won't be charged.",
    },
    {
      q: "What does free delivery on noon Express include?",
      a: "Unlimited free delivery on all noon Express orders, no minimum basket required. Includes noon Minutes (sub-15-min grocery), noon Food, and noon Daily orders.",
    },
  ];

  // Track which row is open. Single-expand pattern (only one question
  // open at a time) keeps the card visually compact and matches how iOS
  // Settings / Apple Support FAQs behave.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SmoothCorners
      radius={12}
      className="bg-white flex flex-col gap-3 items-start pt-4 px-3 pb-2 relative w-[343px]"
    >
      <p className="font-semibold text-[#171717] text-h16">
        Frequently asked questions
      </p>
      <div className="flex flex-col items-start w-full">
        {items.map(({ q, a }, i) => {
          const isOpen = openIndex === i;
          const isLast = i === items.length - 1;
          return (
            <div
              key={i}
              className={`${isLast ? "" : "border-b border-blue-gray-200"} flex flex-col w-full`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex gap-4 items-center py-3.5 w-full cursor-pointer text-left"
              >
                <p className="flex-1 font-medium text-[#404040] text-label-3p">
                  {q}
                </p>
                <img
                  alt=""
                  src={chevronDown1}
                  className="size-5 shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {/* Answer panel — animated grid-rows trick keeps height
                  flexible (no JS measurement) while smoothly easing in
                  and out. */}
              <div
                className="grid transition-[grid-template-rows] duration-250 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="font-noontree text-label-3 text-blue-gray-600 pb-3.5 pr-7">
                    {a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SmoothCorners>
  );
}

export default function SubscribedUser({
  onManageMembership,
  onSharePlan,
}: {
  onManageMembership?: () => void;
  onSharePlan?: () => void;
} = {}) {
  return (
    <div className="bg-blue-gray-200 relative w-[375px] h-[812px] mx-auto rounded-16 overflow-hidden">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="relative w-full">
          {/* Decorative orange/yellow bg blobs in upper area */}
          <div className="absolute h-[774px] left-[-284.5px] top-[-101px] w-[937px] pointer-events-none overflow-hidden">
            <div className="absolute h-[420px] left-[106px] -top-7 w-[426px]">
              <img alt="" src={ellipse3931} className="absolute -inset-[33%] w-[177%] h-[166%] max-w-none" />
            </div>
            <div className="absolute h-[485px] left-[400px] top-[-178.5px] w-[496px]">
              <img alt="" src={ellipse3930} className="absolute -inset-[27%] w-[154%] h-[154%] max-w-none" />
            </div>
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[789px] left-[calc(50%+0.5px)] mix-blend-lighten top-1/2 w-96">
              <img alt="" src={lines} className="absolute inset-0 w-full h-full" />
            </div>
          </div>

          <StatusBar />

          <button
            type="button"
            aria-label="Back"
            onClick={() => {
              if (window.history.length > 1) window.history.back();
            }}
            className="absolute left-4 top-[52px] z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform active:scale-95"
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
              <path d="M7 1 1 7l6 6" stroke="#1D2539" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative flex flex-col gap-4 items-center w-[346px] mx-auto pt-[89px] pb-10">
            <Hero />
            <CurrentPlanCard onManage={onManageMembership} />
            <div className="flex flex-col gap-4 items-center w-full">
              {/* App-open nudge — PRD §5.1.4. High-visibility entry to the
                  Duo/Family discovery flow, placed right under the user's
                  current plan summary so it pairs with the value framing
                  rather than competing with Manage Membership's plan-edit
                  controls. */}
              <ShareWithOthersCard
                ownerPrice="24.99"
                onShare={onSharePlan}
                width={346}
              />
              <SavingsCard />
              <PromoStrip />
              <OsnCard />
              <ValuePropsCard />
              <FaqCard />
            </div>
          </div>
        </div>
      </div>

      {/* iPhone home indicator — same pill as Manage Membership / Change
          Plan, pinned to the bottom edge of the iPhone frame so the home
          screen has the same device-shape illusion as the other screens. */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>
    </div>
  );
}
