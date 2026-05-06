interface Props { size?: number; color?: string }

export default function CrossIcon({ size = 20, color = "#1D2539" }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path
        d="M5.45 5.45a.83.83 0 0 1 1.18 0L10 8.82l3.37-3.37a.83.83 0 1 1 1.18 1.18L11.18 10l3.37 3.37a.83.83 0 1 1-1.18 1.18L10 11.18l-3.37 3.37a.83.83 0 1 1-1.18-1.18L8.82 10 5.45 6.63a.83.83 0 0 1 0-1.18Z"
        fill={color}
      />
    </svg>
  )
}
