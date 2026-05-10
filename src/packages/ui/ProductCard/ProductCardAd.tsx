import { useLocation, useNavigate } from 'react-router-dom';
import type { Product } from '@/apps/shop/types/product';
import './ProductCardAd.css';

interface ProductCardAdProps {
  product: Product;
  /** Defaults to 'express'. */
  expressLabel?: string;
}

export function ProductCardAd({ product, expressLabel = 'express' }: ProductCardAdProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const discount = Math.round(
    ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100
  );

  return (
    <article
      className="pcard-ad"
      role="button"
      tabIndex={0}
      onClick={() =>
        navigate(`/product/${product.id}`, {
          state: { from: `${location.pathname}${location.search}` },
        })
      }
    >
      <div className="pcard-ad__image-wrap">
        <img
          className="pcard-ad__image"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="pcard-ad__info">
        <p className="pcard-ad__name">{product.name}</p>
        <div className="pcard-ad__row">
          <span className="pcard-ad__price">
            <img src="/icon-aed.svg" alt="AED" className="dhm-mark" />
            {product.sellingPrice}
          </span>
          <span className="pcard-ad__strike">
            <img src="/icon-aed.svg" alt="AED" className="dhm-mark" />
            {product.originalPrice}
          </span>
          {discount > 0 && (
            <span className="pcard-ad__off">{discount}% OFF</span>
          )}
          {expressLabel && (
            <img className="pcard-ad__express" src="/express-badge.svg" alt="express" />
          )}
        </div>
      </div>
      <span className="pcard-ad__tag">Ad</span>
    </article>
  );
}
