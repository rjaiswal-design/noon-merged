import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import StatusBar from "../components/primitives/StatusBar"
import StarIcon from "../icons/StarIcon"
import CrossIcon from "../icons/CrossIcon"
import { useReviewStore, type ReviewStep } from "../store/reviewStore"
import { SHIPMENTS } from "../data/orders"
import { ratingColor, type Rating } from "../utils/ratingColors"
import {
  countCoveredTopics,
  detectProfanity,
  cleanProfanity,
  randomShimmerMs,
  heightForVariant,
  SUGGESTION_TAGS,
  PRAISE_TOPICS_THRESHOLD,
  SUGGESTIONS_HEIGHT,
  PRAISE_HEIGHT,
  PROFANITY_HEIGHT,
  SHIMMER_MAX_MS,
  type ProfanityMatch,
  type SuggestionVariant,
} from "./review-text-entry/utils"
import { ExclamationIcon, SparkleEditIcon } from "./review-text-entry/icons"

// Soft entrance for Question + InputContainer at the tail end of the
// morph transition: rise 5% from below their final position while
// fading from 0 → 1. Spring tuned for a tactile, low-bounce settle.
const ENTRANCE_INITIAL = { opacity: 0, y: "5%" } as const
const ENTRANCE_ANIMATE = { opacity: 1, y: 0 } as const
const ENTRANCE_TRANSITION = {
  type: "spring",
  duration: 0.55,
  bounce: 0.18,
} as const

// Suggestion strip enter/exit — Emil-style soft spring. Heights animate
// alongside opacity so the textarea visibly contracts to make room.
const SUGGESTIONS_TRANSITION = {
  type: "spring",
  duration: 0.5,
  bounce: 0.15,
} as const

// Delay after the review screen mounts before the suggestion strip slides in.
const SUGGESTIONS_INTRO_DELAY_MS = 800
// Idle time (no typing) after which the suggestion strip re-appears.
const SUGGESTIONS_PAUSE_MS = 2000

// Step transition (text-entry ⇄ photos). Tweens with Emil's iOS-drawer
// curve for a soft, no-overshoot translate; covers slide, fade, and the
// shape-morph of the input container all at once.
const STEP_DURATION_S = 0.55
const STEP_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1]
const STEP_TRANSITION = {
  duration: STEP_DURATION_S,
  ease: STEP_EASE,
} as const

// Collapsed "Your review" pill geometry in the photos step. Sits at y=80
// (Retune spec moved it 18px down from the original 62), centered at 144px
// wide × 38px tall. Border thins to 1px in subtle gray.
const PILL_TOP = 80
const PILL_WIDTH = 144
const PILL_HEIGHT = 38
const PILL_LEFT = (375 - PILL_WIDTH) / 2 // 115.5

// Off-stage Y for the panels that slide in from below the viewport.
// Device frame is 812px tall; this translates the photos panel (which sits
// at top:110) past the bottom edge with buffer to cover its full height.
const BELOW_VIEWPORT_Y = 820

// First step of the review submission flow. Layout follows Figma node
// `ReviewTextEntryScreen / Empty (Skip Voice)` (1759:23270): a 375×812
// surface with a circular product hero anchored at the top, a rating pill
// "★ N" tucked under it, the question, the input box, and a Next button.
// On iOS Safari/Capacitor, focusing the textarea pops the native keyboard.
export default function ReviewTextEntryScreen() {
  const activeShipmentId = useReviewStore((s) => s.activeShipmentId)
  const ratings = useReviewStore((s) => s.ratings)
  const goBack = useReviewStore((s) => s.goBackToOrders)
  const reviewText = useReviewStore((s) => s.reviewText)
  const setReviewText = useReviewStore((s) => s.setReviewText)
  const step = useReviewStore((s) => s.reviewStep)
  const goToPhotos = useReviewStore((s) => s.goToPhotos)
  const goBackToText = useReviewStore((s) => s.goBackToText)

  const shipment = SHIPMENTS.find((s) => s.id === activeShipmentId)
  const rating = (activeShipmentId ? ratings[activeShipmentId] : 0) ?? 0

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstMountRef = useRef(true)

  useEffect(() => {
    // While in the photos step the textarea is collapsed — drop the keyboard.
    if (step !== "text") {
      inputRef.current?.blur()
      return
    }
    // First mount waits for the morph layer to land before popping the
    // keyboard; subsequent text-step entries (back from photos) focus
    // immediately so editing feels responsive.
    const delay = isFirstMountRef.current ? 1300 : 80
    isFirstMountRef.current = false
    const t = window.setTimeout(() => inputRef.current?.focus(), delay)
    return () => window.clearTimeout(t)
  }, [step])

  if (!shipment) return null

  const isText = step === "text"
  const nextEnabled =
    reviewText.length > 12 && detectProfanity(reviewText).length === 0

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(179.92deg, #ffffff 0%, #f2f3f7 42.247%)",
      }}
    >
      <ScreenHeader onClose={goBack} />

      {/* Hero + question fly up beyond the viewport when stepping forward.
          Wrapper covers the full frame purely so its transform applies to
          the absolutely-positioned descendants — pointer-events-none so it
          doesn't intercept clicks meant for the input container below. */}
      <motion.div
        animate={{ y: isText ? 0 : -240, opacity: isText ? 1 : 0 }}
        transition={STEP_TRANSITION}
        className="pointer-events-none absolute inset-0"
      >
        <ProductRatingHero
          productImage={shipment.productImage}
          rating={rating}
        />
        <Question />
      </motion.div>

      <InputContainer
        value={reviewText}
        onChange={setReviewText}
        ref={inputRef}
        step={step}
        onPillTap={goBackToText}
      />

      {/* Speak + Next fade with the text-step affordances. Wrapper passes
          through pointer events; the buttons themselves stay clickable. */}
      <motion.div
        animate={{ opacity: isText ? 1 : 0 }}
        transition={STEP_TRANSITION}
        className="pointer-events-none absolute inset-0"
      >
        <SpeakReviewButton secondary={reviewText.length > 0} />
        <NextButton enabled={nextEnabled} onClick={goToPhotos} />
      </motion.div>

      {/* Photos panel — pre-positioned off-screen below; slides to its
          resting y when stepping into photos. */}
      <motion.div
        initial={{ y: BELOW_VIEWPORT_Y }}
        animate={{ y: isText ? BELOW_VIEWPORT_Y : 0 }}
        transition={STEP_TRANSITION}
        className="absolute top-[243px] left-[16px] w-[343px]"
      >
        <PhotosPanel />
      </motion.div>

      {/* Bottom bar with toggle + Submit — slides up from below. */}
      <motion.div
        initial={{ y: 320 }}
        animate={{ y: isText ? 320 : 0 }}
        transition={STEP_TRANSITION}
        className="absolute bottom-0 left-0 right-0"
      >
        <BottomBar />
      </motion.div>
    </div>
  )
}

function ScreenHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex flex-col">
      <StatusBar />
      <div className="flex items-center px-3 py-2">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-border-subtle bg-surface-primary"
        >
          <CrossIcon size={20} />
        </button>
      </div>
    </div>
  )
}

// Product image as a circular hero (84×84) with the rating pill tucked
// under its bottom edge. The MorphLayer flies copies of the source product
// image and 5 stars to these final positions, so this screen renders them
// at rest with no entry animation.
function ProductRatingHero({ productImage, rating }: { productImage: string; rating: 0 | Rating }) {
  return (
    <div className="absolute top-[62px] left-[16px] flex w-[343px] flex-col items-center gap-4">
      <div className="flex flex-col items-center pb-[10px]">
        <div className="relative -mb-[10px] size-[84px] overflow-hidden rounded-[62.16px] border-[0.742px] border-border-subtle bg-surface-primary">
          <img src={productImage} alt="" className="block size-full object-cover" />
        </div>
        <RatingPill rating={rating} />
      </div>
    </div>
  )
}

function RatingPill({ rating }: { rating: 0 | Rating }) {
  const color = rating > 0 ? ratingColor(rating as Rating) : "#D0D4DD"
  return (
    <div className="relative -mb-[10px] flex items-center gap-[3px] px-2 py-1">
      {/* Pill chrome (bg + border) is rendered as a separate layer so it
          can fade in once the morph stars land. Without this, the morph
          → pill handoff snaps to a fully-formed pill in a single frame
          ("the jerk"); fading just the chrome keeps the stars perfectly
          continuous from morph layer to static pill. */}
      <motion.div
        aria-hidden
        className="absolute inset-0 origin-left rounded-[43px] border border-border-subtle bg-surface-primary"
        initial={{ opacity: 0, scaleX: 0.55 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
      />
      <div className="relative flex items-center pr-[16px]">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="-mr-[16px] size-4 shrink-0"
            style={{ zIndex: 5 - i }}
          >
            <StarIcon size={14} fill={color} stroke={color} strokeWidth={1} />
          </div>
        ))}
      </div>
      <motion.span
        className="relative text-[14px] font-bold leading-[20px] text-text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.28, ease: "easeOut", delay: 0.08 }}
      >
        {rating || 0}
      </motion.span>
    </div>
  )
}

function Question() {
  return (
    <motion.div
      className="absolute top-[182px] left-[16px] flex w-[343px] justify-center"
      initial={ENTRANCE_INITIAL}
      animate={ENTRANCE_ANIMATE}
      transition={ENTRANCE_TRANSITION}
    >
      <p className="text-center text-[18px] font-bold leading-[24px] tracking-[-0.15px] text-text-primary">
        What did you like most
        <br />
        about this product?
      </p>
    </motion.div>
  )
}

interface InputProps {
  value: string
  onChange: (s: string) => void
  ref: React.Ref<HTMLTextAreaElement>
  step: ReviewStep
  onPillTap: () => void
}

function InputContainer({ value, onChange, ref, step, onPillTap }: InputProps) {
  const isPhotos = step === "photos"
  // Strip is hidden while the user types; on a 2s typing pause it re-shows.
  // Variant depends on how many of the suggested topics have been covered:
  // < threshold ⇒ original prompt, ≥ threshold ⇒ praise note. Empty state
  // gets a shorter intro delay so the strip nudges the user as the screen
  // settles in. Profanity short-circuits everything: while ANY profane word
  // is in the text, the strip becomes the warning and the timer is paused.
  const [pauseVariant, setPauseVariant] = useState<SuggestionVariant | null>(
    null,
  )
  // While true, profane words shimmer in orange before being swapped for
  // their non-profane stand-ins. See `handleFixIt` below.
  const [isFixing, setIsFixing] = useState(false)
  const fixTimerRef = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const profanityMatches = detectProfanity(value)
  const hasProfanity = profanityMatches.length > 0
  const variant: SuggestionVariant | null = hasProfanity
    ? "profane"
    : pauseVariant

  // Tapping "Fix it" runs an orange shimmer over each flagged word, then
  // replaces the value with the cleaned text. The shimmer max is capped so
  // the whole gesture finishes in under SHIMMER_MAX_MS ms.
  const handleFixIt = () => {
    if (isFixing) return
    if (!hasProfanity) return
    setIsFixing(true)
    if (fixTimerRef.current !== null) {
      window.clearTimeout(fixTimerRef.current)
    }
    fixTimerRef.current = window.setTimeout(() => {
      onChange(cleanProfanity(value))
      setIsFixing(false)
      fixTimerRef.current = null
    }, SHIMMER_MAX_MS)
  }

  useEffect(() => {
    return () => {
      if (fixTimerRef.current !== null) window.clearTimeout(fixTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    // Hide immediately on every keystroke; the timer below decides what to
    // show next once the user stops typing. Profanity overrides — we don't
    // want suggestion content fighting the warning, so leave pauseVariant null.
    setPauseVariant(null)
    if (hasProfanity) return

    const isEmpty = value.length === 0
    const delay = isEmpty ? SUGGESTIONS_INTRO_DELAY_MS : SUGGESTIONS_PAUSE_MS
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      const covered = countCoveredTopics(value)
      setPauseVariant(covered >= PRAISE_TOPICS_THRESHOLD ? "praise" : "original")
    }, delay)

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [value, hasProfanity])

  // Keep the highlight overlay in sync with textarea scroll so wrapped
  // long reviews don't visually drift.
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (overlayRef.current) {
      overlayRef.current.scrollTop = e.currentTarget.scrollTop
    }
  }

  return (
    <motion.div
      className="absolute flex flex-col overflow-hidden border-2 border-surface-primary"
      // Initial pins every animated property to the text-step values so the
      // entrance only animates `opacity` (0→1) and `y` (5%→0) — without this
      // motion would assume top/left/width/height start at 0 and shoot the
      // container in from the upper-left corner.
      initial={{
        opacity: 0,
        y: "5%",
        top: 258,
        left: 16,
        width: 343,
        height: 194,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "#F2F3F7",
      }}
      animate={{
        opacity: 1,
        y: 0,
        top: isPhotos ? PILL_TOP : 258,
        left: isPhotos ? PILL_LEFT : 16,
        width: isPhotos ? PILL_WIDTH : 343,
        height: isPhotos ? PILL_HEIGHT : 194,
        borderRadius: isPhotos ? 47 : 16,
        borderWidth: isPhotos ? 1 : 2,
        borderColor: isPhotos ? "#F2F3F7" : "#FFFFFF",
        backgroundColor: isPhotos
          ? "#ffffff"
          : hasProfanity
            ? "#FFF1E0"
            : "#F2F3F7",
      }}
      transition={isPhotos ? STEP_TRANSITION : ENTRANCE_TRANSITION}
    >
      {/* Photos-step: collapsed "Your review" pill. Tapping returns to the
          text step (the wrapper itself owns the pill shape). */}
      {isPhotos ? (
        <button
          type="button"
          onClick={onPillTap}
          className="flex size-full items-center justify-center gap-2 px-4 py-2"
        >
          <span className="text-[14px] font-semibold leading-5 text-text-primary">
            Your review
          </span>
          <img
            src="/reviews-flow/icons/edit.svg"
            alt=""
            className="block size-4 shrink-0"
            draggable={false}
          />
        </button>
      ) : (
        <>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-[13px] bg-surface-secondary">
            {/* Visible mirror — renders the text with profanity highlighted.
                Sits below a transparent textarea so the cursor and selection
                still come from the native control. */}
            <div
              ref={overlayRef}
              aria-hidden
              className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre-wrap break-words p-3 text-[14px] leading-[22px] text-text-primary"
            >
              <HighlightedText
                value={value}
                matches={profanityMatches}
                fixing={isFixing}
              />
              {/* Trailing space ensures a final newline gets a row to occupy. */}
              {"​"}
            </div>
            <textarea
              ref={ref}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onScroll={handleScroll}
              placeholder="Start typing here"
              className="relative size-full resize-none bg-transparent p-3 text-[14px] leading-[22px] text-transparent caret-text-primary selection:bg-text-primary/20 placeholder:text-text-tertiary focus:outline-none"
            />
          </div>
          <AnimatePresence mode="wait">
            {variant !== null && (
              <motion.div
                key={variant}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: heightForVariant(variant), opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={SUGGESTIONS_TRANSITION}
                className="shrink-0 overflow-hidden bg-transparent"
              >
                {variant === "profane" ? (
                  <ProfanityWarning onFix={handleFixIt} />
                ) : variant === "praise" ? (
                  <PraiseSuggestion />
                ) : (
                  <Suggestions />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  )
}

// Renders text with profane substrings wrapped in bold-orange spans. Plain
// text is rendered as-is so the visual matches a normal textarea exactly.
// While `fixing` is true, each profane span gets an orange shimmer overlay.
function HighlightedText({
  value,
  matches,
  fixing = false,
}: {
  value: string
  matches: ProfanityMatch[]
  fixing?: boolean
}) {
  if (matches.length === 0) return <>{value}</>
  const segments: React.ReactNode[] = []
  let cursor = 0
  matches.forEach((m, i) => {
    if (m.start > cursor) {
      segments.push(<span key={`p-${i}`}>{value.slice(cursor, m.start)}</span>)
    }
    segments.push(
      <ProfaneSegment
        key={`m-${i}-${m.start}`}
        text={value.slice(m.start, m.end)}
        shimmering={fixing}
      />,
    )
    cursor = m.end
  })
  if (cursor < value.length) {
    segments.push(<span key="tail">{value.slice(cursor)}</span>)
  }
  return <>{segments}</>
}

// One flagged word + its (optional) shimmer overlay. The shimmer is an
// orange gradient that sweeps across the word once at a randomised duration
// (capped at SHIMMER_MAX_MS) so multiple flagged words don't pulse in sync.
function ProfaneSegment({
  text,
  shimmering,
}: {
  text: string
  shimmering: boolean
}) {
  // Each segment instance picks its own duration on mount; useMemo keeps it
  // stable across re-renders triggered by typing/state changes.
  const durationMs = useMemo(() => randomShimmerMs(), [])
  return (
    <span className="relative inline-block font-bold text-[#E5641A]">
      {text}
      {shimmering && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <motion.span
            className="absolute inset-y-0 -left-1/2 w-[200%] bg-[linear-gradient(90deg,transparent_0%,#E5641A55_45%,#E5641A99_50%,#E5641A55_55%,transparent_100%)]"
            initial={{ x: "-50%" }}
            animate={{ x: "50%" }}
            transition={{ duration: durationMs / 1000, ease: "easeInOut" }}
          />
        </span>
      )}
    </span>
  )
}

// Inline-suggestion strip — gold star badge + heading + bold tags joined by
// 2px ellipse dividers. Matches Figma 1748:18115. The whole strip lives
// inside the input container's bottom 54px.
function Suggestions() {
  return (
    <div className="flex h-full items-start gap-1.5 px-2 pt-2 pb-2.5">
      <img
        src="/reviews-flow/suggestions/star.png"
        alt=""
        className="block size-[18px] shrink-0"
        draggable={false}
      />
      <div className="flex flex-col items-start justify-center gap-0.5">
        <p className="text-[12px] font-medium leading-4 tracking-[-0.1px] text-text-secondary">
          Most shoppers write about:
        </p>
        <div className="flex items-center gap-1.5">
          {SUGGESTION_TAGS.map((tag, i) => (
            <Fragment key={tag}>
              {i > 0 && (
                <img
                  src="/reviews-flow/suggestions/divider.svg"
                  alt=""
                  className="block size-[2px] shrink-0"
                  draggable={false}
                />
              )}
              <span className="whitespace-nowrap text-[12px] font-bold leading-4 tracking-[-0.1px] text-text-primary">
                {tag}
              </span>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

// Profanity warning strip — shown in place of suggestions whenever the
// review text contains a flagged word. Matches Figma 1666:25386 (bottom).
// The container itself is transparent so the orange gradient on the parent
// shows through behind it.
function ProfanityWarning({ onFix }: { onFix: () => void }) {
  return (
    <div className="flex h-full items-center justify-between px-3 pt-2.5 pb-3">
      <div className="flex items-center gap-1.5">
        <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-surface-primary">
          <ExclamationIcon size={11} />
        </span>
        <p className="whitespace-nowrap text-[12px] font-semibold leading-[14px] tracking-[-0.12px] text-[#AE3A13]">
          Your words may hurt other shoppers&rsquo; feelings
        </p>
      </div>
      <button
        type="button"
        onClick={onFix}
        className="flex items-center gap-0.5"
      >
        <SparkleEditIcon size={12} />
        <span className="whitespace-nowrap text-[12px] font-bold leading-4 text-text-primary">
          Fix it
        </span>
      </button>
    </div>
  )
}

// Praise variant — surfaces once the review covers ≥ PRAISE_TOPICS_THRESHOLD
// topics. Same star badge, single celebratory line. Matches Figma 1748:18716.
function PraiseSuggestion() {
  return (
    <div className="flex h-full items-center justify-center gap-1.5 px-2 py-1">
      <img
        src="/reviews-flow/suggestions/star.png"
        alt=""
        className="block size-4 shrink-0"
        draggable={false}
      />
      <p className="whitespace-nowrap text-[12px] font-bold leading-4 tracking-[-0.1px] text-text-primary">
        You&rsquo;re officially someone&rsquo;s shopping hero
      </p>
    </div>
  )
}

// Voice-entry CTA. In the primary state (empty input) the entire pill is
// painted with the AI gradient from Figma 1759:23327. Once the user has
// typed a character it switches to the secondary state (Figma 1748:18667):
// white bill with a gradient-tinted mic and dark label.
function SpeakReviewButton({ secondary = false }: { secondary?: boolean }) {
  return (
    <button
      type="button"
      className={`pointer-events-auto absolute top-[466px] left-[16px] flex h-9 items-center justify-center gap-1 overflow-hidden rounded-full bg-white px-3 py-2.5 ${
        secondary ? "text-text-primary" : "text-white"
      }`}
    >
      {!secondary && <SpeakReviewAIBackground />}
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        {secondary ? (
          <img
            src="/reviews-flow/speak-cta/mic-secondary.png"
            alt=""
            className="block size-full"
            draggable={false}
          />
        ) : (
          <MicAiIcon size={14} variant="white" />
        )}
      </span>
      <span className="relative shrink-0 whitespace-nowrap text-[14px] font-semibold leading-5">
        Speak your review
      </span>
    </button>
  )
}

// Inline mic-with-AI-sparkle icon. The white variant sits on the gradient
// pill (primary); the gradient variant tints the mic itself for use against
// a white pill (secondary).
function MicAiIcon({
  size = 14,
  variant = "white",
}: {
  size?: number
  variant?: "white" | "gradient"
}) {
  const fill =
    variant === "gradient" ? "url(#mic-ai-gradient)" : "currentColor"
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      style={{ color: variant === "white" ? "white" : undefined }}
    >
      {variant === "gradient" && (
        <defs>
          <linearGradient
            id="mic-ai-gradient"
            x1="0"
            y1="0"
            x2="14"
            y2="14"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#7C3AED" />
            <stop offset="1" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M11.5331 4.39121L11.6734 4.06823C11.9203 3.49684 12.3723 3.03872 12.9403 2.78426L13.3734 2.59081C13.426 2.56664 13.4705 2.5279 13.5017 2.4792C13.5329 2.4305 13.5495 2.37388 13.5495 2.31604C13.5495 2.2582 13.5329 2.20157 13.5017 2.15287C13.4705 2.10417 13.426 2.06544 13.3734 2.04127L12.9643 1.85923C12.382 1.59752 11.9222 1.12245 11.6797 0.531894L11.5348 0.183226C11.5136 0.129216 11.4766 0.0828468 11.4286 0.0501638C11.3807 0.0174809 11.324 0 11.266 0C11.208 0 11.1513 0.0174809 11.1034 0.0501638C11.0554 0.0828468 11.0184 0.129216 10.9972 0.183226L10.8529 0.531323C10.6106 1.12199 10.1511 1.59726 9.56888 1.85923L9.15916 2.04184C9.10677 2.06608 9.06241 2.10481 9.03133 2.15344C9.00024 2.20208 8.98372 2.2586 8.98372 2.31632C8.98372 2.37405 9.00024 2.43056 9.03133 2.4792C9.06241 2.52784 9.10677 2.56657 9.15916 2.59081L9.59285 2.78369C10.1608 3.03841 10.6126 3.49673 10.8591 4.06823L10.9995 4.39121C11.1022 4.62746 11.4298 4.62746 11.5331 4.39121ZM8.06293 3.04733C8.21929 3.29461 8.4331 3.47741 8.70435 3.59573L9.02677 3.73668C9.24361 3.83102 9.41937 3.9638 9.55405 4.13499V5.70714C9.55405 6.46387 9.25344 7.18961 8.71835 7.7247C8.18326 8.25979 7.45752 8.5604 6.70079 8.5604C5.94405 8.5604 5.21832 8.25979 4.68323 7.7247C4.14814 7.18961 3.84753 6.46387 3.84753 5.70714V3.42453C3.84753 2.89489 3.99495 2.3757 4.27328 1.92509C4.55162 1.47448 4.94989 1.11023 5.42349 0.873133C5.8971 0.636032 6.42736 0.535436 6.95489 0.582605C7.48243 0.629774 7.98643 0.822848 8.41046 1.14021C8.2735 1.24293 8.15747 1.36923 8.06236 1.51912C7.91703 1.74733 7.84073 2.01267 7.84266 2.28323C7.84266 2.55942 7.91628 2.81412 8.0635 3.04733M1.59687 6.27779H2.74674C2.885 7.2278 3.36069 8.09628 4.08676 8.72433C4.81284 9.35238 5.74077 9.69803 6.70079 9.69803C7.66081 9.69803 8.58873 9.35238 9.31481 8.72433C10.0409 8.09628 10.5166 7.2278 10.6548 6.27779H11.8053C11.6755 7.43548 11.1562 8.51472 10.3325 9.33851C9.50885 10.1623 8.42968 10.6817 7.27201 10.8116V13.1256H6.13071V10.8116C4.97293 10.6818 3.89363 10.1625 3.06983 9.33867C2.24603 8.51487 1.72665 7.43557 1.59687 6.27779Z"
        fill={fill}
      />
    </svg>
  )
}

// AI gradient — five blob layers + a soft-light noise texture, painted on a
// 342.5×535 canvas centered slightly above the pill. Positions/insets/blend
// modes are taken verbatim from the Figma export.
function SpeakReviewAIBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute h-[535.156px] w-[342.5px] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
      style={{ left: "calc(50% - 0.25px)", top: "calc(50% - 60.14px)" }}
    >
      <div className="absolute h-[535.394px] w-[532.54px] left-[-94.66px] top-[219.47px]">
        <div className="absolute inset-[-22.21%_-22.33%]">
          <img alt="" src="/reviews-flow/speak-cta/ellipse-2.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute h-[206.739px] w-[283.908px] left-[29.53px] top-[355.21px]">
        <div className="absolute inset-[-57.52%_-41.89%]">
          <img alt="" src="/reviews-flow/speak-cta/ellipse-1.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute h-[535.394px] w-[730.429px] left-[-193.61px] top-[415.36px]">
        <div className="absolute inset-[-22.21%_-16.28%]">
          <img alt="" src="/reviews-flow/speak-cta/ellipse-5.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <div className="absolute h-[432.882px] w-[685.238px] left-[-171.01px] top-[431.93px]">
        <div className="absolute inset-[-21.98%_-13.88%]">
          <img alt="" src="/reviews-flow/speak-cta/ellipse-4.svg" className="block size-full max-w-none" />
        </div>
      </div>
      <div
        className="absolute h-[534.205px] w-[342.024px] left-[0.24px] top-[0.48px] mix-blend-soft-light opacity-70"
        style={{
          backgroundImage: "url('/speak-cta/bg-rect.png')",
          backgroundSize: "487.111px 487.111px",
          backgroundPosition: "top left",
        }}
      />
      <div
        className="absolute flex h-[130.032px] w-[151.824px] -translate-y-1/2 items-center justify-center mix-blend-plus-lighter"
        style={{ left: "93.71px", top: "calc(50% + 86.2px)" }}
      >
        <div className="flex-none rotate-[-108.37deg]">
          <div className="relative h-[128.664px] w-[94.282px]">
            <div className="absolute inset-[-52.98%_-72.3%]">
              <img alt="" src="/reviews-flow/speak-cta/ellipse-6.svg" className="block size-full max-w-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function NextButton({
  enabled,
  onClick,
}: {
  enabled: boolean
  onClick?: () => void
}) {
  return (
    <div className="pointer-events-auto absolute top-[466px] right-[16px]">
      <button
        type="button"
        disabled={!enabled}
        onClick={enabled ? onClick : undefined}
        className={`flex h-9 items-center justify-center rounded-lg px-6 text-[14px] font-semibold transition-colors ${
          enabled
            ? "bg-text-primary text-white"
            : "bg-surface-secondary text-text-muted"
        }`}
      >
        Next
      </button>
    </div>
  )
}

// "Snap it. Show it!" panel. Matches Figma 1485:6996 — heading, the
// 203×91 photo collage with three category toasts above it, then the two
// secondary CTAs ("Add from gallery", "Take a photo").
function PhotosPanel() {
  return (
    <div className="flex w-full flex-col items-center gap-8 rounded-2xl bg-white px-3 pt-5 pb-3">
      <div className="flex flex-col items-center gap-0.5 pb-1 text-center">
        <h2 className="text-[20px] font-extrabold leading-[26px] tracking-[-0.3px] text-text-primary">
          Snap it. Show it!
        </h2>
        <p className="text-[14px] leading-[18px] text-text-tertiary">
          Help others see it better
        </p>
      </div>
      <div className="relative h-[121px] w-[214px]">
        {/* Category toasts hovering above the photo stack — each bobs
            gently along its own y-axis, staggered for life. */}
        <Toast
          label="Details"
          className="absolute left-[11.5px] top-[4.6px] -rotate-[10deg]"
          bobDelay={0}
        />
        <Toast
          label="Product"
          className="absolute left-[76.9px] top-[0.8px] z-10"
          bobDelay={0.6}
        />
        <Toast
          label="Package"
          className="absolute left-[141.4px] top-[3.9px] rotate-[10deg]"
          bobDelay={1.1}
        />
        {/* Photo collage — Figma 1921:26052, single image at 203×91. */}
        <img
          src="/reviews-flow/photos/photo-stack.png"
          alt=""
          className="absolute top-[31px] left-[5.5px] block h-[91px] w-[203px]"
          draggable={false}
        />
      </div>
      <div className="flex w-full gap-1.5 pt-3">
        <PhotoActionButton iconSrc="/reviews-flow/icons/gallery.svg" label="Add from gallery" />
        <PhotoActionButton iconSrc="/reviews-flow/icons/camera.svg" label="Take a photo" />
      </div>
    </div>
  )
}

function Toast({
  label,
  className,
  bobDelay = 0,
}: {
  label: string
  className?: string
  bobDelay?: number
}) {
  // Outer wrapper owns position + rotation (CSS classes). Inner motion.div
  // handles the y bob — separating them keeps motion's transform from
  // wiping out the rotation set on the outer.
  return (
    <div className={className}>
      <motion.div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-[#edf3fc] to-white px-2.5 py-1.5"
        // Subtle ±4% vertical bob, eased in-out, infinite. Each toast gets
        // its own delay so the three labels drift independently.
        animate={{ y: ["-4%", "4%"] }}
        transition={{
          duration: 2.4,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: bobDelay,
        }}
      >
        <span className="whitespace-nowrap text-[11px] font-semibold leading-[8px] tracking-[-0.07px] text-text-primary">
          {label}
        </span>
      </motion.div>
    </div>
  )
}

function PhotoActionButton({
  iconSrc,
  label,
}: {
  iconSrc: string
  label: string
}) {
  return (
    <button
      type="button"
      className="flex h-9 flex-1 items-center justify-center gap-1 rounded-lg border border-[#bddbff] bg-white px-3 py-2.5"
    >
      <img src={iconSrc} alt="" className="block size-4 shrink-0" draggable={false} />
      <span className="whitespace-nowrap text-[12px] font-semibold leading-4 text-[#0F61FF]">
        {label}
      </span>
    </button>
  )
}

// Bottom bar — "Hide my name" toggle row, divider, "Submit review" CTA,
// home-bar indicator. Matches Figma 1485:7060.
function BottomBar() {
  const [hideName, setHideName] = useState(true)
  return (
    <div className="flex flex-col rounded-t-2xl bg-white">
      <div className="flex flex-col gap-3 px-4 pt-3.5 pb-3">
        <div className="flex items-center justify-between rounded-full pl-1">
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap text-[14px] font-medium leading-[18px] tracking-[-0.1px] text-[#475067]">
              Hide my name from this review
            </span>
            <img
              src="/reviews-flow/icons/info-circle.svg"
              alt=""
              className="block size-3.5 shrink-0"
              draggable={false}
            />
          </div>
          <Toggle on={hideName} onClick={() => setHideName((v) => !v)} />
        </div>
        <div className="px-1 pt-1.5 pb-1">
          <img
            src="/reviews-flow/icons/divider-dashed.svg"
            alt=""
            className="block h-px w-full"
            draggable={false}
          />
        </div>
        <button
          type="button"
          className="flex max-h-[52px] min-h-[52px] items-center justify-center rounded-xl bg-[#101628] px-5 py-3.5"
        >
          <span className="text-[16px] font-semibold leading-6 text-white">
            Submit review
          </span>
        </button>
      </div>
      {/* Home bar */}
      <div className="flex h-[21px] flex-col items-center py-2">
        <div className="h-[5px] w-[124px] rounded-lg bg-black" />
      </div>
    </div>
  )
}

function Toggle({ on, onClick }: { on: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`flex h-6 w-[42px] items-center rounded-full p-0.5 transition-colors ${
        on ? "justify-end bg-[#1d2539]" : "justify-start bg-border-muted"
      }`}
    >
      <span className="block size-5 rounded-full bg-white shadow" />
    </button>
  )
}
