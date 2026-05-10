import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '@state/cartStore';
import { useWishlistStore } from '@state/wishlistStore';
import type { Product } from '@/apps/shop/types/product';
import { getSuggestedCollection } from '@/apps/shop/data/suggestedCollection';
import { StarFilled, PlusIcon } from '../icons';
import { WishlistHeart } from '../WishlistHeart/WishlistHeart';
import './ProductCardSku.css';

const PDP_ROUTE = '/product/galaxy-s25-ultra';

interface ProductCardSkuProps {
  product: Product;
  freeDelivery?: boolean;
  expressLabel?: string;
}

export function ProductCardSku({
  product,
  freeDelivery = true,
  expressLabel = 'Today',
}: ProductCardSkuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const openWishlist = useWishlistStore((s) => s.openDrawer);
  const wishlisted = useWishlistStore((s) => s.wishlistedIds.has(product.id));

  const addItem   = useCartStore((s) => s.addItem);
  const updateQty = useCartStore((s) => s.updateQuantity);
  const cartItem  = useCartStore((s) => s.items.find((i) => i.id === product.id));
  const count     = cartItem?.quantity ?? 0;

  const discount = Math.round(
    ((product.originalPrice - product.sellingPrice) / product.originalPrice) * 100
  );

  function handleAdd(e: React.MouseEvent) {
    e.stopPropagation();
    if (count === 0) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.sellingPrice,
        quantity: 1,
        imagePublicId: product.images[0] ?? '',
      });
    } else {
      updateQty(product.id, count + 1);
    }
  }

  return (
    <article
      className="psku"
      onClick={() => navigate(PDP_ROUTE, { state: { from: `${location.pathname}${location.search}` } })}
      role="button"
      tabIndex={0}
    >
      {/* ── Image area ───────────────────────────── */}
      <div className="psku__media">
        <img className="psku__img" src={product.images[0]} alt={product.name} loading="lazy" />

        {product.tag && (
          <div className="psku__tag">{product.tag.label}</div>
        )}

        <WishlistHeart
          className="psku__heart"
          wishlisted={wishlisted}
          onToggle={() =>
            openWishlist(
              product.id,
              product.images[0],
              getSuggestedCollection(product),
            )
          }
          size={16}
          variant="bare"
        />

        <button
          className="psku__plus"
          onClick={handleAdd}
          aria-label="Add to cart"
        >
          <PlusIcon size={16} color="var(--blue-600)" />
        </button>
      </div>

      {/* ── Info area ────────────────────────────── */}
      <div className="psku__info">
        <div className="psku__head">
          <p className="psku__name">{product.name}</p>
          <div className="psku__rating">
            <StarFilled size={12} color="var(--emerald-900)" />
            <span>{product.rating}</span>
          </div>
        </div>

        <div className="psku__priceRow">
          <span className="psku__price">
            <span className="psku__currency">{product.currency.toLowerCase()}</span>
            {product.sellingPrice}
          </span>
          {discount > 0 && (
            <>
              <span className="psku__strike">{product.originalPrice}</span>
              <span className="psku__discount">{discount}%</span>
            </>
          )}
        </div>

        {freeDelivery && (
          <div className="psku__delivery">
            <TruckIcon size={12} color="var(--blue-gray-600, #666d85)" />
            <span>Free Delivery</span>
          </div>
        )}

        {expressLabel && (
          <div className="psku__express">
            <img className="psku__expressInner" src="/express-badge.svg" alt="express" />
            <span className="psku__expressLabel">{expressLabel}</span>
          </div>
        )}
      </div>
    </article>
  );
}

function TruckIcon({ size = 12, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 3.5h7.5v5.25H1zM8.5 5.5h2.25l1.75 2v1.25H8.5z"
        stroke={color}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="3.6" cy="10.4" r="1" stroke={color} strokeWidth="1.1" />
      <circle cx="10" cy="10.4" r="1" stroke={color} strokeWidth="1.1" />
    </svg>
  );
}
