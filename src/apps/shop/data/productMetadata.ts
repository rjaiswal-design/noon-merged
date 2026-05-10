import type { CategoryId, Product } from '../types/product';
import { products } from './products';

const byId = new Map(products.map((p) => [p.id, p] as const));

/* ── Category label ────────────────────────────────────────────────────── */
// "Bestseller #1 in X" — X comes from here. Per-product overrides come first;
// otherwise the broad category falls back to a short noun phrase.
const CATEGORY_LABEL_OVERRIDES: Record<string, string> = {
  'iphone-13-pro':            'Smartphones',
  'iphone-x':                 'Smartphones',
  'oppo-f19-pro-plus':        'Smartphones',
  'realme-xt':                'Smartphones',
  'apple-airpods':            'Earbuds',
  'apple-airpods-max-silver': 'Headphones',
  'apple-homepod-mini':       'Smart Speakers',
  'apple-watch-series-4-gold':'Smartwatches',

  'essence-mascara-lash-princess': 'Mascara',
  'eyeshadow-palette-with-mirror': 'Eyeshadow',
  'powder-canister':               'Face Powder',
  'red-lipstick':                  'Lipstick',
  'red-nail-polish':               'Nail Polish',
  'calvin-klein-ck-one':           'Fragrances',
  'chanel-coco-noir':              'Fragrances',
  'dior-jadore':                   'Fragrances',

  'apple-fresh':    'Fresh Produce',
  'beef-steak':     'Fresh Meat',
  'cooking-oil':    'Cooking Oils',
  'eggs-fresh':     'Eggs',
  'honey-jar':      'Honey',
  'ice-cream':      'Ice Cream',
  'nescafe-coffee': 'Coffee',
  'soft-drinks':    'Soft Drinks',

  'blue-black-check-shirt': "Men's Shirts",
  'gigabyte-aorus-tshirt':  "Men's T-Shirts",
  'man-plaid-shirt':        "Men's Shirts",
  'men-check-shirt':        "Men's Shirts",
  'black-womens-gown':      "Women's Dresses",
  'corset-leather-with-skirt': "Women's Sets",
  'dress-pea':              "Women's Dresses",
  'marni-red-black-suit':   "Women's Suits",

  'annibale-colombo-bed':     'Beds',
  'annibale-colombo-sofa':    'Sofas',
  'knoll-saarinen-chair':     'Chairs',
  'decoration-swing':         'Home Decor',
  'family-tree-photo-frame':  'Photo Frames',
  'table-lamp':               'Table Lamps',
  'black-aluminium-cup':      'Drinkware',
  'black-whisk':              'Kitchen Tools',

  'black-sun-glasses':     'Sunglasses',
  'classic-sun-glasses':   'Sunglasses',
  'green-and-black-glasses':'Sunglasses',
  'party-glasses':         'Sunglasses',
  'sunglasses-classic':    'Sunglasses',
  'blue-womens-handbag':   'Handbags',
  'heshe-leather-bag':     'Handbags',
  'prada-women-bag':       'Handbags',
  'white-faux-leather-backpack': 'Backpacks',
  'women-handbag-black':   'Handbags',
};

const CATEGORY_FALLBACK: Record<CategoryId, string> = {
  electronics: 'Electronics',
  beauty:      'Beauty',
  grocery:     'Grocery',
  fashion:     'Fashion',
  home:        'Home',
  accessories: 'Accessories',
};

export function getCategoryLabel(productId: string): string {
  const override = CATEGORY_LABEL_OVERRIDES[productId];
  if (override) return override;
  const p = byId.get(productId);
  return p ? CATEGORY_FALLBACK[p.category] : 'Products';
}

/* ── Seller name ───────────────────────────────────────────────────────── */
const SELLER_OVERRIDES: Record<string, string> = {
  'iphone-13-pro':             'Apple Authorized Reseller UAE',
  'iphone-x':                  'Apple Authorized Reseller UAE',
  'apple-airpods':             'Apple Authorized Reseller UAE',
  'apple-airpods-max-silver':  'Apple Authorized Reseller UAE',
  'apple-homepod-mini':        'Apple Authorized Reseller UAE',
  'apple-watch-series-4-gold': 'Apple Authorized Reseller UAE',

  'oppo-f19-pro-plus':         'OPPO Middle East',
  'realme-xt':                 'realme MEA Distributor',

  'essence-mascara-lash-princess': 'Essence Cosmetics ME',
  'eyeshadow-palette-with-mirror': 'Glamour Beauty Distributors',
  'powder-canister':               'Glamour Beauty Distributors',
  'red-lipstick':                  'Glamour Beauty Distributors',
  'red-nail-polish':               'Glamour Beauty Distributors',
  'calvin-klein-ck-one':           'CK Fragrances UAE',
  'chanel-coco-noir':              'Chanel Beauty Boutique',
  'dior-jadore':                   'Dior Beauty UAE',

  'apple-fresh':    'Fresh Mart Grocers',
  'beef-steak':     'Premium Meats UAE',
  'cooking-oil':    'Daily Essentials Distributor',
  'eggs-fresh':     'Fresh Mart Grocers',
  'honey-jar':      'Pure Pantry Co.',
  'ice-cream':      'Cold Delights UAE',
  'nescafe-coffee': 'Nestlé Middle East',
  'soft-drinks':    'Beverage Hub UAE',

  'blue-black-check-shirt':    'Urban Threads Co.',
  'gigabyte-aorus-tshirt':     'Gigabyte AORUS Shop',
  'man-plaid-shirt':           'Urban Threads Co.',
  'men-check-shirt':           'Urban Threads Co.',
  'black-womens-gown':         'Elegance Boutique',
  'corset-leather-with-skirt': 'Elegance Boutique',
  'dress-pea':                 'Elegance Boutique',
  'marni-red-black-suit':      'Marni Boutique UAE',

  'annibale-colombo-bed':    'Annibale Colombo Showroom',
  'annibale-colombo-sofa':   'Annibale Colombo Showroom',
  'knoll-saarinen-chair':    'Knoll Studio MEA',
  'decoration-swing':        'Home Living Co.',
  'family-tree-photo-frame': 'Home Living Co.',
  'table-lamp':              'Lumière Lighting',
  'black-aluminium-cup':     'Modern Kitchen Co.',
  'black-whisk':             'Modern Kitchen Co.',

  'black-sun-glasses':           'Optical Avenue UAE',
  'classic-sun-glasses':         'Optical Avenue UAE',
  'green-and-black-glasses':     'Optical Avenue UAE',
  'party-glasses':               'Optical Avenue UAE',
  'sunglasses-classic':          'Optical Avenue UAE',
  'blue-womens-handbag':         'Luxe Bags Boutique',
  'heshe-leather-bag':           'HESHE Leather Goods',
  'prada-women-bag':             'Prada Boutique UAE',
  'white-faux-leather-backpack': 'Luxe Bags Boutique',
  'women-handbag-black':         'Luxe Bags Boutique',
};

export function getSellerName(productId: string): string {
  const override = SELLER_OVERRIDES[productId];
  if (override) return override;
  const p = byId.get(productId);
  if (!p) return 'noon Marketplace';
  return `${p.brand} Distributors`;
}

/* ── Variant picker config ─────────────────────────────────────────────── */
export type VariantState = 'default' | 'selected' | 'out-of-stock';

export interface ChipSection {
  title: string;
  trailing?: { label: string; kind: 'info' | 'guide' };
  options: string[];
  selectedIndex: number;
}

export interface ColourOption {
  name: string;
  /**
   * Optional image. When omitted, the VariantPicker falls back to the current
   * product's primary image — keeps swatches visually anchored to the product
   * rather than to a placeholder.
   */
  img?: string;
  state: VariantState;
}

export interface VariantConfig {
  chipSections: ChipSection[];
  colourTitle?: string;
  colourOptions?: ColourOption[];
}

const VARIANT_CONFIGS: Record<string, VariantConfig> = {
  'apple-homepod-mini': {
    chipSections: [
      { title: 'Plug Type', trailing: { label: 'Learn more', kind: 'info' }, options: ['UK 3 PIN', 'US 2 PIN'], selectedIndex: 0 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'White',      state: 'default' },
      { name: 'Space Grey', state: 'selected' },
      { name: 'Yellow',     state: 'default' },
      { name: 'Blue',       state: 'out-of-stock' },
    ],
  },
  'apple-airpods': {
    chipSections: [
      { title: 'Generation', trailing: { label: 'Learn more', kind: 'info' }, options: ['2nd Gen', '3rd Gen', 'Pro'], selectedIndex: 0 },
    ],
    colourTitle: 'Finish',
    colourOptions: [
      { name: 'White', state: 'selected' },
    ],
  },
  'apple-airpods-max-silver': {
    chipSections: [
      { title: 'Generation', options: ['Original', '2nd Gen'], selectedIndex: 0 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'Silver',     state: 'selected' },
      { name: 'Space Grey', state: 'default' },
      { name: 'Sky Blue',   state: 'default' },
      { name: 'Pink',       state: 'out-of-stock' },
    ],
  },
  'apple-watch-series-4-gold': {
    chipSections: [
      { title: 'Case Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['40 mm', '44 mm'], selectedIndex: 1 },
      { title: 'Connectivity', options: ['GPS', 'GPS + Cellular'], selectedIndex: 0 },
    ],
    colourTitle: 'Case Finish',
    colourOptions: [
      { name: 'Gold',       state: 'selected' },
      { name: 'Silver',     state: 'default' },
      { name: 'Space Grey', state: 'default' },
    ],
  },
  'iphone-13-pro': {
    chipSections: [
      { title: 'Storage', trailing: { label: 'Learn more', kind: 'info' }, options: ['128 GB', '256 GB', '512 GB', '1 TB'], selectedIndex: 1 },
      { title: 'Connectivity', options: ['5G', '4G'], selectedIndex: 0 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'Graphite',     state: 'selected' },
      { name: 'Silver',       state: 'default' },
      { name: 'Sierra Blue',  state: 'default' },
      { name: 'Alpine Green', state: 'out-of-stock' },
    ],
  },
  'iphone-x': {
    chipSections: [
      { title: 'Storage', options: ['64 GB', '256 GB'], selectedIndex: 0 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'Space Grey', state: 'selected' },
      { name: 'Silver',     state: 'default' },
    ],
  },
  'oppo-f19-pro-plus': {
    chipSections: [
      { title: 'Storage', options: ['128 GB', '256 GB'], selectedIndex: 0 },
      { title: 'RAM', options: ['8 GB', '12 GB'], selectedIndex: 0 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'Space Silver',  state: 'selected' },
      { name: 'Fluid Black',   state: 'default' },
    ],
  },
  'realme-xt': {
    chipSections: [
      { title: 'Storage', options: ['64 GB', '128 GB'], selectedIndex: 0 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'Pearl White', state: 'selected' },
      { name: 'Pearl Blue',  state: 'default' },
    ],
  },

  // Beauty — finish + shade
  'essence-mascara-lash-princess': {
    chipSections: [
      { title: 'Finish', options: ['Volume', 'Lengthening'], selectedIndex: 0 },
    ],
    colourTitle: 'Shade',
    colourOptions: [
      { name: 'Black',       state: 'selected' },
      { name: 'Brown-Black', state: 'default' },
    ],
  },
  'red-lipstick': {
    chipSections: [
      { title: 'Finish', options: ['Matte', 'Satin', 'Gloss'], selectedIndex: 0 },
    ],
    colourTitle: 'Shade',
    colourOptions: [
      { name: 'Classic Red', state: 'selected' },
      { name: 'Wine',        state: 'default' },
      { name: 'Cherry',      state: 'default' },
    ],
  },
  'red-nail-polish': {
    chipSections: [
      { title: 'Volume', options: ['10 ml', '15 ml'], selectedIndex: 0 },
    ],
    colourTitle: 'Shade',
    colourOptions: [
      { name: 'Crimson', state: 'selected' },
      { name: 'Coral',   state: 'default' },
    ],
  },
  'eyeshadow-palette-with-mirror': {
    chipSections: [
      { title: 'Palette', options: ['12 shades', '18 shades'], selectedIndex: 0 },
    ],
  },
  'calvin-klein-ck-one': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['50 ml', '100 ml', '200 ml'], selectedIndex: 1 },
    ],
  },
  'chanel-coco-noir': {
    chipSections: [
      { title: 'Size', options: ['50 ml', '100 ml'], selectedIndex: 1 },
    ],
  },
  'dior-jadore': {
    chipSections: [
      { title: 'Size', options: ['30 ml', '50 ml', '100 ml'], selectedIndex: 2 },
    ],
  },

  // Fashion — size + colour
  'blue-black-check-shirt': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['S', 'M', 'L', 'XL'], selectedIndex: 1 },
    ],
    colourTitle: 'Colour',
    colourOptions: [
      { name: 'Blue-Black', state: 'selected' },
      { name: 'Grey',       state: 'default' },
    ],
  },
  'gigabyte-aorus-tshirt': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['S', 'M', 'L', 'XL'], selectedIndex: 1 },
    ],
  },
  'man-plaid-shirt': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['S', 'M', 'L', 'XL'], selectedIndex: 1 },
    ],
  },
  'men-check-shirt': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['S', 'M', 'L', 'XL'], selectedIndex: 1 },
    ],
  },
  'black-womens-gown': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['XS', 'S', 'M', 'L'], selectedIndex: 1 },
    ],
  },
  'corset-leather-with-skirt': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['XS', 'S', 'M', 'L'], selectedIndex: 1 },
    ],
  },
  'dress-pea': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['XS', 'S', 'M', 'L'], selectedIndex: 1 },
    ],
  },
  'marni-red-black-suit': {
    chipSections: [
      { title: 'Size', trailing: { label: 'Size Guide', kind: 'guide' }, options: ['S', 'M', 'L'], selectedIndex: 1 },
    ],
  },

  // Home — size + finish
  'annibale-colombo-bed': {
    chipSections: [
      { title: 'Size', options: ['Queen', 'King'], selectedIndex: 1 },
    ],
    colourTitle: 'Finish',
    colourOptions: [
      { name: 'Walnut', state: 'selected' },
      { name: 'Oak',    state: 'default' },
    ],
  },
  'annibale-colombo-sofa': {
    chipSections: [
      { title: 'Seater', options: ['2 Seater', '3 Seater'], selectedIndex: 1 },
    ],
    colourTitle: 'Upholstery',
    colourOptions: [
      { name: 'Beige',    state: 'selected' },
      { name: 'Charcoal', state: 'default' },
    ],
  },
  'knoll-saarinen-chair': {
    chipSections: [
      { title: 'Base', options: ['White', 'Black'], selectedIndex: 0 },
    ],
  },
  'table-lamp': {
    chipSections: [
      { title: 'Bulb', options: ['Warm', 'Daylight'], selectedIndex: 0 },
    ],
  },

  // Accessories
  'black-sun-glasses':       { chipSections: [{ title: 'Lens', options: ['Polarised', 'Standard'], selectedIndex: 0 }] },
  'classic-sun-glasses':     { chipSections: [{ title: 'Lens', options: ['Polarised', 'Standard'], selectedIndex: 0 }] },
  'green-and-black-glasses': { chipSections: [{ title: 'Lens', options: ['Polarised', 'Standard'], selectedIndex: 0 }] },
  'party-glasses':           { chipSections: [{ title: 'Frame', options: ['Standard', 'Oversized'], selectedIndex: 0 }] },
  'sunglasses-classic':      { chipSections: [{ title: 'Lens', options: ['Polarised', 'Standard'], selectedIndex: 0 }] },
  'blue-womens-handbag':         { chipSections: [{ title: 'Size', options: ['Mini', 'Standard'], selectedIndex: 1 }] },
  'heshe-leather-bag':           { chipSections: [{ title: 'Size', options: ['Small', 'Medium', 'Large'], selectedIndex: 1 }] },
  'prada-women-bag':             { chipSections: [{ title: 'Size', options: ['Small', 'Medium'], selectedIndex: 0 }] },
  'white-faux-leather-backpack': { chipSections: [{ title: 'Size', options: ['Standard', 'Large'], selectedIndex: 0 }] },
  'women-handbag-black':         { chipSections: [{ title: 'Size', options: ['Small', 'Medium'], selectedIndex: 0 }] },
};

const VARIANT_FALLBACK: VariantConfig = {
  chipSections: [{ title: 'Option', options: ['Standard'], selectedIndex: 0 }],
};

export function getVariantConfig(productId: string): VariantConfig {
  return VARIANT_CONFIGS[productId] ?? VARIANT_FALLBACK;
}

export function hasVariants(productId: string): boolean {
  const cfg = VARIANT_CONFIGS[productId];
  if (!cfg) return false;
  return (cfg.chipSections.length > 0) || ((cfg.colourOptions?.length ?? 0) > 0);
}

export function getProduct(productId: string): Product | undefined {
  return byId.get(productId);
}

/* ── Product details (accordion content) ────────────────────────────────── */
export interface ProductDetails {
  overview: string;
  highlights: string[];
  specs: Array<[label: string, value: string]>;
}

const PRODUCT_DETAILS: Record<string, ProductDetails> = {
  'apple-homepod-mini': {
    overview:
      'Compact smart speaker with rich 360° audio, Siri built in, and seamless control of your HomeKit accessories. Designed to fit anywhere in your home.',
    highlights: [
      '360-degree audio with computational tuning',
      'Siri voice assistant built in',
      'Intercom across HomePod, iPhone, iPad, Apple Watch and CarPlay',
      'HomeKit hub to control smart accessories',
      'Pair two HomePod minis for stereo sound',
    ],
    specs: [
      ['Brand', 'Apple'],
      ['Model', 'HomePod mini'],
      ['Audio', '360° full-range driver + dual passive radiators'],
      ['Wireless', 'Wi-Fi 802.11n, Bluetooth 5.0'],
      ['Voice Assistant', 'Siri'],
      ['Dimensions', '84.3 mm × 97.9 mm'],
      ['Weight', '345 g'],
    ],
  },
  'apple-airpods': {
    overview:
      'AirPods deliver an effortless wireless audio experience — quick pairing with all your Apple devices, hands-free Siri access, and great sound powered by Apple-designed audio chip.',
    highlights: [
      'Up to 5 hours of listening time on a single charge',
      'Automatic pairing with iCloud-linked devices',
      'Double-tap controls and hands-free "Hey Siri"',
      'Charging case provides 24+ hours of total listening',
    ],
    specs: [
      ['Brand', 'Apple'],
      ['Model', 'AirPods (2nd generation)'],
      ['Chip', 'Apple H1'],
      ['Connectivity', 'Bluetooth 5.0'],
      ['Battery (Buds)', 'Up to 5 hours listening'],
      ['Battery (Case)', '24+ hours with case'],
      ['Weight', '4 g per bud, 38.2 g case'],
    ],
  },
  'apple-airpods-max-silver': {
    overview:
      'AirPods Max combine high-fidelity audio, Active Noise Cancellation, Adaptive EQ, and spatial audio with dynamic head tracking — wrapped in a premium acoustic design.',
    highlights: [
      'High-fidelity custom 40 mm dynamic driver',
      'Active Noise Cancellation and Transparency mode',
      'Spatial Audio with dynamic head tracking',
      'Up to 20 hours of listening time',
    ],
    specs: [
      ['Brand', 'Apple'],
      ['Model', 'AirPods Max'],
      ['Chip', 'Apple H1 (each cup)'],
      ['Driver', '40 mm dynamic'],
      ['Connectivity', 'Bluetooth 5.0'],
      ['Battery', 'Up to 20 hours'],
      ['Weight', '384.8 g'],
    ],
  },
  'apple-watch-series-4-gold': {
    overview:
      'Apple Watch Series 4 brings a larger Retina display, faster S4 chip, advanced heart-rate sensors, and fall detection — all in a refined, lighter case.',
    highlights: [
      'Always-on Retina LTPO display',
      'Electrical heart sensor with ECG app',
      'Fall detection and Emergency SOS',
      'Optional cellular connectivity',
      'Swimproof to 50 m',
    ],
    specs: [
      ['Brand', 'Apple'],
      ['Model', 'Watch Series 4'],
      ['Case', '44 mm Gold Aluminium'],
      ['Chip', 'Apple S4'],
      ['Connectivity', 'GPS / GPS + Cellular'],
      ['Water Resistance', '50 m'],
      ['Battery', 'Up to 18 hours'],
    ],
  },
  'iphone-13-pro': {
    overview:
      'iPhone 13 Pro features the Pro camera system, ProMotion Super Retina XDR display, the A15 Bionic chip, and the longest battery life on iPhone — built for serious creators.',
    highlights: [
      '6.1″ Super Retina XDR with ProMotion (up to 120 Hz)',
      'Pro 12 MP triple-camera system with 3× optical zoom',
      'Cinematic mode and ProRes video',
      'A15 Bionic chip with 5-core GPU',
      '5G connectivity',
    ],
    specs: [
      ['Brand', 'Apple'],
      ['Model', 'iPhone 13 Pro'],
      ['Display', '6.1″ Super Retina XDR ProMotion'],
      ['Chip', 'Apple A15 Bionic'],
      ['Rear Camera', '12 MP Ultra Wide + Wide + Telephoto'],
      ['Front Camera', '12 MP TrueDepth'],
      ['Connectivity', '5G, Wi-Fi 6, Bluetooth 5.0'],
      ['Water Resistance', 'IP68'],
    ],
  },
  'iphone-x': {
    overview:
      'iPhone X introduced the all-screen Super Retina display, Face ID, and the A11 Bionic chip — a milestone iPhone with a premium glass-and-stainless-steel build.',
    highlights: [
      '5.8″ Super Retina HD OLED display',
      'Face ID for secure authentication',
      'A11 Bionic chip',
      'Dual 12 MP rear camera with Portrait mode',
      'Wireless charging',
    ],
    specs: [
      ['Brand', 'Apple'],
      ['Model', 'iPhone X'],
      ['Display', '5.8″ Super Retina HD OLED'],
      ['Chip', 'Apple A11 Bionic'],
      ['Rear Camera', '12 MP Wide + Telephoto'],
      ['Front Camera', '7 MP TrueDepth'],
      ['Connectivity', '4G LTE, Wi-Fi'],
    ],
  },
  'oppo-f19-pro-plus': {
    overview:
      'OPPO F19 Pro+ packs a sleek, ultra-light design with 50W flash charging, a 48 MP AI quad camera, and a vivid AMOLED display — built for confident creators.',
    highlights: [
      '6.43″ AMOLED FHD+ display',
      'AI quad-camera with 48 MP main sensor',
      '50W SuperVOOC 2.0 flash charging',
      '5G connectivity with MediaTek Dimensity 800U',
    ],
    specs: [
      ['Brand', 'OPPO'],
      ['Model', 'F19 Pro+ 5G'],
      ['Display', '6.43″ AMOLED FHD+'],
      ['Chip', 'MediaTek Dimensity 800U'],
      ['Rear Camera', '48 MP quad'],
      ['Battery', '4310 mAh, 50W SuperVOOC'],
    ],
  },
  'realme-xt': {
    overview:
      'realme XT delivers a 64 MP quad camera, an immersive Super AMOLED display, and a slim glass build — flagship-style design at a value price.',
    highlights: [
      '6.4″ Super AMOLED FHD+ display',
      '64 MP AI quad camera',
      'In-display fingerprint sensor',
      '4000 mAh with VOOC fast charging',
    ],
    specs: [
      ['Brand', 'realme'],
      ['Model', 'XT'],
      ['Display', '6.4″ Super AMOLED'],
      ['Chip', 'Qualcomm Snapdragon 712'],
      ['Rear Camera', '64 MP + 8 MP + 2 MP + 2 MP'],
      ['Battery', '4000 mAh'],
    ],
  },

  /* ── Beauty ──────────────────────────────────────────────────────────── */
  'essence-mascara-lash-princess': {
    overview:
      'Essence Lash Princess False Lash Effect Mascara delivers dramatic volume and length with a unique cone-shaped fibre brush — without extensions.',
    highlights: [
      'False-lash effect in one coat',
      'Cruelty-free formula',
      'Buildable volume and length',
      'Smudge-resistant wear',
    ],
    specs: [
      ['Brand', 'Essence'],
      ['Product', 'False Lash Effect Mascara'],
      ['Volume', '10 ml'],
      ['Finish', 'Volumising'],
      ['Cruelty-free', 'Yes'],
    ],
  },
  'eyeshadow-palette-with-mirror': {
    overview:
      '12-shade highly pigmented eyeshadow palette with a built-in mirror. Blendable, long-wear shades perfect for everyday looks or full glam.',
    highlights: [
      '12 long-wear pigmented shades',
      'Built-in mirror for on-the-go application',
      'Matte, satin, and shimmer finishes',
    ],
    specs: [
      ['Brand', 'Glamour Beauty'],
      ['Shades', '12'],
      ['Finish', 'Matte + Shimmer'],
      ['Includes', 'Built-in mirror'],
    ],
  },
  'red-lipstick': {
    overview:
      'Classic creamy red lipstick with a rich, full-coverage finish that stays comfortable all day. A timeless wardrobe staple.',
    highlights: [
      'Full-coverage colour in one stroke',
      'Long-wearing, non-drying formula',
      'Subtle hydrating finish',
    ],
    specs: [
      ['Brand', 'Velvet Lips'],
      ['Shade', 'Classic Red'],
      ['Finish', 'Matte'],
      ['Net Weight', '3.5 g'],
    ],
  },
  'red-nail-polish': {
    overview:
      'High-shine red nail polish with a chip-resistant formula and quick-dry finish — salon-quality colour at home.',
    highlights: [
      'Glossy high-shine finish',
      'Chip-resistant for up to 7 days',
      'Quick-dry application',
    ],
    specs: [
      ['Brand', 'Velvet Lips'],
      ['Shade', 'Crimson'],
      ['Volume', '10 ml'],
      ['Finish', 'High Gloss'],
    ],
  },
  'powder-canister': {
    overview:
      'Lightweight loose setting powder that locks in makeup, controls shine, and blurs imperfections for an airbrushed finish.',
    highlights: [
      'Sets makeup all day',
      'Translucent — works across skin tones',
      'Lightweight, non-cakey feel',
    ],
    specs: [
      ['Brand', 'Velvet Lips'],
      ['Type', 'Loose setting powder'],
      ['Shade', 'Translucent'],
      ['Net Weight', '12 g'],
    ],
  },
  'calvin-klein-ck-one': {
    overview:
      'CK ONE is a refreshing unisex eau de toilette with notes of green tea, bergamot, and musk — a clean modern classic.',
    highlights: [
      'Top notes: bergamot, lemon, mandarin',
      'Heart notes: green tea, freesia, jasmine',
      'Base notes: amber, musk, cedarwood',
    ],
    specs: [
      ['Brand', 'Calvin Klein'],
      ['Fragrance', 'CK One'],
      ['Type', 'Eau de Toilette'],
      ['Size', '100 ml'],
      ['Gender', 'Unisex'],
    ],
  },
  'chanel-coco-noir': {
    overview:
      'Coco Noir is a deep oriental eau de parfum: a luxurious blend of grapefruit, rose, jasmine, and tonka bean — bold, modern, and sensual.',
    highlights: [
      'Top notes: grapefruit, bergamot',
      'Heart notes: rose, jasmine, geranium',
      'Base notes: tonka bean, sandalwood, vanilla',
    ],
    specs: [
      ['Brand', 'Chanel'],
      ['Fragrance', 'Coco Noir'],
      ['Type', 'Eau de Parfum'],
      ['Size', '100 ml'],
      ['Gender', 'Women'],
    ],
  },
  'dior-jadore': {
    overview:
      "J'adore by Dior is a sophisticated floral bouquet — ylang-ylang, Damascus rose, and jasmine — radiant, feminine, and timeless.",
    highlights: [
      'Top notes: pear, melon, magnolia',
      'Heart notes: jasmine, rose, plum',
      'Base notes: musk, vanilla, blackberry',
    ],
    specs: [
      ['Brand', 'Dior'],
      ['Fragrance', "J'adore"],
      ['Type', 'Eau de Parfum'],
      ['Size', '100 ml'],
      ['Gender', 'Women'],
    ],
  },

  /* ── Grocery ─────────────────────────────────────────────────────────── */
  'apple-fresh': {
    overview:
      'Crisp, hand-picked fresh apples — naturally sweet and juicy, perfect for snacks, salads, or baking.',
    highlights: [
      'Hand-picked at peak ripeness',
      'No preservatives or wax',
      'Rich in fibre and vitamin C',
    ],
    specs: [
      ['Origin', 'UAE'],
      ['Pack Size', '1 kg'],
      ['Storage', 'Refrigerate for best freshness'],
    ],
  },
  'beef-steak': {
    overview:
      'Premium grass-fed beef steak — tender, flavourful, and butcher-cut for restaurant-quality meals at home.',
    highlights: [
      'Grass-fed, hormone-free',
      'Hand-cut by master butcher',
      'Aged for tenderness',
    ],
    specs: [
      ['Cut', 'Ribeye'],
      ['Weight', '500 g'],
      ['Origin', 'Premium Meats UAE'],
      ['Storage', 'Refrigerated'],
    ],
  },
  'cooking-oil': {
    overview:
      'Pure refined cooking oil with a high smoke point — neutral flavour, ideal for frying, sautéing, and baking.',
    highlights: [
      'Cholesterol-free, refined',
      'High smoke point — versatile cooking',
      'Naturally rich in vitamin E',
    ],
    specs: [
      ['Type', 'Vegetable Oil'],
      ['Volume', '1 L'],
      ['Storage', 'Cool, dry place'],
    ],
  },
  'eggs-fresh': {
    overview:
      'Farm-fresh eggs from free-range hens — naturally rich in protein and packed in a recyclable carton.',
    highlights: [
      'Free-range farm eggs',
      'High-protein, no antibiotics',
      'Refrigerated carton — recyclable',
    ],
    specs: [
      ['Quantity', '12 eggs'],
      ['Grade', 'Large'],
      ['Source', 'Free-range farms, UAE'],
    ],
  },
  'honey-jar': {
    overview:
      'Pure raw honey, unfiltered and unpasteurised — naturally sourced from regional apiaries for a rich, floral taste.',
    highlights: [
      '100% pure raw honey',
      'Unfiltered, unpasteurised',
      'Naturally sweet — no added sugar',
    ],
    specs: [
      ['Type', 'Wildflower Honey'],
      ['Volume', '500 g'],
      ['Origin', 'UAE apiaries'],
    ],
  },
  'ice-cream': {
    overview:
      'Smooth, indulgent vanilla ice cream made with real cream and natural flavours — your everyday dessert classic.',
    highlights: [
      'Real cream, no artificial flavours',
      'Smooth, scoopable texture',
      'Family-size tub',
    ],
    specs: [
      ['Flavour', 'Vanilla'],
      ['Volume', '1 L'],
      ['Storage', 'Keep frozen at -18°C'],
    ],
  },
  'nescafe-coffee': {
    overview:
      'Nescafé Classic instant coffee with a rich, full-bodied flavour — quick to prepare and consistently smooth.',
    highlights: [
      '100% pure soluble coffee',
      'Rich aroma and balanced body',
      'Resealable jar keeps coffee fresh',
    ],
    specs: [
      ['Brand', 'Nescafé'],
      ['Variant', 'Classic'],
      ['Net Weight', '200 g'],
      ['Type', 'Instant coffee'],
    ],
  },
  'soft-drinks': {
    overview:
      'Refreshing carbonated soft drink — chilled to crisp perfection. Great with meals or on the go.',
    highlights: [
      'Crisp, refreshing taste',
      'Convenient multi-pack',
      'Recyclable can',
    ],
    specs: [
      ['Pack', '6 × 330 ml'],
      ['Type', 'Carbonated'],
      ['Best Served', 'Chilled'],
    ],
  },

  /* ── Fashion ─────────────────────────────────────────────────────────── */
  'blue-black-check-shirt': {
    overview:
      'Classic blue-black checked button-down shirt, tailored for a modern fit. Cotton-rich fabric for everyday comfort.',
    highlights: [
      'Soft cotton-rich woven fabric',
      'Modern tailored fit',
      'Machine-washable',
    ],
    specs: [
      ['Fit', 'Modern'],
      ['Material', '95% Cotton, 5% Elastane'],
      ['Pattern', 'Check'],
      ['Care', 'Machine wash cold'],
    ],
  },
  'gigabyte-aorus-tshirt': {
    overview:
      'Official Gigabyte AORUS graphic t-shirt — soft cotton blend with screen-printed AORUS branding. Built for fans.',
    highlights: [
      'Officially licensed AORUS branding',
      'Soft cotton blend',
      'Screen-printed durable graphic',
    ],
    specs: [
      ['Brand', 'Gigabyte'],
      ['Material', '100% Cotton'],
      ['Print', 'Screen-printed'],
      ['Care', 'Machine wash cold, inside-out'],
    ],
  },
  'man-plaid-shirt': {
    overview:
      "Versatile plaid shirt — pairs effortlessly with jeans or chinos. Lightweight cotton flannel for year-round wear.",
    highlights: [
      'Cotton flannel — soft and breathable',
      'Classic plaid pattern',
      'Button-down collar',
    ],
    specs: [
      ['Fit', 'Regular'],
      ['Material', '100% Cotton'],
      ['Pattern', 'Plaid'],
      ['Care', 'Machine wash cold'],
    ],
  },
  'men-check-shirt': {
    overview:
      'Smart checked shirt for work or weekend — premium cotton with a tailored silhouette.',
    highlights: [
      'Premium cotton weave',
      'Tailored fit',
      'Button-down collar',
    ],
    specs: [
      ['Fit', 'Tailored'],
      ['Material', '100% Cotton'],
      ['Pattern', 'Check'],
      ['Care', 'Machine wash cold'],
    ],
  },
  'black-womens-gown': {
    overview:
      'Floor-length black gown with a flattering silhouette — elegant tailoring for evening occasions.',
    highlights: [
      'Floor-length cut',
      'Flattering A-line silhouette',
      'Lined for comfort',
    ],
    specs: [
      ['Style', 'A-Line Gown'],
      ['Material', '95% Polyester, 5% Elastane'],
      ['Length', 'Floor-length'],
      ['Care', 'Dry clean only'],
    ],
  },
  'corset-leather-with-skirt': {
    overview:
      'Bold leather corset paired with a coordinated skirt — a statement set for confident evening looks.',
    highlights: [
      'Faux-leather corset top',
      'Matching tailored skirt',
      'Boned bodice for structure',
    ],
    specs: [
      ['Style', 'Corset + Skirt Set'],
      ['Material', 'Faux Leather'],
      ['Closure', 'Back zip'],
      ['Care', 'Wipe clean'],
    ],
  },
  'dress-pea': {
    overview:
      'Mid-length pea-green wrap dress — flowing fabric and a flattering wrap silhouette.',
    highlights: [
      'Flowing chiffon fabric',
      'Wrap silhouette',
      'Mid-length cut',
    ],
    specs: [
      ['Style', 'Wrap Dress'],
      ['Material', 'Chiffon'],
      ['Length', 'Midi'],
      ['Care', 'Hand wash cold'],
    ],
  },
  'marni-red-black-suit': {
    overview:
      'Marni red-and-black tailored suit — bold colour-blocking with luxe wool-blend construction.',
    highlights: [
      'Tailored two-piece suit',
      'Bold red-black colour blocking',
      'Premium wool-blend fabric',
    ],
    specs: [
      ['Brand', 'Marni'],
      ['Material', 'Wool blend'],
      ['Pieces', 'Jacket + Trouser'],
      ['Care', 'Dry clean only'],
    ],
  },

  /* ── Home ────────────────────────────────────────────────────────────── */
  'annibale-colombo-bed': {
    overview:
      'Handcrafted Italian bed by Annibale Colombo — solid walnut frame, premium upholstery, and timeless tailored design.',
    highlights: [
      'Handcrafted in Italy',
      'Solid walnut hardwood frame',
      'Premium upholstered headboard',
      'King size with reinforced slats',
    ],
    specs: [
      ['Brand', 'Annibale Colombo'],
      ['Material', 'Solid walnut + linen upholstery'],
      ['Size', 'King (200 × 200 cm)'],
      ['Made in', 'Italy'],
    ],
  },
  'annibale-colombo-sofa': {
    overview:
      'Annibale Colombo 3-seater sofa — hand-built in Italy with a hardwood frame, down-filled cushions, and refined tailoring.',
    highlights: [
      'Hand-built Italian craftsmanship',
      'Down-filled cushions',
      'Hardwood internal frame',
      'Removable, washable covers',
    ],
    specs: [
      ['Brand', 'Annibale Colombo'],
      ['Seating', '3-seater'],
      ['Frame', 'Solid hardwood'],
      ['Made in', 'Italy'],
    ],
  },
  'knoll-saarinen-chair': {
    overview:
      'The iconic Knoll Saarinen chair — sculptural pedestal base, organic lines, designed by Eero Saarinen in 1956 and still in production.',
    highlights: [
      'Iconic mid-century design',
      'Sculptural pedestal base',
      'Authentic Knoll production',
    ],
    specs: [
      ['Brand', 'Knoll'],
      ['Designer', 'Eero Saarinen'],
      ['Base', 'Cast aluminium with white rilsan finish'],
      ['Seat', 'Moulded fibreglass + cushion'],
    ],
  },
  'decoration-swing': {
    overview:
      'Decorative indoor swing — handwoven rattan seat with sturdy ropes. A statement piece for living rooms and balconies.',
    highlights: [
      'Handwoven rattan seat',
      'Sturdy braided ropes',
      'Indoor / covered outdoor use',
    ],
    specs: [
      ['Material', 'Rattan + cotton rope'],
      ['Capacity', 'Up to 120 kg'],
      ['Use', 'Indoor / covered outdoor'],
    ],
  },
  'family-tree-photo-frame': {
    overview:
      'Wall-mounted family tree photo frame — holds multiple photos to display generations of memories.',
    highlights: [
      'Multi-photo display',
      'Wall-mounted',
      'Mixed frame sizes',
    ],
    specs: [
      ['Material', 'Wood + glass'],
      ['Photos', '10 frames included'],
      ['Mounting', 'Wall-mount hardware included'],
    ],
  },
  'table-lamp': {
    overview:
      'Modern table lamp with a soft fabric shade and a brushed metal base — warm ambient light for any room.',
    highlights: [
      'Warm ambient glow',
      'Brushed metal base',
      'Fabric drum shade',
    ],
    specs: [
      ['Material', 'Metal + fabric'],
      ['Bulb', 'E27, max 40 W (not included)'],
      ['Height', '46 cm'],
    ],
  },
  'black-aluminium-cup': {
    overview:
      'Lightweight matte-black aluminium cup — durable, stackable, and perfect for everyday drinkware.',
    highlights: [
      'Matte black anodised finish',
      'Lightweight aluminium',
      'Dishwasher-safe',
    ],
    specs: [
      ['Material', 'Anodised aluminium'],
      ['Capacity', '350 ml'],
      ['Care', 'Dishwasher safe'],
    ],
  },
  'black-whisk': {
    overview:
      'Sturdy black silicone-coated whisk — heat-resistant and gentle on non-stick cookware.',
    highlights: [
      'Silicone-coated wires — safe for non-stick pans',
      'Heat-resistant to 220 °C',
      'Ergonomic handle',
    ],
    specs: [
      ['Material', 'Stainless steel + silicone'],
      ['Length', '28 cm'],
      ['Care', 'Dishwasher safe'],
    ],
  },

  /* ── Accessories ─────────────────────────────────────────────────────── */
  'black-sun-glasses': {
    overview:
      'Classic black sunglasses with full UV400 protection and polished acetate frames — a wardrobe essential.',
    highlights: [
      'UV400 polarised lenses',
      'Polished acetate frame',
      'Includes microfibre pouch',
    ],
    specs: [
      ['Frame', 'Acetate'],
      ['Lens', 'Polarised UV400'],
      ['Fit', 'Medium'],
    ],
  },
  'classic-sun-glasses': {
    overview:
      'Timeless aviator-style sunglasses with UV400 polarised lenses and a lightweight metal frame.',
    highlights: [
      'Polarised UV400 lenses',
      'Lightweight metal frame',
      'Adjustable silicone nose pads',
    ],
    specs: [
      ['Frame', 'Metal'],
      ['Lens', 'Polarised UV400'],
      ['Style', 'Aviator'],
    ],
  },
  'green-and-black-glasses': {
    overview:
      'Green-and-black two-tone sunglasses — bold colour-block frame with UV400 lenses.',
    highlights: [
      'Bold green-and-black frame',
      'UV400 protection',
      'Lightweight construction',
    ],
    specs: [
      ['Frame', 'Acetate'],
      ['Lens', 'UV400'],
      ['Style', 'Square'],
    ],
  },
  'party-glasses': {
    overview:
      'Statement party sunglasses with oversized frames — perfect for festivals, photoshoots, or a bold everyday look.',
    highlights: [
      'Oversized statement frame',
      'UV400 lenses',
      'Lightweight, comfortable fit',
    ],
    specs: [
      ['Frame', 'Acetate'],
      ['Lens', 'UV400'],
      ['Style', 'Oversized'],
    ],
  },
  'sunglasses-classic': {
    overview:
      'Classic black sunglasses — timeless wayfarer silhouette, UV400 lenses, and an unisex fit.',
    highlights: [
      'Wayfarer silhouette',
      'UV400 polarised lenses',
      'Unisex fit',
    ],
    specs: [
      ['Frame', 'Acetate'],
      ['Lens', 'Polarised UV400'],
      ['Style', 'Wayfarer'],
    ],
  },
  'blue-womens-handbag': {
    overview:
      "Spacious blue women's handbag — soft faux-leather, gold-tone hardware, and a roomy interior with internal pockets.",
    highlights: [
      'Soft faux-leather exterior',
      'Gold-tone hardware',
      'Roomy main compartment',
    ],
    specs: [
      ['Material', 'Faux leather'],
      ['Closure', 'Top zip'],
      ['Strap Drop', '24 cm'],
    ],
  },
  'heshe-leather-bag': {
    overview:
      'HESHE genuine-leather handbag — full-grain leather with a classic silhouette and a soft interior lining.',
    highlights: [
      'Full-grain genuine leather',
      'Cotton interior lining',
      'Multiple internal pockets',
    ],
    specs: [
      ['Brand', 'HESHE'],
      ['Material', 'Genuine leather'],
      ['Closure', 'Magnetic snap'],
    ],
  },
  'prada-women-bag': {
    overview:
      "Prada women's handbag — meticulously crafted Saffiano leather, the brand's signature triangular logo, and timeless silhouette.",
    highlights: [
      'Saffiano leather construction',
      'Signature Prada triangle logo',
      'Detachable shoulder strap',
    ],
    specs: [
      ['Brand', 'Prada'],
      ['Material', 'Saffiano leather'],
      ['Closure', 'Zip'],
      ['Made in', 'Italy'],
    ],
  },
  'white-faux-leather-backpack': {
    overview:
      'Sleek white faux-leather backpack — minimalist silhouette, padded laptop sleeve, and adjustable straps.',
    highlights: [
      'Padded 14″ laptop sleeve',
      'Faux-leather, easy to wipe clean',
      'Adjustable padded straps',
    ],
    specs: [
      ['Material', 'Faux leather'],
      ['Capacity', '15 L'],
      ['Laptop Fit', 'Up to 14″'],
    ],
  },
  'women-handbag-black': {
    overview:
      "Classic black women's handbag — versatile silhouette, durable faux-leather, and gold-tone hardware.",
    highlights: [
      'Versatile black silhouette',
      'Durable faux-leather',
      'Detachable shoulder strap',
    ],
    specs: [
      ['Material', 'Faux leather'],
      ['Closure', 'Top zip'],
      ['Strap Drop', '50 cm (adjustable)'],
    ],
  },
};

function fallbackDetails(p: Product): ProductDetails {
  return {
    overview: p.description || `${p.name} — quality product from ${p.brand}, available now on noon.`,
    highlights: [
      `Authentic ${p.brand} product`,
      `Available in ${p.variant || 'standard variant'}`,
      `Rated ${p.rating.toFixed(1)} by ${p.reviewCount.toLocaleString()} customers`,
    ],
    specs: [
      ['Brand', p.brand],
      ['Category', CATEGORY_FALLBACK[p.category]],
      ['Variant', p.variant || 'Standard'],
      ['Rating', `${p.rating.toFixed(1)} (${p.reviewCount.toLocaleString()} reviews)`],
    ],
  };
}

export function getProductDetails(productId: string): ProductDetails {
  const override = PRODUCT_DETAILS[productId];
  if (override) return override;
  const p = byId.get(productId);
  if (!p) {
    return {
      overview: '',
      highlights: [],
      specs: [],
    };
  }
  return fallbackDetails(p);
}

/* ── Delivery window ────────────────────────────────────────────────────── */
// Days ahead used for the "Get by …" headline on the delivery card.
// Heavier / made-to-order categories (furniture, suits) get a longer window;
// fast-moving categories (grocery, accessories) ship next-day.
const DELIVERY_DAYS_BY_CATEGORY: Record<CategoryId, number> = {
  grocery:     1,
  accessories: 1,
  beauty:      2,
  electronics: 3,
  fashion:     4,
  home:        7,
};

const DELIVERY_DAYS_OVERRIDES: Record<string, number> = {
  // Heavy / bespoke furniture
  'annibale-colombo-bed':  14,
  'annibale-colombo-sofa': 14,
  'knoll-saarinen-chair':  10,
  'marni-red-black-suit':  7,
};

export interface DeliveryWindow {
  /** Headline date string e.g. "Get by 14th May". */
  arriveBy: string;
  /** Cutoff message e.g. "Order in 18 hrs". */
  cutoff: string;
  /** Express-eligible (shows the express badge). */
  express: boolean;
  /** Optional today-shipping option price string e.g. "+ Đ 14.00". */
  todayPrice?: string;
  /** Optional tomorrow-shipping option price string. */
  tomorrowPrice?: string;
}

export function getDeliveryWindow(productId: string, now: Date = new Date()): DeliveryWindow {
  const product = byId.get(productId);
  const days = DELIVERY_DAYS_OVERRIDES[productId]
    ?? (product ? DELIVERY_DAYS_BY_CATEGORY[product.category] : 3);

  const arrive = new Date(now);
  arrive.setDate(arrive.getDate() + days);
  const dayOfMonth = arrive.getDate();
  const monthName = arrive.toLocaleString('en-US', { month: 'short' });
  const suffix = (() => {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) return 'th';
    switch (dayOfMonth % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  })();

  // Cutoff hours roll forward through the day so dev sessions don't always show 21 hrs.
  const hours = 23 - now.getHours();
  const cutoff = hours <= 0 ? 'Order before midnight' : `Order in ${hours} hrs`;

  const express = days <= 3;
  const todayPrice = express ? '+ Đ 14.00' : undefined;
  const tomorrowPrice = days <= 4 ? '+ Đ 7.00' : undefined;

  return {
    arriveBy: `Get by ${dayOfMonth}${suffix} ${monthName}`,
    cutoff,
    express,
    todayPrice,
    tomorrowPrice,
  };
}

/* ── Free gifts ────────────────────────────────────────────────────────── */
export interface GiftOffer {
  title: string;
  sub: string;
  /** Image URL — catalog thumbnail or static asset. */
  img: string;
}

// Resolve a product image by id (falls back gracefully if the catalog ever shifts).
function imgOf(id: string, fallback: string): string {
  return byId.get(id)?.images[0] ?? fallback;
}

const NOON_BRAND_TILE = '/tile-noon.png';

const GIFTS_BY_CATEGORY: Record<CategoryId, GiftOffer[]> = {
  electronics: [
    { title: 'noon One 3-Month Trial', sub: 'Free same-day delivery + exclusive deals', img: NOON_BRAND_TILE },
    { title: 'Premium USB-C Cable',    sub: '1.5 m braided fast-charge cable',           img: imgOf('apple-airpods', NOON_BRAND_TILE) },
  ],
  beauty: [
    { title: 'Beauty Vanity Pouch',     sub: 'Travel-size pouch with two sample products', img: imgOf('prada-women-bag', NOON_BRAND_TILE) },
    { title: 'Velvet Lips Sample Pack', sub: 'Three deluxe shade samples to try at home',  img: imgOf('red-lipstick', NOON_BRAND_TILE) },
  ],
  fashion: [
    { title: 'Cotton Tote Bag',     sub: 'Reusable noon Style tote — perfect for shopping', img: imgOf('heshe-leather-bag', NOON_BRAND_TILE) },
    { title: 'Fabric Garment Bag',  sub: 'Protect your new piece in a soft cover bag',      img: imgOf('white-faux-leather-backpack', NOON_BRAND_TILE) },
  ],
  home: [
    { title: 'Linen Care Kit',     sub: 'Detergent sample + fabric refresher spray',     img: imgOf('cooking-oil', NOON_BRAND_TILE) },
    { title: 'noon Living Candle', sub: 'Soy-wax candle with white musk fragrance',      img: imgOf('table-lamp', NOON_BRAND_TILE) },
  ],
  grocery: [
    { title: 'noon Daily Recipe Card', sub: 'Curated weekly recipe — change every order', img: NOON_BRAND_TILE },
  ],
  accessories: [
    { title: 'Lens Cleaning Kit', sub: 'Microfibre cloth + cleaning spray',         img: imgOf('classic-sun-glasses', NOON_BRAND_TILE) },
    { title: 'Premium Dust Bag',  sub: 'Soft cotton dust bag — keep your piece safe', img: imgOf('heshe-leather-bag', NOON_BRAND_TILE) },
  ],
};

export function getGiftOffers(productId: string): GiftOffer[] {
  const product = byId.get(productId);
  if (!product) return [];
  return GIFTS_BY_CATEGORY[product.category] ?? [];
}

/* ── Extended warranty ─────────────────────────────────────────────────── */
const WARRANTY_CATEGORIES = new Set<CategoryId>(['electronics', 'home']);

export interface WarrantyPlan {
  period: string;
  shield: 'gold' | 'blue';
  title: string;
  usps: Array<{ icon: 'calendar' | 'liquid' | 'delivery' | 'protection' | 'malfunction' | 'infinity'; text: string }>;
  price: string;
}

export function shouldShowWarranty(productId: string): boolean {
  const product = byId.get(productId);
  if (!product) return false;
  return WARRANTY_CATEGORIES.has(product.category);
}

export function getWarrantyPlans(productId: string): WarrantyPlan[] {
  const product = byId.get(productId);
  if (!product) return [];
  // Price scales with selling price — short plan ~8%, extended plan ~14%, rounded.
  const shortPrice = Math.max(49, Math.round(product.sellingPrice * 0.08));
  const longPrice  = Math.max(99, Math.round(product.sellingPrice * 0.14));
  return [
    {
      period: '1 YEAR',
      shield: 'gold',
      title: 'Accidental Damage\nProtection',
      usps: [
        { icon: 'calendar', text: 'Active from date of purchase' },
        { icon: 'liquid',   text: 'Covers liquid damages' },
        { icon: 'delivery', text: 'Free pickup & delivery' },
      ],
      price: `Đ${shortPrice}`,
    },
    {
      period: '1 YEAR ACCIDENTAL + 1 YEAR EXTENDED',
      shield: 'blue',
      title: 'Accidental Damage &\nExtended Warranty',
      usps: [
        { icon: 'protection',  text: 'Active from date of purchase' },
        { icon: 'malfunction', text: 'Covers all accidental damages' },
        { icon: 'infinity',    text: 'Free pickup & delivery' },
      ],
      price: `Đ${longPrice}`,
    },
  ];
}

/* ── Ratings & reviews ────────────────────────────────────────────────── */
export interface ReviewBundle {
  averageRating: number;
  totalReviews: number;
  summaryBullets: string[];
  reviews: Array<{
    name: string;
    stars: number;
    when: string;
    title: string;
    body: string;
    helpful: number;
  }>;
}

const SUMMARY_BY_CATEGORY: Record<CategoryId, string[]> = {
  electronics: [
    'Reviewers love the build quality and reliable everyday performance',
    'Setup is described as quick and intuitive',
    'Battery / power performance matches the spec sheet',
    'A small number of users wished for additional accessories in-box',
  ],
  beauty: [
    'Pigment and finish are widely praised',
    'Long-wear claims match real-world experience for most buyers',
    'Packaging arrives well-protected and looks premium',
    'A handful of buyers preferred a different shade for their tone',
  ],
  fashion: [
    'Fit runs true to size for most customers',
    'Fabric quality and stitching are consistently highlighted',
    'Colour matches the listing photos closely',
    'A few buyers mentioned the size guide could be more detailed',
  ],
  home: [
    'Build quality and finish feel premium in person',
    'Assembly is straightforward with the included instructions',
    'The piece is a great visual fit in modern interiors',
    'Some buyers noted heavier-than-expected packaging on arrival',
  ],
  grocery: [
    'Freshness on arrival is praised by most buyers',
    'Packaging keeps items chilled / sealed as expected',
    'Taste matches what regular shoppers expect from the brand',
    'A small share of orders had a single damaged unit reported',
  ],
  accessories: [
    'Materials feel premium and durable',
    'Hardware and stitching get repeat praise',
    'Looks identical to the listing photos in good light',
    'A few users wished for an extra interior pocket',
  ],
};

const REVIEW_OVERRIDES: Record<string, ReviewBundle['summaryBullets']> = {
  'apple-homepod-mini': [
    'Buyers love the 360° sound at this size',
    'Siri and HomeKit integration is fast and reliable',
    'Pairs cleanly with Apple devices over AirPlay',
    'Some users wished for line-in or Bluetooth audio input',
  ],
  'apple-airpods': [
    'Auto-pairing across Apple devices is a standout',
    'Battery comfortably lasts a full day of commuting',
    'Call quality on either pod is described as clear',
    'A few users mentioned that they fit better with a tip kit',
  ],
  'iphone-13-pro': [
    'ProMotion 120 Hz display is a noticeable upgrade',
    'Camera system handles low light very well',
    'Battery life is described as the best on iPhone yet',
    'Some users felt the device runs warm under sustained 4K capture',
  ],
};

const REVIEWERS: Array<{ name: string; helpful: number }> = [
  { name: 'Aisha Khalid',   helpful: 18 },
  { name: 'Omar Ali',       helpful: 14 },
  { name: 'Priya Singh',    helpful: 22 },
  { name: 'Rashid Mansoor', helpful: 9 },
  { name: 'Nadia Hassan',   helpful: 27 },
  { name: 'John Anderson',  helpful: 15 },
];

function reviewWhen(idx: number): string {
  return ['3 days ago', '1 week ago', '3 weeks ago', '2 months ago'][idx % 4];
}

export function getReviewBundle(productId: string): ReviewBundle {
  const product = byId.get(productId);
  if (!product) {
    return {
      averageRating: 0,
      totalReviews: 0,
      summaryBullets: [],
      reviews: [],
    };
  }

  const summary =
    REVIEW_OVERRIDES[productId] ??
    SUMMARY_BY_CATEGORY[product.category] ??
    ['Buyers are generally happy with this product.'];

  const reviews = [0, 1].map((i) => {
    const reviewer = REVIEWERS[(productId.length + i) % REVIEWERS.length];
    return {
      name: reviewer.name,
      stars: Math.min(5, Math.max(3, Math.round(product.rating + (i === 0 ? 0.4 : -0.2)))),
      when: reviewWhen(i),
      title:
        i === 0
          ? `Loving my ${product.name.split(',')[0]}`
          : `Solid pick — would buy again`,
      body:
        i === 0
          ? `The ${product.brand} ${product.name.split(',')[0]} arrived quickly and matches the listing exactly. ${summary[0]}.`
          : `Good experience overall. ${summary[1] ?? summary[0]}. Packaging was solid and the product looks just like the photos.`,
      helpful: reviewer.helpful + i,
    };
  });

  return {
    averageRating: product.rating,
    totalReviews: product.reviewCount,
    summaryBullets: summary,
    reviews,
  };
}
