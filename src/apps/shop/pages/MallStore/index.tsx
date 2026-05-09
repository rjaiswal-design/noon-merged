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

const IMG_SNACKS = 'https://www.figma.com/api/mcp/asset/26c9bba6-f436-4dce-91b6-6ac714a249de';
const IMG_HOUSEHOLD = 'https://www.figma.com/api/mcp/asset/96562933-022c-469f-9000-6852b861e163';
const IMG_MAKEUP = 'https://www.figma.com/api/mcp/asset/0610acfc-1bd3-4c9c-90f2-86e19fa48666';
const IMG_BEVERAGES = 'https://www.figma.com/api/mcp/asset/052d52c1-41b4-40a3-b7d4-1887d45502da';
const IMG_BABY = 'https://www.figma.com/api/mcp/asset/88f5a555-2b7c-4128-9ce0-babd7f73af18';
const IMG_PRODUCT_1 = 'https://www.figma.com/api/mcp/asset/a42626b0-83fb-4d93-b5e9-2b32fa20f110';
const IMG_PRODUCT_2 = 'https://www.figma.com/api/mcp/asset/05966a58-1b4c-4271-b032-1e826704f394';
const IMG_PRODUCT_3 = 'https://www.figma.com/api/mcp/asset/bf66cb80-ebed-43b5-81d1-be015e2e28a7';
const IMG_PRODUCT_4 = 'https://www.figma.com/api/mcp/asset/33ceb60a-db7f-4dff-92d7-839d61e2ab0f';
const IMG_NOON_MARK = 'https://www.figma.com/api/mcp/asset/dedd55f4-a76d-4964-8034-50dc55470d27';
const IMG_NOON_WORD = 'https://www.figma.com/api/mcp/asset/fd468380-9652-46fc-89ec-3357e5f9ec85';
const IMG_SUPERMALL_TOP = 'https://www.figma.com/api/mcp/asset/8c9b94cd-d2ba-43e2-add9-bb9066d9ebe2';
const IMG_SUPERMALL_BOTTOM = 'https://www.figma.com/api/mcp/asset/eb193b4f-d8d0-4ccd-8e65-245feac167fd';
const IMG_15_MINUTES = 'https://www.figma.com/api/mcp/asset/850b8459-3171-48a4-8184-cc9a01ebcef1';
const IMG_NOON_NOW = 'https://www.figma.com/api/mcp/asset/9034bc30-fb73-4335-9826-4ab393bfc2c6';
const IMG_NAMSHI = 'https://www.figma.com/api/mcp/asset/3ed85b6d-bab2-4507-b713-9f391304272f';

const IMG_CURVE_LEFT = 'https://www.figma.com/api/mcp/asset/54134844-7853-467c-9e85-f72025a9ebb0';
const IMG_CURVE_RIGHT = 'https://www.figma.com/api/mcp/asset/1cd2b318-7218-4452-a5bb-d6e13c833d13';
const IMG_ELECTRONICS_HERO_BG = 'https://www.figma.com/api/mcp/asset/147dc37e-5ee8-4782-b3dd-ab920cfafc66';
const IMG_ELECTRONICS_HERO_ACCENT = 'https://www.figma.com/api/mcp/asset/1024ab67-b43f-4b23-afde-5deaa67f7914';
const IMG_ELECTRONICS_CARD_HEADPHONES = 'https://www.figma.com/api/mcp/asset/094c04ac-f79c-4c06-8ade-22181db0946e';
const IMG_ELECTRONICS_CARD_MOBILES = 'https://www.figma.com/api/mcp/asset/b1e70809-996a-4072-86dd-7d873070084c';
const IMG_ELECTRONICS_CARD_LAPTOP = 'https://www.figma.com/api/mcp/asset/1e2a350a-0980-4cf7-bfde-7cb9a2914e94';
const IMG_ELECTRONICS_CARD_SMARTWATCH = 'https://www.figma.com/api/mcp/asset/01dddcac-8098-4c82-bfe8-cc0fc65b11d9';
const IMG_ELECTRONICS_CARD_OTHER_BASE = 'https://www.figma.com/api/mcp/asset/99004fdc-dc06-4bd6-be0e-88b69adfd4b2';
const IMG_ELECTRONICS_CARD_OTHER_STICK = 'https://www.figma.com/api/mcp/asset/78647fe0-cff2-4379-acaa-87556f634b3c';
const IMG_ELECTRONICS_CARD_OTHER_GLOW = 'https://www.figma.com/api/mcp/asset/07c86e6d-b38b-4cf3-9d94-5215a8f7dcf3';

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
