import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { WishlistHeart } from './WishlistHeart';

const meta: Meta<typeof WishlistHeart> = {
  title: 'Commerce/WishlistHeart',
  component: WishlistHeart,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/NtO68xcecXgIGaZ3wX02zU/noon-React-app?node-id=52-6663',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: '#dadde3', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WishlistHeart>;

export const Idle: Story = { args: { wishlisted: false } };

export const Wishlisted: Story = { args: { wishlisted: true } };

export const Interactive: Story = {
  render: () => {
    const [wishlisted, setWishlisted] = useState(false);
    return <WishlistHeart wishlisted={wishlisted} onToggle={setWishlisted} />;
  },
};
