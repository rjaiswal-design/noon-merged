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

export const ASSETS = {
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
