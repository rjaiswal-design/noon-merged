import defaultPrimary from "../assets/cart/item-1.png";
import defaultSecondary from "../assets/cart/item-2.png";

export type CartProps = {
  /** Number of items in the cart. */
  itemCount?: number;
  /** Primary item thumbnail (front of the stack). */
  image?: string;
  /** Optional sliver shown peeking out behind the primary thumbnail. Hide with `null`. */
  secondaryImage?: string | null;
  /** Click handler for the cart pill. */
  onClick?: () => void;
  className?: string;
};

export default function Cart({
  itemCount = 5,
  image = defaultPrimary,
  secondaryImage = defaultSecondary,
  onClick,
  className="",
}: CartProps) {
  const showSecondary = secondaryImage !== null && secondaryImage !== undefined;
  const itemsLabel = itemCount === 1 ? "1 item" : `${itemCount} items`;

  return (
    <button
      type="button"
      onClick={onClick}
      data-component="cart"
      className={
        "relative inline-flex items-center gap-2.5 rounded-16 border border-white/[0.24] bg-surface-action-bold py-3 pl-6 pr-5 font-primary shadow-[inset_0_4px_8px_0_rgba(0,0,0,0.08)]" +
        className
      }
    >
      {/* Stacked thumbnail */}
      <span className="relative block size-8 shrink-0">
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 size-8 rounded-4 object-cover"
        />
        {showSecondary && (
          <img
            src={secondaryImage}
            alt=""
            aria-hidden
            className="absolute -left-2 top-0.5 h-8 w-3"
          />
        )}
      </span>

      {/* Text */}
      <span className="flex flex-col items-start justify-center gap-0.5 whitespace-nowrap">
        <span className="font-primary text-h16 font-bold text-text-on-surface-bold">
          View Cart
        </span>
        <span className="font-primary text-b12 font-normal text-white/80">
          {itemsLabel}
        </span>
      </span>
    </button>
  );
}
