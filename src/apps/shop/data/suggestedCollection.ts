import type { Product, CategoryId } from '../types/product';

// Name → suggested-collection rules. Keyword match is case-insensitive and
// runs in declared order, so put the most specific phrases first. This is
// the placeholder for a real "smart suggestions" backend signal — same
// shape, different source.
const KEYWORD_RULES: Array<[RegExp, string]> = [
  [/smart\s*speaker|homepod|nest mini|echo dot/i, 'Smart Speakers'],
  [/smartwatch|smart watch|apple watch|galaxy watch|fitbit/i, 'Smartwatches'],
  [/earbuds|airpods|earphones|in[-\s]?ear|wireless earphones/i, 'Earbuds'],
  [/headphone|over[-\s]?ear|on[-\s]?ear/i, 'Headphones'],
  [/laptop|macbook|notebook|chromebook/i, 'Laptops'],
  [/tablet|ipad/i, 'Tablets'],
  [/phone|iphone|galaxy s\d+|pixel \d+/i, 'Smartphones'],
  [/tv|television|smart tv/i, 'TVs'],
  [/camera|dslr|mirrorless/i, 'Cameras'],
  [/perfume|fragrance|eau de/i, 'Fragrances'],
  [/lipstick|mascara|foundation|makeup/i, 'Makeup'],
  [/skincare|moisturi[sz]er|serum|cream/i, 'Skincare'],
  [/sneaker|trainer|running shoe/i, 'Sneakers'],
  [/dress|gown/i, 'Dresses'],
  [/lamp|light/i, 'Lamps'],
  [/sofa|couch/i, 'Sofas'],
  [/coffee maker|espresso/i, 'Coffee Machines'],
  [/blender|mixer/i, 'Kitchen Appliances'],
];

const CATEGORY_FALLBACK: Record<CategoryId, string> = {
  beauty: 'Beauty Picks',
  electronics: 'Tech & Gadgets',
  grocery: 'Pantry',
  fashion: 'Style',
  home: 'Home Picks',
  accessories: 'Accessories',
};

export function getSuggestedCollection(product: Pick<Product, 'name' | 'category'>): string {
  for (const [re, label] of KEYWORD_RULES) {
    if (re.test(product.name)) return label;
  }
  return CATEGORY_FALLBACK[product.category] ?? 'Suggested';
}

/** Lookup variant for callers that don't have a full Product (e.g. cart line
 *  items). Falls back to a generic label if nothing matches. */
export function getSuggestedCollectionFromName(name: string): string {
  for (const [re, label] of KEYWORD_RULES) {
    if (re.test(name)) return label;
  }
  return 'Suggested';
}
