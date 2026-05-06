import { useEffect, useRef, useState } from 'react';
import { StatusBar } from '@ui';
import { PageTransition } from '../../components/layout/PageTransition';
import './Account.css';

// `?embedded=1` tells noon-one-flows to hide its own bottom nav and
// post screen-change messages back to this host so we can toggle the
// supermall nav. In the merged app, one-flows lives at /one-flows on
// the same origin, so the iframe can load it directly.
const NOON_ONE_URL = '/one-flows?embedded=1';

// Minimum time the skeleton stays up. Without this, a fast iframe load
// flashes the skeleton for ~50ms which reads as a flicker rather than
// a deliberate transition.
const SKELETON_MIN_MS = 700;
// Hard ceiling — if the iframe never fires `load` (third-party blockers,
// slow network), reveal anyway so the user is never stuck on a skeleton.
const SKELETON_MAX_MS = 1800;

export default function AccountPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    const minT = setTimeout(() => setMinTimeElapsed(true), SKELETON_MIN_MS);
    const maxT = setTimeout(() => setIframeLoaded(true), SKELETON_MAX_MS);
    return () => {
      clearTimeout(minT);
      clearTimeout(maxT);
    };
  }, []);

  const skeletonHidden = iframeLoaded && minTimeElapsed;

  return (
    <PageTransition>
      <div className="account-page">
        <iframe
          src={NOON_ONE_URL}
          title="noon Account"
          className={`account-page__iframe${skeletonHidden ? ' account-page__iframe--ready' : ''}`}
          onLoad={() => {
            const elapsed = Date.now() - mountedAt.current;
            const remaining = Math.max(0, SKELETON_MIN_MS - elapsed);
            setTimeout(() => setIframeLoaded(true), remaining);
          }}
        />
        {/* Neutral chrome-only host silhouette — per docs/INTERACTION_DESIGN.md §2
            ("Iframe boundaries"). The host doesn't know which one-flows screen
            will mount first, so it paints only what's universally true: status
            bar + a single full-bleed content rectangle. The iframe owns its
            own per-screen skeleton from there. */}
        <div className={`account-skeleton${skeletonHidden ? ' account-skeleton--hidden' : ''}`}>
          <div className="account-skeleton__frame">
            <StatusBar tone="dark" />
            <div className="skel-block account-skeleton__body" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
