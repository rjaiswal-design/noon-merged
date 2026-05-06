import { Skel } from '@ui';
import './Home.css';

export function HomeSkeleton() {
  return (
    <div className="home-page" aria-hidden="true">
      <section
        className="home-header"
        style={{ background: '#FEEE00', paddingTop: 44 }}
      >
        <div className="home-header__tiles">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skel
              key={i}
              className="rounded-[20px]"
              style={{ width: 76, height: 76, flex: '0 0 76px', background: 'rgba(255,255,255,0.6)' }}
            />
          ))}
        </div>
        <div className="home-header__address">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skel className="rounded-md" style={{ width: 90, height: 14, background: 'rgba(255,255,255,0.7)' }} />
            <Skel className="rounded-md" style={{ width: 220, height: 14, background: 'rgba(255,255,255,0.7)' }} />
          </div>
          <Skel className="rounded-full" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.7)' }} />
        </div>
        <div style={{ padding: '0 16px' }}>
          <Skel className="rounded-xl" style={{ width: '100%', height: 40, background: 'rgba(255,255,255,0.85)' }} />
        </div>
      </section>

      <section className="home-section">
        <Skel className="rounded-md" style={{ width: 180, height: 22, marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '0 0 96px' }}>
              <Skel className="rounded-2xl" style={{ width: 96, height: 96 }} />
              <Skel className="rounded" style={{ width: 80, height: 12 }} />
              <Skel className="rounded-2xl" style={{ width: 96, height: 96 }} />
              <Skel className="rounded" style={{ width: 60, height: 12 }} />
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <Skel className="rounded-md" style={{ width: 220, height: 22, marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skel key={i} className="rounded-full" style={{ width: 92, height: 32 }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '0 0 160px' }}>
              <Skel className="rounded-2xl" style={{ width: 160, height: 160 }} />
              <Skel className="rounded" style={{ width: 140, height: 14 }} />
              <Skel className="rounded" style={{ width: 90, height: 14 }} />
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <Skel className="rounded-md" style={{ width: 160, height: 22, marginBottom: 14 }} />
        <div style={{ display: 'flex', gap: 12, overflow: 'hidden' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skel key={i} className="rounded-2xl" style={{ flex: '0 0 280px', height: 140 }} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeSkeleton;
