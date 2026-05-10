import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import SlotNumber from './SlotNumber';

const meta: Meta<typeof SlotNumber> = {
  title: 'OneFlows/SlotNumber',
  component: SlotNumber,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'system-ui' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SlotNumber>;

export const Default: Story = { args: { value: 1234 } };

export const WithSeparator: Story = { args: { value: '12,500' } };

export const WithShimmer: Story = { args: { value: 999, shimmer: true } };

export const Replay: Story = {
  render: () => {
    const [value, setValue] = useState(1234);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
        <SlotNumber key={value} value={value} />
        <button onClick={() => setValue(Math.floor(Math.random() * 99999))}>Randomize</button>
      </div>
    );
  },
};
