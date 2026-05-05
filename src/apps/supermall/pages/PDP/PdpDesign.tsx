import { useState } from "react";

const ASSETS = {
  // — Remote Figma images (no local copy, expire in 7 days) —
  productImage: "https://www.figma.com/api/mcp/asset/a0e7e6fd-9f03-445e-9459-a4a23d458d17",
  sliderDots:   "https://www.figma.com/api/mcp/asset/8a7f63f4-e244-44f5-b345-7a14f481ea83",
  adThumb:      "https://www.figma.com/api/mcp/asset/cc641fb6-a6ed-42c4-a559-03fdeed9bf5f",
  gift:         "https://www.figma.com/api/mcp/asset/47365067-b95b-4e06-9376-a4bf4c5d7089",

  // — Product images (PNG) —
  airpods:         "/pdp-v2/airpods.png",
  productFeatures: "/pdp-v2/product-features.png",

  // — Payment offer logos (PNG) —
  noonPayIcon:  "/pdp-v2/offers/noon-pay-icon.png",
  tabbyLogo:    "/pdp-v2/offers/tabby-logo.png",
  noonVisaCard: "/pdp-v2/offers/noon-visa-card.png",
  tamaraLogo:   "/pdp-v2/offers/tamara-logo.png",

  // — Warranty shield images (PNG) —
  shieldGold:       "/pdp-v2/warranty/shield-gold.png",
  shieldBlue:       "/pdp-v2/warranty/shield-blue.png",
  protect4lessLogo: "/pdp-v2/warranty/protect4less-logo.png",

  // — Navigation / header icons —
  back:     "/pdp-v2/icons/back.svg",
  search:   "/pdp-v2/icons/search.svg",
  wishlist: "/pdp-v2/icons/wishlist.svg",
  share:    "/pdp-v2/icons/share.svg",

  // — Chevrons —
  chevronRight:      "/pdp-v2/icons/chevron-right.svg",
  chevronDown:       "/pdp-v2/icons/chevron-down.svg",
  miniChevronRight:  "/pdp-v2/icons/mini-chevron-right.svg",

  // — General UI icons —
  store:        "/pdp-v2/icons/store.svg",
  combo:        "/pdp-v2/icons/combo.svg",
  express:      "/pdp-v2/icons/express.svg",
  star:         "/pdp-v2/icons/star.svg",
  verified:     "/pdp-v2/icons/verified.svg",
  card:         "/pdp-v2/icons/card.svg",
  info:         "/pdp-v2/icons/info.svg",
  lowPrice:     "/pdp-v2/icons/low-price.svg",
  couponBg:     "/pdp-v2/icons/coupon-bg.svg",
  couponPercent:"/pdp-v2/icons/coupon-percent.svg",
  bestseller:   "/pdp-v2/icons/bestseller.png",
  bestsellerBadge: "/pdp-v2/icons/bestseller-badge.svg",

  // — Additional Information section icons —
  aiReturns:  "/pdp-v2/icons/ai-returns.svg",
  aiWarranty: "/pdp-v2/icons/ai-warranty.svg",
  aiSoldBy:   "/pdp-v2/icons/ai-sold-by.svg",

  // — Warranty USP icons —
  warrantyCalendar:    "/pdp-v2/icons/warranty-calendar.svg",
  warrantyLiquid:      "/pdp-v2/icons/warranty-liquid.svg",
  warrantyDelivery:    "/pdp-v2/icons/warranty-delivery.svg",
  warrantyProtection:  "/pdp-v2/icons/warranty-protection.svg",
  warrantyMalfunction: "/pdp-v2/icons/warranty-malfunction.svg",
  warrantyInfinity:    "/pdp-v2/icons/warranty-infinity.svg",

  // — Sponsored products section —
  tecvLogo:               "/pdp-v2/sponsored/tecv-logo.png",
  sponsoredProductApple:  "/pdp-v2/sponsored/product-apple-charger.png",
  sponsoredProductSamsung:"/pdp-v2/sponsored/product-samsung-charger.png",
  expressToday:           "/pdp-v2/icons/express-today.svg",

  // — Seller widget icons —
  sellerStore:      "/pdp-v2/icons/seller-store.svg",
  sellerStar:       "/pdp-v2/icons/seller-star.svg",
  sellerLowReturn:  "/pdp-v2/icons/seller-returns-low.svg",
  sellerRatings:    "/pdp-v2/icons/seller-thumbsup.svg",
  sellerPartner:    "/pdp-v2/icons/seller-partner.svg",
  sellerDescribed:  "/pdp-v2/icons/seller-described.svg",
  sellerVerified:   "/pdp-v2/icons/seller-verified.svg",
};

function HeaderButtons() {
  const btn =
    "h-10 w-10 rounded-full border border-bluegray-200 bg-white/90 flex items-center justify-center";
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between p-3">
      <button className={btn} aria-label="Back">
        <img src={ASSETS.back} alt="" className="h-5 w-5" />
      </button>
      <div className="flex gap-2">
        <button className={btn} aria-label="Search">
          <img src={ASSETS.search} alt="" className="h-5 w-5" />
        </button>
        <button className={btn} aria-label="Wishlist">
          <img src={ASSETS.wishlist} alt="" className="h-5 w-5" />
        </button>
        <button className={btn} aria-label="Share">
          <img src={ASSETS.share} alt="" className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function CouponIcon() {
  return (
    <div className="relative h-6 w-6 shrink-0">
      <img src={ASSETS.couponBg} alt="" className="absolute inset-0 h-full w-full" />
      <img src={ASSETS.couponPercent} alt="" className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

function MainInfo() {
  return (
    <section className="mx-3 rounded-[16px] bg-accent-100 flex flex-col">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1 text-sm font-bold text-accent-700">
          <img src={ASSETS.store} alt="" className="h-6 w-6" />
          Apple
        </div>
        <div className="flex items-center gap-1 text-[13px] font-semibold text-accent-700">
          Visit Store
          <img src={ASSETS.chevronRight} alt="" className="h-3 w-3" />
        </div>
      </div>

      <div className="rounded-2xl bg-white p-3 flex flex-col">
        <h1 className="text-base leading-5 font-medium text-bluegray-1000">
          iPhone Air 256GB Sky Blue 5G (eSim only) With FaceTime - International Version
        </h1>

        <div className="mt-2 flex gap-1 text-[13px]">
          <span className="flex items-center gap-1 rounded-md bg-bluegray-100 px-2 py-1 text-bluegray-1000 font-semibold leading-[18px]">
            <img src={ASSETS.star} alt="" className="h-3.5 w-3.5" />
            4.6 <span className="font-semibold text-bluegray-800">(1541 reviews)</span>
          </span>
          <span className="flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-bluegray-1000 font-medium leading-[18px]">
            <img src={ASSETS.card} alt="" className="h-4 w-4" />
            Prepaid Only
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          <div className="flex items-end gap-1">
            <span className="text-[22px] leading-6 font-bold text-bluegray-1000">AED 3699</span>
            <span className="text-base leading-5 text-bluegray-600 line-through">AED 4299</span>
            <span className="text-sm leading-[18px] font-semibold text-green-700">14%</span>
            <span className="text-sm leading-[18px] text-bluegray-600">(incl. of VAT)</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-50 to-white px-2 py-2 text-bluegray-800">
            <div className="flex items-center gap-2">
              <img src={ASSETS.combo} alt="" className="h-5 w-5" />
              <span className="text-sm font-medium">Saving 45 with Combo</span>
            </div>
            <img src={ASSETS.info} alt="" className="h-4 w-4" />
          </div>

          <div className="inline-flex items-center gap-1.5 self-start rounded bg-bluegray-100 px-1.5 py-1 text-sm text-bluegray-800">
            <span>500ml</span>
            <span className="h-3 w-px bg-bluegray-400" />
            <span>Ð2.35/ml</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="rounded bg-bg-supermall px-1.5 py-0.5 text-[13px] font-semibold leading-[17px] text-white">Mega Deal</span>
            <span className="flex items-center gap-1 rounded bg-gradient-to-r from-[#f3f5fc] to-white px-1 py-0.5">
              <img src={ASSETS.lowPrice} alt="" className="h-[18px] w-[18px]" />
              <span className="text-sm font-medium leading-[18px] text-bluegray-700">Lowest Price in 30 days</span>
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <div className="flex shrink-0 items-center gap-2 rounded-lg border border-dashed border-emerald-700/40 bg-[#f6fefd] py-1.5 pl-1.5 pr-2">
              <CouponIcon />
              <div className="flex items-center gap-1 text-sm font-semibold leading-[18px] text-text-primary">
                <span>Extra 10% Off</span>
                <span>CODE: SAVEBIG</span>
              </div>
              <img src={ASSETS.chevronRight} alt="" className="h-2.5 w-2.5" />
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-lg border border-dashed border-emerald-700/40 bg-[#f6fefd] py-1.5 pl-1.5 pr-2">
              <CouponIcon />
              <span className="text-sm font-semibold leading-[18px] text-text-primary whitespace-nowrap">Extra 10% off up to Ð150</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex h-9 items-center justify-between rounded-[10px] bg-bluegray-100 px-2 py-3">
          <div className="flex items-center gap-2">
            <img src={ASSETS.bestseller} alt="" className="h-6 w-6" />
            <p className="text-sm italic leading-[19px] text-bluegray-900">
              Bestseller #27 in <span className="font-semibold text-accent-700">Chargers</span>
            </p>
          </div>
          <img src={ASSETS.chevronRight} alt="" className="h-3 w-3" />
        </div>
      </div>
    </section>
  );
}

function ComboCard() {
  return (
    <section className="mx-3 rounded-2xl bg-white px-4 py-3">
      <h3 className="text-base leading-5 font-bold text-bluegray-1000">In this combo</h3>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 h-[72px]">
        {[1, 2].map((item) => (
          <article key={item} className="min-w-[228px] rounded-2xl border border-bluegray-200 p-1.5">
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
    <section className="mx-3 rounded-lg bg-white">
      <div className="flex items-center justify-between rounded-md border border-border-primary px-2 h-8">
        <div className="flex items-center gap-2">
          <img src={ASSETS.adThumb} alt="" className="h-8 w-8 rounded bg-bluegray-50" />
          <p className="max-w-[160px] truncate text-xs italic text-noon-black">TCF09 40W Dual USB-C / Type-C...</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-base font-bold text-noon-black">Ð125</span>
          <img src={ASSETS.express} alt="" className="h-4 w-[53px]" />
        </div>
      </div>
    </section>
  );
}

function DeliveryCard() {
  return (
    <section className="mx-3 rounded-2xl bg-white p-3 flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[15px] leading-5 font-bold text-bluegray-1000">Delivery Information</h3>
        <span className="text-xs text-bluegray-600">one member</span>
      </div>
      <div className="rounded-xl border border-bluegray-200 px-3 py-2">
        <p className="text-sm text-bluegray-900">Get it Tomorrow before 12 PM</p>
      </div>
      <button className="mt-2 flex w-full items-center justify-between rounded-xl bg-bluegray-100 px-3 py-3 text-sm leading-5 font-semibold text-bluegray-700">
        Other Delivery Options
        <img src={ASSETS.chevronDown} alt="" className="h-5 w-5" />
      </button>
    </section>
  );
}

function FreeGifts() {
  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-4">
      <h3 className="text-base leading-5 font-bold text-bluegray-1000">Free gifts for you</h3>
      <article className="mt-3 rounded-xl border border-bluegray-300 p-2">
        <div className="flex gap-3">
          <div className="relative h-[55px] w-14 rounded-lg border border-bluegray-100 bg-white">
            <img src={ASSETS.gift} alt="" className="h-full w-full object-contain" />
            <span className="absolute bottom-0 left-0 right-0 rounded-b-md bg-[#1155cb] text-center text-[13px] font-bold italic text-white">Free</span>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-semibold italic leading-[18px] text-[#242a34]">Pepsi Gift Hamper</p>
            <p className="text-xs italic font-medium text-[#67778e]">Pack of 6 cans &amp; Hoodie or tote bag</p>
            <p className="text-[13px] font-semibold text-accent-700">View eligible products &gt;</p>
          </div>
        </div>
      </article>
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
                ? "flex h-10 items-center justify-center rounded-[10px] border-[1.5px] border-accent-300 bg-white px-3 py-2.5 shadow-[0_8px_12px_rgba(14,14,14,0.07)] text-sm font-semibold leading-[18px] text-bluegray-1000"
                : "flex h-10 items-center justify-center rounded-[10px] border border-bluegray-300 bg-white px-3 py-2.5 text-sm italic font-normal leading-[18px] text-bluegray-800"
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
  { icon: ASSETS.aiReturns,         label: "Low\nReturn",           bg: "bg-white border border-bluegray-200", size: "w-[104px]", weight: "font-semibold" },
  { icon: ASSETS.sellerPartner,     label: "Partner\nSince",        bg: "bg-white border border-bluegray-200", size: "w-[94px]",  weight: "font-semibold" },
  { icon: ASSETS.sellerDescribed,   label: "Product\nAs Described", bg: "bg-white border border-bluegray-200", size: "w-[94px]",  weight: "font-semibold" },
  { icon: ASSETS.sellerRatings,     label: "High\nRated",           bg: "bg-white border border-bluegray-200", size: "w-[94px]",  weight: "font-semibold" },
  { icon: ASSETS.sellerLowReturn,   label: "Low & Easy\nReturns",   bg: "bg-accent-50",                        size: "w-[94px]",  weight: "font-medium" },
  { icon: ASSETS.aiWarranty,        label: "Secure\nTransactions",  bg: "bg-accent-50",                        size: "w-[94px]",  weight: "font-medium" },
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
            <p className="flex-1 text-[15px] font-bold leading-[17px] text-bluegray-1000">Versions</p>
            <div className="flex items-center gap-0.5">
              <img src={ASSETS.info} alt="" className="h-4 w-4" />
              <span className="text-[13px] font-semibold leading-[15px] text-accent-700">Learn more</span>
            </div>
          </div>
          <ChipGroup options={["UK 3 PIN", "US 2 PIN"]} selectedIndex={0} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="flex-1 text-[15px] font-bold leading-[17px] text-bluegray-1000">Charger Model</p>
            <span className="text-[13px] font-semibold leading-[15px] text-accent-700">Size Guide</span>
          </div>
          <ChipGroup options={["UK 3 PIN", "US 2 PIN"]} selectedIndex={0} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-0.5">
            <p className="flex-1 text-[15px] font-bold leading-[17px] text-bluegray-1000">Colour</p>
            <span className="text-[13px] font-semibold leading-[15px] text-accent-700">View All</span>
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
                      ? "border-[1.5px] border-accent-400 shadow-[0_8px_24px_rgba(14,14,14,0.07)]"
                      : oos
                      ? "border border-dashed border-bluegray-300"
                      : "border border-bluegray-300")
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
      <h2 className="px-3.5 text-[15px] font-bold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
        Payment offers
      </h2>
      <div className="flex gap-2 overflow-x-auto px-3 pb-1">
        {/* Noon pay wallet icon */}
        <div className={cardBase}>
          <div className={logoBox}>
            <img src={ASSETS.noonPayIcon} alt="Noon Pay" className="h-10 w-[60px] object-contain" />
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

        {/* Noon VISA card */}
        <div className={cardBase}>
          <div className={logoBox}>
            <img src={ASSETS.noonVisaCard} alt="Noon VISA" className="h-10 w-[60px] object-cover rounded-md" />
          </div>
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <p className="text-[14px] font-semibold leading-[18px] tracking-[-0.14px] text-bluegray-900 truncate">
              Get extra 5% cashback
            </p>
            <p className="text-[12px] leading-[14px] tracking-[-0.12px] text-[#959595] line-clamp-2">
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
              className="flex-shrink-0 w-[216px] flex items-start gap-0 rounded-[10px] border border-bluegray-100 p-1 overflow-hidden"
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
      <h2 className="px-0.5 text-[15px] font-bold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
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
    { icon: ASSETS.aiReturns,  label: "Free 7 day returns" },
    { icon: ASSETS.aiWarranty, label: "Warranty" },
    { icon: ASSETS.aiSoldBy,   label: "Sold by" },
  ];
  return (
    <section className="mx-3 rounded-2xl bg-white px-3 py-4 flex flex-col gap-3">
      <h2 className="px-0.5 text-[15px] font-bold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
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
    <section className="mx-3 rounded-2xl bg-white px-3 py-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-0.5">
        <h2 className="text-[15px] font-bold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
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
            <div className="bg-white rounded-xl flex flex-col gap-3 pt-3 overflow-hidden border border-[#f5f5f5]">
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
      <h2 className="px-0.5 text-[15px] font-bold leading-[17px] tracking-[-0.28px] text-bluegray-1000">
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

function BottomBar() {
  return (
    <div className="sticky bottom-0 z-20 rounded-t-xl bg-white px-3 pt-3 shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
      <div className="flex h-12 items-center gap-2">
        <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-bluegray-300">
          <span className="text-xs text-bluegray-500">QTY</span>
          <span className="text-base font-bold text-bluegray-800">1</span>
        </div>
        <button className="h-12 flex-1 rounded-[10px] border border-noon-blue text-sm font-bold text-noon-blue">Buy now</button>
        <button className="h-12 flex-1 rounded-[10px] bg-noon-blue text-sm font-bold text-white">Add to cart</button>
      </div>
      <div className="flex justify-center pb-2 pt-3">
        <div className="h-[5px] w-[124px] rounded-lg bg-[#0e0e0e]" />
      </div>
    </div>
  );
}

export default function PdpDesign() {
  return (
    <main className="mx-auto h-full w-full max-w-[375px] bg-gradient-to-b from-white to-[#F3F3F7] flex flex-col gap-3 overflow-y-auto">
      <section className="relative">
        <HeaderButtons />
        <img src={ASSETS.productImage} alt="iPhone" className="h-[512px] w-full object-cover" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <img src={ASSETS.sliderDots} alt="" className="h-1.5 w-[50px]" />
        </div>
      </section>
      <MainInfo />
      <ComboCard />
      <AdCard />
      <DeliveryCard />
      <FreeGifts />
      <VariantPicker />
      <TrustMarkers />
      <PaymentOffers />
      <ProductDetails />
      <ExtendedWarranty />
      <AdditionalInformation />
      <BestsellerBanner />
      <SellerWidget />
      <ProductFeatures />
      <BottomBar />
    </main>
  );
}
