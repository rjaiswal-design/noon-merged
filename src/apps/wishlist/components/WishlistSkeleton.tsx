import { Skel } from "@ui";

function CollectionCardSkeleton({ width }: { width: number }) {
  return (
    <div className="flex shrink-0 flex-col items-start gap-2">
      <Skel className="h-[120px] rounded-2xl" style={{ width }} />
      <Skel className="h-3 w-20 rounded" />
      <Skel className="h-3 w-12 rounded" />
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-1.5 overflow-hidden rounded-12 border-[0.75px] border-surface-tertiary bg-surface-primary p-1.5">
      <Skel className="aspect-[3/4.1] w-full rounded-[10px]" />
      <Skel className="h-3 w-full rounded" />
      <Skel className="h-3 w-3/4 rounded" />
      <Skel className="h-4 w-1/2 rounded" />
      <Skel className="h-4 w-2/3 rounded" />
      <Skel className="h-9 w-full rounded-lg" />
    </div>
  );
}

export default function WishlistSkeleton() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-surface-primary">
      {/* Status-bar gap */}
      <div className="h-12 shrink-0" />

      {/* Header skeleton: back, title, create CTA */}
      <div className="flex h-14 shrink-0 items-center gap-3 px-4 py-2">
        <Skel className="size-10 rounded-full" />
        <Skel className="h-5 w-24 rounded" />
        <div className="ml-auto" />
        <Skel className="h-9 w-20 rounded-full" />
      </div>

      {/* Horizontal collections row */}
      <div className="flex shrink-0 items-end gap-5 overflow-hidden px-4 pt-4">
        <CollectionCardSkeleton width={200} />
        <CollectionCardSkeleton width={140} />
        <CollectionCardSkeleton width={120} />
      </div>

      {/* "All Saved Items" header row */}
      <div className="flex shrink-0 items-center justify-between px-4 pb-3 pt-8">
        <Skel className="h-5 w-32 rounded" />
        <Skel className="h-7 w-16 rounded-full" />
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-2 gap-3.5 px-4 pt-3">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
