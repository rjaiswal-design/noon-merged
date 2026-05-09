import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";
import SlotNumber from "./SlotNumber";
import deliveryIllustration from "../assets/cancel/delivery-illustration.png";
import dealsIllustration from "../assets/cancel/deals-illustration.png";
import sneaker from "../assets/cancel/sneaker.png";
import pringles from "../assets/cancel/pringles.png";
import laptop from "../assets/cancel/laptop.png";
import perfume from "../assets/cancel/perfume.png";

/* ---------- Inline icons ---------- */

function BackChevron({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.5 5L7.5 10L12.5 15"
        stroke="#0E0E0E"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tiny lightning bolt for the "Coming up in 7 days" pill. */
function LightningBolt({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 12"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.4 0.5L0.7 6.5h3.3l-.7 4.5 4.7-6h-3.3l.7-4.5z"
        fill="#F65555"
      />
    </svg>
  );
}

/** Tiny green sparkle for the "you'll lose savings" pill. */
function Sparkle({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 0L4.8 3.2L8 4L4.8 4.8L4 8L3.2 4.8L0 4L3.2 3.2L4 0Z"
        fill="#108757"
      />
    </svg>
  );
}

/** Dirham (AED) glyph from the Noontree font (PUA U+E001). */
const AED_GLYPH = "";

function Aed({ className="" }: { className?: string }) {
  return (
    <span
      aria-label="AED"
      className={`font-noontree tracking-[0] inline-block align-baseline mr-[2px] ${className}`}
    >
      {AED_GLYPH}
    </span>
  );
}

/* ---------- Sub-blocks ---------- */

function BenefitCallout({
  illustration,
  label,
  amount,
}: {
  illustration: string;
  label: React.ReactNode;
  amount: string;
}) {
  return (
    <SmoothCorners
      radius={17}
      className="bg-white border border-blue-gray-200 flex-1 h-[118px] relative overflow-hidden rounded-16"
    >
      <div className="absolute left-3 top-3 right-3 flex flex-col gap-2.5">
        <p className="font-medium text-bluegray-800 text-b14">
          {label}
        </p>
        <p className="font-noontree font-bold text-bluegray-800 text-h20">
          <Aed />
          {amount}
        </p>
      </div>
      {/* Illustration peeks from bottom-right; positioned slightly past the
          card edge so it crops on the corner like the Figma render. */}
      <img
        src={illustration}
        alt=""
        className="absolute -right-1 -bottom-1 size-20 object-contain pointer-events-none"
      />
    </SmoothCorners>
  );
}

function ProductTile({ src }: { src: string }) {
  return (
    <SmoothCorners
      radius={10}
      className="bg-blue-gray-100 border-[1.2px] border-blue-gray-200 rounded-8 size-[68px] relative overflow-hidden shrink-0"
    >
      <img
        src={src}
        alt=""
        className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] object-contain pointer-events-none"
      />
    </SmoothCorners>
  );
}

/* ---------- Screen ---------- */

export default function CancelMembership({
  onBack,
  onKeepMembership,
  onContinueCancellation,
}: {
  onBack: () => void;
  onKeepMembership: () => void;
  onContinueCancellation: () => void;
}) {
  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{
        backgroundImage:
          "linear-gradient(180deg, #ffffff 31%, #f3f3f5 100%)",
      }}
    >
      <StatusBar />

      {/* Back button — floats top-left */}
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="absolute left-3.5 top-[59px] z-20 bg-white border border-blue-gray-200 flex items-center justify-center p-2 rounded-16 cursor-pointer"
      >
        <BackChevron className="size-5" />
      </button>

      {/* Scrollable content area — leaves room at the bottom for the fixed
          action bar (~158px). */}
      <div className="absolute inset-0 pt-28 pb-[180px] overflow-y-auto">
        <div className="px-3.5 flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-0.5">
            <p className="font-noontree font-bold text-bluegray-800 text-h28">
              You saved <Aed />
              <SlotNumber value={343} height={31} shimmer />
            </p>
            <p className="font-noontree text-blue-gray-600 text-h16">
              that's more than what you paid for
            </p>
          </div>

          {/* Two benefit callout cards */}
          <div className="flex gap-3 items-center">
            <BenefitCallout
              illustration={deliveryIllustration}
              label={
                <>
                  16 free &amp; fast
                  <br />
                  deliveries
                </>
              }
              amount="300"
            />
            <BenefitCallout
              illustration={dealsIllustration}
              label={
                <>
                  Member-only
                  <br />
                  deals &amp; offers
                </>
              }
              amount="43"
            />
          </div>

          {/* One Day Sale card */}
          <SmoothCorners
            radius={16}
            className="bg-white border border-blue-gray-200 rounded-16 w-full p-4 flex flex-col gap-3"
          >
            {/* Header row — title + "Coming up in 7 days" pill */}
            <div className="flex items-center justify-between">
              <p className="font-bold text-h18">
                <span className="text-blue-gray-900">One Day</span>
                <span className="text-blue-gray-1000"> Sale</span>
              </p>
              <div
                className="flex items-center gap-1 pl-2 pr-2.5 py-1 rounded-32"
                style={{
                  backgroundImage:
                    "linear-gradient(90.28deg, #ffd7d7 0%, #ffffff 95%)",
                }}
              >
                <LightningBolt className="w-3 h-3.5 shrink-0" />
                <p className="font-noontree font-medium text-black text-label-4p whitespace-nowrap">
                  Coming up in 7 days
                </p>
              </div>
            </div>

            {/* Product strip */}
            <div className="flex items-center justify-between">
              <ProductTile src={sneaker} />
              <ProductTile src={pringles} />
              <ProductTile src={laptop} />
              <ProductTile src={perfume} />
            </div>

            {/* Cashback line */}
            <p
              className="font-noontree font-bold text-h16"
              style={{ fontFeatureSettings: "'case' 1" }}
            >
              <span className="text-green-600">10% cashback </span>
              <span className="text-bluegray-800">
                up to <Aed />75{" "}
              </span>
            </p>

            {/* "You'll lose 10% savings" pill */}
            <div
              className="self-start flex items-center gap-1 pl-2 pr-2.5 py-1 rounded-32"
              style={{
                backgroundImage:
                  "linear-gradient(90.7deg, #edfef0 1.7%, #ffffff 94.3%)",
              }}
            >
              <Sparkle className="size-2 shrink-0" />
              <p className="font-noontree font-medium text-blue-gray-1000 text-label-4p">
                You'll lose <span className="font-bold">10% savings</span> on
                every order if you go now.
              </p>
            </div>
          </SmoothCorners>

          {/* Support pill */}
          <SmoothCorners
            radius={39}
            className="bg-bluegray-50 flex items-center px-3 py-1.5 rounded-32 w-full"
          >
            <p className="font-medium text-bluegray-800 text-b12">
              We're here to help with your membership.{" "}
              <span className="text-blue-700">Contact support</span>
            </p>
          </SmoothCorners>
        </div>
      </div>

      {/* Bottom fixed action bar */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-white pt-3 pb-4 px-4 flex flex-col gap-3 rounded-tl-12 rounded-tr-12"
        style={{ boxShadow: "0px -4px 17.6px rgba(0, 0, 0, 0.1)" }}
      >
        <button
          type="button"
          onClick={onKeepMembership}
          className="bg-blue-gray-1000 text-white font-semibold text-b14 h-[52px] rounded-12 cursor-pointer"
        >
          Keep membership
        </button>
        <button
          type="button"
          onClick={onContinueCancellation}
          className="bg-blue-gray-100 border border-blue-gray-300 text-[#0e0e0e] font-semibold text-b14 h-[52px] rounded-12 cursor-pointer"
        >
          Continue Cancellation
        </button>
        {/* iPhone home indicator */}
        <div className="flex justify-center pt-2">
          <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
        </div>
      </div>
    </div>
  );
}
