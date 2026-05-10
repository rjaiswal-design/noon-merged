import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProductCard, HeartOutline, ChevronDown, ChevronRight, PlusIcon, MinusIcon, TrashIcon, WishlistHeart } from '@ui';
import { useCartStore } from '@state/cartStore';
import { useWishlistStore } from '@state/wishlistStore';
import { fetchCartRecommendations } from '../../api/productsApi';
import { getSuggestedCollectionFromName } from '../../data/suggestedCollection';
import type { Product } from '../../types/product';
import EMPTY_ILLUSTRATION from '../../assets/cart/empty-illustration.png';
import IMG_PRODUCT from '../../assets/cart/product.png';
import IMG_SUPERMALL_MARK_A from '../../assets/cart/supermall-mark-a.svg';
import IMG_SUPERMALL_MARK_B from '../../assets/cart/supermall-mark-b.svg';
import IMG_EXPRESS_NEW_RELEASE from '../../assets/cart/express-new-release.svg';
import IMG_FREEBIE_LOCK from '../../assets/cart/freebie-lock.svg';
import IMG_NOON_CARD_CASHBACK from '../../assets/cart/noon-one-card.svg';
import IMG_SAVINGS_WAVE_GREEN from '../../assets/cart/savings-wave-green.svg';
import IMG_NOON_ONE_BADGE from '../../assets/cart/noon-one-badge.png';
import IMG_PCARD_AIRPODS from '../../assets/cart/pcard-airpods.png';
import IMG_PCARD_WASHER from '../../assets/cart/pcard-washer.png';
import IMG_PCARD_PHONECASE from '../../assets/cart/pcard-phonecase.png';
import './Cart.css';

const DH = 'dh';

/* ─── Inline icon helpers ─────────────────────────────────────────────── */
function BoltIcon({ size = 14, color = '#2122b8' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M8 1L2 8h4l-1 5 6-7H7l1-5z" fill={color} />
    </svg>
  );
}
function ClockIcon({ size = 18, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path d="M12 7v5l3 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function GiftIcon({ size = 14, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="13" rx="2" stroke={color} strokeWidth="1.5" />
      <path d="M3 12h18M12 8v13" stroke={color} strokeWidth="1.5" />
      <path d="M7.5 8c0-1.5 1-3 2.5-3 1 0 2 1 2 2.5V8M16.5 8c0-1.5-1-3-2.5-3-1 0-2 1-2 2.5V8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function PercentBadgeIcon({ size = 19, color = '#0076ff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 12c0-2 1.5-3.5 3.5-3.5S10 7 10 5c0-1 1-2 2-2s2 1 2 2c0 2 1.5 3.5 3.5 3.5S21 10 21 12s-1.5 3.5-3.5 3.5S14 17 14 19c0 1-1 2-2 2s-2-1-2-2c0-2-1.5-3.5-3.5-3.5S3 14 3 12z" fill={color} />
      <path d="M9 9l6 6M9 15l6-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function FlashCheck() {
  return <span style={{ color: '#1aa14a', fontSize: 12, fontWeight: 700 }}>✓</span>;
}

/* ─── iOS Status Bar ──────────────────────────────────────────────────── */
function StatusBar() {
  return (
    <div className="crt-statusbar" aria-hidden>
      <span className="crt-statusbar__time">9:41</span>
      <div className="crt-statusbar__icons">
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none">
          <rect x="1" y="6" width="3" height="4" rx="0.5" fill="#000" />
          <rect x="5.5" y="4" width="3" height="6" rx="0.5" fill="#000" />
          <rect x="10" y="2" width="3" height="8" rx="0.5" fill="#000" />
          <rect x="14.5" y="0" width="3" height="10" rx="0.5" fill="#000" />
        </svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 3a8 8 0 0 1 5.66 2.34l-.7.7a7 7 0 0 0-9.92 0l-.7-.7A8 8 0 0 1 8 3zm0 3a5 5 0 0 1 3.54 1.46l-.7.71a4 4 0 0 0-5.66 0l-.71-.7A5 5 0 0 1 8 6zm0 3a2 2 0 0 1 1.41.59l-1.4 1.41-1.42-1.41A2 2 0 0 1 8 9z" fill="#000" />
        </svg>
        <svg width="26" height="11" viewBox="0 0 26 11" fill="none">
          <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="#000" fill="none" />
          <rect x="2" y="2" width="18" height="7" rx="1" fill="#000" />
          <rect x="23" y="3.5" width="1.5" height="4" rx="0.5" fill="#000" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Header (shared by empty + filled) ───────────────────────────────── */
function CartHeader() {
  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);
  return (
    <header className="crt-header">
      <StatusBar />
      <div className="crt-header__row">
        <button type="button" className="crt-header__addr">
          <div className="crt-header__addr-row">
            <img src="/icon-home.svg" alt="" className="crt-header__home-icon" />
            <span className="crt-header__addr-label">Home -</span>
            <span className="crt-header__addr-text">BDA Complex, 100 Feet Rd 3rd...</span>
            <ChevronDown size={14} color="var(--grey-700)" className="crt-header__chev" />
          </div>
        </button>
        <button type="button" className="crt-header__wishlist" aria-label="Wishlist" onClick={openFullWishlist}>
          <HeartOutline size={20} color="var(--grey-900)" />
        </button>
      </div>
    </header>
  );
}

/* ╔══════════════════════ EMPTY STATE ══════════════════════╗ */
function RecRailSkeleton() {
  return (
    <div className="crt-rec-card__rail" aria-busy="true">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: '#eef0f4',
            borderRadius: 12,
            height: 280,
            minWidth: 168,
            animation: 'plp-skel-pulse 1.2s ease-in-out infinite',
          }}
        />
      ))}
    </div>
  );
}

function RecommendationCard({ title, sub, products }: { title: string; sub?: string; products: Product[] | null }) {
  return (
    <section className="crt-rec-card">
      <header className="crt-rec-card__header">
        <h2 className="crt-rec-card__title">{title}</h2>
        {sub && <span className="crt-rec-card__sub">{sub}</span>}
      </header>
      {products === null ? (
        <RecRailSkeleton />
      ) : (
        <div className="crt-rec-card__rail">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyState() {
  const navigate = useNavigate();
  const [recs, setRecs] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchCartRecommendations().then((products) => {
      if (!cancelled) setRecs(products);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Slice the same fetched rec list across the three cards so each shows a
  // distinct sub-set; the three cards are intentionally similar in the design.
  const sponsored = recs ? recs.slice(0, 3) : null;
  const youMightLike = recs ? recs.slice(3, 6) : null;
  const browsed = recs ? [...recs].reverse().slice(0, 3) : null;

  return (
    <>
      <div className="crt-empty-hero">
        <h1 className="crt-empty-hero__title">Your shopping cart looks empty.</h1>
        <p className="crt-empty-hero__sub">What are you waiting for?</p>
        <img src={EMPTY_ILLUSTRATION} alt="" className="crt-empty-hero__illustration" />
        <motion.button
          type="button"
          className="crt-empty-hero__cta"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/shop')}
        >
          Start Shopping
        </motion.button>
      </div>
      <RecommendationCard title="Don't miss out on these offers" sub="Sponsored" products={sponsored} />
      <RecommendationCard title="You might also like" products={youMightLike} />
      <RecommendationCard title="Previously browsed products" products={browsed} />
    </>
  );
}

/* ╔══════════════════════ FILLED STATE ═════════════════════╗ */
type LineSubtitle = { label: string; tone?: 'blue' | 'green' };
type LineEta =
  | { kind: 'supermall'; label: 'Get in'; value: string }
  | { kind: 'express'; date: string; countdown: string };
type LineItem = {
  id: string;
  image: string;
  title: string;
  qty: number;
  price: number;
  oldPrice?: number;
  off: number;
  free?: boolean;
  subtitle?: LineSubtitle;
  eta: LineEta;
  coupons: string[];
  points: string[];
};

/* ─── Section container (supermall / express) ─────────────────────────── */
type SectionVariant = 'supermall' | 'express';
function SectionContainer({
  variant,
  children,
  warranty,
  progress,
}: {
  variant: SectionVariant;
  children: React.ReactNode;
  warranty?: { title: string; sub?: string; price?: string; cta?: string };
  progress: { text: React.ReactNode; pct: number };
}) {
  const isExpress = variant === 'express';
  return (
    <section className={`crt-section crt-section--${variant}`}>
      <div className="crt-section__glass">
        <span className={`crt-section__wordmark${isExpress ? ' crt-section__wordmark--express' : ''}`}>
          {isExpress ? (
            <img src={IMG_EXPRESS_NEW_RELEASE} alt="express" />
          ) : (
            <>
              <img src={IMG_SUPERMALL_MARK_A} alt="" />
              <img src={IMG_SUPERMALL_MARK_B} alt="supermall" />
            </>
          )}
        </span>
      </div>
      <div className="crt-section__items">
        {children}
        {warranty && (
          <div className={`crt-warranty${isExpress ? ' crt-warranty--express' : ''}`}>
            {isExpress && warranty.price && <span className="crt-warranty__icon" aria-hidden>🛡️</span>}
            <div className="crt-warranty__text">
              {warranty.sub ? <span className="crt-warranty__sub">{warranty.sub}</span> : null}
              <span className="crt-warranty__title">{warranty.title}</span>
            </div>
            {warranty.price ? (
              <span className="crt-warranty__price">{DH}{warranty.price}</span>
            ) : (
              <button type="button" className="crt-warranty__add">{warranty.cta ?? 'Add'}</button>
            )}
          </div>
        )}
        <div className="crt-stacks">
          <div className="crt-stack">
            <span className="crt-stack__icon"><ClockIcon size={18} color="var(--grey-700)" /></span>
            <span>Save on fees at checkout with later delivery!</span>
          </div>
          <div className="crt-stack">
            <span className="crt-stack__noon">
              <strong>Save with</strong>
              <img src={IMG_NOON_ONE_BADGE} alt="noon One" />
              <strong>One.</strong>
            </span>
            <span style={{ marginLeft: 4 }}>Try it now for</span>
            <span className="crt-stack__free" style={{ marginLeft: 4 }}>Free</span>
          </div>
        </div>
      </div>
      <div className="crt-progress">
        <div className="crt-progress__row">
          <span>{progress.text}</span>
          <button type="button" className="crt-progress__add">+ Add</button>
        </div>
        <div className="crt-progress__bar">
          <div className="crt-progress__fill" style={{ width: `${progress.pct}%` }} />
        </div>
      </div>
    </section>
  );
}

/* ─── Cart line ──────────────────────────────────────────────────────── */
function CartLine({ item, variant }: { item: LineItem; variant: SectionVariant }) {
  const [qty, setQty] = useState(item.qty);
  const openWishlist = useWishlistStore((s) => s.openDrawer);
  const wishlisted = useWishlistStore((s) => s.wishlistedIds.has(item.id));
  const isFree = item.free === true;
  const isExpress = variant === 'express';

  return (
    <div className="crt-line">
      <div className="crt-line__thumb-wrap">
        <div className="crt-line__thumb">
          <img src={item.image} alt="" />
        </div>
        {isFree ? (
          <button type="button" className="crt-stepper--free" aria-label="Remove free gift">
            <GiftIcon size={16} color="#0e7c3a" />
          </button>
        ) : (
          <div className="crt-stepper" role="group" aria-label="Quantity">
            <button type="button" onClick={() => setQty((q) => Math.max(0, q - 1))} aria-label={qty <= 1 ? 'Remove' : 'Decrease'}>
              {qty <= 1
                ? <TrashIcon size={14} color="var(--grey-700)" />
                : <MinusIcon size={16} color="#0E0E0E" />}
            </button>
            <span className="crt-stepper__count">{qty}</span>
            <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
              <PlusIcon size={16} color="#0E0E0E" />
            </button>
          </div>
        )}
      </div>

      <div className="crt-line__info">
        <div className="crt-line__title-row">
          <p className="crt-line__title">{item.title}</p>
          <WishlistHeart
            className="crt-line__heart"
            wishlisted={wishlisted}
            onToggle={() =>
              openWishlist(
                item.id,
                item.image,
                getSuggestedCollectionFromName(item.title),
              )
            }
            size={16}
            variant="bare"
          />
        </div>

        {item.subtitle && (
          <span className={`crt-line__subtitle${item.subtitle.tone === 'green' ? ' crt-line__subtitle--green' : ''}`}>
            <span className="crt-line__subtitle-icon">🎁</span>
            <span>{item.subtitle.label}</span>
            <span className="crt-line__subtitle-info">i</span>
          </span>
        )}

        <div className="crt-line__price-row">
          {isFree ? (
            <span className="crt-line__price crt-line__price--free">FREE</span>
          ) : (
            <span className="crt-line__price">{DH}{item.price}</span>
          )}
          {item.oldPrice ? <span className="crt-line__strike">{DH}{item.oldPrice}</span> : null}
          {item.off ? <span className="crt-line__off">{item.off}% OFF</span> : null}
        </div>

        {item.eta.kind === 'supermall' ? (
          <span className="crt-eta">
            <span className="crt-eta__bolt"><BoltIcon size={14} color="#2122b8" /></span>
            <span>{item.eta.label}</span>
            <span className="crt-eta__value">{item.eta.value}</span>
          </span>
        ) : (
          <div className="crt-eta-stack">
            <span className="crt-eta crt-eta--express">
              <FlashCheck />
              <span>Get by</span>
              <span className="crt-eta__value">{item.eta.date}</span>
            </span>
            <span className="crt-eta__count">
              Order within <strong>{item.eta.countdown}</strong>
            </span>
          </div>
        )}

        {item.coupons.length > 0 && (
          <div className="crt-coupons">
            {item.coupons.map((c, i) => (
              <span key={i} className="crt-coupons__chip">{c}</span>
            ))}
          </div>
        )}

        {item.points.length > 0 && (
          <div className="crt-points">
            {item.points.map((p, i) => (
              <span key={i} className="crt-points__item">
                {i > 0 && <span className="crt-points__sep" />}
                <span>{p}</span>
              </span>
            ))}
          </div>
        )}

        {isFree && isExpress && (
          <span className="crt-line__subtitle" style={{ background: 'linear-gradient(89.6deg, #f9f9fb 0%, #ffffff 100%)' }}>
            <span style={{ color: 'var(--grey-600)', fontSize: 12 }}>* While stock lasts</span>
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Mock data ──────────────────────────────────────────────────────── */
const SUPERMALL_PRODUCT_NAME =
  'Apple Watch Series 9 GPS 41mm Silver Aluminium Case With Storm Blue Sport Band';

const supermallItems: LineItem[] = [
  {
    id: 'sm1',
    image: IMG_PRODUCT,
    title: SUPERMALL_PRODUCT_NAME,
    qty: 1,
    price: 109,
    oldPrice: 209,
    off: 47,
    eta: { kind: 'supermall', label: 'Get in', value: '1 hour 12 mins' },
    coupons: ['Extra 10% Off - Code >', 'Extra 5% Off - Code >'],
    points: ['2x Refund', 'non-returnable', '1 year warranty', 'Prepaid only'],
  },
  {
    id: 'sm2',
    image: IMG_PRODUCT,
    title: SUPERMALL_PRODUCT_NAME,
    qty: 2,
    price: 109,
    oldPrice: 209,
    off: 47,
    subtitle: { label: 'Combo' },
    eta: { kind: 'supermall', label: 'Get in', value: '1 hour 12 mins' },
    coupons: ['Extra 10% Off - Code >', 'Extra 5% Off - Code >'],
    points: ['1 year warranty', 'Prepaid only', 'Save on fees with later delivery'],
  },
];

const expressItems: LineItem[] = [
  {
    id: 'ex1',
    image: IMG_PRODUCT,
    title: 'Antler Kenilworth Backpack in Red - Antler Laptop Travel bag',
    qty: 2,
    price: 499,
    oldPrice: 900,
    off: 47,
    subtitle: { label: 'Comes with a free soundbar', tone: 'green' },
    eta: { kind: 'express', date: '7th Sep, Saturday', countdown: '1 hrs 20 mins' },
    coupons: ['Extra 10% Off - Code >', 'Extra 5% Off - Code >'],
    points: ['Prepaid only', 'Faster Delivery at checkout'],
  },
  {
    id: 'ex2',
    image: IMG_PRODUCT,
    title: 'Free Samsung soundbar worth dhm209',
    qty: 1,
    free: true,
    price: 0,
    oldPrice: 209,
    off: 100,
    eta: { kind: 'express', date: '7th Sep, Saturday', countdown: '1 hrs 20 mins' },
    coupons: [],
    points: ['1 year warranty', 'non-returnable', 'Prepaid only', 'Faster Delivery at checkout'],
  },
];

/* ─── Free gifts (locked) card ─────────────────────────────────────────── */
function FreeGiftCard() {
  return (
    <section className="crt-freegifts">
      <header className="crt-freegifts__header">
        <GiftIcon size={20} color="#1f7a74" />
        <span>Free gifts for you</span>
      </header>
      <div className="crt-freegifts__row">
        <div className="crt-freegifts__thumb">
          <img src={IMG_PRODUCT} alt="" />
          <span className="crt-freegifts__lock">
            <img src={IMG_FREEBIE_LOCK} alt="locked" />
          </span>
        </div>
        <div className="crt-freegifts__info">
          <p className="crt-freegifts__title">
            Apple Watch Series 9 GPS 41mm Silver Aluminium Case With Storm Blue Sport Band
          </p>
          <div className="crt-freegifts__price-row">
            <span className="crt-freegifts__price">FREE</span>
            <span className="crt-freegifts__strike">{DH}209</span>
          </div>
          <div className="crt-freegifts__progress-row">
            <span><strong>{DH}120</strong> left to unlock</span>
            <button type="button" className="crt-freegifts__add">+ Add</button>
          </div>
          <div className="crt-freegifts__bar">
            <div className="crt-freegifts__fill" style={{ width: '40%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Savings & benefits card ─────────────────────────────────────────── */
function SavingsBenefits() {
  return (
    <section className="crt-savings-card">
      <h2 className="crt-savings-card__title">Savings &amp; benefits</h2>
      <div className="crt-savings-card__top">
        <button type="button" className="crt-pay-tile">
          <span className="crt-pay-tile__logo crt-pay-tile__logo--tabby">tabby</span>
          <span className="crt-pay-tile__price">{DH}375 × 4</span>
          <span className="crt-pay-tile__sub">0% Installments</span>
        </button>
        <button type="button" className="crt-pay-tile">
          <span className="crt-pay-tile__logo crt-pay-tile__logo--tamara">tamara</span>
          <span className="crt-pay-tile__price">{DH}375 × 4</span>
          <span className="crt-pay-tile__sub">0% Installments</span>
        </button>
        <button type="button" className="crt-pay-tile">
          <span className="crt-pay-tile__logo crt-pay-tile__logo--bank">⏱</span>
          <span className="crt-pay-tile__price">Bank</span>
          <span className="crt-pay-tile__sub" style={{ color: 'var(--grey-700)' }}>Installments</span>
        </button>
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="crt-savings-card__strip">
          <img src={IMG_NOON_CARD_CASHBACK} alt="" className="crt-savings-card__strip-img" />
          <span className="crt-savings-card__strip-text">
            Earn <strong>{DH}105 cashback</strong> with the noon One credit card.
          </span>
          <button type="button" className="crt-savings-card__apply">Apply &gt;</button>
        </div>
      ))}
    </section>
  );
}

/* ─── Coupons card ───────────────────────────────────────────────────── */
function CouponsCard() {
  const [code, setCode] = useState('');
  const hasCode = code.trim().length > 0;
  return (
    <section className="crt-coupons-card">
      <h2 className="crt-coupons-card__title">Got a coupon?</h2>
      <div className="crt-coupons-card__input-row">
        <input
          className="crt-coupons-card__input"
          placeholder="Enter your coupon code here"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          type="button"
          className={`crt-coupons-card__apply${hasCode ? ' crt-coupons-card__apply--active' : ''}`}
        >
          APPLY
        </button>
      </div>
      <div className="crt-coupons-card__divider" aria-hidden />
      <button type="button" className="crt-coupons-card__view">
        <span className="crt-coupons-card__view-badge">
          <PercentBadgeIcon size={18} color="#0076ff" />
        </span>
        <span className="crt-coupons-card__view-text">View all coupons &amp; offers</span>
        <ChevronRight size={20} color="var(--grey-700)" />
      </button>
    </section>
  );
}

/* ─── Wishlist carousel ─────────────────────────────────────────────── */
const wishlistRail: Product[] = [
  {
    id: 'wl1',
    name: 'Apple Airpods Pro 2 Wireless Earbuds',
    description: '',
    brand: 'Apple',
    category: 'electronics',
    variant: '',
    images: [IMG_PCARD_AIRPODS],
    sellingPrice: 899,
    originalPrice: 1399,
    currency: DH,
    rating: 4.6,
    reviewCount: 1284,
    tag: { label: 'Best Seller', variant: 'bestseller' },
  },
  {
    id: 'wl2',
    name: 'Whirlpool 7 kg Magic Clean',
    description: '',
    brand: 'Whirlpool',
    category: 'home',
    variant: '',
    images: [IMG_PCARD_WASHER],
    sellingPrice: 899,
    originalPrice: 1399,
    currency: DH,
    rating: 4.4,
    reviewCount: 612,
    isSponsored: true,
  },
  {
    id: 'wl3',
    name: 'MAYNOS Suction Phone Case Mount',
    description: '',
    brand: 'MAYNOS',
    category: 'accessories',
    variant: '',
    images: [IMG_PCARD_PHONECASE],
    sellingPrice: 899,
    originalPrice: 1399,
    currency: DH,
    rating: 4.2,
    reviewCount: 341,
  },
];

function WishlistCarousel() {
  return (
    <section className="crt-wishrail-card">
      <h2 className="crt-wishrail-card__title">From your wishlist</h2>
      <div className="crt-wishrail-card__rail">
        {wishlistRail.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

/* ─── Sticky footer ─────────────────────────────────────────────────── */
function StickyFooter({ total, onCheckout }: { total: number; onCheckout: () => void }) {
  return (
    <div className="crt-foot">
      <div className="crt-foot__savings">
        <img src={IMG_SAVINGS_WAVE_GREEN} alt="" className="crt-foot__savings-wave" aria-hidden />
        <span className="crt-foot__savings-text">
          <span className="crt-foot__savings-amt">{DH} 130 saved!</span>
          <span className="crt-foot__savings-noon">
            <img src={IMG_NOON_ONE_BADGE} alt="noon One" />
          </span>
        </span>
      </div>
      <div className="crt-foot__bar">
        <div className="crt-foot__total">
          <span className="crt-foot__total-label">Total</span>
          <span className="crt-foot__total-amt">
            <span className="crt-foot__total-amt-currency">{DH}</span>
            {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <motion.button
          type="button"
          className="crt-foot__btn"
          whileTap={{ scale: 0.97 }}
          onClick={onCheckout}
        >
          Checkout
        </motion.button>
      </div>
    </div>
  );
}

/* ─── Filled state ───────────────────────────────────────────────────── */
function FilledState() {
  const navigate = useNavigate();
  const realItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.total());

  // Real cart items take precedence in the supermall section (top)
  const realLines: LineItem[] = realItems.map((c) => ({
    id: c.id,
    image: c.imagePublicId || IMG_PRODUCT,
    title: c.name,
    qty: c.quantity,
    price: c.price,
    oldPrice: Math.round(c.price * 1.5),
    off: 33,
    eta: { kind: 'supermall', label: 'Get in', value: '1 hour 12 mins' },
    coupons: ['Extra 10% Off - Code >', 'Extra 5% Off - Code >'],
    points: ['1 year warranty', 'Prepaid only'],
  }));
  const smItems = [...realLines, ...supermallItems].slice(0, 2);
  const total = cartTotal > 0 ? cartTotal : 1760;

  return (
    <div className="crt-filled">
      <SectionContainer
        variant="supermall"
        warranty={{ title: 'Protect with extended warranty', cta: 'Add' }}
        progress={{
          text: <>Add <strong>{DH} 12</strong> from supermall for free service fees</>,
          pct: 26,
        }}
      >
        {smItems.map((it) => (
          <CartLine key={it.id} item={it} variant="supermall" />
        ))}
      </SectionContainer>

      <SectionContainer
        variant="express"
        warranty={{ sub: 'Protect4less', title: '1 year Accidental Damage', price: '449' }}
        progress={{
          text: <>Add <strong>{DH} 12</strong> from Express for free shipping</>,
          pct: 26,
        }}
      >
        {expressItems.map((it) => (
          <CartLine key={it.id} item={it} variant="express" />
        ))}
      </SectionContainer>

      <FreeGiftCard />
      <SavingsBenefits />
      <CouponsCard />
      <WishlistCarousel />

      <StickyFooter total={total} onCheckout={() => navigate('/checkout')} />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const isEmpty = items.length === 0;

  return (
    <PageTransition>
      <div className="crt-page">
        <CartHeader />
        <div className="crt-scroll">
          {isEmpty ? <EmptyState /> : <FilledState />}
        </div>
      </div>
    </PageTransition>
  );
}
