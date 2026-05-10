import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, SearchIcon, HeartOutline, ShareIcon, StatusBar, ProductCard, ProductCardCompact, ProductCardAd, ProductCardBundle } from "@ui";
import type { Product } from "../../../types/product";
import { products as catalogProducts } from "../../../data/products";
import {
  getComboProducts,
  getAdProduct,
  getSponsoredProducts,
  getFrequentlyBoughtTogether,
} from "../../../data/productRelations";
import {
  getCategoryLabel,
  getSellerName,
  getVariantConfig,
  hasVariants,
  getProductDetails,
  getDeliveryWindow,
  getGiftOffers,
  shouldShowWarranty,
  getWarrantyPlans,
  getReviewBundle,
} from "../../../data/productMetadata";
import "./PdpDesign.css";

interface PdpDesignProps {
  product?: Product;
}

// — Product images (PNG) —
import airpods from "./assets/airpods.png?url";
import productFeatures from "./assets/product-features.png?url";

// — Payment offer logos (PNG) —
import noonPayIcon  from "./assets/offers/noon-pay-icon.png?url";
import tabbyLogo    from "./assets/offers/tabby-logo.png?url";
import noonVisaCard from "./assets/offers/noon-visa-card.png?url";
import tamaraLogo   from "./assets/offers/tamara-logo.png?url";

// — Warranty shield images (PNG) —
import shieldGold       from "./assets/warranty/shield-gold.png?url";
import shieldBlue       from "./assets/warranty/shield-blue.png?url";
import protect4lessLogo from "./assets/warranty/protect4less-logo.png?url";

// — Chevrons —
import chevronRightIcon     from "./assets/icons/chevron-right.svg?url";
import chevronDownIcon      from "./assets/icons/chevron-down.svg?url";
import miniChevronRightIcon from "./assets/icons/mini-chevron-right.svg?url";

// — General UI icons —
import storeIcon         from "./assets/icons/store.svg?url";
import comboIcon         from "./assets/icons/combo.svg?url";
import expressIcon       from "./assets/icons/express.svg?url";
import starIcon          from "./assets/icons/star.svg?url";
import verifiedIcon      from "./assets/icons/verified.svg?url";
import cardIcon          from "./assets/icons/card.svg?url";
import infoIcon          from "./assets/icons/info.svg?url";
import lowPriceIcon      from "./assets/icons/low-price.svg?url";
import couponBgIcon      from "./assets/icons/coupon-bg.svg?url";
import couponPercentIcon from "./assets/icons/coupon-percent.svg?url";
import bestsellerIcon    from "./assets/icons/bestseller.png?url";
import bestsellerBadge   from "./assets/icons/bestseller-badge.svg?url";
import noonOneBadge      from "./assets/icons/noon-one-badge.svg?url";

// — Additional Information section icons —
import aiReturnsIcon  from "./assets/icons/ai-returns.svg?url";
import aiWarrantyIcon from "./assets/icons/ai-warranty.svg?url";
import aiSoldByIcon   from "./assets/icons/ai-sold-by.svg?url";

// — Warranty USP icons —
import warrantyCalendar    from "./assets/icons/warranty-calendar.svg?url";
import warrantyLiquid      from "./assets/icons/warranty-liquid.svg?url";
import warrantyDelivery    from "./assets/icons/warranty-delivery.svg?url";
import warrantyProtection  from "./assets/icons/warranty-protection.svg?url";
import warrantyMalfunction from "./assets/icons/warranty-malfunction.svg?url";
import warrantyInfinity    from "./assets/icons/warranty-infinity.svg?url";

// — Sponsored products section —
import tecvLogo                from "./assets/sponsored/tecv-logo.png?url";
import sponsoredProductApple   from "./assets/sponsored/product-apple-charger.png?url";
import sponsoredProductSamsung from "./assets/sponsored/product-samsung-charger.png?url";
import expressTodayIcon        from "./assets/icons/express-today.svg?url";

// — Seller widget icons —
import sellerStoreIcon     from "./assets/icons/seller-store.svg?url";
import sellerStarIcon      from "./assets/icons/seller-star.svg?url";
import sellerLowReturnIcon from "./assets/icons/seller-returns-low.svg?url";
import sellerRatingsIcon   from "./assets/icons/seller-thumbsup.svg?url";
import sellerPartnerIcon   from "./assets/icons/seller-partner.svg?url";
import sellerDescribedIcon from "./assets/icons/seller-described.svg?url";
import sellerVerifiedIcon  from "./assets/icons/seller-verified.svg?url";

// — Trust marker icons (Figma node 7:14855) —
import trustLowReturn          from "./assets/icons/trust-low-return.svg?url";
import trustPartnerSince       from "./assets/icons/trust-partner-since.svg?url";
import trustProductAsDescribed from "./assets/icons/trust-product-as-described.svg?url";
import trustHighRated          from "./assets/icons/trust-high-rated.svg?url";
import trustLowEasyReturns     from "./assets/icons/trust-low-easy-returns.svg?url";
import trustSecureTransactions from "./assets/icons/trust-secure-transactions.svg?url";

const ASSETS = {
  // The original four Figma MCP URLs here expired (asset host returns
  // a placeholder). Pointing them at the local PNGs we already ship.
  productImage: airpods,
  adThumb:      sponsoredProductSamsung,
  gift:         bestsellerIcon,

  airpods,
  productFeatures,

  noonPayIcon,
  tabbyLogo,
  noonVisaCard,
  tamaraLogo,

  shieldGold,
  shieldBlue,
  protect4lessLogo,

  chevronRight:     chevronRightIcon,
  chevronDown:      chevronDownIcon,
  miniChevronRight: miniChevronRightIcon,

  store:         storeIcon,
  combo:         comboIcon,
  express:       expressIcon,
  star:          starIcon,
  verified:      verifiedIcon,
  card:          cardIcon,
  info:          infoIcon,
  lowPrice:      lowPriceIcon,
  couponBg:      couponBgIcon,
  couponPercent: couponPercentIcon,
  bestseller:    bestsellerIcon,
  bestsellerBadge,
  noonOne:       noonOneBadge,

  aiReturns:  aiReturnsIcon,
  aiWarranty: aiWarrantyIcon,
  aiSoldBy:   aiSoldByIcon,

  warrantyCalendar,
  warrantyLiquid,
  warrantyDelivery,
  warrantyProtection,
  warrantyMalfunction,
  warrantyInfinity,

  tecvLogo,
  sponsoredProductApple,
  sponsoredProductSamsung,
  expressToday: expressTodayIcon,

  sellerStore:     sellerStoreIcon,
  sellerStar:      sellerStarIcon,
  sellerLowReturn: sellerLowReturnIcon,
  sellerRatings:   sellerRatingsIcon,
  sellerPartner:   sellerPartnerIcon,
  sellerDescribed: sellerDescribedIcon,
  sellerVerified:  sellerVerifiedIcon,
};

/* Distance over which the hero morph completes. Roughly the height of the
   product image so by the time the user has scrolled past it the search pill
   is fully expanded and the image is at its smallest. */
const MORPH_END = 280;

type PdpTopBarProps = {
  scrollY: ReturnType<typeof useScroll>['scrollY'];
};

function PdpTopBar({ scrollY }: PdpTopBarProps) {
  const navigate = useNavigate();
  const progress = useTransform(scrollY, [0, MORPH_END], [0, 1], { clamp: true });

  // Topbar background fades to opaque white once the user has scrolled — needed
  // so info cards behind don't read through the gaps between the white pills.
  const headerBg = useTransform(
    progress,
    [0, 0.5, 1],
    ['rgba(249,249,251,0)', 'rgba(255,255,255,0.85)', 'rgba(255,255,255,1)'],
  );
  const headerShadow = useTransform(
    progress,
    [0.7, 1],
    ['0 0 0 rgba(0,0,0,0)', '0 1px 0 rgba(16,22,40,0.06)'],
  );

  // Search morphs from a 40×40 icon button (Figma state 1) into a 193×40 pill
  // with a right-aligned "Search" label (Figma state 2 / M-SearchPill). Heart
  // and share stay 40×40 throughout — they don't collapse.
  const searchWidth = useTransform(progress, [0, 1], [40, 193]);
  const searchPadX = useTransform(progress, [0, 1], [8, 12]);
  // Hold the label hidden while the pill is still mostly icon-shaped, then
  // fade in once there's actually room for it.
  const searchTextOpacity = useTransform(progress, [0.6, 1], [0, 1]);

  return (
    <motion.header
      className="pdp-topbar"
      style={{ background: headerBg, boxShadow: headerShadow }}
    >
      <StatusBar tone="dark" />
      <div className="pdp-topbar__row">
        <button
          type="button"
          className="pdp-topbar__pill"
          aria-label="Go back"
          onClick={() => { if (window.history.length > 1) navigate(-1); else navigate('/shop'); }}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="pdp-topbar__cluster">
          <motion.button
            type="button"
            className="pdp-topbar__search"
            aria-label="Search"
            onClick={() => navigate('/search')}
            style={{ width: searchWidth, paddingLeft: searchPadX, paddingRight: searchPadX }}
          >
            <span className="pdp-topbar__search-icon">
              <SearchIcon size={20} />
            </span>
            <motion.span
              className="pdp-topbar__search-text"
              style={{ opacity: searchTextOpacity }}
              aria-hidden
            >
              Search
            </motion.span>
          </motion.button>

          <button type="button" className="pdp-topbar__pill" aria-label="Wishlist">
            <HeartOutline size={20} />
          </button>

          <button type="button" className="pdp-topbar__pill" aria-label="Share">
            <ShareIcon size={20} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}

function CouponIcon() {
  return (
    <div className="relative h-6 w-6 shrink-0">
      <img src={ASSETS.couponBg} alt="" className="absolute inset-0 h-full w-full" />
      <img src={ASSETS.couponPercent} alt="" className="absolute left-1/2 top-1/2 h-3.5 w-3.5 [transform:translate(-50%,-50%)]" />
    </div>
  );
}

function MainInfo({ product }: { product?: Product }) {
  const brand = product?.brand ?? 'Anker';
  const name = product?.name ?? 'USB C Plug, 735 Charger (Nano II 65W), PPS 3-Port Fast Compact USB C Charger for MacBook Pro/Air, iPad Pro, Galaxy S25/S24/S23/S22/S21/S20/S10';
  const rating = product?.rating ?? 4.3;
  const reviewCount = product?.reviewCount ?? 126;
  const sellingPrice = product?.sellingPrice ?? 109;
  const originalPrice = product?.originalPrice ?? 209;
  const discount = originalPrice > sellingPrice
    ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100)
    : 0;
  return (
    <section className="mx-3 rounded-[16px] bg-accent-100 flex flex-col gap-2 pt-2.5">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-1 text-[14px] font-bold leading-[18px] tracking-[-0.14px] text-accent-700">
          <img src={ASSETS.verified} alt="" className="h-[17px] w-[17px]" />
          {brand}
        </div>
        <div className="flex items-center gap-0.5 text-[13px] font-semibold leading-[15px] tracking-[-0.12px] text-accent-700">
          Visit Store
          <img src={ASSETS.chevronRight} alt="" className="h-[12.8px] w-3" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-3 flex flex-col gap-3">
        <div className="flex flex-col gap-1 pr-3 relative">
          <h1 className="text-[16px] leading-[20px] font-medium tracking-[-0.16px] text-[#212121] line-clamp-2">
            {name}
          </h1>
          {product?.description && (
            <p className="text-[13px] leading-[17px] text-bluegray-700 line-clamp-2 mt-0.5">{product.description}</p>
          )}
          <span className="absolute right-0 top-[20px] flex h-5 w-5 items-center justify-center rounded-full bg-bluegray-100">
            <img src={ASSETS.chevronDown} alt="" className="h-2.5 w-2.5" />
          </span>

          <div className="mt-1 flex gap-1 text-[13px]">
            <span className="flex items-center gap-1 rounded-md bg-[#f7f8fa] px-1 py-0.5 text-bluegray-1000 leading-[14px]">
              <img src={ASSETS.star} alt="" className="h-3 w-3" />
              <span className="font-semibold">{rating}</span>
              <span className="font-medium text-bluegray-800">({reviewCount} reviews)</span>
            </span>
            <span className="flex items-center gap-1 rounded-md bg-orange-50 px-1 py-1 text-bluegray-1000 font-medium leading-[14px]">
              <img src={ASSETS.card} alt="" className="h-4 w-4" />
              Prepaid Only
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-1">
            <span className="text-[22px] leading-6 font-bold tracking-[-0.2px] text-bluegray-1000">Đ{sellingPrice}</span>
            <span className="pb-px text-[16px] leading-5 tracking-[-0.16px] text-bluegray-600 line-through">Đ{originalPrice}</span>
            <span className="pb-px text-[14px] leading-[18px] font-semibold tracking-[-0.14px] text-green-700">{discount}% OFF</span>
            <span className="pb-px text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-600">(incl. of VAT)</span>
            <img src={ASSETS.info} alt="" className="ml-auto h-4 w-4" />
          </div>
          <div className="flex h-8 items-center gap-1 rounded-lg bg-gradient-to-r from-[#eaf4fe] to-white from-0% to-[51%] px-1.5 py-2">
            <img src={ASSETS.combo} alt="" className="h-5 w-5" />
            <span className="text-[14px] font-medium text-bluegray-800">Saving Đ45 with Combo</span>
            <img src={ASSETS.info} alt="" className="ml-auto h-4 w-4" />
          </div>

          <div className="inline-flex items-center gap-1.5 self-start rounded bg-[#f9f9fb] px-1.5 py-1 text-[14px] leading-[14px] text-bluegray-800">
            <span>500ml</span>
            <span className="h-3 w-px bg-bluegray-400" />
            <span>Đ2.35/ml</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="rounded bg-[#2122b8] px-1.5 py-0.5 text-[13px] font-semibold leading-[17px] tracking-[-0.14px] text-white">Mega Deal</span>
            <span className="flex items-center gap-1 rounded bg-gradient-to-r from-[#f3f5fc] to-white px-1 py-0.5">
              <img src={ASSETS.lowPrice} alt="" className="h-[14px] w-[14px]" />
              <span className="text-[14px] font-medium leading-[18px] tracking-[-0.14px] text-bluegray-700">Lowest Price in 30 days</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 hide-scrollbar">
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-dashed border-emerald-700/40 bg-[#f6fefd] py-1.5 pl-1.5 pr-2">
            <CouponIcon />
            <span className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-bluegray-900 whitespace-nowrap">Extra 15%, CODE: ENDD15</span>
            <img src={ASSETS.chevronRight} alt="" className="h-2.5 w-2.5" />
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-dashed border-emerald-700/40 bg-[#f6fefd] py-1.5 pl-1.5 pr-2">
            <CouponIcon />
            <span className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-bluegray-900 whitespace-nowrap">Extra 10% off up to Đ150</span>
          </div>
        </div>

        <button type="button" className="flex h-9 items-center justify-between rounded-[10px] bg-[#f9f9fb] pl-3 pr-2">
          <span className="flex items-center gap-2">
            <span className="relative h-4 w-4 inline-flex items-center justify-center">
              <img src={ASSETS.bestsellerBadge} alt="" className="h-4 w-4" />
              <span className="absolute inset-0 -mt-px flex items-center justify-center text-[10px] font-bold leading-3 tracking-[-0.16px] text-white">1</span>
            </span>
            <span className="text-[14px] leading-[19px] text-bluegray-900">
              Bestseller #1 in <span className="font-semibold text-accent-700">{product ? getCategoryLabel(product.id) : 'Products'}</span>
            </span>
          </span>
          <img src={ASSETS.miniChevronRight} alt="" className="h-2.5 w-2.5" />
        </button>
      </div>
    </section>
  );
}

function ComboCard({ productId }: { productId: string }) {
  const items = getComboProducts(productId);
  if (items.length === 0) return null;
  return (
    <section className="mx-3 rounded-2xl bg-white px-4 py-3">
      <h3 className="text-base leading-5 font-bold text-bluegray-1000">In this combo</h3>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {items.map((p) => (
          <div key={p.id} className="min-w-[228px] flex-shrink-0">
            <ProductCardCompact product={p} mode="combo" qtyLabel="x2" />
          </div>
        ))}
      </div>
    </section>
  );
}

function AdCard({ productId }: { productId: string }) {
  const adProduct = getAdProduct(productId);
  if (!adProduct) return null;
  return (
    <div className="mx-3">
      <ProductCardAd product={adProduct} />
    </div>
  );
}

function DeliveryCard({ productId }: { productId?: string }) {
  const [open, setOpen] = useState(true);
  const window = productId ? getDeliveryWindow(productId) : null;
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-[15px] leading-[19px] font-semibold text-bluegray-1000">Delivery Information</h3>
        <span className="flex items-center gap-1 rounded-full bg-transparent px-1.5 py-0.5 text-[11px] font-semibold text-bluegray-900">
          <img src={ASSETS.noonOne} alt="noon One" className="h-[14px] w-auto" />
          member
        </span>
      </div>
      <div className="flex h-10 items-center justify-between rounded-xl border border-solid border-bluegray-200 px-3 py-2">
        <span className="flex items-center gap-2 text-[13px] leading-[16px] text-bluegray-900">
          {window?.express && (
            <img src="/express-badge.svg" alt="express" className="h-4 w-auto" />
          )}
          {window?.arriveBy ?? 'Delivery date unavailable'}
        </span>
        <span className="text-[12px] font-medium text-orange-600">{window?.cutoff ?? ''}</span>
      </div>
      <div className="rounded-xl bg-bluegray-100">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between px-3 py-3 text-[14px] leading-[18px] font-semibold text-bluegray-900"
        >
          Faster Delivery Options
          <img
            src={ASSETS.chevronDown}
            alt=""
            className={`h-5 w-5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (window?.todayPrice || window?.tomorrowPrice) && (
          <div className="border-t border-bluegray-200 px-3 py-2 flex flex-col gap-3">
            {window?.todayPrice && (
              <div className="flex items-center justify-between">
                <span className="text-[13px] leading-[18px] text-bluegray-900">
                  Get it <span className="font-semibold">Today</span>
                </span>
                <span className="text-[13px] font-semibold text-bluegray-900">{window.todayPrice}</span>
              </div>
            )}
            {window?.tomorrowPrice && (
              <div className="flex items-center justify-between">
                <span className="text-[13px] leading-[18px] text-bluegray-900">
                  Get it <span className="font-semibold">Tomorrow</span>{' '}
                  <span className="text-bluegray-600">[before 12pm]</span>
                </span>
                <span className="text-[13px] font-semibold text-bluegray-900">{window.tomorrowPrice}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center gap-1 px-3 py-2 text-[11px] text-bluegray-600">
          <img src={ASSETS.info} alt="" className="h-3 w-3" />
          Select these options on checkout
        </div>
      </div>
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl bg-bluegray-1000 px-3 py-3 text-[13px] font-semibold text-white"
      >
        <span className="flex items-center gap-1.5">
          Get it today for free with{' '}
          <img src={ASSETS.noonOne} alt="noon One" className="h-[14px] w-auto" />
        </span>
        <img src={ASSETS.chevronRight} alt="" className="h-3 w-3 [filter:invert(1)]" />
      </button>
    </section>
  );
}

function FreeGifts({ productId }: { productId?: string }) {
  const gifts = productId ? getGiftOffers(productId) : [];
  if (gifts.length === 0) return null;
  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-3">
      <h3 className="text-[15px] leading-[19px] font-semibold text-bluegray-1000">Free gifts for you</h3>
      <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {gifts.map((g) => (
          <article
            key={g.title}
            className="flex shrink-0 w-[270px] gap-3 rounded-xl border border-bluegray-300 p-2"
          >
            <div className="relative h-[55px] w-14 shrink-0 overflow-hidden rounded-lg border border-bluegray-100 bg-white">
              <img src={g.img} alt={g.title} className="h-full w-full object-contain" />
              <span className="absolute bottom-0 left-0 right-0 rounded-b-md bg-[#1155cb] text-center text-[13px] font-bold italic text-white">Free</span>
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className="text-[14px] font-semibold leading-[18px] text-[#242a34]">{g.title}</p>
              <p className="text-[12px] font-medium leading-[16px] text-bluegray-600">{g.sub}</p>
              <p className="mt-auto text-[13px] font-semibold text-accent-700">View eligible products &gt;</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChipGroup({ options, selectedIndex }: { options: string[]; selectedIndex: number }) {
  return (
    <div className="flex h-10 items-center gap-3">
      {options.map((label, i) => {
        const selected = i === selectedIndex;
        return (
          <div
            key={label}
            className={
              selected
                ? "flex h-10 items-center justify-center rounded-[10px] border border-solid border-accent-300 bg-white px-3 py-2.5 shadow-[0_8px_12px_rgba(14,14,14,0.07)] text-base font-semibold leading-[18px] text-bluegray-1000"
                : "flex h-10 items-center justify-center rounded-[10px] border border-solid border-bluegray-300 bg-white px-3 py-2.5 text-base italic font-normal leading-[18px] text-bluegray-800"
            }
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}

type TrustMarker = {
  icon: string;
  label: string;
  /** 'white' = white bg + bluegray-200 border (semibold text). 'blue' = blue-50 bg, no border (medium text). */
  variant: 'white' | 'blue';
};

const TRUST_MARKERS: TrustMarker[] = [
  { icon: trustLowReturn,          label: "Low\nReturn",           variant: 'white' },
  { icon: trustPartnerSince,       label: "Partner\nSince",        variant: 'white' },
  { icon: trustProductAsDescribed, label: "Product\nAs Described", variant: 'white' },
  { icon: trustHighRated,          label: "High\nRated",           variant: 'white' },
  { icon: trustLowEasyReturns,     label: "Low & Easy\nReturns",   variant: 'blue'  },
  { icon: trustSecureTransactions, label: "Secure\nTransactions",  variant: 'blue'  },
];

function TrustMarkers() {
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col overflow-hidden">
      <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
        {TRUST_MARKERS.map((item) => {
          const isWhite = item.variant === 'white';
          return (
            <div
              key={item.label}
              className="flex h-20 w-[94px] shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-3.5 bg-white border border-solid border-bluegray-200"
            >
              <img src={item.icon} alt="" className="h-6 w-6 object-contain" />
              <p
                className={
                  "w-full text-center text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-1000 whitespace-pre-line " +
                  (isWhite ? "font-semibold" : "font-medium")
                }
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function VariantPicker({ product }: { product: Product }) {
  const cfg = getVariantConfig(product.id);
  const swatchFallback = product.images[0];
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col">
      <div className="flex flex-col gap-6">
        {cfg.chipSections.map((section) => (
          <div key={section.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-0.5">
              <p className="flex-1 text-[15px] font-semibold leading-[17px] text-bluegray-1000">{section.title}</p>
              {section.trailing && (
                <div className="flex items-center gap-0.5">
                  {section.trailing.kind === 'info' && (
                    <img src={ASSETS.info} alt="" className="h-4 w-4" />
                  )}
                  <span className="text-[13px] font-bold leading-[15px] text-accent-700">{section.trailing.label}</span>
                </div>
              )}
            </div>
            <ChipGroup options={section.options} selectedIndex={section.selectedIndex} />
          </div>
        ))}

        {cfg.colourOptions && cfg.colourOptions.length > 0 && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-0.5">
              <p className="flex-1 text-[15px] font-semibold leading-[17px] text-bluegray-1000">{cfg.colourTitle ?? 'Colour'}</p>
              <span className="text-[13px] font-bold leading-[15px] text-accent-700">View All</span>
            </div>
            <div className="flex gap-3 overflow-x-auto -mx-1 px-1 pb-1">
              {cfg.colourOptions.map((v) => {
                const selected = v.state === "selected";
                const oos = v.state === "out-of-stock";
                return (
                  <div
                    key={v.name}
                    className={
                      "flex w-[88px] shrink-0 flex-col items-center overflow-hidden rounded-[10px] bg-white pb-0.5 " +
                      (selected
                        ? "border border-solid border-accent-400 shadow-[0_8px_24px_rgba(14,14,14,0.07)]"
                        : oos
                        ? "border border-dashed border-bluegray-300"
                        : "border border-solid border-bluegray-300")
                    }
                  >
                    <div className="relative h-[88px] w-full overflow-hidden">
                      <img src={v.img ?? swatchFallback} alt={v.name} className="h-full w-full object-contain" />
                      {oos && (
                        <div className="absolute left-0 top-1/2 flex h-[18px] w-full -translate-y-1/2 items-center justify-center bg-[rgba(16,22,40,0.3)] p-1">
                          <span className="shrink-0 whitespace-nowrap text-[9px] font-semibold italic leading-3 text-white">OUT OF STOCK</span>
                        </div>
                      )}
                    </div>
                    <div className="flex w-full items-center justify-center p-1">
                      <p
                        className={
                          "text-xs leading-[14px] tracking-[-0.12px] " +
                          (selected
                            ? "font-semibold italic text-bluegray-1000"
                            : oos
                            ? "italic text-bluegray-500"
                            : "italic text-bluegray-800")
                        }
                      >
                        {v.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function PaymentOffers() {
  const cardBase = "flex-shrink-0 w-[232px] rounded-[10px] border border-bluegray-200 p-2 flex items-center gap-2 h-16";
  const logoBox = "h-10 w-[60px] shrink-0 flex items-center justify-center overflow-hidden rounded-lg";
  return (
    <section className="mx-3 rounded-2xl bg-white px-0 py-3 flex flex-col gap-3">
      <h2 className="px-3.5 text-[15px] font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Payment offers
      </h2>
      <div className="flex gap-2 overflow-x-auto px-3 pb-1">
        {/* Noon VISA card — primary */}
        <div className={cardBase}>
          <div className={logoBox}>
            <img src={ASSETS.noonVisaCard} alt="Noon VISA" className="h-10 w-[60px] object-cover rounded-md" />
          </div>
          <p className="text-[12px] leading-[14px] tracking-[-0.12px] text-[#0e0e0e] line-clamp-3">
            <span className="font-bold">Get extra 5% cashback</span>
            {" using ENBD noon VISA credit card "}
            <span className="font-semibold text-accent-700">Apply Now</span>
          </p>
        </div>

        {/* Tabby */}
        <div className={cardBase}>
          <div className={logoBox}>
            <img src={ASSETS.tabbyLogo} alt="Tabby" className="h-10 w-[60px] object-contain" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-bluegray-900 truncate">
              Get extra 5% cashback
            </p>
            <p className="text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-600 line-clamp-2">
              on using ENBD noon VISA credit card
            </p>
          </div>
        </div>

        {/* Tamara */}
        <div className={cardBase}>
          <div className={logoBox}>
            <img src={ASSETS.tamaraLogo} alt="Tamara" className="h-10 w-[60px] object-contain" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-bluegray-900 truncate">
              Split your payment in 4
            </p>
            <p className="text-[12px] leading-[16px] text-bluegray-600 line-clamp-2">
              Pay zero interest on 4 installments of dhm44 each
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const USP_ICONS: Record<string, string> = {
  calendar:    ASSETS.warrantyCalendar,
  liquid:      ASSETS.warrantyLiquid,
  delivery:    ASSETS.warrantyDelivery,
  protection:  ASSETS.warrantyProtection,
  malfunction: ASSETS.warrantyMalfunction,
  infinity:    ASSETS.warrantyInfinity,
};

function SponsoredProducts({ productId }: { productId: string }) {
  const items = getSponsoredProducts(productId);
  if (items.length === 0) return null;
  return (
    <section className="mx-3 rounded-2xl border border-white bg-bluegray-100 overflow-hidden">
      <div className="flex flex-col gap-1 bg-white pb-3 rounded-xl">
        {/* Header */}
        <div className="flex items-start justify-between px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="h-11 w-11 shrink-0 flex items-center justify-center overflow-hidden rounded-[10px] border border-[#f5f5f5] bg-[#fafafa]">
              <img src={ASSETS.tecvLogo} alt="TECV" className="h-4 w-[38px] object-cover" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">
                Top quality products
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-bold leading-[18px] tracking-[-0.14px] text-accent-700">
                  Shop TECV
                </span>
                <img src={ASSETS.miniChevronRight} alt="" className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
          <div className="rounded bg-bluegray-100 px-1.5 py-0.5">
            <span className="text-[12px] leading-[11px] text-bluegray-600">Ad</span>
          </div>
        </div>

        <div className="flex gap-2.5 overflow-x-auto px-3 pb-1">
          {items.map((p) => (
            <div key={p.id} className="flex-shrink-0 w-[216px]">
              <ProductCardCompact product={p} mode="sponsored" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellerWidget({ productId }: { productId?: string }) {
  const SELLER_BADGES = [
    { icon: ASSETS.sellerLowReturn, label: "Low Return Seller" },
    { icon: ASSETS.sellerRatings,   label: "Great Recent Ratings" },
    { icon: ASSETS.sellerPartner,   label: "Partner Since 5+ Years" },
  ];
  const sellerName = productId ? getSellerName(productId) : 'noon Marketplace';

  return (
    <section className="mx-3 rounded-2xl bg-white py-3 flex flex-col gap-4 overflow-hidden">
      {/* Header: store icon + seller info */}
      <div className="px-3 flex items-start justify-between gap-5">
        <div className="flex items-start gap-2">
          {/* Store icon */}
          <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-[10px] border border-bluegray-200">
            <img src={ASSETS.sellerStore} alt="" className="h-[30px] w-[30px] object-contain" />
          </div>

          {/* Name + rating */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">Sold by</span>
              <span className="text-[14px] font-bold leading-[18px] tracking-[-0.14px] text-bluegray-1000 ml-1">{sellerName}</span>
              <img src={ASSETS.miniChevronRight} alt="" className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              {/* Star rating pill */}
              <div className="flex items-center gap-0.5 bg-bluegray-100 px-1.5 py-0.5 rounded-[4px] h-6">
                <img src={ASSETS.sellerStar} alt="" className="h-3 w-3 object-contain" />
                <span className="text-[12px] font-semibold leading-[14px] tracking-[-0.12px] text-bluegray-1000">4.3</span>
                <span className="text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-600">(128)</span>
              </div>
              {/* Positive rating pill */}
              <div className="flex items-center gap-1 bg-bluegray-100 px-2 py-0.5 rounded-full h-6">
                <span className="text-[12px] font-bold leading-[14px] tracking-[-0.12px] text-[#13645f]">74%</span>
                <span className="text-[12px] font-semibold leading-[14px] tracking-[-0.12px] text-[#13645f]">Positive</span>
                <span className="text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-600">Seller Ratings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="px-3 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {SELLER_BADGES.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1 border border-[#f5f5f5] rounded-[18px] px-2 py-1">
              <img src={icon} alt="" className="h-4 w-4 object-contain" />
              <span className="text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-700 whitespace-nowrap">{label}</span>
            </div>
          ))}
          {/* Item as Described badge with green % */}
          <div className="flex items-center gap-1 border border-[#f5f5f5] rounded-[18px] px-2 py-1">
            <img src={ASSETS.sellerDescribed} alt="" className="h-4 w-4 object-contain" />
            <span className="text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-700 whitespace-nowrap">
              Item as Described{" "}
              <span className="font-semibold text-[#13645f]">100%</span>
            </span>
          </div>
        </div>

        {/* Placeholder subtitle */}
        <div className="flex items-center h-9 bg-bluegray-100 rounded-[10px] px-2">
          <span className="text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-700">
            This is a placeholder for brands to place subititle
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-bluegray-200" />

      {/* Other sellers offer */}
      <div className="px-3">
        <div className="flex items-center gap-2 h-9 bg-accent-50 rounded-[10px] pl-3 pr-2">
          <img src={ASSETS.sellerStore} alt="" className="h-4 w-4 shrink-0 object-contain" />
          <p className="flex-1 text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-700">
            5 offers from other sellers from{" "}
            <span className="font-semibold text-bluegray-1000">Ð649</span>
          </p>
          <img src={ASSETS.miniChevronRight} alt="" className="h-5 w-5 shrink-0" />
        </div>
      </div>
    </section>
  );
}

function ProductFeatures({ product }: { product?: Product }) {
  if (!product) return null;
  const details = getProductDetails(product.id);
  const features = details.highlights.slice(0, 4);
  if (features.length === 0) return null;
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <h2 className="px-0.5 text-[15px] font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Product Features
      </h2>
      <div className="rounded-lg bg-bluegray-50 overflow-hidden">
        <div className="aspect-square w-full bg-white flex items-center justify-center">
          <img src={product.images[0]} alt={product.name} className="max-h-[80%] max-w-[80%] object-contain" />
        </div>
        <div className="grid grid-cols-2 gap-2 p-3">
          {features.map((f) => (
            <div key={f} className="rounded-lg bg-white px-2.5 py-2 flex items-start gap-1.5">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent-700" />
              <p className="text-[12px] leading-[15px] tracking-[-0.12px] text-bluegray-1000">{f}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestsellerBanner({ productId }: { productId?: string }) {
  const label = productId ? getCategoryLabel(productId) : 'Products';
  return (
    <section
      className="mx-3 rounded-2xl border border-white flex items-center gap-2.5 pl-3 pr-2 py-1.5"
      style={{ background: "linear-gradient(119.33deg, #ffffff 14.8%, #e8fcfa 141.3%)" }}
    >
      <img src={ASSETS.bestsellerBadge} alt="" className="h-10 w-10 shrink-0" />
      <div className="flex-1 flex flex-col gap-0.5">
        <div className="flex items-center gap-1">
          <span className="text-[14px] font-bold leading-[18px] tracking-[-0.14px] text-[#242a34]">Bestseller #1</span>
          <span className="text-[14px] italic leading-4 tracking-[-0.14px] text-[#5d5d5d]">in</span>
          <span className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-[#0a4f4a]">{label}</span>
        </div>
        <p className="text-[12px] leading-[14px] tracking-[-0.12px] text-[#5d5d5d]">Explore other bestellers</p>
      </div>
      <img src={ASSETS.miniChevronRight} alt="" className="h-5 w-5 shrink-0" />
    </section>
  );
}

function AdditionalInformation() {
  const rows = [
    { icon: ASSETS.aiReturns,  label: "Not eligible for returns" },
    { icon: ASSETS.aiSoldBy,   label: "Free delivery with Lockers & Pickup" },
    { icon: ASSETS.aiWarranty, label: "1 year warranty applicable" },
  ];
  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-4 flex flex-col gap-3">
      <h2 className="px-0.5 text-[15px] font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Additional Information
      </h2>
      <div className="flex flex-col gap-2">
        {rows.map(({ icon, label }) => (
          <div key={label} className="flex h-11 items-center justify-between rounded-lg bg-bluegray-100 px-2.5 py-2">
            <div className="flex items-center gap-2">
              <img src={icon} alt="" className="h-6 w-6 object-contain" />
              <span className="text-[14px] font-medium leading-[18px] tracking-[-0.14px] text-bluegray-1000">
                {label}
              </span>
            </div>
            <img src={ASSETS.miniChevronRight} alt="" className="h-5 w-5" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ExtendedWarranty({ productId }: { productId?: string }) {
  if (!productId || !shouldShowWarranty(productId)) return null;
  const cards = getWarrantyPlans(productId);
  if (cards.length === 0) return null;
  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-base font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
          Extended warranty
        </h2>
        <div className="flex items-center gap-1 opacity-80">
          <span className="text-[13px] text-[#0e0e0e]">by</span>
          <img src={ASSETS.protect4lessLogo} alt="Protect4Less" className="h-[15px] w-[84px] object-contain" />
        </div>
      </div>

      {/* Cards — horizontally scrollable */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {cards.map((card) => (
          <div
            key={card.period}
            className="flex-shrink-0 w-[260px] rounded-xl bg-accent-50 flex flex-col gap-1 pt-1.5 overflow-hidden"
          >
            {/* Period label */}
            <p className="px-3 text-[12px] font-bold leading-[17px] text-[#1155cb]">
              {card.period}
            </p>

            {/* White card body */}
            <div className="bg-white rounded-xl flex flex-col gap-3 pt-3 overflow-hidden border border-solid border-[rgba(245,245,245,0.6)]">
              {/* Name row */}
              <div className="px-3 flex items-center gap-2">
                <img
                  src={card.shield === "gold" ? ASSETS.shieldGold : ASSETS.shieldBlue}
                  alt=""
                  className="h-10 w-10 shrink-0 object-contain"
                />
                <div className="flex flex-col">
                  {card.title.split("\n").map((line, i) => (
                    <span
                      key={i}
                      className="text-[14px] font-medium italic leading-[18px] tracking-[-0.14px] text-[#0e0e0e]"
                    >
                      {line}
                      {i === card.title.split("\n").length - 1 && (
                        <img src={ASSETS.chevronRight} alt="" className="inline h-4 w-4 ml-0.5 -mb-0.5" />
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* USPs */}
              <div className="flex flex-col gap-0.5">
                {card.usps.map((usp) => (
                  <div key={usp.text} className="flex items-center gap-1 h-5 px-3">
                    <img src={USP_ICONS[usp.icon]} alt="" className="h-[18px] w-[18px] shrink-0 object-contain" />
                    <p className="text-[12px] italic leading-4 text-[#5d5d5d]">{usp.text}</p>
                  </div>
                ))}
              </div>

              {/* Price + Select */}
              <div className="flex items-center justify-between border-t border-bluegray-200 px-3 py-3">
                <span className="text-[16px] font-bold leading-5 tracking-[-0.16px] text-[#0e0e0e]">
                  {card.price}
                </span>
                <button className="rounded-lg border border-[#96c6ff] bg-white px-6 py-2 text-[14px] font-bold italic leading-[18px] text-[#3866df] shadow-[0_0_4px_rgba(0,118,255,0.1)]">
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductDetails({ productId }: { productId?: string }) {
  const [open, setOpen] = useState<string>("overview");
  const details = productId ? getProductDetails(productId) : null;

  const items = [
    {
      id: 'overview',
      label: 'Overview',
      content: details && (
        <div className="flex flex-col gap-3 px-3 pb-3 pt-3">
          <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">
            {details.overview}
          </p>
          {details.highlights.length > 0 && (
            <ul className="flex flex-col gap-2">
              {details.highlights.slice(0, 4).map((bullet) => (
                <li key={bullet} className="flex items-start gap-1">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bluegray-1000" />
                  <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">{bullet}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ),
    },
    {
      id: 'highlights',
      label: 'Highlights',
      content: details && (
        <div className="flex flex-col gap-2 px-3 pb-3 pt-3">
          {details.highlights.map((point) => (
            <li key={point} className="flex items-start gap-1 list-none">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bluegray-1000" />
              <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">{point}</p>
            </li>
          ))}
        </div>
      ),
    },
    {
      id: 'specifications',
      label: 'Specifications',
      content: details && (
        <div className="flex flex-col px-3 pb-3 pt-3">
          {details.specs.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between border-b border-bluegray-200 py-2 last:border-0">
              <span className="text-[13px] text-bluegray-600">{key}</span>
              <span className="text-[13px] font-semibold text-bluegray-1000 text-right max-w-[60%]">{value}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-4 flex flex-col gap-3">
      <h2 className="px-0.5 text-[15px] font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Product Details
      </h2>
      <div className="flex flex-col gap-2">
        {items.map(({ id, label, content }) => {
          const isOpen = open === id;
          return (
            <div key={id} className="overflow-hidden rounded-xl">
              <button
                className="flex h-11 w-full items-center justify-between bg-bluegray-100 px-3"
                onClick={() => setOpen(isOpen ? "" : id)}
              >
                <span className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-bluegray-1000">
                  {label}
                </span>
                <img
                  src={ASSETS.chevronDown}
                  alt=""
                  className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && content && (
                <div className="bg-bluegray-100">{content}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BottomBar() {
  return (
    <div className="sticky bottom-0 z-20 rounded-t-xl bg-white px-3 pt-3 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
      <div className="flex h-12 items-center gap-2">
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-solid border-bluegray-300">
          <span className="text-xs text-bluegray-500">QTY</span>
          <span className="text-base font-bold text-bluegray-800">1</span>
        </div>
        <button className="h-12 flex-1 rounded-[10px] border border-solid border-noon-blue text-sm font-bold text-noon-blue">Buy now</button>
        <button className="h-12 flex-1 rounded-[10px] bg-noon-blue text-sm font-bold text-white">Add to cart</button>
      </div>
      <div className="flex justify-center pb-2 pt-3">
        <div className="h-[5px] w-[124px] rounded-lg bg-[#0e0e0e]" />
      </div>
    </div>
  );
}

function FrequentlyBoughtTogether({ productId }: { productId: string }) {
  const items = getFrequentlyBoughtTogether(productId);
  const [selected, setSelected] = useState<Set<string>>(() => new Set(items.map((p) => p.id)));
  if (items.length === 0) return null;

  function toggle(id: string, next: boolean) {
    setSelected((prev) => {
      const out = new Set(prev);
      if (next) out.add(id);
      else out.delete(id);
      return out;
    });
  }

  const total = items
    .filter((p) => selected.has(p.id))
    .reduce((sum, p) => sum + p.sellingPrice, 0);

  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold leading-[19px] text-bluegray-1000">Frequently bought together</h2>
      <div className="flex items-stretch gap-1.5">
        {items.map((item, idx) => (
          <div key={item.id} className="flex flex-1 items-stretch gap-1">
            <div className="flex flex-1">
              <ProductCardBundle
                product={item}
                selected={selected.has(item.id)}
                onToggle={toggle}
              />
            </div>
            {idx < items.length - 1 && (
              <span className="flex shrink-0 items-center text-bluegray-400 text-[14px] font-bold">+</span>
            )}
          </div>
        ))}
      </div>
      <button type="button" className="mt-1 h-10 w-full rounded-[10px] border border-solid border-noon-blue text-[14px] font-semibold text-noon-blue">
        Buy all for Đ{total}
      </button>
    </section>
  );
}

function RatingsReviews({ product }: { product?: Product }) {
  if (!product) return null;
  const bundle = getReviewBundle(product.id);
  const reviewCount = bundle.totalReviews.toLocaleString();
  const filledStars = Math.round(bundle.averageRating);
  const photos = [product.images[0], product.images[1] ?? product.images[0], product.images[0], product.images[1] ?? product.images[0]];

  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-[15px] font-semibold leading-[19px] text-bluegray-1000">Ratings & Reviews</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-[24px] font-bold leading-7 text-bluegray-1000">{bundle.averageRating.toFixed(1)}</span>
          <span className="flex gap-0.5 text-emerald-700 text-[18px]">
            {Array.from({ length: filledStars }).map((_, j) => <span key={`f${j}`}>★</span>)}
            <span className="text-bluegray-300">{Array.from({ length: Math.max(0, 5 - filledStars) }).map((_, j) => <span key={`e${j}`}>★</span>)}</span>
          </span>
        </div>
        <p className="flex items-center gap-1 text-[12px] leading-4 text-bluegray-600">
          Avg. rating based on {reviewCount} reviews from trusted sources
          <img src={ASSETS.info} alt="" className="h-3 w-3" />
        </p>
      </div>

      {bundle.summaryBullets.length > 0 && (
        <div className="rounded-xl bg-purple-50 p-3 flex flex-col gap-1.5">
          <p className="flex items-center gap-1 text-[13px] font-semibold text-bluegray-1000">
            {reviewCount} reviews, summarised by noon AI
            <span className="text-purple-700">✦</span>
          </p>
          <ul className="flex flex-col gap-1 pl-2">
            {bundle.summaryBullets.map((b) => (
              <li key={b} className="flex w-full items-start gap-1 text-[13px] leading-[18px] text-bluegray-1000">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bluegray-1000" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-bluegray-1000">Photo Reviews ({reviewCount})</h3>
        <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1">
          {photos.map((img, i) => (
            <div key={i} className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-bluegray-100">
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold text-bluegray-1000">Top Reviews ({reviewCount})</h3>
        {bundle.reviews.map((r, i) => (
          <article key={i} className="flex flex-col gap-2 rounded-xl border border-bluegray-200 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-bluegray-1000">{r.name}</span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                <img src={ASSETS.verified} alt="" className="h-3 w-3" />
                Verified Buy
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-bluegray-600">
              <span className="text-emerald-700 text-[12px]">
                {Array.from({ length: r.stars }).map((_, j) => <span key={j}>★</span>)}
                <span className="text-bluegray-300">{Array.from({ length: 5 - r.stars }).map((_, j) => <span key={j}>★</span>)}</span>
              </span>
              <span>·</span>
              <span>{r.when}</span>
            </div>
            {product.variant && (
              <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-bluegray-700">
                <span>{product.variant}</span>
                <span>·</span>
                <span>{product.brand}</span>
              </div>
            )}
            <p className="text-[13px] font-semibold text-bluegray-1000">{r.title}</p>
            <p className="text-[12px] leading-[16px] text-bluegray-700">
              {r.body} <span className="font-semibold text-accent-700">{i === 0 ? 'More' : 'Less'}</span>
            </p>
            <p className="text-[12px] font-semibold text-accent-700">Translate to عربي</p>
            <div className="flex gap-1.5">
              {[product.images[0], product.images[1] ?? product.images[0]].map((img, j) => (
                <div key={j} className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-bluegray-100">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <button type="button" className="self-start flex items-center gap-1 rounded-full border border-bluegray-300 px-2.5 py-1 text-[11px] font-medium text-bluegray-700">
              <span>👍</span> Helpful ({r.helpful})
            </button>
          </article>
        ))}
        <button type="button" className="mx-auto mt-1 flex items-center gap-1 text-[14px] font-semibold text-accent-700">
          All customer reviews <img src={ASSETS.miniChevronRight} alt="" className="h-3 w-3" />
        </button>
      </div>
    </section>
  );
}

function ProductCarousel({ title, highlightWord, productId }: { title: string; highlightWord?: string; productId?: string }) {
  const current = productId ? catalogProducts.find((p) => p.id === productId) : undefined;
  const items = current
    ? catalogProducts.filter((p) => p.id !== current.id && p.category === current.category).slice(0, 6)
    : catalogProducts.slice(0, 6);
  if (items.length === 0) return null;
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <h2 className="text-[15px] font-semibold leading-[19px] text-bluegray-1000">
        {highlightWord
          ? <>{title.replace(highlightWord, '')} <span className="text-accent-700">"{highlightWord}"</span></>
          : title}
      </h2>
      <div className="flex gap-2 overflow-x-auto -mx-1 px-1 pb-1">
        {items.map((p) => (
          <div key={p.id} className="w-[164px] shrink-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PdpDesign({ product }: PdpDesignProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: scrollRef });
  const progress = useTransform(scrollY, [0, MORPH_END], [0, 1], { clamp: true });

  // Image scales down toward its center and clamps at 80% (clamp comes from
  // `progress`, which is itself clamped). Once the cards have scrolled up to
  // cover the image we fade it to 0 — otherwise the page bg between cards
  // leaks the still-pinned image through the gaps.
  const imageScale = useTransform(progress, [0, 1], [1, 0.8]);
  const imageOpacity = useTransform(scrollY, [MORPH_END, MORPH_END + 180], [1, 0], { clamp: true });

  return (
    <div
      ref={scrollRef}
      className="pdp-redesign mx-auto h-full w-full max-w-[375px] bg-[#F9F9FB] flex flex-col overflow-y-auto"
    >
      <PdpTopBar scrollY={scrollY} />

      <motion.section
        className="pdp-hero-sticky"
        style={{ scale: imageScale, opacity: imageOpacity }}
      >
        <img src={product?.images[0] ?? ASSETS.productImage} alt={product?.name ?? ""} className="h-[512px] w-full object-cover" />
        <div className="absolute bottom-5 left-1/2 [transform:translateX(-50%)] flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-3.5 rounded-full bg-bluegray-1000" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
        </div>
      </motion.section>

      <div className="pdp-content flex flex-col gap-3">
        <MainInfo product={product} />
        {product && <ComboCard productId={product.id} />}
        <DeliveryCard productId={product?.id} />
        <FreeGifts productId={product?.id} />
        {product && hasVariants(product.id) && <VariantPicker product={product} />}
        <PaymentOffers />
        <TrustMarkers />
        <ProductDetails productId={product?.id} />
        <AdditionalInformation />
        <BestsellerBanner productId={product?.id} />
        <SellerWidget productId={product?.id} />
        <ProductFeatures product={product} />
        {product && <SponsoredProducts productId={product.id} />}
        <ExtendedWarranty productId={product?.id} />
        {product && <FrequentlyBoughtTogether productId={product.id} />}
        <RatingsReviews product={product} />
        <ProductCarousel title="Similar Products" productId={product?.id} />
        {product && (() => {
          const label = getCategoryLabel(product.id);
          const highlight = label.toLowerCase();
          return (
            <ProductCarousel
              title={`Top Products in ${highlight}`}
              highlightWord={highlight}
              productId={product.id}
            />
          );
        })()}
      </div>

      <BottomBar />
    </div>
  );
}
