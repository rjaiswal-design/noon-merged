import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProductCardAd } from './ProductCardAd';
import { products } from '@/apps/shop/data/products';

const homepod = products.find((p) => p.id === 'apple-homepod-mini')!;
const watch = products.find((p) => p.id === 'apple-watch-series-4-gold')!;

const meta: Meta<typeof ProductCardAd> = {
  title: 'Commerce/ProductCardAd',
  component: ProductCardAd,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 360, padding: 16, background: '#f9f9fb' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCardAd>;

export const Default: Story = { args: { product: homepod } };

export const NoExpress: Story = { args: { product: homepod, expressLabel: '' } };

export const Alt: Story = { args: { product: watch } };
