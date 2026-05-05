import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { AddToCart } from './AddToCart';

const meta: Meta<typeof AddToCart> = {
  title: 'Commerce/AddToCart',
  component: AddToCart,
  parameters: { backgrounds: { default: 'white' } },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddToCart>;

export const Idle: Story = {
  args: { count: 0, onAdd: () => {}, onRemove: () => {} },
};

export const WithOne: Story = {
  args: { count: 1, onAdd: () => {}, onRemove: () => {} },
};

export const WithMany: Story = {
  args: { count: 4, onAdd: () => {}, onRemove: () => {} },
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <AddToCart
        count={count}
        onAdd={() => setCount((c) => c + 1)}
        onRemove={() => setCount((c) => Math.max(0, c - 1))}
      />
    );
  },
};
