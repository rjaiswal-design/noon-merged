import { useLocation, useNavigate } from 'react-router-dom';
import type { Product } from '@/apps/shop/types/product';
import './ProductCardCompact.css';

interface ProductCardCompactProps {
  product: Product;
  /**
   * Visual mode:
   *  - 'combo' renders a quantity pill on the image (e.g. "x2") and no express badge.
   *  - 'sponsored' renders an "express" delivery badge under the price.
   */
  mode?: 'combo' | 'sponsored';
  /** Quantity pill text shown on the image — only honoured in 'combo' mode. Defaults to 'x2'. */
  qtyLabel?: string;
  /** Show the "Ad" corner label — used when this card represents a sponsored impression. */
  isAd?: boolean;
}

export function ProductCardCompact({
  product,
  mode = 'combo',
  qtyLabel = 'x2',
  isAd = false,
}: ProductCardCompactProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const discount = Math.round(
    ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100
  );

  return (
    <article
      className="pcard-compact"
      role="button"
      tabIndex={0}
      onClick={() =>
        navigate(`/product/${product.id}`, {
          state: { from: `${location.pathname}${location.search}` },
        })
      }
    >
      <div className="pcard-compact__image-wrap">
        <img
          className="pcard-compact__image"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
        {mode === 'combo' && (
          <span className="pcard-compact__qty">{qtyLabel}</span>
        )}
        {isAd && <span className="pcard-compact__ad">Ad</span>}
      </div>

      <div className="pcard-compact__info">
        <p className="pcard-compact__name">{product.name}</p>
        <div className="pcard-compact__price-row">
          <span className="pcard-compact__price">
            <span className="pcard-compact__currency">dhm</span>
            {product.sellingPrice}
          </span>
          <span className="pcard-compact__strike">{product.originalPrice}</span>
          {discount > 0 && (
            <span className="pcard-compact__off">{discount}%</span>
          )}
        </div>
        {mode === 'sponsored' && (
          <img className="pcard-compact__express" src="/express-badge.svg" alt="express" />
        )}
      </div>
    </article>
  );
}
