// iOS status bar — 375×44, time on left, signal/wifi/battery on right.
export default function StatusBar() {
  return (
    <div className="relative h-11 w-full shrink-0">
      <div className="absolute left-[33px] top-1/2 -translate-y-1/2 text-[15px] font-semibold tracking-[-0.3px] text-text-primary">
        9:41
      </div>
      <div className="absolute right-[18px] top-1/2 flex -translate-y-1/2 items-center gap-[6px]">
        <SignalGlyph />
        <WifiGlyph />
        <BatteryGlyph />
      </div>
    </div>
  )
}

function SignalGlyph() {
  return (
    <svg width={18} height={10} viewBox="0 0 18 10" fill="none">
      <rect x={0} y={6} width={3} height={4} rx={0.5} fill="#1D2539" />
      <rect x={5} y={4} width={3} height={6} rx={0.5} fill="#1D2539" />
      <rect x={10} y={2} width={3} height={8} rx={0.5} fill="#1D2539" />
      <rect x={15} y={0} width={3} height={10} rx={0.5} fill="#1D2539" />
    </svg>
  )
}

function WifiGlyph() {
  return (
    <svg width={16} height={12} viewBox="0 0 16 12" fill="none">
      <path
        d="M8 2.2c2.4 0 4.6.9 6.3 2.4l1.5-1.6C13.6 1.1 10.9 0 8 0 5.1 0 2.4 1.1.2 3l1.5 1.6C3.4 3.1 5.6 2.2 8 2.2zm0 3.4c1.5 0 2.9.6 3.9 1.5l1.5-1.5C12 4.3 10.1 3.5 8 3.5S4 4.3 2.6 5.6L4.1 7.1C5.1 6.2 6.5 5.6 8 5.6zm0 3.4c.7 0 1.3.3 1.8.7L8 11.7 6.2 9.7c.5-.4 1.1-.7 1.8-.7z"
        fill="#1D2539"
      />
    </svg>
  )
}

function BatteryGlyph() {
  return (
    <svg width={26} height={12} viewBox="0 0 26 12" fill="none">
      <rect
        x={0.5}
        y={0.5}
        width={22}
        height={11}
        rx={2.5}
        stroke="#1D2539"
        strokeOpacity={0.35}
      />
      <rect x={2} y={2} width={19} height={8} rx={1.3} fill="#1D2539" />
      <rect x={23.5} y={4} width={1.4} height={4} rx={0.6} fill="#1D2539" fillOpacity={0.4} />
    </svg>
  )
}
