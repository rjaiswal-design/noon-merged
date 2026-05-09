import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeSkeleton } from '../pages/Home/HomeSkeleton';

type Phase = 'video' | 'skeleton' | 'ready';

const SESSION_KEY = 'noon-splash-played';
const SKELETON_HOLD_MS = 700;
const VIDEO_FALLBACK_MS = 5000;

export function SplashGate({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>(() => {
    if (typeof window === 'undefined') return 'ready';
    return sessionStorage.getItem(SESSION_KEY) === '1' ? 'ready' : 'video';
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (phase !== 'video') return;
    const fallback = window.setTimeout(() => setPhase('skeleton'), VIDEO_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'skeleton') return;
    const t = window.setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, '1');
      setPhase('ready');
    }, SKELETON_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <>
      {children}
      <AnimatePresence>
        {phase !== 'ready' && (
          <motion.div
            key={phase}
            initial={{ opacity: phase === 'video' ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1000,
              background: '#FEEE00',
              overflow: 'hidden',
            }}
          >
            {phase === 'video' ? (
              <video
                ref={videoRef}
                src="/splash.mp4"
                autoPlay
                muted
                playsInline
                preload="auto"
                onEnded={() => setPhase('skeleton')}
                onError={() => setPhase('skeleton')}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <HomeSkeleton />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SplashGate;
