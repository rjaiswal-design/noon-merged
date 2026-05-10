import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryCard } from './CategoryCard';
import { homeCategories } from '../../../data/categories';

const PRESETS = {
  'Beauty & Skin Care':  '/categories/cat-r1-1.svg',
  'Grocery & Kitchen':   '/categories/cat-r1-2.svg',
  'Home Appliances':     '/categories/cat-r1-3.svg',
  'Toys & Games':        '/categories/cat-r2-1.svg',
  'Electronics & Tools': '/categories/cat-r2-2.svg',
  'Hair Care':           '/categories/cat-r2-3.svg',
  'Shoes & Clothes':     '/categories/cat-r2-4.svg',
} as const;

const meta: Meta<typeof CategoryCard> = {
  title: 'Shop/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
  },
  argTypes: {
    label: {
      control: 'select',
      options: Object.keys(PRESETS),
      description: 'Pick a category preset — image is mapped automatically.',
    },
    image: { control: 'text' },
  },
  args: {
    label: 'Beauty & Skin Care',
    image: PRESETS['Beauty & Skin Care'],
  },
  render: ({ label, image }) => (
    <CategoryCard
      label={label}
      image={(PRESETS as Record<string, string>)[label] ?? image}
    />
  ),
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

/** Single card. Use the Controls panel to switch category. */
export const Default: Story = {};

/** Full home grid — 2 rows, horizontal scroll. */
export const Grid: Story = {
  render: () => (
    <div style={{
      width: 375,
      padding: '20px 16px',
      background: '#fff',
      fontFamily: 'var(--font-primary)',
    }}>
      <h2 style={{
        fontSize: 'var(--font-h18-size)',
        fontWeight: 'var(--font-weight-bold)' as never,
        marginBottom: 14,
        color: 'var(--color-text-primary)',
      }}>
        Shop by category
      </h2>
      <div style={{ overflowX: 'auto', scrollbarWidth: 'none' as never }}>
        <div style={{
          display: 'grid',
          gridTemplateRows: 'repeat(2, auto)',
          gridAutoFlow: 'column',
          gridAutoColumns: '92px',
          gap: '16px',
        }}>
          {homeCategories.map((c, i) => (
            <CategoryCard key={i} image={c.image} label={c.label} />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: { layout: 'padded' },
};
