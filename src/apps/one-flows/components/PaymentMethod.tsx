import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";
import AddNewCardSheet from "./AddNewCardSheet";
import visaLogo from "../assets/visa-logo.png";
import mastercardLogo from "../assets/mastercard-logo.png";
import amexLogo from "../assets/amex-logo.png";
import stcPayLogo from "../assets/stc-pay-logo.png";
import applePayBadge from "../assets/apple-pay-badge.png";

/* ---------- Inline icons ---------- */

function BackChevron({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15 6L9 12L15 18"
        stroke="#0E0E0E"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className="" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      className={`block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 4v10M4 9h10"
        stroke="#0076ff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Selected radio — blue ring with white inner dot, matches Figma. */
function RadioSelected({ className="" }: { className?: string }) {
  return (
    <div
      className={`size-[18px] rounded-full border-[5px] border-[#0076ff] bg-white shrink-0 ${className}`}
    />
  );
}

function RadioUnselected({ className="" }: { className?: string }) {
  return (
    <div
      className={`size-[18px] rounded-full border-[1.5px] border-[#989fb3] bg-white shrink-0 ${className}`}
    />
  );
}

/* ---------- Sub-components ---------- */

/** Top section header with back button + centred title. */
function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="absolute left-0 right-0 top-11 flex items-center px-4 z-10">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back"
        className="bg-white border-[1.25px] border-[#e3e3e3] flex items-center justify-center size-10 rounded-full cursor-pointer shrink-0"
      >
        <BackChevron className="size-5" />
      </button>
      <p className="absolute left-1/2 -translate-x-1/2 font-semibold text-black text-h16">
        Payment Method
      </p>
    </div>
  );
}

/** Selected debit/credit card row + auto-renew tag + add-new-card row. */
function DebitCard({ onAddNewCard }: { onAddNewCard: () => void }) {
  const [cvv, setCvv] = useState("");

  return (
    <SmoothCorners
      radius={8}
      className="bg-white border border-blue-100 rounded-8 w-full flex flex-col gap-4 pb-4 pl-3"
    >
      {/* Section title with subtle bottom hairline */}
      <div className="border-b border-[rgba(56,102,223,0.2)] flex items-center py-3 w-[341px]">
        <p className="font-semibold text-blue-gray-900 text-label-3p">
          Debit/Credit Card
        </p>
      </div>

      {/* Selected card row + CVV input */}
      <div className="flex gap-2 items-center w-[317px]">
        <RadioSelected />
        <div className="flex-1 flex items-center justify-between min-w-0">
          <div className="flex gap-1 items-center">
            <img
              src={visaLogo}
              alt="Visa"
              className="block h-4 w-7 object-contain"
            />
            <p className="font-['Proxima_Nova:Regular',sans-serif] text-[6px] tracking-[1px] text-[rgba(38,42,51,0.8)]">
              ●●●●
            </p>
            <p className="font-semibold text-label-3p text-[rgba(38,42,51,0.8)]">
              7074
            </p>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            className="border-[0.556px] border-bluegray-400 rounded-8 h-7 w-12 text-center font-bold text-b12 text-blue-gray-900 placeholder:text-[rgba(153,153,153,0.5)] outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Auto-renew info chip */}
      <div className="bg-blue-50 flex items-center justify-between rounded-8 px-3 py-2 w-[317px]">
        <p className="text-b12 text-[rgba(14,14,14,0.92)]">
          <span className="font-medium">Auto renews monthly at</span>
          <span className="font-bold"> $24.99</span>
        </p>
      </div>

      {/* Dashed separator */}
      <div className="w-[317px] border-t border-dashed border-blue-gray-300" />

      {/* Add New Card row */}
      <button
        type="button"
        onClick={onAddNewCard}
        className="flex items-center justify-between w-[317px] cursor-pointer"
      >
        <div className="flex gap-2 items-center">
          <PlusIcon className="size-4" />
          <p className="text-blue-gray-900 text-label-3p">
            Add New Card
          </p>
        </div>
        <div className="flex gap-2 items-center h-5">
          <img
            src={visaLogo}
            alt="Visa"
            className="block h-4 w-7 object-contain"
          />
          <img
            src={mastercardLogo}
            alt="Mastercard"
            className="block h-3.5 w-5 object-contain"
          />
          <img
            src={amexLogo}
            alt="American Express"
            className="block size-4 object-cover rounded-4"
          />
        </div>
      </button>
    </SmoothCorners>
  );
}

/** "Add Mobile Number" row with stc Pay logo. */
function AddMobileNumberCard() {
  return (
    <SmoothCorners
      radius={8}
      className="bg-white border-[1.074px] border-[rgba(38,42,51,0.1)] rounded-8 w-full flex items-center px-3 py-4"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-2 items-center">
          <PlusIcon className="size-4" />
          <p className="text-blue-gray-900 text-label-3p">
            Add Mobile Number
          </p>
        </div>
        <img
          src={stcPayLogo}
          alt="stc Pay"
          className="block h-5 w-7 rounded-4 object-cover"
        />
      </div>
    </SmoothCorners>
  );
}

/** Apple Pay row — unselected radio + label + Pay badge. */
function ApplePayCard() {
  return (
    <SmoothCorners
      radius={8}
      className="bg-white border-[1.074px] border-[rgba(38,42,51,0.1)] rounded-8 w-full flex items-center px-3 py-4"
    >
      <div className="flex flex-1 items-center justify-between min-w-0">
        <div className="flex gap-2 items-center">
          <RadioUnselected />
          <p className="text-blue-gray-900 text-label-3p">
            Apple Pay
          </p>
        </div>
        <img
          src={applePayBadge}
          alt="Pay"
          className="block h-5 w-8 object-contain"
        />
      </div>
    </SmoothCorners>
  );
}

/* ---------- Screen ---------- */

export default function PaymentMethod({
  onBack,
  onPay,
}: {
  onBack: () => void;
  onPay?: () => void;
}) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="bg-blue-gray-200 relative w-[375px] h-[812px] mx-auto rounded-16 overflow-hidden">
      <StatusBar />
      <Header onBack={onBack} />

      {/* Payment options stack — top-aligned 113px from the top per Figma */}
      <div className="absolute left-1/2 -translate-x-1/2 top-28 w-[343px] flex flex-col gap-3 items-end">
        <DebitCard onAddNewCard={() => setSheetOpen(true)} />
        <AddMobileNumberCard />
        <ApplePayCard />
      </div>

      {/* Sticky bottom bar with Pay CTA + home indicator */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-stretch z-20">
        <div className="bg-white flex flex-col items-center p-4 rounded-tl-16 rounded-tr-16">
          <button
            type="button"
            onClick={onPay}
            className="bg-black text-white font-semibold text-h16 h-[60px] w-full rounded-12 cursor-pointer"
          >
            Pay $24.99
          </button>
        </div>
        <div className="bg-white h-6 flex justify-center items-center">
          <div className="bg-blue-gray-900 h-1 w-[124px] rounded-8" />
        </div>
      </div>

      {/* Add New Card bottom sheet — overlays this screen */}
      <AddNewCardSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAddCard={() => setSheetOpen(false)}
      />
    </div>
  );
}
