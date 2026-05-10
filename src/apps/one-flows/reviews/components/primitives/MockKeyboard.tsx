import { motion } from "framer-motion"
import { EASE_DRAWER } from "../../motion/springs"

// Visual stand-in for the iOS keyboard. Slides up from the bottom when the
// review input is focused. It does not capture input — the underlying
// textarea owns text. Real iOS keyboard takes over via Capacitor later.
export default function MockKeyboard({ open }: { open: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ y: open ? 0 : 296 }}
      transition={{ duration: 0.32, ease: EASE_DRAWER }}
      className="absolute right-0 bottom-0 left-0 h-[296px] bg-[#D4D4D4]/85 backdrop-blur-xl"
      aria-hidden="true"
    >
      <div className="flex h-full flex-col gap-[10px] px-[8px] pt-[11px] pb-[28px]">
        <KeyRow keys={["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]} />
        <KeyRow keys={["a", "s", "d", "f", "g", "h", "j", "k", "l"]} indent />
        <BottomKeyRow />
        <SpaceRow />
      </div>
    </motion.div>
  )
}

function KeyRow({ keys, indent }: { keys: string[]; indent?: boolean }) {
  return (
    <div className={`flex items-center justify-center gap-[6px] ${indent ? "px-[19px]" : ""}`}>
      {keys.map((k) => (
        <Key key={k}>{k}</Key>
      ))}
    </div>
  )
}

function BottomKeyRow() {
  return (
    <div className="flex items-center gap-[13px]">
      <ShiftKey />
      <div className="flex flex-1 items-start gap-[6px]">
        {["z", "x", "c", "v", "b", "n", "m"].map((k) => (
          <Key key={k}>{k}</Key>
        ))}
      </div>
      <DeleteKey />
    </div>
  )
}

function SpaceRow() {
  return (
    <div className="flex items-center gap-[6px]">
      <SpecialKey className="w-[86px]">ABC</SpecialKey>
      <Key className="flex-1"> </Key>
      <SpecialKey className="w-[86px] bg-accent-blue text-white">↵</SpecialKey>
    </div>
  )
}

function Key({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-[42px] flex-1 items-center justify-center rounded-[8px] bg-white text-[20px] text-[#595959] shadow-[0_1px_0_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </div>
  )
}

function SpecialKey({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-[42px] items-center justify-center rounded-[8px] bg-[#ABB0BC] text-[15px] text-white shadow-[0_1px_0_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </div>
  )
}

function ShiftKey() {
  return (
    <SpecialKey className="w-[42px]">
      <span className="text-[16px]">⇧</span>
    </SpecialKey>
  )
}

function DeleteKey() {
  return (
    <SpecialKey className="w-[42px]">
      <span className="text-[16px]">⌫</span>
    </SpecialKey>
  )
}
