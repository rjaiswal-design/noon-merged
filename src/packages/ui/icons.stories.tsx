import type { Meta, StoryObj } from '@storybook/react-vite';
import * as IconSet from './icons';

const meta: Meta = {
  title: 'Foundations/Icons',
  parameters: { backgrounds: { default: 'white' } },
};

export default meta;
type Story = StoryObj;

export const Gallery: Story = {
  render: () => {
    const entries = Object.entries(IconSet) as [string, React.FC<{ size?: number; color?: string }>][];
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: 16,
          padding: 16,
        }}
      >
        {entries.map(([name, Icon]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16,
              border: '1px solid var(--color-border-subtle, #EAECF0)',
              borderRadius: 12,
              gap: 12,
              background: '#fff',
            }}
          >
            <Icon size={28} color="var(--color-text-primary, #101628)" />
            <code style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{name}</code>
          </div>
        ))}
      </div>
    );
  },
};
