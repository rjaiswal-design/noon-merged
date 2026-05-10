import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skel, SkeletonGate } from './Skeleton';

const meta: Meta = {
  title: 'Primitives/Skeleton',
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj;

export const SkelBlock: Story = {
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Skel className="rounded-md" style={{ height: 16, width: '70%' }} />
      <Skel className="rounded-md" style={{ height: 16, width: '90%' }} />
      <Skel className="rounded-md" style={{ height: 16, width: '50%' }} />
      <Skel className="rounded-md" style={{ height: 120, width: '100%', marginTop: 12 }} />
    </div>
  ),
};

export const Gate: Story = {
  render: () => {
    const [ready, setReady] = useState(false);
    return (
      <div style={{ width: 320, height: 160, position: 'relative', border: '1px dashed #ccc', borderRadius: 8 }}>
        <SkeletonGate
          ready={ready}
          skeleton={
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Skel className="rounded-md" style={{ height: 14, width: '60%' }} />
              <Skel className="rounded-md" style={{ height: 14, width: '85%' }} />
              <Skel className="rounded-md" style={{ height: 80, width: '100%', marginTop: 8 }} />
            </div>
          }
        >
          <div style={{ padding: 16 }}>
            <h3 style={{ margin: 0 }}>Loaded!</h3>
            <p>Children appear after holdMs and `ready=true`.</p>
          </div>
        </SkeletonGate>
        <button
          onClick={() => setReady((r) => !r)}
          style={{ position: 'absolute', top: -32, right: 0 }}
        >
          ready={String(ready)}
        </button>
      </div>
    );
  },
};
