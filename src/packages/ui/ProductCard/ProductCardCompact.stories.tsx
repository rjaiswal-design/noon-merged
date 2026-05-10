import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProductCardCompact } from './ProductCardCompact';
import { products } from '@/apps/shop/data/products';

const airpods = products.find((p) => p.id === 'apple-airpods')!;
const homepod = products.find((p) => p.id === 'apple-homepod-mini')!;

const meta: Meta<typeof ProductCardCompact> = {
  title: 'Commerce/ProductCardCompact',
  component: ProductCardCompact,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 240, padding: 16, background: '#fff' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCardCompact>;

export const Combo: Story = {
  args: { product: airpods, mode: 'combo', qtyLabel: 'x2' },
};

export const ComboQuantityVariant: Story = {
  args: { product: airpods, mode: 'combo', qtyLabel: 'x3' },
};

export const Sponsored: Story = {
  args: { product: homepod, mode: 'sponsored' },
};

export const SponsoredAd: Story = {
  args: { product: homepod, mode: 'sponsored', isAd: true },
};
