import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavBar } from './NavBar';
import { SearchIcon, HeartOutline, ShareIcon } from '../icons';

const meta: Meta<typeof NavBar> = {
  title: 'Surface/NavBar',
  component: NavBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'overlay'] },
    title: { control: 'text' },
  },
  args: {
    variant: 'solid',
    title: 'Make up products',
    onBack: () => window.history.back(),
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Solid: Story = {
  args: {
    variant: 'solid',
    title: 'Make up products',
    actions: [
      { icon: <SearchIcon size={24} color="var(--grey-900)" />, label: 'Search' },
    ],
  },
};

export const Overlay: Story = {
  args: {
    variant: 'overlay',
    actions: [
      { icon: <SearchIcon size={20} />, label: 'Search' },
      { icon: <HeartOutline size={20} />, label: 'Wishlist' },
      { icon: <ShareIcon size={20} />, label: 'Share' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 300, background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)' }}>
        <Story />
      </div>
    ),
  ],
};

export const NoActions: Story = {
  args: {
    variant: 'solid',
    title: 'Settings',
    actions: [],
  },
};

export const LongTitle: Story = {
  args: {
    variant: 'solid',
    title: 'Electronics & Mobile Accessories with Free Shipping',
    actions: [
      { icon: <SearchIcon size={24} color="var(--grey-900)" />, label: 'Search' },
    ],
  },
};
