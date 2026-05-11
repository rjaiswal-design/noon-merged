import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWishlistStore } from '@state/wishlistStore';
import { AnimatePresence, motion } from 'framer-motion';
import { PageTransition } from '../../components/layout/PageTransition';
import {
  ProductCard,
  CameraIcon,
  ChevronDown,
  HeartFilled,
  SearchIcon,
  SparkleIcon,
  backState,
} from '@ui';
import type { Product } from '../../types/product';
import { DIRHAM } from '../../data/mockProducts';
import { mallTabIconAssets } from './tabIcons';
import './MallStore.css';

const IMG_SNACKS = '/categories/grocery.png';
const IMG_HOUSEHOLD = '/categories/appliances.png';
const IMG_MAKEUP = '/categories/beauty.png';
const IMG_BEVERAGES = '/categories/grocery2.png';
const IMG_BABY = '/categories/toys.png';
const IMG_PRODUCT_1 = '/products/phonecase.png';
const IMG_PRODUCT_2 = '/products/washer.png';
const IMG_PRODUCT_3 = '/categories/toys2.png';
const IMG_PRODUCT_4 = '/categories/shoes.png';
const IMG_NOON_MARK = '/logo-noon-mark.svg';
const IMG_NOON_WORD = '/logo-noon-word.svg';
const IMG_SUPERMALL_TOP = '/logo-supermall-top.svg';
const IMG_SUPERMALL_BOTTOM = '/logo-supermall-btm.svg';
const IMG_15_MINUTES = '/logo-15min.gif';
const IMG_NOON_NOW = '/logo-nownow.svg';
const IMG_NAMSHI = '/logo-namshi.png';

const IMG_CURVE_LEFT = '/categories/electronics.png';
const IMG_CURVE_RIGHT = '/categories/electronics.png';
const IMG_ELECTRONICS_HERO_BG = '/categories/electronics.png';
const IMG_ELECTRONICS_HERO_ACCENT = '/categories/electronics.png';
const IMG_ELECTRONICS_CARD_HEADPHONES = '/products/airpods.png';
const IMG_ELECTRONICS_CARD_MOBILES = '/categories/electronics.png';
const IMG_ELECTRONICS_CARD_LAPTOP = '/categories/electronics.png';
const IMG_ELECTRONICS_CARD_SMARTWATCH = '/categories/electronics.png';
const IMG_ELECTRONICS_CARD_OTHER_BASE = '/categories/electronics.png';
const IMG_ELECTRONICS_CARD_OTHER_STICK = '/categories/electronics.png';
const IMG_ELECTRONICS_CARD_OTHER_GLOW = '/categories/electronics.png';

const serviceTiles = [
  { label: 'noon', variant: 'noon' },
  { label: 'supermall', variant: 'supermall' },
  { label: 'noon food', variant: 'food' },
  { label: '15 minutes', variant: 'minutes' },
  { label: 'noon now', variant: 'now' },
  { label: 'Namshi', variant: 'namshi' },
  { label: 'Pay', variant: 'pay' },
];

const topTabs = [
  { label: 'All', icon: mallTabIconAssets.all },
  { label: 'Electronics', icon: mallTabIconAssets.electronics },
  { label: 'Beauty', icon: mallTabIconAssets.beauty },
  { label: 'Grocery', icon: mallTabIconAssets.grocery },
  { label: 'Pharmacy', icon: mallTabIconAssets.pharmacy },
  { label: 'Babycare', icon: mallTabIconAssets.babycare },
  { label: 'Gifting', icon: mallTabIconAssets.gifting },
] as const;
type TopTab = typeof topTabs[number]['label'];

const heroCategories = [
  { label: 'Snacks', image: IMG_SNACKS },
  { label: 'Household supplies', image: IMG_HOUSEHOLD },
  { label: 'Makeup', image: IMG_MAKEUP },
  { label: 'Beverages', image: IMG_BEVERAGES },
  { label: 'Baby care', image: IMG_BABY },
];

type ElectronicsHeroLayer = {
  className: string;
  src: string;
};

type ElectronicsHeroCategory = {
  label: string;
  layers: ElectronicsHeroLayer[];
};

const electronicsHeroCategories = [
  {
    label: 'Headphone',
    layers: [{ className: 'mall-hero-card__asset--headphone', src: IMG_ELECTRONICS_CARD_HEADPHONES }],
  },
  {
    label: 'Mobiles',
    layers: [{ className: 'mall-hero-card__asset--mobiles', src: IMG_ELECTRONICS_CARD_MOBILES }],
  },
  {
    label: 'Laptop',
    layers: [{ className: 'mall-hero-card__asset--laptop', src: IMG_ELECTRONICS_CARD_LAPTOP }],
  },
  {
    label: 'Smartwatch',
    layers: [{ className: 'mall-hero-card__asset--smartwatch', src: IMG_ELECTRONICS_CARD_SMARTWATCH }],
  },
  {
    label: 'Other',
    layers: [
      { className: 'mall-hero-card__asset--other-base', src: IMG_ELECTRONICS_CARD_OTHER_BASE },
      { className: 'mall-hero-card__asset--other-stick', src: IMG_ELECTRONICS_CARD_OTHER_STICK },
      { className: 'mall-hero-card__asset--other-glow', src: IMG_ELECTRONICS_CARD_OTHER_GLOW },
    ],
  },
] satisfies ElectronicsHeroCategory[];

const shopFilters = [
  { label: 'For you', icon: 'heart' },
  { label: 'Beauty', image: IMG_MAKEUP },
  { label: 'Electronics', image: IMG_PRODUCT_4 },
  { label: 'Grocery', image: IMG_SNACKS },
  { label: 'Health', image: IMG_BEVERAGES },
  { label: 'Baby care', image: IMG_BABY },
];

// Category-specific grids
const categoryGrids: Record<string, Array<{ label: string; image: string }>> = {
  'For you': [
    { label: 'Headphones', image: IMG_PRODUCT_4 },
    { label: 'Mobiles', image: IMG_PRODUCT_1 },
    { label: 'Makeup & beauty', image: IMG_MAKEUP },
    { label: 'Babycare', image: IMG_BABY },
    { label: 'Fresh vegetables', image: IMG_HOUSEHOLD },
    { label: 'Fresh fruits', image: IMG_BEVERAGES },
    { label: 'Dairy items', image: IMG_PRODUCT_2 },
    { label: 'Skincare', image: IMG_PRODUCT_3 },
  ],
  'Beauty': [
    { label: 'Makeup', image: IMG_MAKEUP },
    { label: 'Bath & Body products', image: IMG_PRODUCT_2 },
    { label: 'Hair care', image: IMG_PRODUCT_3 },
    { label: 'Skincare', image: IMG_PRODUCT_3 },
    { label: 'Oral care', image: IMG_SNACKS },
    { label: 'Grooming', image: IMG_BEVERAGES },
    { label: 'Babycare', image: IMG_BABY },
    { label: 'Fragrances', image: IMG_PRODUCT_4 },
  ],
  'Electronics': [
    { label: 'Headphones', image: IMG_PRODUCT_4 },
    { label: 'Mobiles', image: IMG_PRODUCT_1 },
    { label: 'Laptops', image: IMG_PRODUCT_2 },
    { label: 'Tablets', image: IMG_PRODUCT_3 },
    { label: 'Cameras', image: IMG_PRODUCT_4 },
    { label: 'Audio', image: IMG_PRODUCT_1 },
    { label: 'Wearables', image: IMG_PRODUCT_2 },
    { label: 'Accessories', image: IMG_PRODUCT_3 },
  ],
  'Grocery': [
    { label: 'Fresh vegetables', image: IMG_HOUSEHOLD },
    { label: 'Fresh fruits', image: IMG_BEVERAGES },
    { label: 'Dairy items', image: IMG_PRODUCT_2 },
    { label: 'Grains & cereals', image: IMG_SNACKS },
    { label: 'Spices', image: IMG_PRODUCT_3 },
    { label: 'Oils & ghee', image: IMG_PRODUCT_4 },
    { label: 'Snacks', image: IMG_SNACKS },
    { label: 'Beverages', image: IMG_BEVERAGES },
  ],
  'Health': [
    { label: 'Vitamins', image: IMG_PRODUCT_1 },
    { label: 'Supplements', image: IMG_PRODUCT_2 },
    { label: 'Pain relief', image: IMG_PRODUCT_3 },
    { label: 'Cold & flu', image: IMG_PRODUCT_4 },
    { label: 'Digestive care', image: IMG_SNACKS },
    { label: 'Skincare', image: IMG_PRODUCT_3 },
    { label: 'Baby care', image: IMG_BABY },
    { label: 'First aid', image: IMG_HOUSEHOLD },
  ],
  'Baby care': [
    { label: 'Diapers', image: IMG_BABY },
    { label: 'Baby food', image: IMG_SNACKS },
    { label: 'Bath & care', image: IMG_PRODUCT_2 },
    { label: 'Feeding', image: IMG_PRODUCT_3 },
    { label: 'Safety', image: IMG_PRODUCT_4 },
    { label: 'Clothing', image: IMG_PRODUCT_1 },
    { label: 'Toys', image: IMG_PRODUCT_2 },
    { label: 'Health & wellness', image: IMG_BEVERAGES },
  ],
};

const mallProducts: Product[] = [
  {
    id: 'mall-1',
    name: 'Maybelline New York Liquid Foundation, Matte & Poreless, Full',
    variant: '50 ml',
    images: [IMG_PRODUCT_1],
    sellingPrice: 86,
    originalPrice: 123,
    currency: DIRHAM,
    rating: 4.3,
    reviewCount: 128,
    deal: 'Ramdan deal',
    isSponsored: true,
  },
  {
    id: 'mall-2',
    name: 'Maybelline New York Liquid Foundation Photoready Tube',
    variant: '50 ml',
    images: [IMG_PRODUCT_2],
    sellingPrice: 86,
    originalPrice: 123,
    currency: DIRHAM,
    rating: 4.3,
    reviewCount: 128,
    isSponsored: true,
  },
  {
    id: 'mall-3',
    name: 'Maybelline New York Liquid Foundation Soft Matte',
    variant: '50 ml',
    images: [IMG_PRODUCT_3],
    sellingPrice: 94,
    originalPrice: 123,
    currency: DIRHAM,
    rating: 4.3,
    reviewCount: 128,
    isSponsored: true,
  },
  {
    id: 'mall-4',
    name: 'Maybelline New York Liquid Foundation Compact Kit',
    variant: '50 ml',
    images: [IMG_PRODUCT_4],
    sellingPrice: 86,
    originalPrice: 123,
    currency: DIRHAM,
    rating: 4.3,
    reviewCount: 128,
  },
];

function ServiceTile({ label, variant, onClick }: { label: string; variant: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      className={`mall-service mall-service--${variant}`}
      aria-label={label}
      onClick={onClick}
    >
      {variant === 'noon' && (
        <>
          <img className="mall-service__noon-mark" src={IMG_NOON_MARK} alt="" />
          <img className="mall-service__noon-word" src={IMG_NOON_WORD} alt="" />
        </>
      )}
      {variant === 'supermall' && (
        <>
          <img className="mall-service__super-top" src={IMG_SUPERMALL_TOP} alt="" />
          <img className="mall-service__super-bottom" src={IMG_SUPERMALL_BOTTOM} alt="" />
        </>
      )}
      {variant === 'food' && (
        <span className="mall-service__food-logo">
          <span>noon</span>
          <span>FOOD</span>
        </span>
      )}
      {variant === 'minutes' && <img className="mall-service__minutes" src={IMG_15_MINUTES} alt="" />}
      {variant === 'now' && <img className="mall-service__now" src={IMG_NOON_NOW} alt="" />}
      {variant === 'namshi' && (
        <>
          <img className="mall-service__namshi" src={IMG_NAMSHI} alt="" />
          <span className="mall-service__label">Namshi</span>
        </>
      )}
      {variant === 'pay' && <span className="mall-service__label">Pay</span>}
    </button>
  );
}

function MallHeader({ activeTab, onTabChange }: { activeTab: TopTab; onTabChange: (tab: TopTab) => void }) {
  const navigate = useNavigate();
  const openFullWishlist = useWishlistStore((s) => s.openFullWishlist);
  const handleTileClick = (variant: string) => {
    if (variant === 'noon') navigate('/', { state: backState() });
  };
  return (
    <section
      className={`mall-top ${activeTab === 'Electronics' ? 'mall-top--electronics' : ''}`}
      aria-label="Store delivery and search"
    >
      <div className="mall-services" aria-label="noon services">
        {serviceTiles.map((tile) => (
          <ServiceTile
            key={tile.label}
            label={tile.label}
            variant={tile.variant}
            onClick={() => handleTileClick(tile.variant)}
          />
        ))}
      </div>

      <div className={`mall-delivery ${activeTab === 'Electronics' ? 'mall-delivery--electronics' : ''}`}>
        <div className="mall-delivery__copy">
          <strong>⚡ 1 hr 15 mins delivery</strong>
          <span>
            <span className="mall-delivery__addr-label">Home - </span>
            <span className="mall-delivery__addr-text">BDA Complex, 100 Feet Rd 3rd Block, Kora...</span>
            <ChevronDown size={14} color="rgba(255,255,255,0.6)" />
          </span>
        </div>
        <button
          type="button"
          className="mall-heart"
          aria-label="Wishlist"
          onClick={openFullWishlist}
        >
          <HeartFilled size={19} color="rgba(255,255,255,0.72)" />
        </button>
      </div>

      <label className="mall-search">
        <SearchIcon size={22} color="var(--grey-600)" />
        <input value="" readOnly placeholder='Search for "Maybelline 1014"' />
        <span className="mall-search__divider" />
        <button type="button" aria-label="Visual search"><CameraIcon size={20} color="var(--grey-600)" /></button>
      </label>

      <nav className="mall-tabs" aria-label="Homepage departments">
        {topTabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              aria-pressed={isActive}
              className={`mall-tab ${isActive ? 'mall-tab--active' : ''}`}
              key={tab.label}
              onClick={() => onTabChange(tab.label)}
            >
              <img
                src={isActive ? tab.icon.active : tab.icon.default}
                alt=""
                className="mall-tab__icon"
                draggable={false}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}

function HeroCategories({ activeTab }: { activeTab: TopTab }) {
  const isElectronics = activeTab === 'Electronics';

  return (
    <section
      className={`mall-hero ${isElectronics ? 'mall-hero--electronics' : ''}`}
      aria-label={isElectronics ? 'Electronics highlights' : 'Fast delivery categories'}
    >
      {isElectronics ? (
        <>
          <img
            src={IMG_ELECTRONICS_HERO_BG}
            alt=""
            className="mall-hero__backdrop"
            loading="lazy"
          />
          <div className="mall-hero__promo">
            <h1 className="mall-hero__promo-title">Tech That Moves Fast</h1>
            <img
              src={IMG_ELECTRONICS_HERO_ACCENT}
              alt=""
              className="mall-hero__promo-badge"
              loading="lazy"
            />
          </div>
        </>
      ) : (
        <>
          <div className="mall-hero__headline">
            <SparkleIcon size={24} color="rgba(255,255,255,0.25)" aria-hidden="true" />
            <h1>Get everything</h1>
            <SparkleIcon size={24} color="rgba(255,255,255,0.25)" aria-hidden="true" />
          </div>
          <p>at lightning speed ⚡</p>
        </>
      )}
      <div className={`mall-hero__rail ${isElectronics ? 'mall-hero__rail--electronics' : ''}`}>
        {isElectronics
          ? electronicsHeroCategories.map((category) => (
              <Link
                to="/shop"
                className="mall-hero-card mall-hero-card--electronics"
                key={category.label}
              >
                <span>{category.label}</span>
                {category.layers.map((layer) => (
                  <img
                    key={layer.className}
                    src={layer.src}
                    alt=""
                    loading="lazy"
                    className={`mall-hero-card__asset ${layer.className}`}
                  />
                ))}
              </Link>
            ))
          : heroCategories.map((category) => (
              <Link
                to="/shop"
                className="mall-hero-card"
                key={category.label}
              >
                <span>{category.label}</span>
                <img src={category.image} alt="" loading="lazy" />
              </Link>
            ))}
      </div>
    </section>
  );
}

function ProductRail({ title, tone }: { title: string; tone?: 'blue' }) {
  return (
    <section className={`mall-rail ${tone === 'blue' ? 'mall-rail--blue' : ''}`}>
      <div className="mall-section-header">
        <h2>{title}</h2>
        <Link to="/shop">View all ›</Link>
      </div>
      <div className="mall-product-rail">
        {mallProducts.map((product) => (
          <div className="mall-product-card" key={`${title}-${product.id}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ShopByCategory() {
  const [activeFilter, setActiveFilter] = useState<string>('For you');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: '0px', width: '0px' });
  const containerRef = useRef<HTMLDivElement>(null);
  const gridItems = categoryGrids[activeFilter] || categoryGrids['For you'];

  useEffect(() => {
    const updateIndicator = () => {
      if (!containerRef.current) return;
      const activeButton = containerRef.current.querySelector('.mall-category-filter--active') as HTMLElement;
      if (activeButton) {
        const { left, width } = activeButton.getBoundingClientRect();
        const containerLeft = containerRef.current.getBoundingClientRect().left;
        setIndicatorStyle({
          left: `${left - containerLeft}px`,
          width: `${width}px`,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeFilter]);

  return (
    <section className="mall-shop">
      <img src={IMG_CURVE_LEFT} alt="" className="mall-shop__curve mall-shop__curve--left" />
      <img src={IMG_CURVE_RIGHT} alt="" className="mall-shop__curve mall-shop__curve--right" />

      <div className="mall-section-header">
        <h2>Shop by category</h2>
        <Link to="/shop">View all ›</Link>
      </div>

      {/* Horizontal scrollable filter tabs */}
      <div className="mall-category-filters" ref={containerRef}>
        <div
          className="mall-category-filters__indicator"
          style={indicatorStyle}
        />
        {shopFilters.map((filter) => (
          <button
            onClick={() => setActiveFilter(filter.label)}
            className={`mall-category-filter ${activeFilter === filter.label ? 'mall-category-filter--active' : ''}`}
            key={filter.label}
          >
            <span className="mall-category-filter__icon">
              {filter.icon === 'heart'
                ? <HeartFilled size={20} color={filter.label === 'For you' || activeFilter === filter.label ? 'rgba(33,34,184,1)' : 'var(--grey-400)'} />
                : <img src={filter.image} alt="" loading="lazy" />
              }
            </span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* 4-column grid of sub-categories with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          className="mall-category-grid"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {gridItems.map((category) => (
            <Link
              to="/shop"
              className="mall-category"
              key={category.label}
            >
              <span className="mall-category__image">
                <img src={category.image} alt="" loading="lazy" />
              </span>
              <span>{category.label}</span>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default function MallStorePage() {
  const [activeTab, setActiveTab] = useState<TopTab>('All');

  return (
    <PageTransition>
      <div className="mall-page">
        <MallHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <HeroCategories activeTab={activeTab} />
        <ProductRail title="Recommended for you" />
        <ShopByCategory />
        <ProductRail title="New arrivals" />
        <ProductRail title="Maximise your savings" tone="blue" />
      </div>
    </PageTransition>
  );
}
