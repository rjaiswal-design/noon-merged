export function ExclamationIcon({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 1.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.5a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4Zm.65-2.65a.65.65 0 0 1-1.3 0V3.85a.65.65 0 1 1 1.3 0v2.2Z"
        fill="#E5641A"
      />
    </svg>
  )
}

export function SparkleEditIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      {/* Pencil body */}
      <path
        d="M8.05 2.55 9.45 3.95 4.4 9 3 9.4l.4-1.4 4.65-5.05Z"
        stroke="#1d2539"
        strokeWidth="0.9"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Sparkles */}
      <path
        d="M3.2 1.2 3.5 2 4.3 2.3 3.5 2.6 3.2 3.4 2.9 2.6 2.1 2.3 2.9 2Z"
        fill="#1d2539"
      />
      <path
        d="M9.6 7.1 9.95 8 10.85 8.35 9.95 8.7 9.6 9.6 9.25 8.7 8.35 8.35 9.25 8Z"
        fill="#1d2539"
      />
    </svg>
  )
}
