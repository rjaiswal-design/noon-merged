import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundations/Tokens/Typography',
  parameters: { backgrounds: { default: 'white' }, layout: 'padded' },
};

export default meta;
type Story = StoryObj;

const HEADING = ['h40', 'h32', 'h28', 'h24', 'h20', 'h18', 'h16'];
const BODY = ['b16', 'b14', 'b12', 'b11'];
const ACTION = ['a17', 'a16', 'a14', 'a12'];
const LABEL = ['label-2', 'label-3', 'label-3p', 'label-4', 'label-4p', 'label-5'];

const SAMPLE = 'The quick brown fox jumps over the lazy dog 0123';

function Group({ title, scale }: { title: string; scale: string[] }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 12, fontWeight: 600, marginBottom: 16, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: 1 }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {scale.map((token) => (
          <div key={token} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', alignItems: 'baseline', gap: 16 }}>
            <code style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{token}</code>
            <div className={`text-${token}`} style={{ color: 'var(--color-text-primary)' }}>{SAMPLE}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const Scale: Story = {
  render: () => (
    <div>
      <Group title="Heading" scale={HEADING} />
      <Group title="Body" scale={BODY} />
      <Group title="Action" scale={ACTION} />
      <Group title="Label" scale={LABEL} />
    </div>
  ),
};
