import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProductCardSku } from './ProductCardSku';
import type { Product } from '@/apps/shop/types/product';

const sample: Product = {
  id: 'sku-1',
  name: 'Apple Airpods Pro 2 Wireless Earbuds',
  description: 'Premium wireless earbuds with active noise cancellation.',
  brand: 'Apple',
  category: 'electronics',
  variant: '',
  images: [
    'https://images-na.ssl-images-amazon.com/images/I/61oCISLE+PL._SX679_.jpg',
  ],
  sellingPrice: 899,
  originalPrice: 1399,
  currency: 'dhm',
  rating: 4.3,
  reviewCount: 0,
  tag: { label: 'Best Seller', variant: 'bestseller' },
};

const meta: Meta<typeof ProductCardSku> = {
  title: 'Commerce/ProductCardSku',
  component: ProductCardSku,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/NtO68xcecXgIGaZ3wX02zU/noon-React-app?node-id=10-17429',
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ padding: 16, background: '#fff' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCardSku>;

export const Default: Story = { args: { product: sample } };

export const NoTag: Story = {
  args: { product: { ...sample, tag: undefined } },
};

export const NoDiscount: Story = {
  args: { product: { ...sample, originalPrice: sample.sellingPrice } },
};

export const NoExpress: Story = {
  args: { product: sample, expressLabel: '' },
};
