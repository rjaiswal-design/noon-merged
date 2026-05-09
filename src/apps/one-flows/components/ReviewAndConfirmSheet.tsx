import SmoothCorners from "@ui/SmoothCorners";
import applePayLogo from "../assets/apple-pay.svg";

const AED_GLYPH = "";

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

function SparkleIcon({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 1.5l1.4 4.6L14 7.5l-4.6 1.4L8 13.5l-1.4-4.6L2 7.5l4.6-1.4L8 1.5z"
        fill="#108757"
      />
      <circle cx="13" cy="3" r="0.8" fill="#108757" />
      <circle cx="3" cy="12.5" r="0.8" fill="#108757" />
    </svg>
  );
}

function CalendarIcon({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="3"
        width="13"
        height="11.5"
        rx="2.2"
        stroke="#8A8A8A"
        strokeWidth="1.2"
      />
      <line x1="1.5" y1="6.2" x2="14.5" y2="6.2" stroke="#8A8A8A" strokeWidth="1.2" />
      <line
        x1="5"
        y1="1.5"
        x2="5"
        y2="4.5"
        stroke="#8A8A8A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="1.5"
        x2="11"
        y2="4.5"
        stroke="#8A8A8A"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="#475067"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type ConfirmPlanId = "bundle" | "annual";

const PLAN_DETAILS: Record<
  ConfirmPlanId,
  {
    name: string;
    price: string;
    cadence: string;
    trialDays?: number;
    refund?: string;
    ctaLabel: string;
  }
> = {
  bundle: {
    name: "One & OSN+ Bundle",
    price: "143.88",
    cadence: "renew every year",
    trialDays: 15,
    refund: "12.44",
    ctaLabel: "Start 15 days trial",
  },
  annual: {
    name: "One Annual",
    price: "143.88",
    cadence: "renew every year",
    refund: "12.44",
    ctaLabel: "Confirm upgrade",
  },
};

export default function ReviewAndConfirmSheet({
  planId,
  open,
  onClose,
  onConfirm,
}: {
  planId: ConfirmPlanId;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const plan = PLAN_DETAILS[planId];

  return (
    <>
      {/* Backdrop — dims the screen behind the sheet, dismisses on tap */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-200 z-30 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-label="Review and confirm plan change"
        className={`absolute bottom-0 left-0 right-0 z-40 bg-[#f5f5f7] rounded-t-[20px] flex flex-col transition-transform duration-200 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-2.5 pb-1.5">
          <div className="bg-bluegray-400 h-1 w-9 rounded-full" />
        </div>

        {/* Title */}
        <p className="font-bold text-[#0e0e0e] text-h16 text-center pb-4">
          Review and confirm
        </p>

        <div className="px-4 pb-4 flex flex-col gap-4">
          {/* Upcoming plan card */}
          <SmoothCorners
            radius={16}
            className="bg-white rounded-16 border-[1.5px] border-blue-gray-300 overflow-hidden flex flex-col"
          >
            {/* Green-tinted top label */}
            <div
              className="px-4 pt-3.5 pb-2.5 flex items-center gap-1.5"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(229,250,236,1) 0%, rgba(229,250,236,0) 100%)",
              }}
            >
              <SparkleIcon className="size-4 shrink-0" />
              <p className="font-bold text-green-600 text-label-3p">
                Upcoming plan
              </p>
            </div>

            {/* Plan body */}
            <div className="px-4 pb-4 pt-1.5 flex flex-col gap-3">
              <p className="font-bold text-blue-gray-900 text-h18">
                {plan.name}
              </p>
              <div className="h-px w-full border-t border-dashed border-blue-gray-300" />
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-4 shrink-0" />
                <p className="font-noontree text-blue-gray-700 text-label-4p">
                  Starts on xx-xx-xx at <Aed />
                  {plan.price} & {plan.cadence}
                </p>
              </div>
            </div>
          </SmoothCorners>

          {/* Refund info box */}
          {plan.refund && (
            <SmoothCorners
              radius={12}
              className="bg-white rounded-12 border-[1.5px] border-blue-gray-300 p-3"
            >
              <p className="font-noontree text-blue-gray-700 text-b12">
                <span className="font-bold text-blue-gray-900">Refund:</span> You
                will get a pro-rated refund of <Aed />
                {plan.refund} for your current plan after you upgrade.
              </p>
            </SmoothCorners>
          )}
        </div>

        {/* Bottom action row */}
        <div className="px-4 pb-5 pt-2 flex items-center gap-3 border-t border-blue-gray-300 bg-white">
          {/* Apple Pay + masked PAN */}
          <div className="flex items-center gap-2 shrink-0 pt-2">
            <div className="size-8 flex items-center justify-center shrink-0">
              <img
                src={applePayLogo}
                alt="Apple Pay"
                className="block h-5 w-auto max-w-none"
              />
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                className="flex items-center gap-0.5 text-tiny text-blue-gray-700 cursor-pointer"
              >
                Pay with
                <ChevronDown className="size-2.5" />
              </button>
              <p className="font-bold text-blue-gray-900 text-label-3">
                ****2006
              </p>
            </div>
          </div>

          {/* Confirm CTA */}
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 bg-black text-white font-bold text-b14 rounded-12 py-3 cursor-pointer mt-2"
          >
            {plan.ctaLabel}
          </button>
        </div>
      </div>
    </>
  );
}
