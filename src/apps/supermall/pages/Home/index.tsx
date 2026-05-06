import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import { ProductCard, CameraIcon, SearchIcon, StatusBar } from '@ui';
import { CategoryCard } from '../../components/ui/CategoryCard';
import type { Product } from '../../types/product';
import { useWishlistStore } from '@state/wishlistStore';
import { AddressBottomSheet } from '../../../share-address/screens/AddressBottomSheet';
import './Home.css';

/* ─── Product / chip image assets ──────────────────────────────────────── */
const IMG_ELEC       = 'https://www.figma.com/api/mcp/asset/094c04ac-f79c-4c06-8ade-22181db0946e';
const IMG_BEAUTY     = 'https://www.figma.com/api/mcp/asset/0610acfc-1bd3-4c9c-90f2-86e19fa48666';
const IMG_PHONECASE  = 'https://www.figma.com/api/mcp/asset/a42626b0-83fb-4d93-b5e9-2b32fa20f110';
const IMG_APPLIANCES = 'https://www.figma.com/api/mcp/asset/96562933-022c-469f-9000-6852b861e163';
const IMG_HAIR       = 'https://www.figma.com/api/mcp/asset/052d52c1-41b4-40a3-b7d4-1887d45502da';
const IMG_AIRPODS    = 'https://www.figma.com/api/mcp/asset/094c04ac-f79c-4c06-8ade-22181db0946e';
const IMG_WASHER     = 'https://www.figma.com/api/mcp/asset/05966a58-1b4c-4271-b032-1e826704f394';

/* ─── Static data ──────────────────────────────────────────────────────── */

const categories = [
  { label: 'Beauty & Skin Care',  image: '/categories/cat-r1-1.svg', sale: true },
  { label: 'Toys & Games',        image: '/categories/cat-r2-1.svg', sale: false },
  { label: 'Grocery & Kitchen',   image: '/categories/cat-r1-2.svg', sale: false },
  { label: 'Electronics & Tools', image: '/categories/cat-r2-2.svg', sale: false },
  { label: 'Home Appliances',     image: '/categories/cat-r1-3.svg', sale: false },
  { label: 'Hair Care',           image: '/categories/cat-r2-3.svg', sale: false },
  { label: 'Beauty & Skin Care',  image: '/categories/cat-r1-4.svg', sale: false },
  { label: 'Shoes & Clothes',     image: '/categories/cat-r2-4.svg', sale: false },
  { label: 'Grocery & Kitchen',   image: '/categories/cat-r1-5.svg', sale: false },
  { label: 'Toys & Games',        image: '/categories/cat-r2-5.svg', sale: false },
] as const;

const recommendedChips = [
  { label: 'For you',     icon: '/icon-chip-foryou.svg' },
  { label: 'Electronics', icon: '/icon-chip-electronics.svg' },
  { label: 'Beauty',      icon: '/icon-chip-beauty.svg' },
  { label: 'Fashion',     icon: '/icon-chip-fashion.svg' },
  { label: 'Home',        icon: '/icon-chip-home.svg' },
] as const;
type ChipLabel = typeof recommendedChips[number]['label'];

const DIRHAM = 'د.إ';

const recProducts: Record<ChipLabel, Product[]> = {
  'For you': [
    { id: 'a1', name: 'Apple Airpods Pro 2 Wireless Earbuds',    variant: '',  images: [IMG_AIRPODS],   sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128, tag: { label: 'Best Seller', variant: 'bestseller' }, isSponsored: true },
    { id: 'a2', name: 'Whirlpool 7 kg Magic Clean',              variant: '',  images: [IMG_WASHER],    sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128, isSponsored: true },
    { id: 'a3', name: 'MAYNOS Suction Phone Case Mount',         variant: '',  images: [IMG_PHONECASE], sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
  ],
  Electronics: [
    { id: 'e1', name: 'Apple Airpods Pro 2 Wireless Earbuds',    variant: '',  images: [IMG_AIRPODS],   sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128, tag: { label: 'Best Seller', variant: 'bestseller' } },
    { id: 'e2', name: 'Whirlpool 7 kg Magic Clean',              variant: '',  images: [IMG_WASHER],    sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
    { id: 'e3', name: 'MAYNOS Suction Phone Case Mount',         variant: '',  images: [IMG_PHONECASE], sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
  ],
  Beauty: [
    { id: 'b1', name: 'Maybelline Foundation Matte & Poreless',  variant: '',  images: [IMG_BEAUTY],    sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128, tag: { label: 'Best Seller', variant: 'bestseller' } },
    { id: 'b2', name: 'L\'Oreal Hair Care Shampoo',               variant: '',  images: [IMG_HAIR],      sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
    { id: 'b3', name: 'Apple Airpods Pro 2 Wireless Earbuds',    variant: '',  images: [IMG_AIRPODS],   sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
  ],
  Fashion: [
    { id: 'f1', name: 'MAYNOS Suction Phone Case Mount',         variant: '',  images: [IMG_PHONECASE], sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128, tag: { label: 'Best Seller', variant: 'bestseller' } },
    { id: 'f2', name: 'Apple Airpods Pro 2 Wireless Earbuds',    variant: '',  images: [IMG_AIRPODS],   sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
    { id: 'f3', name: 'Whirlpool 7 kg Magic Clean',              variant: '',  images: [IMG_WASHER],    sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
  ],
  Home: [
    { id: 'h1', name: 'Whirlpool 7 kg Magic Clean',              variant: '',  images: [IMG_WASHER],    sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128, tag: { label: 'Best Seller', variant: 'bestseller' } },
    { id: 'h2', name: 'Apple Airpods Pro 2 Wireless Earbuds',    variant: '',  images: [IMG_AIRPODS],   sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
    { id: 'h3', name: 'MAYNOS Suction Phone Case Mount',         variant: '',  images: [IMG_PHONECASE], sellingPrice: 899, originalPrice: 1399, currency: DIRHAM, rating: 4.3, reviewCount: 128 },
  ],
};


/* ─── Icons ────────────────────────────────────────────────────────────── */
/* ─── Service tiles — built from Figma vectors ────────────────────────── */

/* ─── Header ───────────────────────────────────────────────────────────── */
type TileSpec = {
  bg: string;
  aria: string;
  full: React.ReactNode;
  compact: React.ReactNode;
};

const SERVICE_TILES: TileSpec[] = [
  {
    bg: '#FEEE00',
    aria: 'noon',
    full: (
      <>
        <img src="/logo-noon-mark.svg" alt="" className="home-tile__watermark" />
        <img src="/logo-noon-word.svg" alt="noon" className="home-tile__center-logo" style={{ width: 50, height: 13 }} />
      </>
    ),
    compact: <img src="/logo-noon-compact.svg" alt="noon" style={{ width: 58, height: 15 }} />,
  },
  {
    bg: 'rgba(255,255,255,0.95)',
    aria: 'super mall',
    full: <img src="/logo-supermall.svg" alt="super mall" className="home-tile__center-logo" style={{ width: 54, height: 34 }} />,
    compact: <img src="/logo-supermall-compact.svg" alt="super mall" style={{ width: 63, height: 15 }} />,
  },
  {
    bg: '#FFFFFF',
    aria: 'noon FOOD',
    full: <img src="/tile-food.png" alt="noon FOOD" className="home-tile__fill" />,
    compact: <img src="/logo-food-compact.svg" alt="noon FOOD" style={{ width: 51, height: 13 }} />,
  },
  {
    bg: '#FFFFFF',
    aria: '15 MINUTES',
    full: <img src="/logo-15min.gif" alt="15 min" className="home-tile__center-logo" style={{ width: 50, height: 50 }} />,
    compact: <img src="/logo-15min-compact.gif" alt="15 min" style={{ width: 64, height: 14, objectFit: 'contain' }} />,
  },
  {
    bg: '#FFFFFF',
    aria: 'now now',
    full: <img src="/logo-nownow.svg" alt="now now" className="home-tile__center-logo" style={{ width: 33, height: 45 }} />,
    compact: <img src="/logo-nownow-compact.svg" alt="now now" style={{ width: 23, height: 31 }} />,
  },
  {
    bg: 'rgba(255,255,255,0.95)',
    aria: 'Namshi',
    full: (
      <div className="home-tile__stack">
        <img src="/logo-namshi.png" alt="" style={{ width: 41, height: 27, objectFit: 'cover' }} />
        <span className="home-tile__label">Namshi</span>
      </div>
    ),
    compact: <img src="/logo-namshi-compact.svg" alt="Namshi" style={{ width: 23, height: 31 }} />,
  },
  {
    bg: 'rgba(255,255,255,0.95)',
    aria: 'Pay',
    full: (
      <div className="home-tile__stack">
        <span className="home-tile__pay-icon" />
        <span className="home-tile__label">Pay</span>
      </div>
    ),
    compact: <span className="home-tile__pay-icon" />,
  },
];

/* Apple-ish smooth-out curve — same on every animated piece so they move in lockstep. */
const MORPH_EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const MORPH_DURATION = 0.34;
const TILE_TRANSITION = { duration: MORPH_DURATION, ease: MORPH_EASE };
const FADE_TRANSITION = { duration: 0.13, ease: MORPH_EASE };
const ADDRESS_TRANSITION = { duration: MORPH_DURATION, ease: MORPH_EASE };

type HomeHeaderProps = {
  scrolled: boolean;
  onAddressTap: () => void;
  onTileTap: (aria: string) => void;
};

function HomeHeader({ scrolled, onAddressTap, onTileTap }: HomeHeaderProps) {
  const navigate = useNavigate();
  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);
  const tileAnim = scrolled
    ? { height: 40, borderRadius: 12 }
    : { height: 76, borderRadius: 20 };

  return (
    <section
      className={`home-header${scrolled ? ' is-scrolled' : ''}`}
      aria-label="noon home"
    >
      <StatusBar tone="dark" />

      <div className="home-header__tiles">
        {SERVICE_TILES.map((t) => (
          <motion.button
            key={t.aria}
            type="button"
            className="home-tile"
            style={{ background: t.bg }}
            animate={tileAnim}
            transition={TILE_TRANSITION}
            aria-label={t.aria}
            onClick={() => onTileTap(t.aria)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {scrolled ? (
                <motion.span
                  key="c"
                  className="home-tile__inner-fill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE_TRANSITION}
                >
                  {t.compact}
                </motion.span>
              ) : (
                <motion.span
                  key="f"
                  className="home-tile__inner-fill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={FADE_TRANSITION}
                >
                  {t.full}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {!scrolled && (
          <motion.div
            key="address"
            className="home-header__address"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 49, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={ADDRESS_TRANSITION}
            style={{ overflow: 'hidden' }}
          >
            <div
              className="home-header__address-info"
              role="button"
              tabIndex={0}
              onClick={onAddressTap}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onAddressTap(); } }}
            >
              <div className="home-header__address-row1">
                <img src="/icon-home.svg" alt="" className="home-header__home-icon" />
                <span className="home-header__address-label">Home -&nbsp;</span>
              </div>
              <div className="home-header__address-row2">
                <span className="home-header__address-line">BDA Complex, 100 Feet Rd 3rd Block, Kora...</span>
                <img src="/icon-chevron-down.svg" alt="" className="home-header__chevron" />
              </div>
            </div>
            <button
              type="button"
              className="home-header__heart"
              aria-label="Wishlist"
              onClick={openFullWishlist}
            >
              <img src="/icon-heart-blue.svg" alt="" width={36} height={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="home-header__search"
        role="button"
        tabIndex={0}
        onClick={() => navigate('/supermall/search')}
        onKeyDown={(e) => { if (e.key === 'Enter') navigate('/supermall/search'); }}
      >
        <SearchIcon size={20} color="var(--color-text-tertiary)" />
        <span className="home-header__search-text">Search for &ldquo;Maybelline 1014&rdquo;</span>
        <span className="home-header__search-divider" aria-hidden="true" />
        <button
          type="button"
          className="home-header__search-cam"
          aria-label="Visual search"
          onClick={(e) => { e.stopPropagation(); navigate('/supermall/search'); }}
        >
          <CameraIcon size={20} color="var(--color-text-tertiary)" />
        </button>
      </div>
    </section>
  );
}

/* ─── Shop by category — 2-row horizontal scroll grid ──────────────── */
function ShopByCategory() {
  const navigate = useNavigate();
  return (
    <section className="home-section" aria-label="Shop by category">
      <h2 className="home-section__title">Shop by category</h2>
      <div className="home-cat__scroll">
        <div className="home-cat__grid">
          {categories.map((c, i) => (
            <CategoryCard
              key={`${c.label}-${i}`}
              image={c.image}
              label={c.label}
              sale={c.sale}
              onClick={() => navigate('/supermall/shop')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Recommended for you — uses existing ProductCard component ────────── */
function RecommendedForYou() {
  const [active, setActive] = useState<ChipLabel>('For you');
  const products = recProducts[active];

  return (
    <section className="home-section" aria-label="Recommended for you">
      <h2 className="home-section__title">Recommended for you</h2>

      <div className="home-rec__chips" role="tablist">
        {recommendedChips.map((c) => {
          const isActive = c.label === active;
          return (
            <button
              key={c.label}
              role="tab"
              aria-selected={isActive}
              className={`home-rec__chip${isActive ? ' home-rec__chip--active' : ''}`}
              onClick={() => setActive(c.label)}
            >
              <img src={c.icon} alt="" className="home-rec__chip-icon" />
              <span className="home-rec__chip-label">{c.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="home-rec__rail"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {products.map((p) => (
            <div className="home-rec__card-wrap" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

/* ─── Offers for you — SVG carousel ────────────────────────────────────── */
const offerCards = ['/offer-1.svg', '/offer-2.svg', '/offer-3.svg'];

function OffersForYou() {
  return (
    <section className="home-section" aria-label="Offers for you">
      <h2 className="home-section__title">Offers for you</h2>
      <div className="home-offers__rail">
        {offerCards.map((src, i) => (
          <img key={i} src={src} alt="" className="home-offers__card-img" draggable={false} />
        ))}
      </div>
    </section>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────── */
export default function HomePage() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [addressSheetOpen, setAddressSheetOpen] = useState(false);
  const [supermallLoading, setSupermallLoading] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId = 0;
    let isScrolled = false;
    const ENTER = 80;
    const EXIT = 48;
    const tick = () => {
      rafId = 0;
      const y = el.scrollTop;
      const next = isScrolled ? y > EXIT : y > ENTER;
      if (next !== isScrolled) {
        isScrolled = next;
        setScrolled(next);
      }
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(tick);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleTileTap = (aria: string) => {
    if (aria === 'super mall') {
      setSupermallLoading(true);
      window.setTimeout(() => {
        setSupermallLoading(false);
        navigate('/supermall/shop');
      }, 900);
    }
  };

  return (
    <PageTransition>
      <div className="home-page" ref={scrollRef}>
        <HomeHeader
          scrolled={scrolled}
          onAddressTap={() => setAddressSheetOpen(true)}
          onTileTap={handleTileTap}
        />
        <ShopByCategory />
        <RecommendedForYou />
        <OffersForYou />
        <div className="home-page__spacer" />
      </div>
      {supermallLoading && <SupermallSkeleton />}
      {addressSheetOpen && (
        <AddressBottomSheet open={addressSheetOpen} onClose={() => setAddressSheetOpen(false)} />
      )}
    </PageTransition>
  );
}

/* ─── Supermall skeleton — shown briefly when re-entering supermall flow ─ */
function SupermallSkeleton() {
  return (
    <div className="home-skel" aria-hidden="true">
      <div className="home-skel__tiles">
        {Array.from({ length: 7 }).map((_, i) => <div key={i} className="home-skel__tile" />)}
      </div>
      <div className="home-skel__address" />
      <div className="home-skel__search" />
      <div className="home-skel__title" />
      <div className="home-skel__cats">
        {Array.from({ length: 6 }).map((_, i) => <div key={i} className="home-skel__cat" />)}
      </div>
      <div className="home-skel__title" />
      <div className="home-skel__cards">
        {Array.from({ length: 4 }).map((_, i) => <div key={i} className="home-skel__card" />)}
      </div>
    </div>
  );
}
