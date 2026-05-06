interface Props { size?: number; color?: string }

// 2×2 separator dot used between meta items (e.g. "1 item • Processing • On time").
export default function BulletDotIcon({ size = 2, color = "#989FB3" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 2 2" fill="none" aria-hidden="true">
      <circle cx={1} cy={1} r={1} fill={color} />
    </svg>
  )
}
