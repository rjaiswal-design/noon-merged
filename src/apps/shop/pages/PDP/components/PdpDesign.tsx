import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, SearchIcon, HeartOutline, ShareIcon, StatusBar } from "@ui";
import { ASSETS } from "./pdp-assets";
import { BottomBar } from "./pdp-sections/BottomBar";
import { FrequentlyBoughtTogether } from "./pdp-sections/FrequentlyBoughtTogether";
import { RatingsReviews } from "./pdp-sections/RatingsReviews";
import { ProductCarousel } from "./pdp-sections/ProductCarousel";
import "./PdpDesign.css";

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

function MainInfo() {
  return (
    <section className="mx-3 rounded-[16px] bg-accent-100 flex flex-col gap-2 pt-2.5">
      <div className="flex items-center justify-between px-3">
        <div className="flex items-center gap-1 text-[14px] font-bold leading-[18px] tracking-[-0.14px] text-accent-700">
          <img src={ASSETS.verified} alt="" className="h-[17px] w-[17px]" />
          Anker
        </div>
        <div className="flex items-center gap-0.5 text-[13px] font-semibold leading-[15px] tracking-[-0.12px] text-accent-700">
          Visit Store
          <img src={ASSETS.chevronRight} alt="" className="h-[12.8px] w-3" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-3 flex flex-col gap-3">
        <div className="flex flex-col gap-1 pr-3 relative">
          <h1 className="text-[16px] leading-[20px] font-medium tracking-[-0.16px] text-[#212121] line-clamp-2">
            USB C Plug, 735 Charger (Nano II 65W), PPS 3-Port Fast Compact USB C Charger for MacBook Pro/Air, iPad Pro, Galaxy S25/S24/S23/S22/S21/S20/S10
          </h1>
          <span className="absolute right-0 top-[20px] flex h-5 w-5 items-center justify-center rounded-full bg-bluegray-100">
            <img src={ASSETS.chevronDown} alt="" className="h-2.5 w-2.5" />
          </span>

          <div className="mt-1 flex gap-1 text-[13px]">
            <span className="flex items-center gap-1 rounded-md bg-[#f7f8fa] px-1 py-0.5 text-bluegray-1000 leading-[14px]">
              <img src={ASSETS.star} alt="" className="h-3 w-3" />
              <span className="font-semibold">4.3</span>
              <span className="font-medium text-bluegray-800">(126 reviews)</span>
            </span>
            <span className="flex items-center gap-1 rounded-md bg-orange-50 px-1 py-1 text-bluegray-1000 font-medium leading-[14px]">
              <img src={ASSETS.card} alt="" className="h-4 w-4" />
              Prepaid Only
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-1">
            <span className="text-[22px] leading-6 font-bold tracking-[-0.2px] text-bluegray-1000">Đ109</span>
            <span className="pb-px text-[16px] leading-5 tracking-[-0.16px] text-bluegray-600 line-through">Đ209</span>
            <span className="pb-px text-[14px] leading-[18px] font-semibold tracking-[-0.14px] text-green-700">47% OFF</span>
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
              Bestseller #1 in <span className="font-semibold text-accent-700">Chargers</span>
            </span>
          </span>
          <img src={ASSETS.miniChevronRight} alt="" className="h-2.5 w-2.5" />
        </button>
      </div>
    </section>
  );
}

function ComboCard() {
  return (
    <section className="mx-3 rounded-2xl bg-white px-4 py-3">
      <h3 className="text-base leading-5 font-bold text-bluegray-1000">In this combo</h3>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 h-[72px] hide-scrollbar">
        {[1, 2].map((item) => (
          <article key={item} className="min-w-[228px] rounded-2xl border border-solid border-bluegray-200 p-1.5">
            <div className="flex gap-3 items-center">
              <div className="relative h-[60px] w-[53px] overflow-hidden rounded-md bg-bluegray-50">
                <img src={ASSETS.airpods} alt="" className="h-full w-full object-contain" />
                <span className="absolute bottom-1 right-1 rounded-md border border-border-grey-a bg-white px-1 text-[10px]">x2</span>
              </div>
              <div className="flex-1 self-start">
                <p className="line-clamp-2 text-sm leading-[18px] text-[#212121]">Apple Airpods Pro 2 Wireless Earbuds</p>
                <div className="mt-1 flex items-center gap-1 text-sm">
                  <span className="font-bold text-bluegray-900">Ð899</span>
                  <span className="text-bluegray-600 line-through">1399</span>
                  <span className="font-semibold text-green-800">33%</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function AdCard() {
  return (
    <section className="mx-3 relative flex items-center gap-2 rounded-2xl border border-bluegray-200 bg-white p-2">
      <img src={ASSETS.adThumb} alt="" className="h-12 w-12 shrink-0 rounded-lg bg-bluegray-50" />
      <div className="flex flex-1 flex-col gap-1 min-w-0">
        <p className="line-clamp-2 text-[13px] leading-[16px] font-medium text-bluegray-900">
          TCF09 40W Dual USB-C / Type-C 2PD Mini USB-C / Type-C 2PD Mini
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[14px] leading-[18px] font-bold text-bluegray-1000">Đ125</span>
          <span className="text-[12px] leading-[16px] text-bluegray-600 line-through">Đ209</span>
          <span className="text-[12px] leading-[16px] font-semibold text-green-700">47% OFF</span>
          <span className="rounded bg-[#FEEE00] px-1.5 py-px text-[10px] font-bold italic leading-[14px] text-bluegray-1000">express</span>
        </div>
      </div>
      <span className="absolute right-2 top-2 text-[10px] leading-[12px] text-bluegray-500">Ad</span>
    </section>
  );
}

function DeliveryCard() {
  const [open, setOpen] = useState(true);
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
          <span className="rounded bg-[#FEEE00] px-1.5 py-px text-[10px] font-bold italic leading-[14px] text-bluegray-1000">express</span>
          Get by 7th Sep
        </span>
        <span className="text-[12px] font-medium text-orange-600">Order in 21 hrs</span>
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
        {open && (
          <div className="border-t border-bluegray-200 px-3 py-2 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[13px] leading-[18px] text-bluegray-900">
                Get it <span className="font-semibold">Today</span>
              </span>
              <span className="text-[13px] font-semibold text-bluegray-900">+ Đ 14.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] leading-[18px] text-bluegray-900">
                Get it <span className="font-semibold">Tomorrow</span>{' '}
                <span className="text-bluegray-600">[before 12pm]</span>
              </span>
              <span className="text-[13px] font-semibold text-bluegray-900">+ Đ 12.00</span>
            </div>
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

function FreeGifts() {
  const gifts = [
    { title: 'Pepsi Gift Hamper', sub: 'Pack of 6 cans & Hoodie or tote bag' },
    { title: 'Anker Travel Pouch', sub: 'Microfiber pouch + cleaning cloth' },
  ];
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
              <img src={ASSETS.gift} alt="" className="h-full w-full object-contain" />
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

const COLOUR_VARIANTS = [
  { name: "735 GaN", img: "/variants/variant-735-gan.png", state: "default" as const },
  { name: "735 GaN II", img: "/variants/variant-735-gan-ii.png", state: "selected" as const },
  { name: "736 GaN II", img: "/variants/variant-736-gan-ii.png", state: "default" as const },
  { name: "736 GaN", img: "/variants/variant-736-gan.png", state: "out-of-stock" as const },
];

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

const TRUST_MARKERS = [
  { icon: ASSETS.sellerRatings,     label: "High\nRated",           bg: "bg-accent-50",                        size: "w-[104px]", weight: "font-semibold" },
  { icon: ASSETS.sellerLowReturn,   label: "Low & Easy\nReturns",   bg: "bg-accent-50",                        size: "w-[104px]", weight: "font-semibold" },
  { icon: ASSETS.aiWarranty,        label: "Secure\nTransactions",  bg: "bg-accent-50",                        size: "w-[104px]", weight: "font-semibold" },
  { icon: ASSETS.aiReturns,         label: "Low\nReturn",           bg: "bg-white border border-bluegray-200", size: "w-[94px]",  weight: "font-semibold" },
  { icon: ASSETS.sellerPartner,     label: "Partner\nSince",        bg: "bg-white border border-bluegray-200", size: "w-[94px]",  weight: "font-semibold" },
  { icon: ASSETS.sellerDescribed,   label: "Product\nAs Described", bg: "bg-white border border-bluegray-200", size: "w-[94px]",  weight: "font-semibold" },
];

function TrustMarkers() {
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col">
      <div className="flex gap-2 overflow-x-auto">
        {TRUST_MARKERS.map((item) => (
          <div
            key={item.label}
            className={`flex ${item.size} shrink-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-3.5 h-20 ${item.bg}`}
          >
            <img src={item.icon} alt="" className="h-6 w-6" />
            <p className={`w-full text-center text-[12px] leading-[14px] tracking-[-0.12px] text-bluegray-1000 ${item.weight} whitespace-pre-line`}>
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function VariantPicker() {
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-0.5">
            <p className="flex-1 text-[15px] font-semibold leading-[17px] text-bluegray-1000">Versions</p>
            <div className="flex items-center gap-0.5">
              <img src={ASSETS.info} alt="" className="h-4 w-4" />
              <span className="text-[13px] font-bold leading-[15px] text-accent-700">Learn more</span>
            </div>
          </div>
          <ChipGroup options={["UK 3 PIN", "US 2 PIN"]} selectedIndex={0} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="flex-1 text-[15px] font-semibold leading-[17px] text-bluegray-1000">Charger Model</p>
            <span className="text-[13px] font-bold leading-[15px] text-accent-700">Size Guide</span>
          </div>
          <ChipGroup options={["UK 3 PIN", "US 2 PIN"]} selectedIndex={0} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-0.5">
            <p className="flex-1 text-[15px] font-semibold leading-[17px] text-bluegray-1000">Colour</p>
            <span className="text-[13px] font-bold leading-[15px] text-accent-700">View All</span>
          </div>
          <div className="flex gap-3">
            {COLOUR_VARIANTS.map((v) => {
              const selected = v.state === "selected";
              const oos = v.state === "out-of-stock";
              return (
                <div
                  key={v.name}
                  className={
                    "flex w-[88px] flex-col items-center overflow-hidden rounded-[10px] bg-white pb-0.5 " +
                    (selected
                      ? "border border-solid border-accent-400 shadow-[0_8px_24px_rgba(14,14,14,0.07)]"
                      : oos
                      ? "border border-dashed border-bluegray-300"
                      : "border border-solid border-bluegray-300")
                  }
                >
                  <div className="relative h-[88px] w-full overflow-hidden">
                    <img src={v.img} alt={v.name} className="h-full w-full object-cover" />
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

const OVERVIEW_BULLETS = [
  "Power 3 devices at once with 2 USB-C ports and one USB-A port",
  "Connect a single device to charge at up to 65W.",
  "Charge Up to 30 Minutes Faster: Our exclusive PowerIQ 4.0 technology",
  "Greener with GaN: The amount of power saved could be up to 796.39 million kWh per year",
  "ActiveShield 2.0: Anker's proprietary technology enhances protection by intelligently monitoring temperature",
];

const ACCORDION_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className="flex flex-col gap-3 px-3 pb-3">
        <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">
          A compact, high-performance wall charger built with GaN (Gallium Nitride) technology for faster, cooler, and more efficient charging. With 65W output, it can power laptops, tablets, and smartphones at top speed.
        </p>
        <ul className="flex flex-col gap-2">
          {OVERVIEW_BULLETS.map((bullet) => (
            <li key={bullet} className="flex items-start gap-1">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bluegray-1000" />
              <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">{bullet}</p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "highlights",
    label: "Highlights",
    content: (
      <div className="flex flex-col gap-2 px-3 pb-3">
        {[
          "GaN technology for compact, efficient charging",
          "65W max output — charges a MacBook Pro in under 2 hours",
          "Universal compatibility with USB-C PD & USB-A",
          "Foldable plug for travel-friendly portability",
        ].map((point) => (
          <li key={point} className="flex items-start gap-1 list-none">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-bluegray-1000" />
            <p className="text-[14px] leading-[18px] tracking-[-0.14px] text-bluegray-1000">{point}</p>
          </li>
        ))}
      </div>
    ),
  },
  {
    id: "specifications",
    label: "Specifications",
    content: (
      <div className="flex flex-col px-3 pb-3">
        {[
          ["Brand", "Anker"],
          ["Model", "A2668"],
          ["Output Power", "65W"],
          ["Input", "100–240V ~ 50/60Hz"],
          ["Ports", "2× USB-C, 1× USB-A"],
          ["Weight", "128g"],
          ["Dimensions", "53 × 53 × 32 mm"],
        ].map(([key, value]) => (
          <div key={key} className="flex items-center justify-between border-b border-bluegray-200 py-2 last:border-0">
            <span className="text-[13px] text-bluegray-600">{key}</span>
            <span className="text-[13px] font-semibold text-bluegray-1000">{value}</span>
          </div>
        ))}
      </div>
    ),
  },
];

const WARRANTY_CARDS = [
  {
    period: "1 YEAR",
    shield: "gold" as const,
    title: "Accidental Damage\nProtection",
    usps: [
      { icon: "calendar", text: "Active from date of purchase" },
      { icon: "liquid",   text: "Covers liquid damages" },
      { icon: "delivery", text: "Free pickup & delivery" },
    ],
    price: "Ð449",
  },
  {
    period: "1 YEAR ACCIDENTAL + 1 YEAR EXTENDED",
    shield: "blue" as const,
    title: "Accidental Damage &\nExtended Warranty",
    usps: [
      { icon: "protection",  text: "Active from date of purchase" },
      { icon: "malfunction", text: "Covers all accidental damages" },
      { icon: "infinity",    text: "Free pickup & delivery" },
    ],
    price: "Ð449",
  },
];

const USP_ICONS: Record<string, string> = {
  calendar:    ASSETS.warrantyCalendar,
  liquid:      ASSETS.warrantyLiquid,
  delivery:    ASSETS.warrantyDelivery,
  protection:  ASSETS.warrantyProtection,
  malfunction: ASSETS.warrantyMalfunction,
  infinity:    ASSETS.warrantyInfinity,
};

const SPONSORED_PRODUCTS = [
  { img: ASSETS.sponsoredProductApple,   name: "Charging Brick For Apple Devices 25W Charger",   price: "Ð89" },
  { img: ASSETS.sponsoredProductSamsung, name: "Charging Brick For Samsung Devices 25W arger",   price: "Ð69" },
];

function SponsoredProducts() {
  const navigate = useNavigate();
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

        {/* Product cards — horizontal scroll */}
        <div className="flex gap-2.5 overflow-x-auto px-3 pb-1">
          {SPONSORED_PRODUCTS.map((p) => (
            <div
              key={p.name}
              role="button"
              tabIndex={0}
              onClick={() => navigate('/product/galaxy-s25-ultra')}
              className="flex-shrink-0 w-[216px] flex items-start gap-0 rounded-[10px] border border-solid border-bluegray-100 p-1 overflow-hidden cursor-pointer"
            >
              <div className="relative h-[71px] w-16 shrink-0 rounded-lg overflow-hidden bg-bluegray-50">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col gap-1 px-1.5 w-[132px]">
                <p className="text-[12px] font-medium leading-[15px] tracking-[-0.14px] text-[#383838] line-clamp-2 overflow-hidden">
                  {p.name}
                </p>
                <p className="text-[12px] font-bold leading-4 text-bluegray-900">{p.price}</p>
                <img src={ASSETS.expressToday} alt="express today" className="h-[15px] w-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SellerWidget() {
  const SELLER_BADGES = [
    { icon: ASSETS.sellerLowReturn, label: "Low Return Seller" },
    { icon: ASSETS.sellerRatings,   label: "Great Recent Ratings" },
    { icon: ASSETS.sellerPartner,   label: "Partner Since 5+ Years" },
  ];

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
              <span className="text-[14px] font-bold leading-[18px] tracking-[-0.14px] text-bluegray-1000 ml-1">Anker UAE Inc.</span>
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

function ProductFeatures() {
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col gap-3">
      <h2 className="px-0.5 text-[15px] font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Product Features
      </h2>
      <div className="relative w-full overflow-hidden rounded-lg">
        <img src={ASSETS.productFeatures} alt="Product features" className="w-full object-cover" />
        {/* Gradient fade + View More */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1">
          <span className="text-[13px] font-semibold leading-[15px] tracking-[-0.12px] text-accent-700">View More</span>
          <img src={ASSETS.chevronDown} alt="" className="h-3 w-3" />
        </div>
      </div>
    </section>
  );
}

function BestsellerBanner() {
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
          <span className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-[#0a4f4a]">Chargers</span>
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

function ExtendedWarranty() {
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
        {WARRANTY_CARDS.map((card) => (
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

function ProductDetails() {
  const [open, setOpen] = useState<string>("");

  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-4 flex flex-col gap-3">
      <h2 className="px-0.5 text-[15px] font-semibold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Product Details
      </h2>
      <div className="flex flex-col gap-2">
        {ACCORDION_ITEMS.map(({ id, label, content }) => {
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

export default function PdpDesign() {
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
        <img src={ASSETS.productImage} alt="" className="h-[512px] w-full object-cover" />
        <div className="absolute bottom-5 left-1/2 [transform:translateX(-50%)] flex items-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-1000" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-bluegray-300" />
        </div>
      </motion.section>

      <div className="pdp-content flex flex-col gap-3">
        <MainInfo />
        <ComboCard />
        <AdCard />
        <DeliveryCard />
        <FreeGifts />
        <VariantPicker />
        <PaymentOffers />
        <TrustMarkers />
        <ProductDetails />
        <AdditionalInformation />
        <BestsellerBanner />
        <SellerWidget />
        <ProductFeatures />
        <SponsoredProducts />
        <ExtendedWarranty />
        <FrequentlyBoughtTogether />
        <RatingsReviews />
        <ProductCarousel title="Similar Products" />
        <ProductCarousel title="Top Products in chargers" highlightWord="chargers" />
      </div>

      <BottomBar />
    </div>
  );
}
