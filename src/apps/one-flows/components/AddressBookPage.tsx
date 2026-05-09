import { useState } from "react";
import StatusBar from "./StatusBar";
import SmoothCorners from "@ui/SmoothCorners";


import { T } from '../lib/dsTokens';
/* ---------- Inline icons ---------- */

function BackChevron({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M12.5 5L7.5 10L12.5 15" stroke={T.color.text.primary} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="6" stroke={T.color.text.muted} strokeWidth="1.5" />
      <path d="M13.5 13.5L17 17" stroke={T.color.text.muted} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PlusIcon({ className="", color = T.color.brand.blueMid }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRight({ className="", color = T.color.text.muted }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M5.5 3.5L9 7L5.5 10.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShareIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M9 12V2.5M9 2.5L6 5.5M9 2.5L12 5.5"
        stroke={T.color.text.heading}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 9.5V14a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5V9.5"
        stroke={T.color.text.heading}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoreVertical({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="9" cy="3.5" r="1.4" fill={T.color.text.heading} />
      <circle cx="9" cy="9" r="1.4" fill={T.color.text.heading} />
      <circle cx="9" cy="14.5" r="1.4" fill={T.color.text.heading} />
    </svg>
  );
}

function BriefcaseIcon({ className="", color = T.color.brand.blue }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill={color} aria-hidden="true">
      <path
        d="M7 4.5h6a1 1 0 0 1 1 1v1h2.5a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 2 15V8a1.5 1.5 0 0 1 1.5-1.5H6v-1a1 1 0 0 1 1-1Zm5.5 2v-.5h-5v.5h5Z"
      />
    </svg>
  );
}

function VerifiedBadge({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill={T.color.verified} />
      <path d="M5 8.2L7 10.2L11.2 6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Address card ---------- */

type Address = {
  id: string;
  label: string;
  /** Distance / time chip — rendered next to the label in blue text. */
  meta?: string;
  /** Tinted: when true, the icon strip uses the blue-soft variant. The
   *  default (false) uses the muted gray-soft variant. */
  primary?: boolean;
  street: string;
  contactName: string;
  phone: string;
  verified?: boolean;
};

function AddressCard({ address }: { address: Address }) {
  const stripBg = address.primary ? T.color.brand.blueScrim : T.color.surface.page;
  const iconColor = address.primary ? T.color.brand.blue : T.color.text.heading;

  return (
    <SmoothCorners
      radius={12}
      className="bg-white rounded-12 overflow-hidden border"
      style={{ borderColor: T.color.border.subtle }}
    >
      {/* Tinted top strip — icon + label + meta + share + more */}
      <div
        className="flex items-center px-3 py-2.5 gap-2"
        style={{ backgroundColor: stripBg }}
      >
        <div className="size-6 flex items-center justify-center shrink-0">
          <BriefcaseIcon className="size-5" color={iconColor} />
        </div>
        <p
          className="font-noontree font-bold text-label-3p"
          style={{ color: T.color.text.deep }}
        >
          {address.label}
        </p>
        {address.meta && (
          <p
            className="font-noontree font-semibold text-label-4p"
            style={{ color: address.primary ? T.color.brand.blueDeep : T.color.text.muted }}
          >
            {address.meta}
          </p>
        )}
        <div className="flex-1" />
        <button
          type="button"
          aria-label="Share address"
          className="size-6 flex items-center justify-center cursor-pointer"
        >
          <ShareIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label="More options"
          className="size-6 flex items-center justify-center cursor-pointer"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>

      {/* Body — street + contact */}
      <div className="px-3 py-3 flex flex-col gap-2">
        <p
          className="font-noontree text-label-3p"
          style={{ color: T.color.text.deep }}
        >
          {address.street}
        </p>
        <div className="flex items-center gap-1.5">
          <p
            className="font-noontree text-label-3"
            style={{ color: T.color.text.body }}
          >
            {address.contactName}, {address.phone}
          </p>
          {address.verified && <VerifiedBadge className="size-3.5 shrink-0" />}
        </div>
      </div>
    </SmoothCorners>
  );
}

/* ---------- Data ---------- */

const ADDRESSES: Address[] = [
  {
    id: "work",
    label: "Work",
    meta: "24 m",
    primary: true,
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
  {
    id: "ayush1",
    label: "Ayush's Dubai Place",
    meta: "24 km",
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
  {
    id: "ayush2",
    label: "Ayush's Dubai Place",
    meta: "24 m",
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
  {
    id: "ayush3",
    label: "Ayush's Dubai Place",
    meta: "24 m",
    street: "Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
    contactName: "Ahmed Ali",
    phone: "+971-50 789 3456",
    verified: true,
  },
];

/* ---------- Screen ---------- */

type Tab = "address" | "locker";

export default function AddressBookPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>("address");
  const [scrolled, setScrolled] = useState(false);

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{ backgroundColor: T.color.surface.page }}
    >
      <StatusBar />

      <div
        className="relative h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
      >
        <div className="w-full pb-10">
          {/* Sticky header */}
          <div
            className={`sticky top-0 z-10 flex items-center gap-[12px] px-[16px] pt-[52px] pb-[12px] w-full transition-[background-color,border-color] duration-150 border-b ${
              scrolled ? "bg-white" : "bg-transparent"
            }`}
            style={{ borderColor: scrolled ? T.color.border.divider : "transparent" }}
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bg-white flex items-center justify-center size-9 rounded-full cursor-pointer shrink-0 border"
              style={{ borderColor: T.color.border.subtle }}
            >
              <BackChevron className="size-5" />
            </button>
            <p
              className="flex-1 font-noontree font-bold text-h18"
              style={{ color: T.color.text.deep }}
            >
              Address book
            </p>
          </div>

          {/* Tab pill — Address / Locker/Pickup.
              Single sliding white thumb that translates between halves —
              avoids the jumpy "two-bg" pattern. Same primitive as the
              CadenceToggle in PlanSelect: absolute thumb with transform
              translateX and a sharp cubic-bezier transition. */}
          <div className="px-4 mt-3">
            <div
              className="relative flex p-1 rounded-full w-full h-11"
              style={{ backgroundColor: T.color.surface.page }}
            >
              {/* Sliding thumb — 50% width minus the 4px track padding. */}
              <div
                aria-hidden="true"
                className="absolute top-1 bottom-1 left-1 rounded-full"
                style={{
                  width: "calc(50% - 4px)",
                  backgroundColor: T.color.surface.canvas,
                  boxShadow:
                    "0 1px 2px rgba(15,15,25,0.06), 0 1px 3px rgba(15,15,25,0.04)",
                  transform:
                    tab === "address" ? "translateX(0%)" : "translateX(100%)",
                  transition: "transform 220ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              />
              <button
                type="button"
                onClick={() => setTab("address")}
                className="relative flex-1 rounded-full font-noontree font-semibold text-label-3p cursor-pointer transition-colors duration-[180ms] z-10"
                style={{
                  color: tab === "address" ? T.color.text.deep : T.color.text.body,
                  backgroundColor: "transparent",
                }}
              >
                Address
              </button>
              <button
                type="button"
                onClick={() => setTab("locker")}
                className="relative flex-1 rounded-full font-noontree font-semibold text-label-3p cursor-pointer transition-colors duration-[180ms] z-10"
                style={{
                  color: tab === "locker" ? T.color.text.deep : T.color.text.body,
                  backgroundColor: "transparent",
                }}
              >
                Locker/ Pickup
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-4 mt-3">
            <SmoothCorners
              radius={12}
              className="bg-white rounded-12 flex items-center gap-2.5 px-3.5 py-3 border"
              style={{ borderColor: T.color.border.subtle }}
            >
              <SearchIcon className="size-4 shrink-0" />
              <input
                type="text"
                placeholder="Search for your building, area..."
                className="flex-1 bg-transparent outline-none font-noontree text-label-3p placeholder:text-[var(--ph)]"
                style={{ color: T.color.text.deep, ["--ph" as string]: T.color.text.muted }}
              />
            </SmoothCorners>
          </div>

          {/* Add new Address row */}
          <div className="px-4 mt-2.5">
            <SmoothCorners
              as="button"
              radius={12}
              className="bg-white rounded-12 flex items-center gap-2.5 px-3.5 py-3 w-full text-left border cursor-pointer"
              style={{ borderColor: T.color.border.subtle }}
            >
              <PlusIcon className="size-5 shrink-0" />
              <p
                className="flex-1 font-noontree font-semibold text-label-3p"
                style={{ color: T.color.brand.blueMid }}
              >
                Add new Address
              </p>
              <ChevronRight className="size-3.5 shrink-0" color={T.color.brand.blueMid} />
            </SmoothCorners>
          </div>

          {/* Address list */}
          <div className="px-4 mt-3 flex flex-col gap-2.5">
            {ADDRESSES.map((addr) => (
              <AddressCard key={addr.id} address={addr} />
            ))}
          </div>
        </div>
      </div>

      {/* iPhone home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>
    </div>
  );
}
