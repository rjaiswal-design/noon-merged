type Variant = "express" | "supermall" | "market" | "global"

const SRC: Record<Variant, string> = {
  express: "/reviews-flow/marketplace-tags/express.png",
  supermall: "/reviews-flow/marketplace-tags/supermall.png",
  market: "/reviews-flow/marketplace-tags/market.png",
  global: "/reviews-flow/marketplace-tags/global.png",
}

interface Props {
  variant?: Variant
  // When `size` is set, the tag renders at a fixed pixel height (auto width).
  // When omitted, the tag fills its parent container (object-contain).
  size?: "sm" | "md"
  className?: string
}

export default function MarketplaceTag({ variant = "express", size, className }: Props) {
  if (size) {
    const h = size === "sm" ? 16 : 18
    return (
      <img
        src={SRC[variant]}
        alt={variant}
        className={className}
        style={{ height: h, width: "auto", display: "block" }}
      />
    )
  }
  return (
    <img
      src={SRC[variant]}
      alt={variant}
      className={`block size-full object-contain ${className ?? ""}`}
    />
  )
}
