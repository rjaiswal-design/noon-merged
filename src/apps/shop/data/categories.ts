import type { Category, CategoryId } from '../types/product';

export type HomeCategory = {
  label: string;
  image: string;
};

// 6 noon-style product categories powering PLP filter tabs and Home rails.
// Image paths reuse existing local SVG assets.
export const productCategories: Array<Category & { id: CategoryId | 'all' }> = [
  { id: 'all',         label: 'All items',   image: '/categories/cat-r1-1.svg' },
  { id: 'beauty',      label: 'Beauty',      image: '/categories/cat-r1-1.svg' },
  { id: 'electronics', label: 'Electronics', image: '/categories/cat-r2-2.svg' },
  { id: 'grocery',     label: 'Grocery',     image: '/categories/cat-r1-2.svg' },
  { id: 'fashion',     label: 'Fashion',     image: '/categories/cat-r2-4.svg' },
  { id: 'home',        label: 'Home',        image: '/categories/cat-r1-3.svg' },
  { id: 'accessories', label: 'Accessories', image: '/categories/cat-r2-3.svg' },
];

export const homeCategories: HomeCategory[] = [
  { label: 'Beauty & Skin Care',  image: '/categories/cat-r1-1.svg' },
  { label: 'Toys & Games',        image: '/categories/cat-r2-1.svg' },
  { label: 'Grocery & Kitchen',   image: '/categories/cat-r1-2.svg' },
  { label: 'Electronics & Tools', image: '/categories/cat-r2-2.svg' },
  { label: 'Home Appliances',     image: '/categories/cat-r1-3.svg' },
  { label: 'Hair Care',           image: '/categories/cat-r2-3.svg' },
  { label: 'Beauty & Skin Care',  image: '/categories/cat-r1-4.svg' },
  { label: 'Shoes & Clothes',     image: '/categories/cat-r2-4.svg' },
  { label: 'Grocery & Kitchen',   image: '/categories/cat-r1-5.svg' },
  { label: 'Toys & Games',        image: '/categories/cat-r2-5.svg' },
];
