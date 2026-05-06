import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

function RightChevron({ className="", color }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M5.5 3.5L9 7L5.5 10.5"
        stroke={color ?? T.color.text.muted}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CopyIcon({ className="", color = T.color.text.heading }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <rect x="4.5" y="4.5" width="8" height="9" rx="1.5" stroke={color} strokeWidth="1.4" />
      <path d="M3 11V3a1 1 0 0 1 1-1h7" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MessagesIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M3 8.4c0-2.43 2.69-4.4 6-4.4s6 1.97 6 4.4-2.69 4.4-6 4.4a7.6 7.6 0 0 1-2.07-.28L4.5 14V11.4A4.06 4.06 0 0 1 3 8.4Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M9 2.4a6.6 6.6 0 0 0-5.61 10.05L2.4 16l3.66-.96A6.6 6.6 0 1 0 9 2.4Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M6.5 6.4c0 2.4 2.7 5.1 5.1 5.1l.9-.9-1.3-.7-.6.6c-.7-.1-1.7-1.1-1.8-1.8l.6-.6-.7-1.3-.9.9c-.5 0-1.3-.3-1.3-1.3Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="13" height="9" rx="1.5" stroke="white" strokeWidth="1.4" />
      <path d="M3 5.5L9 10l6-4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreShareIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="4.5" cy="9" r="1.4" fill="white" />
      <circle cx="9" cy="9" r="1.4" fill="white" />
      <circle cx="13.5" cy="9" r="1.4" fill="white" />
    </svg>
  );
}

function PaperPlaneIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M14 2L1.5 7.2c-.4.2-.4.7 0 .9L6 9.5l1.4 4.2c.1.4.7.5.9.1L14 2Z"
        stroke={T.color.text.body}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M14 2L6 9.5" stroke={T.color.text.body} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CancelXIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
        stroke={T.color.text.muted}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ShieldCheckIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`block ${className}`} fill="none" aria-hidden="true">
      <path
        d="M10 1.7L3.3 4v5.7c0 4.1 2.9 7.5 6.7 8.7 3.8-1.2 6.7-4.6 6.7-8.7V4L10 1.7Z"
        fill={T.color.brand.greenSoft}
        stroke={T.color.brand.green}
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M7 10.2L9 12.2L13 7.8"
        stroke={T.color.brand.green}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={`block ${className}`} fill="none" aria-hidden="true">
      <path d="M7 2.5V11.5M2.5 7H11.5" stroke={T.color.text.muted} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MoreIcon({ className="" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`block ${className}`} fill="none" aria-hidden="true">
      <circle cx="3.5" cy="8" r="1.2" fill={T.color.text.muted} />
      <circle cx="8" cy="8" r="1.2" fill={T.color.text.muted} />
      <circle cx="12.5" cy="8" r="1.2" fill={T.color.text.muted} />
    </svg>
  );
}

const AED_GLYPH = "\uE001";
function Aed({ className="" }: { className?: string }) {
  return (
    <span aria-label="AED" className={`font-noontree tracking-[0] inline-block align-baseline mr-[2px] ${className}`}>
      {AED_GLYPH}
    </span>
  );
}

/* ---------- Member row ---------- */

type Member = {
  id: string;
  name: string;
  email: string;
  joined: string; // "Joined 12 Mar"
  initial: string;
  color: string;
  isOwner?: boolean;
};

function MemberRow({ member, onMore }: { member: Member; onMore?: () => void }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className="size-9 rounded-full flex items-center justify-center font-noontree font-bold text-white text-label-3 shrink-0"
        style={{ backgroundColor: member.color }}
      >
        {member.initial}
      </div>
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-noontree font-semibold text-label-3p truncate" style={{ color: T.color.text.heading }}>
            {member.name}
          </p>
          {member.isOwner && (
            <span
              className="font-noontree font-semibold text-tiny leading-none px-1.5 py-0.5 rounded-4 whitespace-nowrap"
              style={{ backgroundColor: T.color.brand.greenSoft, color: T.color.brand.green }}
            >
              Owner
            </span>
          )}
        </div>
        <p className="font-noontree text-label-4p truncate" style={{ color: T.color.text.muted }}>
          {member.email} · {member.joined}
        </p>
      </div>
      {!member.isOwner && (
        <button
          type="button"
          onClick={onMore}
          aria-label="More"
          className="size-7 rounded-full flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: T.color.surface.subtle }}
        >
          <MoreIcon className="size-4" />
        </button>
      )}
    </div>
  );
}

/* ---------- Pending invite row (Apple/Spotify pattern) ---------- *
 * Visible distinct from Empty seat: an invite link has been generated but
 * not yet accepted. Shows time-since-sent + remaining expiry window, plus a
 * "Revoke" affordance. */
type PendingInvite = {
  id: string;
  sentTo?: string;
  sentAt: string; // "Sent 2h ago"
  expiresIn: string; // "Expires in 5d"
};

function PendingInviteRow({
  invite,
  onRevoke,
  onResend,
}: {
  invite: PendingInvite;
  onRevoke?: () => void;
  onResend?: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      {/* Avatar — same size + shape as active-member rows so the list keeps
          its rhythm. Soft slate bg + paper-plane glyph signals "in flight"
          without the warning-yellow fill. The "Pending" tag and amber clock
          have been retired — one quiet signal is enough. */}
      <div
        className="size-9 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: T.color.surface.subtle }}
      >
        <PaperPlaneIcon className="size-3.5" />
      </div>

      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <p className="font-noontree font-semibold text-label-3p truncate" style={{ color: T.color.text.heading }}>
          {invite.sentTo ?? "Invitation sent"}
        </p>
        <p className="font-noontree text-label-4p truncate" style={{ color: T.color.text.muted }}>
          Invited {invite.sentAt.replace(/^Sent /, "")} · {invite.expiresIn.replace(/^Expires in /, "")} left
        </p>
      </div>

      {/* Single primary action (text link). Revoke is a quiet 'x' tap target
          on the far right — no doubled-up chip + dots menu. */}
      <button
        type="button"
        onClick={onResend}
        className="font-noontree font-semibold text-label-3 leading-none px-0.5 cursor-pointer"
        style={{ color: T.color.brand.green }}
      >
        Resend
      </button>
      <button
        type="button"
        onClick={onRevoke}
        aria-label="Cancel invite"
        className="size-7 flex items-center justify-center cursor-pointer"
      >
        <CancelXIcon className="size-3" />
      </button>
    </div>
  );
}

function EmptySeatRow({ onInvite }: { onInvite?: () => void }) {
  return (
    <button
      type="button"
      onClick={onInvite}
      className="flex items-center gap-3 py-3 w-full text-left cursor-pointer"
    >
      <div
        className="size-9 rounded-full flex items-center justify-center shrink-0 border-[1.5px] border-dashed"
        style={{ borderColor: "#d0d5dd" }}
      >
        <PlusIcon className="size-3.5" />
      </div>
      <div className="flex-1 flex flex-col gap-0.5">
        <p className="font-noontree font-semibold text-label-3p" style={{ color: T.color.text.muted }}>
          Empty seat
        </p>
        <p className="font-noontree text-label-4p" style={{ color: T.color.text.muted }}>
          Tap to copy invite link
        </p>
      </div>
      <span
        className="font-noontree font-semibold text-b12 px-3 py-1.5 rounded-8 whitespace-nowrap"
        style={{ backgroundColor: T.color.brand.greenSoft, color: T.color.brand.green }}
      >
        Invite
      </span>
    </button>
  );
}

/* ---------- ConfirmSheet (Field DS bottom-sheet pattern, 1109:34267) ----------
 *
 * The reusable confirmation sheet across the cancel/remove flows. Matches
 * the Field DS spec exactly:
 *
 *   ┌─ floating card on subtle gray bg, full rounded-16, 12px from the
 *   │  screen edges (sides + bottom), p-12
 *   │
 *   │  [<]   Centered title (Noontree Bold 18)   [·]
 *   │
 *   │  ┌─── description container ───┐
 *   │  │ subtle scrim + thin border  │
 *   │  │ description text            │
 *   │  └─────────────────────────────┘
 *   │
 *   │  [ Cancel ]    [ Destructive ]   ← side-by-side, equal width
 *   └─
 *
 * Cancel is the white outlined left button; the destructive action is
 * filled red on the right. Both rounded-12, h-52, 15px semibold. The
 * back-arrow in the header doubles as a dismiss affordance, matching the
 * floating Cancel button. */
function ConfirmSheet({
  open,
  title,
  body,
  cancelLabel = "Cancel",
  confirmLabel,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  body: React.ReactNode;
  cancelLabel?: string;
  confirmLabel: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim — covers the iPhone frame, dismisses on tap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="absolute inset-0 z-30 bg-black/40 rounded-16"
          />
          {/* Floating sheet — slides up from below. Wrapper handles the
              positioning + slide animation; inner card carries the gray
              surface + content. */}
          <motion.div
            initial={{ y: "120%" }}
            animate={{ y: 0 }}
            exit={{ y: "120%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340, mass: 0.85 }}
            className="absolute left-3 right-3 bottom-5 z-40"
            style={{ filter: "drop-shadow(0 12px 32px rgba(15,15,25,0.18))" }}
          >
            <div
              className="rounded-16 flex flex-col gap-3 pt-3 px-3 pb-4"
              style={{ backgroundColor: T.color.surface.subtle }}
            >
              {/* Header — back-arrow (left) · title (center) · invisible
                  spacer (right) so the title stays visually centered. */}
              <div className="flex items-center justify-between h-6 w-full">
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Dismiss"
                  className="size-6 rounded-12 bg-white flex items-center justify-center cursor-pointer shrink-0"
                >
                  <BackChevron className="size-4" />
                </button>
                <p
                  className="font-noontree font-bold text-h18 text-center"
                  style={{ color: T.color.text.deep }}
                >
                  {title}
                </p>
                <div className="size-6 opacity-0 shrink-0" aria-hidden="true" />
              </div>

              {/* Body — description sits in a contained scrim card with a
                  hairline border, mirroring the Field DS treatment. */}
              <div
                className="rounded-12 p-3 border w-full"
                style={{
                  backgroundColor: T.color.surface.scrim50,
                  borderColor: T.color.border.subtle,
                }}
              >
                <p
                  className="font-noontree text-b14"
                  style={{ color: T.color.text.strong }}
                >
                  {body}
                </p>
              </div>

              {/* Action bar — side-by-side equal-width buttons. Cancel is
                  the white outlined left, Destructive is filled red on
                  the right (Red/700 #de1c1c per Field DS tokens). */}
              <div className="flex gap-3 items-stretch w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 h-[52px] rounded-12 cursor-pointer font-noontree font-semibold text-b14 bg-white border"
                  style={{ borderColor: T.color.border.divider, color: "rgba(2,6,12,0.92)" }}
                >
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="flex-1 h-[52px] rounded-12 cursor-pointer font-noontree font-semibold text-b14 text-white"
                  style={{ backgroundColor: "#de1c1c" }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------- Remove member confirmation — wraps ConfirmSheet ---------- */
function RemoveSheet({
  open,
  member,
  onClose,
  onConfirm,
}: {
  open: boolean;
  member: Member | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmSheet
      open={open && member !== null}
      title={`Remove ${member?.name ?? "member"}`}
      body={
        <>
          {member?.name ?? "This member"} will lose noon One access
          immediately. They can{"'"}t rejoin any plan for 30 days.
        </>
      }
      cancelLabel="Cancel"
      confirmLabel="Remove"
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

/* ---------- Data ---------- */

const OWNER: Member = {
  id: "rahul",
  name: "Rahul Jaiswal",
  email: "rjaiswal@noon.com",
  joined: "Plan owner",
  initial: "R",
  color: "#3D5BFF",
  isOwner: true,
};

const ALL_MEMBERS: Member[] = [
  { id: "aria", name: "Aria K", email: "aria.k@gmail.com", initial: "A", color: "#FF6FA3", joined: "Joined 12 Mar" },
  { id: "moh", name: "Mohammed S", email: "moh.s@hotmail.com", initial: "M", color: "#7B47E0", joined: "Joined 22 Mar" },
];

/* ---------- Screen ---------- */

export default function ManageMembers({
  onBack,
  onSwitchPlan,
  onCancelled,
  tier = "family",
}: {
  onBack: () => void;
  /** Owner taps "Switch to {other tier} Plan" — should land them in PlanSelect. */
  onSwitchPlan?: () => void;
  /** Fired after the cancel confirmation sheet is confirmed — App resets state and routes home. */
  onCancelled?: () => void;
  tier?: "duo" | "family";
}) {
  const seats = tier === "duo" ? 2 : 5;
  const totalPrice = tier === "duo" ? "39.99" : "54.99";
  const planName = tier === "duo" ? "Duo Plan" : "Family Plan";
  const tone = tier === "duo"
    ? { soft: T.color.accent.duoSoft, ink: T.color.accent.duo }
    : { soft: T.color.accent.familySoft, ink: T.color.accent.family };

  // Seed members + pending invites so the demo shows the full lifecycle.
  // Duo: owner + 0 accepted + 1 pending = 1/2 filled, 1 in-flight, 0 empty.
  // Family: owner + 2 accepted + 1 pending = 3/5 filled, 1 in-flight, 1 empty.
  const [members, setMembers] = useState<Member[]>(() =>
    tier === "duo" ? [] : ALL_MEMBERS.slice(0, 2),
  );
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>(() =>
    tier === "duo"
      ? [{ id: "p1", sentTo: "alex@gmail.com", sentAt: "Sent 2h ago", expiresIn: "Expires in 6d" }]
      : [{ id: "p1", sentTo: "jay@gmail.com", sentAt: "Sent 1d ago", expiresIn: "Expires in 6d" }],
  );
  const [scrolled, setScrolled] = useState(false);
  const [removingMember, setRemovingMember] = useState<Member | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((curr) => (curr === msg ? null : curr)), 2400);
  };

  const filled = 1 + members.length; // owner + accepted members (pending don't count toward filled)
  const inFlight = pendingInvites.length;
  const empty = Math.max(0, seats - filled - inFlight);

  const inviteLink = `noon.com/one/join/${tier === "duo" ? "duo-7f3a" : "fam-9c2b"}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(inviteLink);
    showToast("Link copied");
  };

  const handleShare = (channel: "wa" | "msg" | "mail" | "copy" | "more") => {
    navigator.clipboard?.writeText(inviteLink);
    const msgs: Record<typeof channel, string> = {
      wa: "Opening WhatsApp…",
      msg: "Opening Messages…",
      mail: "Opening Mail…",
      copy: "Link copied",
      more: "Opening share sheet…",
    };
    showToast(msgs[channel]);
  };

  const handleResend = () => {
    navigator.clipboard?.writeText(inviteLink);
    showToast("Invite resent");
  };

  return (
    <div
      className="relative w-[375px] h-[812px] mx-auto overflow-hidden rounded-16"
      style={{ backgroundImage: "linear-gradient(180deg, #ffffff 31%, #f3f3f5 100%)" }}
    >
      <StatusBar />

      <div
        className="relative h-full overflow-y-auto"
        onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 4)}
      >
        <div className="w-full pb-7">
          {/* Sticky header */}
          <div
            className={`sticky top-0 z-10 flex items-center gap-[8px] px-[18px] pt-[52px] pb-[12px] w-full transition-[background-color,border-color] duration-150 border-b ${
              scrolled ? "bg-white" : "bg-transparent"
            }`}
            style={{ borderColor: scrolled ? T.color.border.divider : "transparent" }}
          >
            <button
              type="button"
              onClick={onBack}
              aria-label="Go back"
              className="bg-white flex items-center justify-center p-2 rounded-16 cursor-pointer shrink-0 border"
              style={{ borderColor: "#f2f3f7" }}
            >
              <BackChevron className="size-5" />
            </button>
            <p className="flex-1 font-bold text-h16" style={{ color: T.color.text.primary }}>
              Manage members
            </p>
          </div>

          {/* Plan summary card — header strip is a visual zone */}
          <div className="px-4 mt-3">
            <SmoothCorners radius={16} className="bg-white border-[1.5px] rounded-16 overflow-hidden" style={{ borderColor: T.color.border.hairline }}>
              <div
                className="flex items-center justify-between px-4 py-3.5"
                style={{ backgroundColor: tone.soft }}
              >
                <div className="flex flex-col gap-0.5">
                  <p className="font-noontree font-semibold text-b12" style={{ color: tone.ink }}>
                    {planName}
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <Aed className="text-b14" />
                    <p className="font-bold text-h18" style={{ color: T.color.text.heading }}>
                      {totalPrice}
                    </p>
                    <p className="font-noontree text-b12" style={{ color: T.color.text.muted }}>/month</p>
                  </div>
                </div>
                {/* Seat counter pill */}
                <div className="flex items-center gap-1.5 bg-white rounded-full px-2.5 py-1.5">
                  <div className="flex -space-x-1">
                    {Array.from({ length: seats }).map((_, i) => (
                      <div
                        key={i}
                        className="size-2.5 rounded-full border border-white"
                        style={{ backgroundColor: i < filled ? tone.ink : "#e0e3eb" }}
                      />
                    ))}
                  </div>
                  <p className="font-noontree font-semibold text-b11" style={{ color: T.color.text.heading }}>
                    {filled}/{seats}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-3">
                <svg viewBox="0 0 14 14" className="size-3 shrink-0" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke={T.color.text.muted} strokeWidth="1.2" />
                  <path d="M7 4v3.5M7 9.5v.01" stroke={T.color.text.muted} strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <p className="font-noontree text-b11" style={{ color: T.color.text.muted }}>
                  Each member has their own account · only you are billed
                </p>
              </div>
            </SmoothCorners>
          </div>

          {/* Invite link card — multi-channel share row (Apple Family pattern) */}
          <div className="px-4 mt-4">
            <SmoothCorners radius={16} className="bg-white border-[1.5px] rounded-16 p-4 flex flex-col gap-3.5" style={{ borderColor: T.color.border.hairline }}>
              <div className="flex items-center justify-between">
                <p className="font-noontree font-semibold text-b12" style={{ color: T.color.text.muted }}>
                  Invite link
                </p>
                <p className="font-noontree text-b11" style={{ color: T.color.text.muted }}>
                  Single use · expires in 7 days
                </p>
              </div>

              <div
                className="flex items-center gap-2.5 rounded-12 px-3 py-2.5"
                style={{ backgroundColor: T.color.surface.subtle }}
              >
                <p
                  className="flex-1 font-noontree text-label-3 truncate"
                  style={{ color: T.color.text.heading }}
                >
                  noon.com/one/join/{tier === "duo" ? "duo-7f3a" : "fam-9c2b"}
                </p>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy invite link"
                  className="size-8 rounded-8 bg-white flex items-center justify-center cursor-pointer border shrink-0"
                  style={{ borderColor: T.color.border.divider }}
                >
                  <CopyIcon className="size-3.5" />
                </button>
              </div>

              {/* Multi-channel share row — discrete buttons per channel */}
              <div className="grid grid-cols-5 gap-2">
                {([
                  { key: "wa" as const, label: "WhatsApp", bg: "#25D366", icon: <WhatsAppIcon className="size-4" /> },
                  { key: "msg" as const, label: "Messages", bg: "#3CD757", icon: <MessagesIcon className="size-4" /> },
                  { key: "mail" as const, label: "Mail", bg: "#3D5BFF", icon: <MailIcon className="size-4" /> },
                  { key: "copy" as const, label: "Copy", bg: T.color.text.heading, icon: <CopyIcon className="size-4" color="white" /> },
                  { key: "more" as const, label: "More", bg: "#666d85", icon: <MoreShareIcon className="size-4" /> },
                ]).map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => handleShare(c.key)}
                    className="flex flex-col items-center gap-1.5 cursor-pointer"
                    aria-label={`Share via ${c.label}`}
                  >
                    <div
                      className="size-11 rounded-12 flex items-center justify-center"
                      style={{ backgroundColor: c.bg }}
                    >
                      {c.icon}
                    </div>
                    <p className="font-noontree font-medium text-tiny" style={{ color: T.color.text.body }}>
                      {c.label}
                    </p>
                  </button>
                ))}
              </div>
            </SmoothCorners>
          </div>

          {/* Members list */}
          <div className="px-4 mt-5 mb-2 flex items-center justify-between">
            <p className="font-bold text-label-3p" style={{ color: T.color.text.heading }}>
              Members
            </p>
            <p className="font-noontree text-b12" style={{ color: T.color.text.muted }}>
              {filled} of {seats} seats filled
              {inFlight > 0 ? ` · ${inFlight} pending` : ""}
            </p>
          </div>

          <div className="px-4">
            <SmoothCorners radius={16} className="bg-white border-[1.5px] rounded-16 px-3.5 divide-y" style={{ borderColor: T.color.border.hairline }}>
              <MemberRow member={OWNER} />
              {members.map((m) => (
                <MemberRow key={m.id} member={m} onMore={() => setRemovingMember(m)} />
              ))}
              {pendingInvites.map((inv) => (
                <PendingInviteRow
                  key={inv.id}
                  invite={inv}
                  onResend={handleResend}
                  onRevoke={() => {
                    setPendingInvites((curr) => curr.filter((p) => p.id !== inv.id));
                    showToast("Invite revoked");
                  }}
                />
              ))}
              {Array.from({ length: empty }).map((_, i) => (
                <EmptySeatRow key={i} onInvite={handleCopyLink} />
              ))}
            </SmoothCorners>
          </div>

          {/* Privacy reassurance — PRD §3.7. One confident sentence,
              backed by a quiet shield mark. No bullets, no eye-with-slash
              icon, no card-within-card visual nesting. Each row in the
              members list above implies the structure; this just states
              what stays private. */}
          <div className="px-4 mt-4">
            <div className="flex items-start gap-2.5 px-1">
              <ShieldCheckIcon className="size-4 shrink-0 mt-px" />
              <p className="font-noontree text-b12" style={{ color: T.color.text.body }}>
                <span className="font-semibold" style={{ color: T.color.text.heading }}>
                  Your data stays yours.
                </span>{" "}
                Members never see your orders, addresses, saved payments, or
                what you browse.
              </p>
            </div>
          </div>

          {/* Footer plan actions — settings-style row group. Switch is a
              neutral management action; Cancel is destructive (red). Both
              are equally weighted text rows with chevrons, separated by a
              divider — the same row pattern used elsewhere in the app for
              "Manage membership" / "Change payment method". This replaces
              the earlier mismatched white-pill + naked-red-text pair. */}
          <div className="px-4 mt-4">
            <SmoothCorners
              radius={16}
              className="bg-white border rounded-16 overflow-hidden"
              style={{ borderColor: T.color.border.hairline }}
            >
              <button
                type="button"
                onClick={onSwitchPlan}
                className="flex items-center justify-between w-full px-4 py-4 cursor-pointer"
              >
                <span className="font-noontree font-semibold text-label-3p" style={{ color: T.color.text.heading }}>
                  Switch to {tier === "duo" ? "Family" : "Duo"} Plan
                </span>
                <RightChevron className="size-3.5" />
              </button>
              <div className="h-px mx-4" style={{ backgroundColor: T.color.border.divider }} />
              <button
                type="button"
                onClick={() => setCancelOpen(true)}
                className="flex items-center justify-between w-full px-4 py-4 cursor-pointer"
              >
                <span className="font-noontree font-semibold text-label-3p" style={{ color: T.color.danger }}>
                  Cancel {planName}
                </span>
                <RightChevron className="size-3.5" color={T.color.danger} />
              </button>
            </SmoothCorners>
          </div>
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center py-3.5 pointer-events-none">
        <div className="bg-noon-black h-1 rounded-8 w-[124px]" />
      </div>

      <RemoveSheet
        open={removingMember !== null}
        member={removingMember}
        onClose={() => setRemovingMember(null)}
        onConfirm={() => {
          if (removingMember) {
            setMembers((curr) => curr.filter((m) => m.id !== removingMember.id));
            setRemovingMember(null);
            showToast(`${removingMember.name} removed`);
          }
        }}
      />

      <CancelPlanSheet
        open={cancelOpen}
        planName={planName}
        memberCount={filled - 1}
        onClose={() => setCancelOpen(false)}
        onConfirm={() => {
          setCancelOpen(false);
          onCancelled?.();
        }}
      />

      <Toast message={toast} />
    </div>
  );
}

/* ---------- Cancel confirmation sheet ---------- *
 * PRD §3.5: "Owner cancels Duo or Family Plan: all members retain access
 * through the end of the current billing period, then lose access. Members
 * are notified at cancellation time (not only at expiry)." */
function CancelPlanSheet({
  open,
  planName,
  memberCount,
  onClose,
  onConfirm,
}: {
  open: boolean;
  planName: string;
  memberCount: number;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmSheet
      open={open}
      title={`Cancel ${planName}`}
      body={
        memberCount > 0 ? (
          <>
            You and your{" "}
            <span className="font-semibold">
              {memberCount} member{memberCount === 1 ? "" : "s"}
            </span>{" "}
            will keep noon One until the end of the current billing period, then
            lose access. They{"'"}ll be notified now.
          </>
        ) : (
          <>
            You{"'"}ll keep noon One until the end of the current billing period,
            then lose access.
          </>
        )
      }
      cancelLabel="Keep plan"
      confirmLabel={`Cancel ${planName.replace(" Plan", "")}`}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
}

/* ---------- Lightweight toast ---------- *
 * Floats above the home indicator. Auto-dismisses via the timer in
 * showToast(). The outer wrapper handles horizontal centering with
 * flexbox; the inner motion.div only animates opacity + y. This split is
 * deliberate — framer-motion writes inline `transform: matrix(...)` which
 * would otherwise clobber a `-translate-x-1/2` Tailwind utility. */
function Toast({ message }: { message: string | null }) {
  return (
    <div className="absolute inset-x-0 bottom-16 z-40 pointer-events-none flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="px-3.5 py-2.5 rounded-8 font-noontree font-semibold text-b12 text-white whitespace-nowrap"
            style={{ backgroundColor: T.color.text.heading, boxShadow: "0 8px 24px rgba(15,15,25,0.18)" }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
