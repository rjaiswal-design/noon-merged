import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import type { Product } from '@/apps/supermall/types/product';

const sample: Product = {
  id: 'p1',
  name: 'Maybelline New York Liquid Foundation, Matte & Poreless',
  variant: '50 ml',
  images: ['https://images.unsplash.com/photo-1522335789203-aaaa1c3c5544?w=400'],
  sellingPrice: 86,
  originalPrice: 123,
  currency: 'AED',
  rating: 4.3,
  reviewCount: 128,
  tag: { label: 'Best seller', variant: 'bestseller' },
  deal: 'Ramadan deal',
  isSponsored: true,
};

const meta: Meta<typeof ProductCard> = {
  title: 'Commerce/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 200 }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = { args: { product: sample } };

export const NewTag: Story = {
  args: { product: { ...sample, tag: { label: 'New', variant: 'new' } } },
};

export const HotTag: Story = {
  args: { product: { ...sample, tag: { label: 'Hot', variant: 'hot' } } },
};

export const SaleTag: Story = {
  args: { product: { ...sample, tag: { label: '-30%', variant: 'sale' } } },
};

export const NoTag: Story = {
  args: { product: { ...sample, tag: undefined, isSponsored: false, deal: undefined } },
};
