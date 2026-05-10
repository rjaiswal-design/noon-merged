import { products, DIRHAM } from './products';
import type { Product } from '../types/product';

export { DIRHAM };

export interface PDPOption {
  label: string;
  disabled?: boolean;
}

export interface PDPColorOption {
  label: string;
  image: string;
}

export interface PDPResolvedProduct {
  product: Product;
  brand: string;
  title: string;
  reviewSummary: string;
  features: string[];
  memoryOptions: PDPOption[];
  defaultMemory: string;
  colorOptions: PDPColorOption[];
  defaultColor: string;
  promos: string[];
  relatedProducts: Product[];
}

const productById = new Map(products.map((product) => [product.id, product]));

const DEFAULT_PROMOS = [
  'Extra 15% off up to D150',
  'Bank offer on prepaid orders',
  'Additional exchange bonus',
];

function toReviewSummary(reviewCount: number) {
  if (reviewCount >= 1000) {
    const compact =
      reviewCount >= 10000
        ? `${(reviewCount / 1000).toFixed(1).replace('.0', '')}K+`
        : `${Math.round(reviewCount / 100) / 10}K+`;
    return `(${compact})`;
  }
  return `(${reviewCount})`;
}

function defaultFeatures(product: Product): string[] {
  return [
    product.description,
    `${product.variant} configuration in the ${product.category} category.`,
    `Rated ${product.rating}/5 from ${toReviewSummary(product.reviewCount)} verified reviews.`,
  ];
}

function defaultMemoryOptions(product: Product): PDPOption[] {
  // Use the variant as the only "memory" option so the picker reflects the product.
  return [{ label: product.variant }];
}

function defaultColorOptions(product: Product): PDPColorOption[] {
  // Reuse the product image for all color swatches as a placeholder.
  const img = product.images[0];
  return [
    { label: 'Default', image: img },
  ];
}

function resolveRelatedProducts(currentId: string): Product[] {
  const current = productById.get(currentId);
  if (!current) return products.slice(0, 4);
  const sameCategory = products.filter(
    (p) => p.id !== currentId && p.category === current.category,
  );
  if (sameCategory.length >= 4) return sameCategory.slice(0, 4);
  // Pad with cross-category picks.
  const filler = products.filter((p) => p.id !== currentId && p.category !== current.category);
  return [...sameCategory, ...filler].slice(0, 4);
}

export function getPdpProduct(productId?: string): PDPResolvedProduct {
  const fallback: Product = productById.get(products[0]!.id) ?? products[0]!;
  const product: Product = (productId ? productById.get(productId) : undefined) ?? fallback;
  const memoryOptions = defaultMemoryOptions(product);
  const colorOptions = defaultColorOptions(product);

  return {
    product,
    brand: product.brand,
    title: product.name,
    reviewSummary: toReviewSummary(product.reviewCount),
    features: defaultFeatures(product),
    memoryOptions,
    defaultMemory: memoryOptions[0]!.label,
    colorOptions,
    defaultColor: colorOptions[0]!.label,
    promos: DEFAULT_PROMOS,
    relatedProducts: resolveRelatedProducts(product.id),
  };
}
