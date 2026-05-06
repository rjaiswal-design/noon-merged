import { Fragment, useRef, useState } from "react";
import { motion } from "framer-motion";
import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";

/* ---------- Inline icons ---------- */

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

/** Dirham (AED) glyph from the Noontree font (PUA U+E001). */
const AED_GLYPH = "";

function Aed({ className="" }: { className?: string }) {
  return (
    <span
      aria-label="AED"
      className={`font-noontree tracking-[0] inline-block align-baseline mr-[2px] ${className}`}
    >
      {AED_GLYPH}
    </span>
  );
}

/** Selectable circle on the right side of each reason row.
    Selected state is a 5px blue stroke (per design), so the white
    fill stays visible as a small inner circle. */
function Radio({ selected }: { selected: boolean }) {
  return selected ? (
    <div className="size-5 rounded-full border-[5px] border-blue-600 bg-white shrink-0" />
  ) : (
    <div className="size-5 rounded-full border border-bluegray-500 bg-white shrink-0" />
  );
}

/* ---------- Reason options ---------- */

const REASONS = [
  "The price is quite high",
  "No longer need the benefits of noon one",
  "I don't order often enough",
  "Pausing my membership temporarily",
  "Found better value elsewhere",
  "Issues with orders",
  "Other",
] as const;

type Reason = (typeof REASONS)[number];

/* ---------- Screen ---------- */

export default function CancelFeedback({
  onBack,
  onKeepMembership,
  onContinueCancellation,
}: {
  onBack: () => void;
  onKeepMembership: () => void;
  onContinueCancellation: (reason: Reason, otherText?: string) => void;
}) {
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null);
  const [otherText, setOtherText] = useState("");
  // Tracks whether the user has tried to submit with Other selected but no
  // text — once true, the input shows its error state until they type.
  const [showOtherError, setShowOtherError] = useState(false);
  const [otherFocused, setOtherFocused] = useState(false);
  const otherInputRef = useRef<HTMLInputElement>(null);
  // Floating-label is "lifted" whenever the input has focus or content.
  const otherLabelFloated = otherFocused || otherText.length > 0;

  const handleContinue = () => {
    if (!selectedReason) return;
    if (selectedReason === "Other" && otherText.trim() === "") {
      setShowOtherError(true);
      return;
    }
    onContinueCancellation(
      selectedReason,
      selectedReason === "Other" ? otherText.trim() : undefined,
    );
  };

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #ffffff 0%, #f4f3f3 21%, #f4f3f3 100%)",
      }}
    >
      <StatusBar />

      {/* Back button — floats top-left */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="absolute left-3.5 top-[59px] z-20 bg-white border border-blue-gray-200 flex items-center justify-center p-2 rounded-16 cursor-pointer"
      >
        <BackChevron className="size-5" />
      </button>

      {/* Scrollable content area — leaves room for the fixed action bar
          (~158px including home indicator). */}
      <div className="absolute inset-0 pt-28 pb-[180px] overflow-y-auto">
        <div className="px-3.5 flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <p className="font-bold text-bluegray-800 text-h28">
              Before you go,
            </p>
            <p className="font-noontree text-blue-gray-600 text-h16">
              You can save{" "}
              <span className="relative inline-flex overflow-clip font-bold text-green-600">
                <Aed />928/year
                <motion.span
                  className="absolute inset-y-0 w-[60%] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
                  }}
                  animate={{ left: ["-60%", "120%"] }}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    repeat: Infinity,
                    repeatDelay: 2.5,
                  }}
                />
              </span>{" "}
              with us. Please tell us why you want to cancel?
            </p>
          </div>

          {/* Reasons list — dividers are direct flex siblings of buttons so
              they sit between rows. They inherit the container's px-[8px]
              just like every other element in here (no negative inset). */}
          <SmoothCorners
            radius={16}
            className="bg-white rounded-16 w-full px-2 py-3 flex flex-col flex-wrap gap-1.5 shadow-[0px_2px_20px_rgba(0,0,0,0.04)]"
          >
            {REASONS.map((reason, i) => (
              <Fragment key={reason}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedReason(reason);
                    if (reason !== "Other") setShowOtherError(false);
                  }}
                  className="w-full flex items-center justify-between px-2 py-1 rounded-12 cursor-pointer shrink-0"
                >
                  <p className="font-noontree font-medium text-blue-gray-700 text-label-3p text-left">
                    {reason}
                  </p>
                  <Radio selected={selectedReason === reason} />
                </button>
                {/* When "Other" is the selected option, expand a single-line
                    input into the row immediately. Validation error shows a
                    red border + helper text until the user starts typing. */}
                {reason === "Other" && selectedReason === "Other" && (
                  <div className="px-2 pt-1 pb-1">
                    {/* Click anywhere on the field surface to focus the input
                        (so the label area is tappable too, not just the
                        narrow input strip). */}
                    <div
                      onClick={() => otherInputRef.current?.focus()}
                      className={`relative h-[52px] bg-[#f9f9fb] rounded-[8px] border cursor-text transition-colors ${
                        showOtherError
                          ? "border-[#e5004e]"
                          : otherFocused
                            ? "border-bluegray-400"
                            : "border-transparent"
                      }`}
                    >
                      {/* Floating label. Idle: sits centred like a placeholder.
                          Active (focused or has value): lifts to the top-left
                          and shrinks. Spring is brisk with a small settle so
                          the motion feels responsive but not snappy-flat. */}
                      <motion.label
                        htmlFor="other-reason-input"
                        initial={false}
                        animate={{
                          y: otherLabelFloated ? 6 : 16,
                          scale: otherLabelFloated ? 0.78 : 1,
                          color: showOtherError
                            ? "#e5004e"
                            : otherLabelFloated
                              ? "#475067"
                              : "#666d85",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 480,
                          damping: 36,
                          mass: 0.6,
                        }}
                        style={{ transformOrigin: "top left" }}
                        className="absolute left-3 right-9 top-0 pointer-events-none font-noontree font-normal text-label-3p whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        Please tell us the reason (required if other is selected)
                      </motion.label>
                      <input
                        ref={otherInputRef}
                        id="other-reason-input"
                        type="text"
                        value={otherText}
                        onChange={(e) => {
                          setOtherText(e.target.value);
                          if (e.target.value.trim() !== "") setShowOtherError(false);
                        }}
                        onFocus={() => setOtherFocused(true)}
                        onBlur={() => setOtherFocused(false)}
                        className="absolute left-3 right-9 top-6 bottom-1.5 bg-transparent border-none outline-none font-noontree font-medium text-label-3p text-[#0e0e0e]"
                      />
                      {/* Clear X — always visible per Figma; only interactive
                          when there's text to clear. Subtle scale on press. */}
                      <motion.button
                        type="button"
                        aria-label={otherText !== "" ? "Clear" : undefined}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (otherText === "") return;
                          setOtherText("");
                          setShowOtherError(false);
                          otherInputRef.current?.focus();
                        }}
                        whileTap={otherText !== "" ? { scale: 0.85 } : undefined}
                        animate={{ color: otherText !== "" ? "#666d85" : "#989fb3" }}
                        transition={{ duration: 0.15 }}
                        disabled={otherText === ""}
                        className="absolute right-3 top-1/2 -translate-y-1/2 shrink-0 cursor-pointer disabled:cursor-default"
                      >
                        <svg viewBox="0 0 16 16" className="block size-4" fill="none" aria-hidden="true">
                          <path
                            d="M4 4l8 8M12 4l-8 8"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.button>
                    </div>
                    {/* Error helper — slides in just below the field so the
                        appearance is anchored to the field, not the layout. */}
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: showOtherError ? 1 : 0,
                        y: showOtherError ? 0 : -4,
                        height: showOtherError ? "auto" : 0,
                      }}
                      transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden mt-1.5 text-b12 text-[#e5004e]"
                    >
                      *This field is required
                    </motion.p>
                  </div>
                )}
                {i < REASONS.length - 1 && (
                  <div className="border-t border-dashed border-blue-gray-300 shrink-0" />
                )}
              </Fragment>
            ))}
          </SmoothCorners>

          {/* Pro tip card */}
          <SmoothCorners
            radius={16}
            className="bg-bluegray-50 rounded-16 w-full p-3"
          >
            <p className="text-label-3 text-blue-gray-600">
              <span className="font-bold text-green-600">Pro tip:</span>
              {"  "}8 out of 10 members save 4x more than what they pay for with
              their benefits. Don't miss out!
            </p>
          </SmoothCorners>
        </div>
      </div>

      {/* Bottom fixed action bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white pt-3 pb-4 px-4 flex flex-col gap-3 rounded-tl-12 rounded-tr-12">
        <button
          type="button"
          onClick={onKeepMembership}
          className="bg-blue-gray-1000 text-white font-semibold text-b14 h-[52px] rounded-12 cursor-pointer"
        >
          Keep membership
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedReason}
          className="bg-blue-gray-100 border border-blue-gray-300 text-[#0e0e0e] font-semibold text-b14 h-[52px] rounded-12 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continue Cancellation
        </button>
        {/* iPhone home indicator */}
        <div className="flex justify-center pt-2">
          <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
        </div>
      </div>
    </div>
  );
}
