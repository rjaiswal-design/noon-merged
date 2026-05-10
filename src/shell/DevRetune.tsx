import { lazy, Suspense } from 'react';

// Retune is a runtime design-tuning overlay (~500 KB minified). It only
// makes sense during development; we lazy-import behind import.meta.env.DEV
// so the chunk is dropped from production builds entirely.
interface DevRetuneProps {
  port?: number;
  hotkey?: string;
  fidelity?: 'minimal' | 'standard' | 'full';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  force?: boolean;
}

const LazyRetune = import.meta.env.DEV
  ? lazy(async () => ({ default: (await import('retune')).Retune }))
  : null;

export function DevRetune(props: DevRetuneProps = {}) {
  if (!LazyRetune) return null;
  return (
    <Suspense fallback={null}>
      <LazyRetune {...props} />
    </Suspense>
  );
}
