import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import type { Tab } from './BottomNav';

const meta: Meta<typeof BottomNav> = {
  title: 'Surface/BottomNav',
  component: BottomNav,
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 120, background: 'var(--color-surface-primary, #fff)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'fullscreen', backgrounds: { default: 'app' } },
  argTypes: {
    activeTab: { control: 'inline-radio', options: ['home', 'categories', 'deals', 'profile', 'cart'] },
    showDeals: { control: 'boolean' },
    cartCount: { control: { type: 'number', min: 0, max: 99 } },
  },
  args: { activeTab: 'home', showDeals: true, cartCount: 0 },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Home: Story = {};

export const Categories: Story = { args: { activeTab: 'categories' } };

export const Deals: Story = { args: { activeTab: 'deals' } };

export const Profile: Story = { args: { activeTab: 'profile' } };

export const Cart: Story = { args: { activeTab: 'cart', cartCount: 3 } };

export const NoDeals: Story = {
  name: 'Show Deals = false',
  args: { activeTab: 'home', showDeals: false },
};

export const Interactive: Story = {
  render: () => {
    const [tab, setTab] = useState<Tab>('home');
    return <BottomNav activeTab={tab} onTabChange={setTab} cartCount={2} />;
  },
};
