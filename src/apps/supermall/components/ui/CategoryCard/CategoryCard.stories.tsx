import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryCard } from './CategoryCard';
import { homeCategories } from '../../../data/categories';

const meta: Meta<typeof CategoryCard> = {
  title: 'Supermall/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
  },
  argTypes: {
    label: { control: 'text' },
    image: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

/* ── Single card stories ──────────────────────────────────────────────── */
/* All assets are the 92×92 composites used by the live home grid
   (badge baked into the SVG). See src/apps/supermall/data/categories.ts. */

export const BeautyAndSkinCare: Story = {
  args: {
    image: '/categories/cat-r1-1.svg',
    label: 'Beauty & Skin Care',
  },
};

export const GroceryAndKitchen: Story = {
  args: {
    image: '/categories/cat-r1-2.svg',
    label: 'Grocery & Kitchen',
  },
};

export const HomeAppliances: Story = {
  args: {
    image: '/categories/cat-r1-3.svg',
    label: 'Home Appliances',
  },
};

export const ToysAndGames: Story = {
  args: {
    image: '/categories/cat-r2-1.svg',
    label: 'Toys & Games',
  },
};

export const ElectronicsAndTools: Story = {
  args: {
    image: '/categories/cat-r2-2.svg',
    label: 'Electronics & Tools',
  },
};

export const HairCare: Story = {
  args: {
    image: '/categories/cat-r2-3.svg',
    label: 'Hair Care',
  },
};

export const ShoesAndClothes: Story = {
  args: {
    image: '/categories/cat-r2-4.svg',
    label: 'Shoes & Clothes',
  },
};

/* ── Grid — 2 rows, horizontal scroll (matches home page layout) ─────── */
export const CatGrid: Story = {
  render: () => (
    <div style={{
      width: 375,
      padding: '20px 16px',
      background: '#fff',
      fontFamily: 'var(--font-primary)',
    }}>
      <h2 style={{
        fontSize: 'var(--font-h18-size)',
        fontWeight: 'var(--font-weight-bold)' as any,
        marginBottom: 14,
        color: 'var(--color-text-primary)',
      }}>
        Shop by category
      </h2>
      <div style={{
        overflowX: 'auto',
        scrollbarWidth: 'none' as any,
      }}>
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
  parameters: {
    layout: 'padded',
  },
};
