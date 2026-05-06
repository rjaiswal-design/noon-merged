import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import StatusBar from "./StatusBar";

/* ---------- Primitive ---------- */

export function Skel({
  className="",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[#eef0f3] ${className}`}
      style={style}
    >
      <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/55 to-transparent" />
    </div>
  );
}

/* ---------- Gate ---------- */

/**
 * Wraps a screen so the skeleton silhouette shows for `holdMs` after mount,
 * then crossfades to the real children. Real children only mount once
 * `ready=true`, so heavy animations (Lottie etc.) don't start during the
 * fake-load window.
 */
export function SkeletonGate({
  skeleton,
  children,
  holdMs = 380,
  fadeMs = 220,
}: {
  skeleton: ReactNode;
  children: ReactNode;
  holdMs?: number;
  fadeMs?: number;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), holdMs);
    return () => clearTimeout(t);
  }, [holdMs]);

  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: fadeMs / 1000, ease: "easeOut" }}
      >
        {skeleton}
      </motion.div>
      {ready && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: fadeMs / 1000, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}

/* ---------- Shared chrome ---------- */

function PageFrame({
  children,
  bg = "#f4f4f4",
}: {
  children: ReactNode;
  bg?: string;
}) {
  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto rounded-16 overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <StatusBar />
      {children}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>
    </div>
  );
}

function HeaderRow({ titleWidth = 140 }: { titleWidth?: number }) {
  return (
    <div className="flex items-center gap-2 px-4 pt-[52px] pb-3 w-full">
      <Skel className="size-9 rounded-full" />
      <Skel
        className="h-4 rounded-4"
        style={{ width: titleWidth }}
      />
    </div>
  );
}

/* ---------- Per-screen skeletons ---------- */

export function HomeSkeleton() {
  return (
    <PageFrame bg="#f4f4f4">
      <div className="relative flex flex-col gap-4 items-center w-[346px] mx-auto pt-[89px] pb-10">
        {/* Hero — round logo + name + subtitle */}
        <div className="flex flex-col items-center gap-3">
          <Skel className="size-[120px] rounded-full" />
          <Skel className="h-7 w-[200px] rounded-8" />
          <Skel className="h-3.5 w-[180px] rounded-4" />
        </div>
        {/* Current plan card */}
        <Skel className="w-[346px] h-[120px] rounded-12" />
        {/* Savings card */}
        <Skel className="w-[346px] h-[260px] rounded-16" />
        {/* Promo strip */}
        <Skel className="w-[346px] h-[166px] rounded-12" />
        {/* OSN card */}
        <Skel className="w-[346px] h-[139px] rounded-12" />
      </div>
    </PageFrame>
  );
}

export function ManageSkeleton() {
  return (
    <PageFrame bg="#ffffff">
      <HeaderRow titleWidth={170} />
      <div className="flex flex-col items-center gap-6 mt-4">
        {/* Plan block */}
        <Skel className="w-[343px] h-[260px] rounded-16" />
        {/* Payment block */}
        <Skel className="w-[343px] h-[120px] rounded-16" />
        {/* Cancel block */}
        <Skel className="w-[343px] h-[68px] rounded-16" />
      </div>
    </PageFrame>
  );
}

export function ChangePlanSkeleton() {
  return (
    <PageFrame bg="#ffffff">
      <HeaderRow titleWidth={130} />
      <div className="flex flex-col items-center gap-3 mt-2 px-4">
        <Skel className="w-[343px] h-[150px] rounded-16" />
        <Skel className="w-[343px] h-[150px] rounded-16" />
        <Skel className="w-[343px] h-[150px] rounded-16" />
      </div>
      <div className="absolute bottom-10 left-0 right-0 px-4">
        <Skel className="w-full h-[52px] rounded-12" />
      </div>
    </PageFrame>
  );
}

export function CancelSkeleton() {
  return (
    <PageFrame bg="#ffffff">
      <HeaderRow titleWidth={150} />
      <div className="flex flex-col items-center gap-4 mt-2 px-4">
        <Skel className="h-7 w-[280px] rounded-8 mt-2" />
        <Skel className="h-4 w-[300px] rounded-4" />
        <Skel className="h-4 w-60 rounded-4" />
        <Skel className="w-[343px] h-[140px] rounded-16 mt-3" />
        <Skel className="w-[343px] h-[140px] rounded-16" />
      </div>
      <div className="absolute bottom-10 left-0 right-0 px-4 flex flex-col gap-2.5">
        <Skel className="w-full h-[52px] rounded-12" />
        <Skel className="w-full h-[52px] rounded-12" />
      </div>
    </PageFrame>
  );
}

export function PaymentMethodSkeleton() {
  return (
    <PageFrame bg="#f2f2f4">
      {/* Header — back button + title */}
      <div className="absolute left-4 top-11 flex items-center gap-3">
        <Skel className="size-10 rounded-full" />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-14">
        <Skel className="h-5 w-[140px] rounded-4" />
      </div>
      {/* Payment options stack */}
      <div className="absolute left-1/2 -translate-x-1/2 top-28 w-[343px] flex flex-col gap-3">
        <Skel className="w-full h-[180px] rounded-8" />
        <Skel className="w-full h-[52px] rounded-8" />
        <Skel className="w-full h-[52px] rounded-8" />
      </div>
      {/* Sticky bottom bar */}
      <div className="absolute bottom-6 left-0 right-0 px-4">
        <Skel className="w-full h-[60px] rounded-12" />
      </div>
    </PageFrame>
  );
}

export function PostCancelSkeleton() {
  return (
    <PageFrame bg="#f4f4f4">
      <div className="relative flex flex-col gap-4 items-center w-[346px] mx-auto pt-[89px] pb-[100px]">
        {/* Hero */}
        <div className="flex flex-col items-center gap-3">
          <Skel className="size-[120px] rounded-full" />
          <Skel className="h-7 w-[200px] rounded-8" />
          <Skel className="h-3.5 w-[180px] rounded-4" />
        </div>
        {/* Coupon card */}
        <Skel className="w-[346px] h-[280px] rounded-12" />
        {/* Plan card */}
        <Skel className="w-[346px] h-[120px] rounded-12" />
        {/* Savings card */}
        <Skel className="w-[346px] h-[260px] rounded-16" />
        {/* Promo strip */}
        <Skel className="w-[346px] h-[166px] rounded-12" />
        {/* OSN card */}
        <Skel className="w-[346px] h-[139px] rounded-12" />
      </div>
      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 bg-white pt-3.5 pb-3.5 px-4 rounded-tl-12 rounded-tr-12 shadow-[0px_-4px_17.6px_rgba(0,0,0,0.08)]">
        <Skel className="w-full h-[52px] rounded-12" />
        <div className="flex justify-center pt-2.5">
          <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
        </div>
      </div>
    </PageFrame>
  );
}

export function CancelFeedbackSkeleton() {
  return (
    <PageFrame bg="#ffffff">
      <HeaderRow titleWidth={170} />
      <div className="flex flex-col gap-3.5 mt-3 px-5">
        <Skel className="h-6 w-[260px] rounded-8" />
        <Skel className="h-3.5 w-[300px] rounded-4" />
        <div className="flex flex-col mt-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3.5 border-b border-blue-gray-200"
            >
              <Skel
                className="h-3.5 rounded-4"
                style={{ width: 180 + ((i * 23) % 80) }}
              />
              <Skel className="size-5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 px-4">
        <Skel className="w-full h-[52px] rounded-12" />
      </div>
    </PageFrame>
  );
}
