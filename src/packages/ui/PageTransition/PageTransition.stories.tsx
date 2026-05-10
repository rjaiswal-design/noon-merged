import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { PageTransition, backState } from './PageTransition';

const meta: Meta = {
  title: 'Primitives/PageTransition',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

function Page({ title, color, links }: { title: string; color: string; links: { to: string; label: string; back?: boolean }[] }) {
  const navigate = useNavigate();
  return (
    <PageTransition>
      <div style={{ background: color, height: '100%', padding: 24, color: '#fff' }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 16 }}>
          {links.map((l) => (
            <button key={l.to} onClick={() => navigate(l.to, l.back ? { state: backState() } : undefined)}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}

export const Demo: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 375, height: 600, margin: '0 auto', overflow: 'hidden', border: '1px solid #ccc' }}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Page title="Page A" color="#0076ff" links={[{ to: '/b', label: 'Forward → B' }]} />} />
          <Route path="/b" element={<Page title="Page B" color="#0a4f4a" links={[{ to: '/c', label: 'Forward → C' }, { to: '/', label: '← Back to A', back: true }]} />} />
          <Route path="/c" element={<Page title="Page C" color="#fed700" links={[{ to: '/b', label: '← Back to B', back: true }]} />} />
        </Routes>
      </MemoryRouter>
    </div>
  ),
};
