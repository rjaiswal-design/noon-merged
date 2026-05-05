import type { Meta, StoryObj } from '@storybook/react-vite';
import SmoothCorners from './SmoothCorners';

const meta: Meta<typeof SmoothCorners> = {
  title: 'Primitives/SmoothCorners',
  component: SmoothCorners,
  argTypes: {
    radius: { control: { type: 'range', min: 0, max: 60, step: 1 } },
    smoothing: { control: { type: 'range', min: 0, max: 1, step: 0.05 } },
  },
  args: { radius: 20, smoothing: 0.6 },
};

export default meta;
type Story = StoryObj<typeof SmoothCorners>;

const Tile = ({ label }: { label: string }) => (
  <div
    style={{
      width: 200,
      height: 200,
      background: 'var(--color-surface-action-bold, #0076FF)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <SmoothCorners {...args}>
      <Tile label={`r=${args.radius}`} />
    </SmoothCorners>
  ),
};

export const RadiusComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      {[8, 16, 24, 32, 48].map((r) => (
        <div key={r} style={{ textAlign: 'center' }}>
          <SmoothCorners radius={r}>
            <Tile label={`${r}px`} />
          </SmoothCorners>
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-text-secondary)' }}>radius {r}</div>
        </div>
      ))}
    </div>
  ),
};
