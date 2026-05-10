import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '@state/cartStore';
import { useWishlistStore } from '@state/wishlistStore';
import type { Product } from '@/apps/shop/types/product';
import { getSuggestedCollection } from '@/apps/shop/data/suggestedCollection';
import { StarFilled } from '../icons';
import { AddToCart } from '../AddToCart/AddToCart';
import SmoothCorners from '../SmoothCorners';
import { WishlistHeart } from '../WishlistHeart/WishlistHeart';
import { NudgeFlipper } from './NudgeFlipper';
import expressTodayTag from './express-today.svg';
import './ProductCardSku.css';

const PDP_ROUTE = '/product/galaxy-s25-ultra';

interface ProductCardSkuProps {
  product: Product;
  expressLabel?: string;
}

export function ProductCardSku({
  product,
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

  function handleAdd() {
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

  function handleRemove() {
    if (count <= 1) {
      updateQty(product.id, 0);
    } else {
      updateQty(product.id, count - 1);
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
      <SmoothCorners radius={10} smoothing={1} className="psku__media">
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

        <div className="psku__plus" onClick={(e) => e.stopPropagation()}>
          <AddToCart count={count} onAdd={handleAdd} onRemove={handleRemove} />
        </div>
      </SmoothCorners>

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

        <NudgeFlipper seed={product.id.length} />

        {expressLabel && (
          <img className="psku__express" src={expressTodayTag} alt={`express ${expressLabel}`} />
        )}
      </div>
    </article>
  );
}
