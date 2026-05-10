import type { Meta, StoryObj } from '@storybook/react-vite';
import { NudgeFlipper } from './NudgeFlipper';

const meta: Meta<typeof NudgeFlipper> = {
  title: 'Commerce/NudgeFlipper',
  component: NudgeFlipper,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, background: '#fff', minWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NudgeFlipper>;

export const Default: Story = {};

export const FastInterval: Story = { args: { interval: 1200 } };

export const Grid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <NudgeFlipper seed={1} />
      <NudgeFlipper seed={2} />
      <NudgeFlipper seed={3} />
      <NudgeFlipper seed={4} />
      <NudgeFlipper seed={5} />
      <NudgeFlipper seed={6} />
    </div>
  ),
};
