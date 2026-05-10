import type { Meta, StoryObj } from '@storybook/react-vite';
import SkuCard from './SkuCard';

const meta: Meta<typeof SkuCard> = {
  title: 'Wishlist/SkuCard',
  component: SkuCard,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SkuCard>;

export const Default: Story = {};

export const WithBadge: Story = { args: { badge: 'Best seller' } };

export const ExpressToday: Story = { args: { expressVariant: 'today' } };

export const NoDiscount: Story = { args: { discount: undefined, listedPrice: undefined } };
