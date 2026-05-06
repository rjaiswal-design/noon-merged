import blobImg from "../assets/collection/empty/blob.png";
import pebble1 from "../assets/collection/empty/pebble-1.png";
import pebble2 from "../assets/collection/empty/pebble-2.png";
import paperAirplane from "../assets/collection/empty/paper-airplane.svg";
import heartMini from "../assets/collection/empty/heart-mini.svg";
import trendingDown from "../assets/collection/empty/trending-down.svg";
import plusCircle from "../assets/collection/empty/plus-circle.svg";

function Illustration() {
  return (
    <div className="relative h-[132px] w-[167px] shrink-0">
      {/* Stones cluster (bottom-right) */}
      <div className="absolute right-4 top-8 h-[101.96px] w-[130.18px]">
        {/* Big blob (back) */}
        <img
          src={blobImg}
          alt=""
          aria-hidden
          className="absolute left-5 top-0 block h-20 w-20 object-contain"
        />
        {/* Small pebble (front-left) */}
        <div className="absolute left-0 top-[58.26px] size-11 overflow-hidden rounded-full">
          <img
            src={pebble1}
            alt=""
            aria-hidden
            className="block size-full object-cover"
          />
        </div>
        {/* Medium pebble (front-right) */}
        <div className="absolute left-20 top-9 size-[50.98px] overflow-hidden rounded-full">
          <img
            src={pebble2}
            alt=""
            aria-hidden
            className="block size-full object-cover"
          />
        </div>
      </div>

      {/* Paper-airplane chip (right side) */}
      <div
        className="absolute -right-px top-1.5 flex items-center justify-center bg-border-bold p-2"
        style={{
          borderRadius: "39.765px 39.765px 39.765px 3.314px",
        }}
      >
        <span className="flex size-6 -rotate-45 items-center justify-center">
          <img
            src={paperAirplane}
            alt=""
            aria-hidden
            className="block h-2.5 w-3"
          />
        </span>
      </div>

      {/* Heart chip (left, small) */}
      <div
        className="absolute right-[124.43px] top-1.5 flex items-center justify-center bg-border-bold p-1"
        style={{
          borderRadius: "18.08px 18.08px 18.08px 1.507px",
        }}
      >
        <span className="flex size-2.5 items-center justify-center">
          <img
            src={heartMini}
            alt=""
            aria-hidden
            className="block h-1.5 w-1.5"
          />
        </span>
      </div>

      {/* Trending-down chip (left, larger) */}
      <div
        className="absolute right-[136.07px] top-12 flex items-center justify-center bg-border-bold p-2"
        style={{
          borderRadius: "29.776px 29.776px 29.776px 2.481px",
        }}
      >
        <span className="flex size-5 items-center justify-center">
          <img
            src={trendingDown}
            alt=""
            aria-hidden
            className="block h-2.5 w-4"
          />
        </span>
      </div>
    </div>
  );
}

export type CollectionEmptyStateProps = {
  onStartAdding?: () => void;
};

export default function CollectionEmptyState({
  onStartAdding,
}: CollectionEmptyStateProps) {
  return (
    <div className="flex w-full flex-col items-center gap-6 font-primary">
      <Illustration />
      <p className="w-60 text-center font-primary text-b16 font-normal text-text-primary">
        Organise, share and get notified for price drops
      </p>
      <button
        type="button"
        onClick={onStartAdding}
        className="flex h-12 w-[211px] items-center justify-center gap-2 rounded-xl bg-surface-action-bold px-6 py-4"
      >
        <span className="flex size-5 items-center justify-center">
          <img
            src={plusCircle}
            alt=""
            aria-hidden
            className="block size-4"
          />
        </span>
        <span className="font-primary text-b16 font-semibold text-text-on-surface-bold">
          Start adding items
        </span>
      </button>
    </div>
  );
}
