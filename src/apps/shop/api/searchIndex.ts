import Fuse from 'fuse.js';
import { products } from '../data/products';
import type { Product } from '../types/product';

// Built once on module load. 50 items is small enough that re-indexing has
// no measurable cost, but we still cache it.
const fuse = new Fuse<Product>(products, {
  keys: [
    { name: 'name', weight: 0.5 },
    { name: 'brand', weight: 0.3 },
    { name: 'category', weight: 0.1 },
    { name: 'description', weight: 0.1 },
  ],
  threshold: 0.4,
  minMatchCharLength: 2,
  includeScore: true,
  ignoreLocation: true,
});

export function runSearch(query: string, limit?: number): Product[] {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const hits = fuse.search(trimmed);
  const results = hits.map((h) => h.item);
  return typeof limit === 'number' ? results.slice(0, limit) : results;
}
