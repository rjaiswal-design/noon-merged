import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageSkeletonGateProps {
  children: ReactNode;
  holdMs?: number;
  fadeMs?: number;
}

export function PageSkeletonGate({ children, holdMs = 420, fadeMs = 220 }: PageSkeletonGateProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), holdMs);
    return () => clearTimeout(t);
  }, [holdMs]);

  return (
    <>
      <motion.div
        className="page-skel-overlay"
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: fadeMs / 1000, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: ready ? 'none' : 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          zIndex: 5,
        }}
      >
        <CenteredSkeleton />
      </motion.div>
      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeMs / 1000, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

function CenteredSkeleton() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        width: 220,
      }}
    >
      <SkelBlock style={{ width: 64, height: 64, borderRadius: 16 }} />
      <SkelBlock style={{ width: 180, height: 12, borderRadius: 6 }} />
      <SkelBlock style={{ width: 140, height: 12, borderRadius: 6 }} />
    </div>
  );
}

function SkelBlock({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#eef0f3',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
          animation: 'page-skel-shimmer 1.4s ease-in-out infinite',
        }}
      />
    </div>
  );
}
