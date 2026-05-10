import type { Meta, StoryObj } from '@storybook/react-vite';
import { Squircle } from './Squircle';

const meta: Meta<typeof Squircle> = {
  title: 'Primitives/Squircle (share-address)',
  component: Squircle,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Squircle>;

export const Default: Story = {
  args: {
    cornerRadius: 24,
    cornerSmoothing: 0.6,
    style: { width: 200, height: 200, background: '#0076ff' },
  },
};

export const WithBorder: Story = {
  args: {
    cornerRadius: 16,
    cornerSmoothing: 0.6,
    borderColor: '#0076ff',
    borderWidth: 2,
    style: { width: 200, height: 200, background: '#fff' },
  },
};

export const HighSmoothing: Story = {
  args: {
    cornerRadius: 32,
    cornerSmoothing: 1,
    style: { width: 220, height: 220, background: '#fed700' },
  },
};
