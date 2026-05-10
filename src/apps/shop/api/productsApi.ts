import { products } from '../data/products';
import { runSearch } from './searchIndex';
import type { CategoryId, Product } from '../types/product';

// Simulated network latency so the existing skeleton states render naturally.
// Range chosen to feel real without dragging — keep ≤ 900 ms.
function simulateLatency(min = 350, max = 700): Promise<void> {
  const delay = Math.floor(min + Math.random() * (max - min));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export async function fetchAllProducts(): Promise<Product[]> {
  await simulateLatency();
  return products;
}

export async function fetchProductById(id: string): Promise<Product | null> {
  await simulateLatency(150, 400);
  return products.find((p) => p.id === id) ?? null;
}

export async function fetchByCategory(categoryId: CategoryId | 'all'): Promise<Product[]> {
  await simulateLatency();
  if (categoryId === 'all') return products;
  return products.filter((p) => p.category === categoryId);
}

export interface SearchResults {
  results: Product[];
  total: number;
}

export async function searchProducts(query: string, limit?: number): Promise<SearchResults> {
  await simulateLatency(200, 500);
  const all = runSearch(query);
  return {
    results: typeof limit === 'number' ? all.slice(0, limit) : all,
    total: all.length,
  };
}

export interface SearchSuggestion {
  query: string;
  highlight: string;
  rest: string;
  context: string;
  productId: string;
}

// Hand-picked default suggestions when the search box is empty.
const TRENDING_QUERIES: ReadonlyArray<{ id: string; context: string }> = [
  { id: 'iphone-13-pro',         context: 'in electronics' },
  { id: 'essence-mascara-lash-princess', context: 'in beauty' },
  { id: 'apple-airpods',         context: 'in electronics' },
  { id: 'nescafe-coffee',        context: 'in grocery' },
  { id: 'prada-women-bag',       context: 'in accessories' },
];

function highlightSuggestion(query: string, name: string): { highlight: string; rest: string } {
  const trimmed = query.trim();
  if (!trimmed) return { highlight: name.split(' ').slice(0, 2).join(' '), rest: name.split(' ').slice(2).join(' ') ? ' ' + name.split(' ').slice(2).join(' ') : '' };
  const idx = name.toLowerCase().indexOf(trimmed.toLowerCase());
  if (idx === -1) {
    // Fuzzy match — no exact substring. Fall back to capitalised query as
    // highlight, full name as rest after a separator.
    const cap = trimmed[0].toUpperCase() + trimmed.slice(1);
    return { highlight: cap, rest: ` — ${name}` };
  }
  return {
    highlight: name.slice(0, idx + trimmed.length),
    rest: name.slice(idx + trimmed.length),
  };
}

export async function searchSuggestions(query: string): Promise<SearchSuggestion[]> {
  await simulateLatency(120, 280);
  const trimmed = query.trim();

  if (!trimmed) {
    return TRENDING_QUERIES
      .map(({ id, context }) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;
        const { highlight, rest } = highlightSuggestion('', product.name);
        return { query: product.name, highlight, rest, context, productId: product.id };
      })
      .filter((s): s is SearchSuggestion => s !== null);
  }

  const hits = runSearch(trimmed, 5);
  return hits.map((p) => {
    const { highlight, rest } = highlightSuggestion(trimmed, p.name);
    return {
      query: p.name,
      highlight,
      rest,
      context: `in ${p.category}`,
      productId: p.id,
    };
  });
}

export async function fetchHomeRails(): Promise<Array<{ chip: string; products: Product[] }>> {
  await simulateLatency();
  // Each chip surfaces 3 products: the highest-rated from the matching category.
  const byCategory = (cat: CategoryId): Product[] =>
    products
      .filter((p) => p.category === cat)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);

  // 'For you' mixes top product from each category for variety.
  const forYou = (['electronics', 'beauty', 'fashion', 'home', 'grocery'] as CategoryId[])
    .map((cat) => byCategory(cat)[0])
    .filter((p): p is Product => Boolean(p))
    .slice(0, 3);

  return [
    { chip: 'For you',     products: forYou },
    { chip: 'Electronics', products: byCategory('electronics') },
    { chip: 'Beauty',      products: byCategory('beauty') },
    { chip: 'Fashion',     products: byCategory('fashion') },
    { chip: 'Home',        products: byCategory('home') },
  ];
}

export async function fetchCartRecommendations(excludeIds: string[] = []): Promise<Product[]> {
  await simulateLatency();
  const exclude = new Set(excludeIds);
  return products
    .filter((p) => !exclude.has(p.id))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
}

export async function fetchRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  await simulateLatency(180, 400);
  const current = products.find((p) => p.id === productId);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== productId && p.category === current.category)
    .slice(0, limit);
}
