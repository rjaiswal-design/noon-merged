import type { Product } from '../types/product';
import { products } from './products';

const byId = new Map(products.map((p) => [p.id, p] as const));

function pick(ids: string[]): Product[] {
  return ids.map((id) => byId.get(id)).filter((p): p is Product => Boolean(p));
}

interface Relation {
  combo: string[];
  ad: string;
  sponsored: string[];
  fbt: string[];
}

const FALLBACK: Relation = {
  combo: ['apple-airpods', 'apple-watch-series-4-gold'],
  ad: 'apple-homepod-mini',
  sponsored: ['apple-airpods', 'apple-airpods-max-silver', 'apple-homepod-mini'],
  fbt: ['apple-airpods', 'apple-watch-series-4-gold', 'apple-homepod-mini'],
};

const RELATIONS: Record<string, Relation> = {
  'iphone-13-pro': {
    combo: ['apple-airpods', 'apple-watch-series-4-gold'],
    ad: 'apple-homepod-mini',
    sponsored: ['apple-airpods', 'apple-airpods-max-silver', 'apple-homepod-mini'],
    fbt: ['apple-airpods', 'apple-watch-series-4-gold', 'apple-homepod-mini'],
  },
  'iphone-x': {
    combo: ['apple-airpods', 'apple-airpods-max-silver'],
    ad: 'apple-homepod-mini',
    sponsored: ['apple-airpods', 'apple-watch-series-4-gold', 'apple-homepod-mini'],
    fbt: ['apple-airpods', 'apple-airpods-max-silver', 'apple-watch-series-4-gold'],
  },
  'oppo-f19-pro-plus': {
    combo: ['apple-airpods', 'realme-xt'],
    ad: 'apple-airpods',
    sponsored: ['apple-airpods', 'apple-airpods-max-silver', 'apple-homepod-mini'],
    fbt: ['apple-airpods', 'apple-airpods-max-silver', 'apple-watch-series-4-gold'],
  },
  'realme-xt': {
    combo: ['apple-airpods', 'oppo-f19-pro-plus'],
    ad: 'apple-airpods',
    sponsored: ['apple-airpods', 'apple-watch-series-4-gold', 'apple-homepod-mini'],
    fbt: ['apple-airpods', 'apple-watch-series-4-gold', 'apple-airpods-max-silver'],
  },
  'apple-airpods': {
    combo: ['apple-airpods-max-silver', 'apple-homepod-mini'],
    ad: 'apple-watch-series-4-gold',
    sponsored: ['apple-airpods-max-silver', 'apple-homepod-mini', 'apple-watch-series-4-gold'],
    fbt: ['iphone-13-pro', 'apple-watch-series-4-gold', 'apple-homepod-mini'],
  },
  'apple-airpods-max-silver': {
    combo: ['apple-airpods', 'apple-homepod-mini'],
    ad: 'apple-watch-series-4-gold',
    sponsored: ['apple-airpods', 'apple-homepod-mini', 'apple-watch-series-4-gold'],
    fbt: ['iphone-13-pro', 'apple-airpods', 'apple-homepod-mini'],
  },
  'apple-homepod-mini': {
    combo: ['apple-airpods', 'apple-airpods-max-silver'],
    ad: 'apple-watch-series-4-gold',
    sponsored: ['apple-airpods', 'apple-airpods-max-silver', 'apple-watch-series-4-gold'],
    fbt: ['iphone-13-pro', 'apple-airpods', 'apple-watch-series-4-gold'],
  },
  'apple-watch-series-4-gold': {
    combo: ['apple-airpods', 'iphone-13-pro'],
    ad: 'apple-airpods',
    sponsored: ['apple-airpods', 'apple-homepod-mini', 'apple-airpods-max-silver'],
    fbt: ['iphone-13-pro', 'apple-airpods', 'apple-homepod-mini'],
  },

  // Beauty — pair with other beauty
  'essence-mascara-lash-princess': {
    combo: ['eyeshadow-palette-with-mirror', 'red-lipstick'],
    ad: 'powder-canister',
    sponsored: ['eyeshadow-palette-with-mirror', 'red-lipstick', 'powder-canister'],
    fbt: ['eyeshadow-palette-with-mirror', 'red-lipstick', 'powder-canister'],
  },
  'eyeshadow-palette-with-mirror': {
    combo: ['essence-mascara-lash-princess', 'red-lipstick'],
    ad: 'red-nail-polish',
    sponsored: ['essence-mascara-lash-princess', 'red-lipstick', 'powder-canister'],
    fbt: ['essence-mascara-lash-princess', 'red-lipstick', 'red-nail-polish'],
  },
  'red-lipstick': {
    combo: ['essence-mascara-lash-princess', 'eyeshadow-palette-with-mirror'],
    ad: 'red-nail-polish',
    sponsored: ['essence-mascara-lash-princess', 'eyeshadow-palette-with-mirror', 'powder-canister'],
    fbt: ['red-nail-polish', 'essence-mascara-lash-princess', 'eyeshadow-palette-with-mirror'],
  },
  'red-nail-polish': {
    combo: ['red-lipstick', 'powder-canister'],
    ad: 'eyeshadow-palette-with-mirror',
    sponsored: ['red-lipstick', 'powder-canister', 'essence-mascara-lash-princess'],
    fbt: ['red-lipstick', 'eyeshadow-palette-with-mirror', 'powder-canister'],
  },
  'powder-canister': {
    combo: ['essence-mascara-lash-princess', 'eyeshadow-palette-with-mirror'],
    ad: 'red-lipstick',
    sponsored: ['essence-mascara-lash-princess', 'red-lipstick', 'eyeshadow-palette-with-mirror'],
    fbt: ['essence-mascara-lash-princess', 'eyeshadow-palette-with-mirror', 'red-lipstick'],
  },
  'calvin-klein-ck-one': {
    combo: ['chanel-coco-noir', 'dior-jadore'],
    ad: 'red-lipstick',
    sponsored: ['chanel-coco-noir', 'dior-jadore', 'powder-canister'],
    fbt: ['chanel-coco-noir', 'dior-jadore', 'red-lipstick'],
  },
  'chanel-coco-noir': {
    combo: ['calvin-klein-ck-one', 'dior-jadore'],
    ad: 'red-lipstick',
    sponsored: ['calvin-klein-ck-one', 'dior-jadore', 'red-lipstick'],
    fbt: ['calvin-klein-ck-one', 'dior-jadore', 'red-lipstick'],
  },
  'dior-jadore': {
    combo: ['chanel-coco-noir', 'calvin-klein-ck-one'],
    ad: 'red-lipstick',
    sponsored: ['chanel-coco-noir', 'calvin-klein-ck-one', 'eyeshadow-palette-with-mirror'],
    fbt: ['chanel-coco-noir', 'calvin-klein-ck-one', 'red-lipstick'],
  },

  // Grocery — staples pair with staples
  'apple-fresh': {
    combo: ['honey-jar', 'eggs-fresh'],
    ad: 'cooking-oil',
    sponsored: ['honey-jar', 'eggs-fresh', 'cooking-oil'],
    fbt: ['eggs-fresh', 'honey-jar', 'cooking-oil'],
  },
  'beef-steak': {
    combo: ['cooking-oil', 'eggs-fresh'],
    ad: 'soft-drinks',
    sponsored: ['cooking-oil', 'eggs-fresh', 'soft-drinks'],
    fbt: ['cooking-oil', 'soft-drinks', 'eggs-fresh'],
  },
  'cooking-oil': {
    combo: ['eggs-fresh', 'beef-steak'],
    ad: 'soft-drinks',
    sponsored: ['eggs-fresh', 'beef-steak', 'soft-drinks'],
    fbt: ['eggs-fresh', 'beef-steak', 'soft-drinks'],
  },
  'eggs-fresh': {
    combo: ['cooking-oil', 'apple-fresh'],
    ad: 'beef-steak',
    sponsored: ['cooking-oil', 'apple-fresh', 'beef-steak'],
    fbt: ['cooking-oil', 'beef-steak', 'apple-fresh'],
  },
  'honey-jar': {
    combo: ['nescafe-coffee', 'apple-fresh'],
    ad: 'ice-cream',
    sponsored: ['nescafe-coffee', 'apple-fresh', 'ice-cream'],
    fbt: ['nescafe-coffee', 'apple-fresh', 'eggs-fresh'],
  },
  'ice-cream': {
    combo: ['soft-drinks', 'honey-jar'],
    ad: 'nescafe-coffee',
    sponsored: ['soft-drinks', 'honey-jar', 'nescafe-coffee'],
    fbt: ['soft-drinks', 'honey-jar', 'nescafe-coffee'],
  },
  'nescafe-coffee': {
    combo: ['honey-jar', 'soft-drinks'],
    ad: 'ice-cream',
    sponsored: ['honey-jar', 'soft-drinks', 'ice-cream'],
    fbt: ['honey-jar', 'ice-cream', 'soft-drinks'],
  },
  'soft-drinks': {
    combo: ['ice-cream', 'beef-steak'],
    ad: 'nescafe-coffee',
    sponsored: ['ice-cream', 'beef-steak', 'nescafe-coffee'],
    fbt: ['ice-cream', 'beef-steak', 'nescafe-coffee'],
  },

  // Fashion — shirts/dresses/etc
  'blue-black-check-shirt': {
    combo: ['man-plaid-shirt', 'men-check-shirt'],
    ad: 'gigabyte-aorus-tshirt',
    sponsored: ['man-plaid-shirt', 'men-check-shirt', 'gigabyte-aorus-tshirt'],
    fbt: ['man-plaid-shirt', 'men-check-shirt', 'gigabyte-aorus-tshirt'],
  },
  'gigabyte-aorus-tshirt': {
    combo: ['blue-black-check-shirt', 'men-check-shirt'],
    ad: 'man-plaid-shirt',
    sponsored: ['blue-black-check-shirt', 'men-check-shirt', 'man-plaid-shirt'],
    fbt: ['blue-black-check-shirt', 'man-plaid-shirt', 'men-check-shirt'],
  },
  'man-plaid-shirt': {
    combo: ['blue-black-check-shirt', 'men-check-shirt'],
    ad: 'gigabyte-aorus-tshirt',
    sponsored: ['blue-black-check-shirt', 'men-check-shirt', 'gigabyte-aorus-tshirt'],
    fbt: ['blue-black-check-shirt', 'men-check-shirt', 'gigabyte-aorus-tshirt'],
  },
  'men-check-shirt': {
    combo: ['blue-black-check-shirt', 'man-plaid-shirt'],
    ad: 'gigabyte-aorus-tshirt',
    sponsored: ['blue-black-check-shirt', 'man-plaid-shirt', 'gigabyte-aorus-tshirt'],
    fbt: ['blue-black-check-shirt', 'man-plaid-shirt', 'gigabyte-aorus-tshirt'],
  },
  'black-womens-gown': {
    combo: ['corset-leather-with-skirt', 'dress-pea'],
    ad: 'marni-red-black-suit',
    sponsored: ['corset-leather-with-skirt', 'dress-pea', 'marni-red-black-suit'],
    fbt: ['corset-leather-with-skirt', 'dress-pea', 'marni-red-black-suit'],
  },
  'corset-leather-with-skirt': {
    combo: ['black-womens-gown', 'dress-pea'],
    ad: 'marni-red-black-suit',
    sponsored: ['black-womens-gown', 'dress-pea', 'marni-red-black-suit'],
    fbt: ['black-womens-gown', 'dress-pea', 'marni-red-black-suit'],
  },
  'dress-pea': {
    combo: ['black-womens-gown', 'corset-leather-with-skirt'],
    ad: 'marni-red-black-suit',
    sponsored: ['black-womens-gown', 'corset-leather-with-skirt', 'marni-red-black-suit'],
    fbt: ['black-womens-gown', 'corset-leather-with-skirt', 'marni-red-black-suit'],
  },
  'marni-red-black-suit': {
    combo: ['black-womens-gown', 'corset-leather-with-skirt'],
    ad: 'dress-pea',
    sponsored: ['black-womens-gown', 'corset-leather-with-skirt', 'dress-pea'],
    fbt: ['black-womens-gown', 'corset-leather-with-skirt', 'dress-pea'],
  },

  // Home — furniture & decor
  'annibale-colombo-bed': {
    combo: ['annibale-colombo-sofa', 'knoll-saarinen-chair'],
    ad: 'table-lamp',
    sponsored: ['annibale-colombo-sofa', 'knoll-saarinen-chair', 'table-lamp'],
    fbt: ['annibale-colombo-sofa', 'knoll-saarinen-chair', 'table-lamp'],
  },
  'annibale-colombo-sofa': {
    combo: ['annibale-colombo-bed', 'knoll-saarinen-chair'],
    ad: 'table-lamp',
    sponsored: ['annibale-colombo-bed', 'knoll-saarinen-chair', 'table-lamp'],
    fbt: ['annibale-colombo-bed', 'knoll-saarinen-chair', 'table-lamp'],
  },
  'knoll-saarinen-chair': {
    combo: ['annibale-colombo-sofa', 'table-lamp'],
    ad: 'family-tree-photo-frame',
    sponsored: ['annibale-colombo-sofa', 'table-lamp', 'annibale-colombo-bed'],
    fbt: ['annibale-colombo-sofa', 'table-lamp', 'annibale-colombo-bed'],
  },
  'decoration-swing': {
    combo: ['family-tree-photo-frame', 'table-lamp'],
    ad: 'knoll-saarinen-chair',
    sponsored: ['family-tree-photo-frame', 'table-lamp', 'knoll-saarinen-chair'],
    fbt: ['family-tree-photo-frame', 'table-lamp', 'knoll-saarinen-chair'],
  },
  'family-tree-photo-frame': {
    combo: ['decoration-swing', 'table-lamp'],
    ad: 'knoll-saarinen-chair',
    sponsored: ['decoration-swing', 'table-lamp', 'knoll-saarinen-chair'],
    fbt: ['decoration-swing', 'table-lamp', 'knoll-saarinen-chair'],
  },
  'table-lamp': {
    combo: ['family-tree-photo-frame', 'decoration-swing'],
    ad: 'knoll-saarinen-chair',
    sponsored: ['family-tree-photo-frame', 'decoration-swing', 'knoll-saarinen-chair'],
    fbt: ['family-tree-photo-frame', 'decoration-swing', 'knoll-saarinen-chair'],
  },
  'black-aluminium-cup': {
    combo: ['black-whisk', 'cooking-oil'],
    ad: 'eggs-fresh',
    sponsored: ['black-whisk', 'cooking-oil', 'eggs-fresh'],
    fbt: ['black-whisk', 'cooking-oil', 'eggs-fresh'],
  },
  'black-whisk': {
    combo: ['black-aluminium-cup', 'cooking-oil'],
    ad: 'eggs-fresh',
    sponsored: ['black-aluminium-cup', 'cooking-oil', 'eggs-fresh'],
    fbt: ['black-aluminium-cup', 'cooking-oil', 'eggs-fresh'],
  },

  // Accessories — bags + glasses
  'black-sun-glasses': {
    combo: ['classic-sun-glasses', 'green-and-black-glasses'],
    ad: 'sunglasses-classic',
    sponsored: ['classic-sun-glasses', 'green-and-black-glasses', 'sunglasses-classic'],
    fbt: ['classic-sun-glasses', 'green-and-black-glasses', 'sunglasses-classic'],
  },
  'classic-sun-glasses': {
    combo: ['black-sun-glasses', 'sunglasses-classic'],
    ad: 'green-and-black-glasses',
    sponsored: ['black-sun-glasses', 'sunglasses-classic', 'green-and-black-glasses'],
    fbt: ['black-sun-glasses', 'sunglasses-classic', 'green-and-black-glasses'],
  },
  'green-and-black-glasses': {
    combo: ['black-sun-glasses', 'classic-sun-glasses'],
    ad: 'party-glasses',
    sponsored: ['black-sun-glasses', 'classic-sun-glasses', 'party-glasses'],
    fbt: ['black-sun-glasses', 'classic-sun-glasses', 'party-glasses'],
  },
  'party-glasses': {
    combo: ['classic-sun-glasses', 'green-and-black-glasses'],
    ad: 'black-sun-glasses',
    sponsored: ['classic-sun-glasses', 'green-and-black-glasses', 'black-sun-glasses'],
    fbt: ['classic-sun-glasses', 'green-and-black-glasses', 'black-sun-glasses'],
  },
  'sunglasses-classic': {
    combo: ['black-sun-glasses', 'classic-sun-glasses'],
    ad: 'party-glasses',
    sponsored: ['black-sun-glasses', 'classic-sun-glasses', 'party-glasses'],
    fbt: ['black-sun-glasses', 'classic-sun-glasses', 'party-glasses'],
  },
  'blue-womens-handbag': {
    combo: ['heshe-leather-bag', 'prada-women-bag'],
    ad: 'women-handbag-black',
    sponsored: ['heshe-leather-bag', 'prada-women-bag', 'women-handbag-black'],
    fbt: ['heshe-leather-bag', 'prada-women-bag', 'women-handbag-black'],
  },
  'heshe-leather-bag': {
    combo: ['blue-womens-handbag', 'prada-women-bag'],
    ad: 'women-handbag-black',
    sponsored: ['blue-womens-handbag', 'prada-women-bag', 'women-handbag-black'],
    fbt: ['blue-womens-handbag', 'prada-women-bag', 'women-handbag-black'],
  },
  'prada-women-bag': {
    combo: ['heshe-leather-bag', 'blue-womens-handbag'],
    ad: 'women-handbag-black',
    sponsored: ['heshe-leather-bag', 'blue-womens-handbag', 'women-handbag-black'],
    fbt: ['heshe-leather-bag', 'blue-womens-handbag', 'women-handbag-black'],
  },
  'white-faux-leather-backpack': {
    combo: ['blue-womens-handbag', 'prada-women-bag'],
    ad: 'heshe-leather-bag',
    sponsored: ['blue-womens-handbag', 'prada-women-bag', 'heshe-leather-bag'],
    fbt: ['blue-womens-handbag', 'prada-women-bag', 'heshe-leather-bag'],
  },
  'women-handbag-black': {
    combo: ['blue-womens-handbag', 'prada-women-bag'],
    ad: 'heshe-leather-bag',
    sponsored: ['blue-womens-handbag', 'prada-women-bag', 'heshe-leather-bag'],
    fbt: ['blue-womens-handbag', 'prada-women-bag', 'heshe-leather-bag'],
  },
};

function relationFor(productId: string): Relation {
  if (RELATIONS[productId]) return RELATIONS[productId];
  // Category fallback: pick top-rated peers from the same category.
  const current = byId.get(productId);
  if (!current) return FALLBACK;
  const peers = products
    .filter((p) => p.category === current.category && p.id !== productId)
    .sort((a, b) => b.rating - a.rating)
    .map((p) => p.id);
  return {
    combo: peers.slice(0, 2),
    ad: peers[0] ?? FALLBACK.ad,
    sponsored: peers.slice(0, 3),
    fbt: peers.slice(0, 3),
  };
}

export function getComboProducts(productId: string): Product[] {
  return pick(relationFor(productId).combo);
}

export function getAdProduct(productId: string): Product | undefined {
  return byId.get(relationFor(productId).ad);
}

export function getSponsoredProducts(productId: string): Product[] {
  return pick(relationFor(productId).sponsored);
}

export function getFrequentlyBoughtTogether(productId: string): Product[] {
  return pick(relationFor(productId).fbt);
}
