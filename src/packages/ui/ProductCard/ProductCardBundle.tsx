import { useLocation, useNavigate } from 'react-router-dom';
import type { Product } from '@/apps/shop/types/product';
import './ProductCardBundle.css';

interface ProductCardBundleProps {
  product: Product;
  /** Whether the bundle item is selected. Defaults to true (cards in FBT default to selected). */
  selected?: boolean;
  onToggle?: (productId: string, next: boolean) => void;
  /** Optional brand chip rendered on the image (e.g. "UGREEN"). */
  brandChip?: string;
  /** Express delivery label below price; pass null/empty to hide. */
  expressLabel?: string;
}

export function ProductCardBundle({
  product,
  selected = true,
  onToggle,
  brandChip,
  expressLabel = 'express Today',
}: ProductCardBundleProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const discount = Math.round(
    ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100
  );

  function handleToggle(e: React.MouseEvent) {
    e.stopPropagation();
    onToggle?.(product.id, !selected);
  }

  return (
    <article
      className="pcard-bundle"
      role="button"
      tabIndex={0}
      onClick={() =>
        navigate(`/product/${product.id}`, {
          state: { from: `${location.pathname}${location.search}` },
        })
      }
    >
      <div className="pcard-bundle__image-wrap">
        <img
          className="pcard-bundle__image"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        {brandChip && <span className="pcard-bundle__brand">{brandChip}</span>}
        <button
          type="button"
          className={`pcard-bundle__check${selected ? ' pcard-bundle__check--on' : ''}`}
          aria-label={selected ? 'Remove from bundle' : 'Add to bundle'}
          aria-pressed={selected}
          onClick={handleToggle}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path
                d="M2.5 6.2 4.7 8.4 9.5 3.6"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>

      <div className="pcard-bundle__info">
        <p className="pcard-bundle__name">{product.name}</p>
        <span className="pcard-bundle__price">
          <img src="/icon-aed.svg" alt="AED" className="dhm-mark" />
          {product.sellingPrice}
        </span>
        {expressLabel && (
          <img className="pcard-bundle__express" src="/express-badge.svg" alt="express" />
        )}
      </div>
    </article>
  );
}
