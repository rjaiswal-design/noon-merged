import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryCard } from './CategoryCard';

const meta: Meta<typeof CategoryCard> = {
  title: 'Supermall/CategoryCard',
  component: CategoryCard,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'white', values: [{ name: 'white', value: '#ffffff' }] },
  },
  argTypes: {
    sale: { control: 'boolean' },
    label: { control: 'text' },
    image: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CategoryCard>;

/* ── Single card stories ──────────────────────────────────────────────── */

export const BeautyAndSkinCare: Story = {
  args: {
    image: '/categories/beauty.png',
    label: 'Beauty & Skin Care',
  },
};

export const GroceryAndKitchen: Story = {
  args: {
    image: '/categories/grocery.png',
    label: 'Grocery & Kitchen',
  },
};

export const HomeAppliances: Story = {
  args: {
    image: '/categories/appliances.png',
    label: 'Home Appliances',
    sale: true,
  },
};

export const ToysAndGames: Story = {
  args: {
    image: '/categories/toys.png',
    label: 'Toys & Games',
  },
};

export const ElectronicsAndTools: Story = {
  args: {
    image: '/categories/electronics.png',
    label: 'Electronics & Tools',
  },
};

export const HairCare: Story = {
  args: {
    image: '/categories/haircare.png',
    label: 'Hair Care',
  },
};

export const ShoesAndClothes: Story = {
  args: {
    image: '/categories/shoes.png',
    label: 'Shoes & Clothes',
  },
};

/* ── With SALE badge ──────────────────────────────────────────────────── */
export const WithSaleBadge: Story = {
  args: {
    image: '/categories/appliances.png',
    label: 'Home Appliances',
    sale: true,
  },
};

/* ── Grid — 2 rows, horizontal scroll (matches home page layout) ─────── */
export const CatGrid: Story = {
  render: () => {
    const categories = [
      { image: '/categories/beauty.png',      label: 'Beauty & Skin Care' },
      { image: '/categories/grocery.png',     label: 'Grocery & Kitchen' },
      { image: '/categories/appliances.png',  label: 'Home Appliances', sale: true },
      { image: '/categories/beauty.png',      label: 'Beauty & Skin Care' },
      { image: '/categories/grocery.png',     label: 'Grocery & Kitchen' },
      { image: '/categories/toys.png',        label: 'Toys & Games' },
      { image: '/categories/electronics.png', label: 'Electronics & Tools' },
      { image: '/categories/haircare.png',    label: 'Hair Care' },
      { image: '/categories/shoes.png',       label: 'Shoes & Clothes' },
      { image: '/categories/toys.png',        label: 'Toys & Games' },
    ];

    return (
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
            {categories.map((c, i) => (
              <CategoryCard key={i} image={c.image} label={c.label} sale={c.sale} />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};
