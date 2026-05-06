import { useEffect, useRef, useState } from "react";
import StatusBar from "./StatusBar";

// Where the noon-reviews-2-prototype Expo web build lives. In dev it's
// the local Metro bundler; in prod it's the deployed Vercel project.
// (Production URL is left as a placeholder until the Expo app is
// deployed — once it is, swap the literal here.)
const NOON_REVIEWS_URL =
  import.meta.env.DEV
    ? "http://localhost:5182/"
    : "https://noon-reviews-2-prototype.vercel.app/";

const SKELETON_MIN_MS = 600;
const SKELETON_MAX_MS = 2000;

export default function NoonReviewsFrame({ onBack }: { onBack: () => void }) {
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

  const ready = iframeLoaded && minTimeElapsed;

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{ backgroundColor: "#f9f9fb" }}
    >
      <StatusBar />

      {/* Floating back chip — anchors top-left under the status bar so
          the user always has a way out of the Expo flow without relying
          on its own UI. */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Back"
        className="absolute top-12 left-3 z-30 size-9 rounded-full bg-white border flex items-center justify-center cursor-pointer"
        style={{
          borderColor: "#eaecf0",
          boxShadow: "0 4px 12px rgba(15,15,25,0.08)",
        }}
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
          <path
            d="M10 3 5 8l5 5"
            stroke="#101628"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <iframe
        src={NOON_REVIEWS_URL}
        title="noon Reviews"
        className="absolute inset-0 w-full h-full border-0"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 220ms ease-out",
          background: "#f9f9fb",
        }}
        onLoad={() => {
          const elapsed = Date.now() - mountedAt.current;
          const remaining = Math.max(0, SKELETON_MIN_MS - elapsed);
          setTimeout(() => setIframeLoaded(true), remaining);
        }}
      />

      {/* Lightweight loading state while the Expo bundle warms up.
          Same shimmer treatment as the supermall skeleton — keeps the
          transition feeling continuous. */}
      {!ready && (
        <div className="absolute inset-0 pt-20 px-4 flex flex-col gap-3 pointer-events-none">
          <div className="h-11 rounded-12 skel-shimmer" />
          <div className="h-[120px] rounded-16 skel-shimmer" />
          <div className="h-40 rounded-16 skel-shimmer" />
          <div className="h-40 rounded-16 skel-shimmer" />
        </div>
      )}

      <style>{`
        .skel-shimmer {
          background: linear-gradient(
            90deg,
            #f2f3f7 0%, #eaecf0 50%, #f2f3f7 100%
          );
          background-size: 200% 100%;
          animation: noon-reviews-skel 1.2s ease-in-out infinite;
        }
        @keyframes noon-reviews-skel {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
