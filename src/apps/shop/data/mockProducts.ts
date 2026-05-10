// Backwards-compatible re-exports. The real catalog lives in ./products.ts and
// the canonical category list in ./categories.ts. Existing call sites
// (`import { mockProducts, mockCategories, DIRHAM } from './mockProducts'`)
// keep working until we migrate them to the API layer.

export { products as mockProducts, DIRHAM } from './products';
export { productCategories as mockCategories } from './categories';
