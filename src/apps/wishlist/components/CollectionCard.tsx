function Mini56({ image, tiltClass }: { image?: string; tiltClass: string }) {
  return (
    <div className={"flex-none" + tiltClass}>
      <div className="relative size-14 overflow-hidden rounded-12 bg-surface-primary shadow-[0px_0px_8.96px_0px_rgba(0,0,0,0.06)]">
        <div className="absolute left-0.5 top-0.5 size-[51.52px] overflow-hidden rounded-8">
          <div aria-hidden className="absolute inset-0 rounded-8 bg-white" />
          {image ? (
            <img
              src={image}
              alt=""
              aria-hidden
              className="absolute inset-0 size-full rounded-4 object-cover"
            />
          ) : (
            <div className="absolute inset-0 rounded-4 bg-surface-tertiary" />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-8 shadow-[inset_0px_0px_7.36px_0px_rgba(0,0,0,0.06)]"
          />
        </div>
      </div>
    </div>
  );
}

function Mini64({ image }: { image?: string }) {
  return (
    <div className="relative size-16 overflow-hidden rounded-12 bg-surface-primary shadow-[0px_0px_10.24px_0px_rgba(0,0,0,0.06)]">
      <div className="absolute left-0.5 top-0.5 size-[58.88px] overflow-hidden rounded-8">
        <div aria-hidden className="absolute inset-0 rounded-8 bg-white" />
        {image ? (
          <img
            src={image}
            alt=""
            aria-hidden
            className="absolute inset-0 size-full rounded-4 object-cover"
          />
        ) : (
          <div className="absolute inset-0 rounded-4 bg-surface-tertiary" />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-8 shadow-[inset_0px_0px_8.411px_0px_rgba(0,0,0,0.06)]"
        />
      </div>
    </div>
  );
}

export type CollectionAssets = {
  back?: string;
  middle?: string;
  front: string;
};

export type CollectionCardProps = {
  name: string;
  itemCount: number;
  assets: CollectionAssets;
  onClick?: () => void;
};

export default function CollectionCard({
  name,
  itemCount,
  assets,
  onClick,
}: CollectionCardProps) {
  const Wrapper: any = onClick ? "button" : "div";

  return (
    <Wrapper
      onClick={onClick}
      type={onClick ? "button" : undefined}
      className="relative flex h-[140px] w-32 shrink-0 flex-col items-center gap-2 overflow-hidden rounded-12 border border-surface-tertiary bg-surface-secondary px-3 pb-3 pt-4 font-primary"
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-1 w-6 -translate-x-1/2 rounded-b-md bg-border-bold shadow-[0px_4px_32px_32px_#ffffff]"
      />

      <div className="relative flex h-[68px] w-[102px] shrink-0 items-center justify-center">
        {assets.back ? (
          <div className="order-3 -ml-12 flex size-[66.42px] items-center justify-center">
            <Mini56 image={assets.back} tiltClass="rotate-12" />
          </div>
        ) : null}
        {assets.middle ? (
          <div className="order-1 flex size-[66.42px] items-center justify-center">
            <Mini56 image={assets.middle} tiltClass="-rotate-12" />
          </div>
        ) : null}
        <div className={"order-2" + (assets.middle ? "-ml-12" : "")}>
          <Mini64 image={assets.front} />
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-0.5 text-center">
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-primary text-b14 font-bold text-text-primary">
          {name}
        </p>
        <p className="w-[88px] font-primary text-b12 font-normal text-text-muted">
          {itemCount === 1 ? "1 Item" : `${itemCount} Items`}
        </p>
      </div>
    </Wrapper>
  );
}
