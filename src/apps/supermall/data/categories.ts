export type HomeCategory = {
  label: string;
  image: string;
  sale?: boolean;
};

export const homeCategories: HomeCategory[] = [
  { label: 'Beauty & Skin Care',  image: '/categories/cat-r1-1.svg', sale: true },
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
