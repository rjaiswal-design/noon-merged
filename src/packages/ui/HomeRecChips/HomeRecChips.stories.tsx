import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { HomeRecChips } from './HomeRecChips';

const sampleChips = [
  { label: 'For you',     icon: '/icon-chip-foryou.svg' },
  { label: 'Electronics', icon: '/icon-chip-electronics.svg' },
  { label: 'Beauty',      icon: '/icon-chip-beauty.svg' },
  { label: 'Fashion',     icon: '/icon-chip-fashion.svg' },
  { label: 'Home',        icon: '/icon-chip-home.svg' },
] as const;

const meta: Meta<typeof HomeRecChips> = {
  title: 'Commerce/HomeRecChips',
  component: HomeRecChips,
  parameters: {
    docs: {
      description: {
        component:
          'Vertical icon-above-label chips used by the Home → Recommended for you tablist. Single-select; the active chip shows a gradient pill + brand-blue underline.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, padding: 16, background: 'var(--color-surface-primary, #fff)' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HomeRecChips>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<typeof sampleChips[number]['label']>('For you');
    return (
      <HomeRecChips
        chips={sampleChips}
        activeKey={active}
        onChange={(key) => setActive(key)}
        ariaLabel="Recommended categories"
      />
    );
  },
};

export const ElectronicsActive: Story = {
  args: {
    chips: sampleChips,
    activeKey: 'Electronics',
    ariaLabel: 'Recommended categories',
  },
};

export const TwoChips: Story = {
  args: {
    chips: sampleChips.slice(0, 2),
    activeKey: 'For you',
    ariaLabel: 'Recommended categories',
  },
};

export const Overflowing: Story = {
  args: {
    chips: [
      ...sampleChips,
      { label: 'Toys',    icon: '/icon-chip-foryou.svg' },
      { label: 'Sports',  icon: '/icon-chip-electronics.svg' },
      { label: 'Grocery', icon: '/icon-chip-beauty.svg' },
    ],
    activeKey: 'For you',
    ariaLabel: 'Recommended categories',
  },
};
