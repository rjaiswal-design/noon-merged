import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundations/Tokens/Colors',
  parameters: { backgrounds: { default: 'white' }, layout: 'padded' },
};

export default meta;
type Story = StoryObj;

const PALETTES = {
  Grey:        ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'].map((s) => `--grey-${s}`),
  Supermall:   ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'].map((s) => `--supermall-${s}`),
  'Brand Blue':['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'].map((s) => `--brand-blue-${s}`),
  Emerald:     ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'].map((s) => `--emerald-${s}`),
  Neutral:     ['--neutral-white', '--neutral-black'],
};

const SEMANTIC_GROUPS = {
  Text: ['primary', 'secondary', 'tertiary', 'muted', 'action', 'supermall', 'error', 'warning', 'success'].map(
    (k) => `--color-text-${k}`,
  ),
  Surface: ['primary', 'secondary', 'tertiary', 'muted', 'action-subtle', 'action-bold', 'action-extrabold',
    'supermall-subtle', 'supermall-bold', 'error-subtle', 'error-bold', 'warning-subtle', 'warning-bold',
    'success-subtle', 'success-bold'].map((k) => `--color-surface-${k}`),
  Border: ['primary', 'subtle', 'medium', 'bold', 'extrabold', 'action', 'supermall', 'error', 'warning', 'success'].map(
    (k) => `--color-border-${k}`,
  ),
};

function Swatch({ token }: { token: string }) {
  const value = `var(${token})`;
  return (
    <div style={{ minWidth: 96 }}>
      <div
        style={{
          height: 64,
          background: value,
          borderRadius: 8,
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      />
      <div style={{ marginTop: 6, fontSize: 11, color: 'var(--color-text-secondary)' }}>
        <code>{token}</code>
      </div>
    </div>
  );
}

function Row({ title, tokens }: { title: string; tokens: string[] }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: 'var(--color-text-primary)' }}>{title}</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {tokens.map((t) => (
          <Swatch key={t} token={t} />
        ))}
      </div>
    </section>
  );
}

export const Base: Story = {
  render: () => (
    <div>
      {Object.entries(PALETTES).map(([title, tokens]) => (
        <Row key={title} title={title} tokens={tokens} />
      ))}
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div>
      {Object.entries(SEMANTIC_GROUPS).map(([title, tokens]) => (
        <Row key={title} title={title} tokens={tokens} />
      ))}
    </div>
  ),
};
