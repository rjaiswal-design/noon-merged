import { useRef } from "react"
import {
  motion,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion"
import ActiveOrderCard from "./ActiveOrderCard"

interface Props {
  // 0 → collapsed sheet, 1 → fully expanded. Drives a subtle drop + breathe
  // motion that runs in lockstep with the sheet.
  progress: MotionValue<number>
}

// Active orders region — separate from order history so the two can carry
// independent UI/interaction behavior. Reacts to the sheet's progress so
// when the sheet expands, this block drops slightly and its title-to-card
// gap opens up.
export default function ActiveOrdersSection({ progress }: Props) {
  const sectionRef = useRef<HTMLElement>(null)

  // Drop ~15% of the section's height when sheet expands.
  const y = useTransform(progress, [0, 1], [0, 24])

  // Increase title↔card gap by ~10% of section height (8 → 24px). Set
  // imperatively because non-transform CSS props don't auto-track motion
  // values applied via the style prop.
  useMotionValueEvent(progress, "change", (v) => {
    const el = sectionRef.current
    if (!el) return
    el.style.rowGap = `${8 + v * 16}px`
  })

  return (
    <motion.section
      ref={sectionRef}
      style={{ y, rowGap: "8px" }}
      className="flex shrink-0 flex-col pt-1 pb-3"
    >
      <SectionHeader title="Active" badgeCount={1} />
      <ActiveOrderCard />
    </motion.section>
  )
}

interface SectionHeaderProps { title: string; badgeCount?: number }

function SectionHeader({ title, badgeCount }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-3">
      <h2 className="text-[18px] font-bold leading-[24px] tracking-[-0.2px] text-text-primary">
        {title}
      </h2>
      {badgeCount != null && (
        <span className="grid h-[18px] min-w-[22px] place-items-center rounded-full bg-accent-blue px-[7px] text-[12px] font-bold leading-[16px] text-white">
          {badgeCount}
        </span>
      )}
    </div>
  )
}
