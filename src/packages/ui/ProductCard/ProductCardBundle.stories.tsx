import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { ProductCardBundle } from './ProductCardBundle';
import { getFrequentlyBoughtTogether } from '@/apps/shop/data/productRelations';
import { products } from '@/apps/shop/data/products';

const airpods = products.find((p) => p.id === 'apple-airpods')!;

const meta: Meta<typeof ProductCardBundle> = {
  title: 'Commerce/ProductCardBundle',
  component: ProductCardBundle,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ width: 130, padding: 16, background: '#fff' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductCardBundle>;

export const Selected: Story = { args: { product: airpods, selected: true } };

export const Unselected: Story = { args: { product: airpods, selected: false } };

export const WithBrandChip: Story = {
  args: { product: airpods, selected: true, brandChip: 'UGREEN' },
};

export const NoExpress: Story = {
  args: { product: airpods, selected: true, expressLabel: '' },
};

export const InteractiveTrio = {
  render: () => {
    const items = getFrequentlyBoughtTogether('iphone-13-pro');
    const Inner = () => {
      const [selected, setSelected] = useState<Set<string>>(
        () => new Set(items.map((p) => p.id))
      );
      return (
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 6 }}>
          {items.map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'stretch', gap: 4 }}>
              <div style={{ width: 110 }}>
                <ProductCardBundle
                  product={p}
                  selected={selected.has(p.id)}
                  onToggle={(id, next) =>
                    setSelected((prev) => {
                      const out = new Set(prev);
                      if (next) out.add(id);
                      else out.delete(id);
                      return out;
                    })
                  }
                  brandChip={i === 1 ? p.brand.toUpperCase() : undefined}
                />
              </div>
              {i < items.length - 1 && (
                <span style={{ display: 'flex', alignItems: 'center', color: '#9ca3af', fontWeight: 700 }}>
                  +
                </span>
              )}
            </div>
          ))}
        </div>
      );
    };
    return <Inner />;
  },
};
