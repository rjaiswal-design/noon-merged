import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";
import oneLogoFrame from "../assets/one-logo-frame.svg";
import oneLogoGroup from "../assets/one-logo-group.svg";
import ellipse3931 from "../assets/ellipse3931.svg";


import { T } from '../lib/dsTokens';
/* ---------- Inline icons ---------- */

function BackChevron({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke={T.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke={T.color.text.primary} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function SparkleSmall({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M6 1l1.2 3.8L11 6l-3.8 1.2L6 11 4.8 7.2 1 6l3.8-1.2L6 1Z" fill={T.color.text.muted} />
    </svg>
  );
}

/** Sharp 4-point sparkle for value-prop bullets — matches the Figma's
 *  ✦ glyph used to mark each row in the info card. */
function SparkleBullet({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 19" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M8 1 L9.4 8 L15 9.5 L9.4 11 L8 18 L6.6 11 L1 9.5 L6.6 8 Z"
        fill={T.color.text.heading}
      />
    </svg>
  );
}

function EyeOffIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M2 10s2.5-5 8-5 8 5 8 5-2.5 5-8 5-8-5-8-5Z"
        stroke={T.color.text.heading}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2" stroke={T.color.text.heading} strokeWidth="1.4" />
      <path d="M3 17L17 3" stroke={T.color.text.heading} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function ArrowPathIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M3.5 8a6.5 6.5 0 0 1 11.4-3.1L17 7M16.5 12a6.5 6.5 0 0 1-11.4 3.1L3 13"
        stroke={T.color.text.heading}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 2.5V7h4.5M6 17.5V13H1.5" stroke={T.color.text.heading} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Hero illustration ---------- *
 * Two overlapping 96px circles plus the noon One badge sitting at the
 * intersection. Left circle = green gradient with the user's initial; right
 * circle = white with a centred plus to signal "add a member". The badge
 * floats below + between, matching the Figma frame. */
function HeroLockup({ initial = "A" }: { initial?: string }) {
  // Wrapper width = avatar 1 (96) + avatar 2 (96) − overlap (32) = 160px.
  // Sizing the wrapper to the exact content puts the intersection at the
  // wrapper's center, which is where the noon One badge anchors below.
  return (
    <div className="relative h-[140px] w-40">
      {/* Left avatar — green gradient with initial */}
      <div
        className="absolute left-0 top-0 size-24 rounded-full border-[2px] flex items-center justify-center z-[2]"
        style={{
          background: `linear-gradient(180deg, ${T.color.brand.grass500} 0%, ${T.color.brand.green} 100%)`,
          borderColor: T.color.brand.greenSoft,
        }}
      >
        <p
          className="font-bold text-white text-h40"
          style={{ fontFamily: "Figtree, system-ui, sans-serif" }}
        >
          {initial}
        </p>
      </div>

      {/* Right avatar — white with plus, anchored to the right edge so the
          two circles overlap by 32px in the middle. */}
      <div
        className="absolute right-0 top-0 size-24 rounded-full bg-white flex items-center justify-center z-[1]"
        style={{ boxShadow: "0 7px 16px rgba(56,56,56,0.03), 0 30px 30px rgba(56,56,56,0.03), 0 67px 40px rgba(56,56,56,0.02)" }}
      >
        <PlusIcon className="size-7" />
      </div>

      {/* noon One badge — composite: colorful frame (background) + "one"
          wordmark (foreground). The wordmark asset sets
          preserveAspectRatio="none" + width/height 100%, so we MUST give
          its <img> explicit pixel dimensions matching its 68×21.4 viewBox
          (3.18:1) — otherwise the SVG content stretches to fill whatever
          h-auto computes and renders as a tall scribble. */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-3 h-9 w-16 z-[3]">
        <img
          src={oneLogoFrame}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
        <img
          src={oneLogoGroup}
          alt="noon One"
          width={42}
          height={13}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3"
        />
      </div>
    </div>
  );
}

/* ---------- Sparkle divider ---------- *
 * Two thin lines flanking a small 4-point sparkle, centered. */
function SparkleDivider() {
  return (
    <div className="flex items-center gap-2 w-full px-10 mt-4 mb-2">
      <div className="flex-1 h-px" style={{ backgroundColor: T.color.border.divider }} />
      <SparkleSmall className="size-3" />
      <div className="flex-1 h-px" style={{ backgroundColor: T.color.border.divider }} />
    </div>
  );
}


/* ---------- Two-row info card ---------- */
function InfoRow({
  title,
  body,
  icon,
}: {
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-1 gap-3 items-start min-w-0">
        <SparkleBullet className="h-5 w-4 shrink-0 mt-px" />
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <p className="font-noontree font-bold text-label-3p" style={{ color: T.color.text.strong }}>
            {title}
          </p>
          <p className="font-noontree font-medium text-b12" style={{ color: T.color.text.muted }}>
            {body}
          </p>
        </div>
      </div>
      <div
        className="flex items-center justify-center p-2 rounded-full border shrink-0 ml-2"
        style={{ backgroundColor: T.color.surface.subtle, borderColor: T.color.border.subtle }}
      >
        {icon}
      </div>
    </div>
  );
}

/* ---------- "Phone-shape" steps illustration ---------- *
 * A vertical pill mimicking a smartphone, with stylized speaker/notch tabs
 * top + bottom and three numbered marker positions (1 top, 2 middle, 3
 * bottom). Decorative — the actual step text lives to the right. */
function PhoneStepsTrack() {
  return (
    <div
      className="flex flex-col h-44 items-center p-0.5 rounded-32 shrink-0 w-7 relative"
      style={{ background: `linear-gradient(180deg, ${T.color.border.divider} 0%, ${T.color.border.muted} 100%)` }}
    >
      {/* Top tab — represents the phone's speaker / receiver area; carries "1" */}
      <NumberedTab label="1" />

      {/* Spine + middle "user" tile + bottom tab */}
      <div className="flex-1 w-full flex flex-col items-center justify-between py-1.5">
        <div className="flex flex-col items-center gap-1 opacity-90">
          <ChevronDot />
          <ChevronDot />
        </div>

        {/* Middle marker — small rounded plate carrying "2" */}
        <NumberedPlate label="2" />

        <div className="flex flex-col items-center gap-1 opacity-90">
          <ChevronDot />
          <ChevronDot />
        </div>
      </div>

      {/* Bottom tab — mirrors the top, carries "3" */}
      <NumberedTab label="3" flipped />
    </div>
  );
}

function NumberedTab({ label, flipped = false }: { label: string; flipped?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center px-[2.5px] pt-[5px] pb-[2.5px] border ${flipped ? "rounded-tl-4 rounded-tr-4 rounded-bl-32 rounded-br-32" : "rounded-tl-32 rounded-tr-32 rounded-bl-4 rounded-br-4"}`}
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.32), rgba(255,255,255,0.32)), linear-gradient(90deg, rgba(255,255,255,0.16), rgba(255,255,255,0.16))",
        borderColor: "rgba(245,245,245,0.5)",
        minWidth: "20px",
      }}
    >
      <span
        className="text-tiny"
        style={{ fontFamily: "Noontree, sans-serif", fontWeight: 800, color: T.color.text.body }}
      >
        {label}
      </span>
    </div>
  );
}

function NumberedPlate({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center p-0.5 rounded-4 border"
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.32), rgba(255,255,255,0.32)), linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12))",
        borderColor: "rgba(245,245,245,0.4)",
        boxShadow: "0 3.75px 3.75px rgba(0,0,0,0.06)",
        minWidth: "20px",
      }}
    >
      <span
        className="text-tiny"
        style={{ fontFamily: "Noontree, sans-serif", fontWeight: 800, color: T.color.text.body }}
      >
        {label}
      </span>
    </div>
  );
}

function ChevronDot() {
  return (
    <svg viewBox="0 0 16 16" className="size-3 opacity-80" fill="none" aria-hidden="true">
      <path d="M4 6.5L8 10L12 6.5" stroke="white" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- How-it-works steps card ---------- */
const STEPS: { title: string; body: string }[] = [
  { title: "Share your invite link", body: "Send your link to someone you’d like to add." },
  { title: "They join your plan", body: "They open the link and follow a few quick steps." },
  { title: "Benefits start right away", body: "Both of you can enjoy noon One benefits" },
];

function StepsCard() {
  return (
    <SmoothCorners radius={16} className="bg-white rounded-16 flex w-full px-3 py-4 gap-3.5">
      <PhoneStepsTrack />
      <div className="flex flex-1 flex-col gap-5 pb-2">
        {STEPS.map((step, i) => (
          <div key={step.title} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="font-noontree font-bold text-label-3p" style={{ color: T.color.text.strong }}>
                {step.title}
              </p>
              <p className="font-noontree font-medium text-b12" style={{ color: T.color.text.muted }}>
                {step.body}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div className="h-px w-full border-t border-dashed" style={{ borderColor: T.color.border.divider }} />
            )}
          </div>
        ))}
      </div>
    </SmoothCorners>
  );
}

/* ---------- Screen ---------- */

export default function ShareLanding({
  onBack,
  onCheckPlans,
  ownerInitial = "A",
}: {
  onBack: () => void;
  onCheckPlans?: () => void;
  ownerInitial?: string;
}) {
  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <StatusBar />

      {/* Decorative warm gradient blob in upper area */}
      <div
        className="absolute left-0 right-0 -top-1 h-[260px] pointer-events-none overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(242,226,181,0.32) 0%, rgba(238,170,62,0.55) 12%, rgba(251,251,251,0) 70%)",
        }}
      >
        <img
          src={ellipse3931}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-[420px] h-[420px] mix-blend-color-dodge opacity-70"
        />
      </div>

      {/* Floating back button */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="absolute left-4 top-14 size-10 rounded-full bg-white border flex items-center justify-center cursor-pointer z-10 shrink-0"
        style={{ borderColor: "#e3e3e3" }}
      >
        <BackChevron className="size-5" />
      </button>

      {/* Scroll body — pb leaves room for the sticky CTA bar (h-52 button
          + 12px top + 28px home indicator zone ≈ 96px). */}
      <div className="relative h-full overflow-y-auto pt-[60px] pb-[120px]">
        <div className="flex flex-col items-center w-[343px] mx-auto">

          {/* Hero lockup */}
          <div className="mt-3 flex justify-center">
            <HeroLockup initial={ownerInitial} />
          </div>

          {/* Title + subhead */}
          <div className="flex flex-col items-center gap-2.5 text-center mt-2">
            <p
              className="font-noontree font-bold text-h24 w-[230px]"
              style={{ color: T.color.text.heading }}
            >
              Share noon One with your family
            </p>
            <p
              className="font-noontree font-medium text-b14"
              style={{ color: T.color.text.muted }}
            >
              Same perks. No extra cost.
            </p>
          </div>

          <SparkleDivider />

          {/* Two-row info card */}
          <SmoothCorners
            radius={12}
            className="bg-white rounded-12 flex flex-col gap-3 px-4 py-3.5 w-full"
          >
            <InfoRow
              title="Your accounts stay separate"
              body="Orders and payment details stay private."
              icon={<EyeOffIcon className="size-5" />}
            />
            <div className="h-px w-full" style={{ backgroundColor: T.color.border.divider }} />
            <InfoRow
              title="Manage members"
              body="Change your +1 once every 30 days."
              icon={<ArrowPathIcon className="size-5" />}
            />
          </SmoothCorners>

          {/* How it works section */}
          <div className="flex flex-col gap-2 w-full mt-5">
            <p
              className="font-noontree font-bold text-h16 pl-1"
              style={{ color: T.color.text.heading }}
            >
              How it works
            </p>
            <StepsCard />
          </div>

          {/* Footer */}
          <p
            className="font-noontree font-medium text-b12 text-center w-80 mt-5"
            style={{ color: T.color.text.muted }}
          >
            By participating, you can confirm that you have read and agree to our{" "}
            <span className="underline" style={{ textDecorationColor: T.color.text.muted }}>
              Terms and conditions
            </span>
          </p>
        </div>
      </div>

      {/* Sticky bottom CTA — sits above the home indicator with a soft
          divider line so the body content scrolls underneath cleanly. */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 bg-white border-t px-4 pt-3 pb-9"
        style={{ borderColor: T.color.border.divider }}
      >
        <button
          type="button"
          onClick={onCheckPlans}
          className="w-full h-[52px] rounded-12 flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: T.color.text.primary }}
        >
          <span className="font-noontree font-semibold text-label-3p text-white">
            Check plans
          </span>
        </button>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>
    </div>
  );
}
