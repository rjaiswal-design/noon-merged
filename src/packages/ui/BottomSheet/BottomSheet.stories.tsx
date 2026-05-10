import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'Primitives/BottomSheet',
  component: BottomSheet,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 375, height: 720, margin: '0 auto', background: '#f4f6fa', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

function Demo({ floating = false, showHandle = true }: { floating?: boolean; showHandle?: boolean }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div style={{ padding: 24 }}>
        <button onClick={() => setOpen(true)}>Open sheet</button>
      </div>
      <BottomSheet open={open} onClose={() => setOpen(false)} floating={floating} showHandle={showHandle}>
        <div style={{ padding: 24, paddingBottom: 32 }}>
          <h3 style={{ margin: 0 }}>Bottom sheet</h3>
          <p style={{ marginTop: 8 }}>Tap the scrim or close to dismiss.</p>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </BottomSheet>
    </>
  );
}

export const Flush: Story = { render: () => <Demo /> };

export const Floating: Story = { render: () => <Demo floating /> };

export const NoHandle: Story = { render: () => <Demo showHandle={false} /> };
