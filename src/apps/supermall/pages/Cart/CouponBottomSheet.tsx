import { useRef, useState } from 'react';

/* ── Coupon definitions ──────────────────────────────────────────────────── */
export type CouponDef = {
  code: string;
  headline: string;
  terms: string;
};

export const SHEET_COUPONS: CouponDef[] = [
  {
    code: 'SAVE20',
    headline: '20 AED off your order',
    terms: 'Min order AED 100 • Valid till 31 Dec',
  },
  {
    code: 'NOON10',
    headline: '10% off, up to AED 50',
    terms: 'No minimum order value • Valid till 31 Dec',
  },
  {
    code: 'FIRST50',
    headline: '50 AED off your first order',
    terms: 'New users only • Min order AED 200 • Valid till 31 Dec',
  },
  {
    code: 'FREESHIP',
    headline: 'Free delivery on your order',
    terms: 'No minimum order required • Valid till 31 Dec',
  },
];

/* ── Props ───────────────────────────────────────────────────────────────── */
type CouponBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  onApply: (code: string, headline: string) => void;
  manualInput: string;
  onManualChange: (v: string) => void;
  onManualApply: () => void;
  manualError: string;
};

/* ── Sheet ───────────────────────────────────────────────────────────────── */
export function CouponBottomSheet({
  open,
  onClose,
  onApply,
  manualInput,
  onManualChange,
  onManualApply,
  manualError,
}: CouponBottomSheetProps) {
  const dragStartY = useRef<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const easeOpen = 'cubic-bezier(0.22, 1.22, 0.42, 1)';
  const easeClose = 'cubic-bezier(0.32, 0.72, 0, 1)';

  function handlePointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartY.current = e.clientY;
    setIsDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragStartY.current === null) return;
    const delta = e.clientY - dragStartY.current;
    if (delta > 0) setDragOffset(delta);
  }

  function handlePointerUp() {
    const offset = dragOffset;
    dragStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);
    if (offset > 80) onClose();
  }

  return (
    <>
      {/* ── Scrim ──────────────────────────────────────────────────────── */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          background: 'rgba(0,0,0,0.7)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 420ms ease',
        }}
      />

      {/* ── iOS home indicator ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 220,
          height: 34,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: 8,
          pointerEvents: 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity 420ms ease',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 134,
            height: 5,
            borderRadius: 9999,
            background: '#fff',
          }}
        />
      </div>

      {/* ── Sheet wrapper (notch + body) ───────────────────────────────── */}
      <div
        style={{
          position: 'fixed',
          left: 12,
          right: 12,
          bottom: 0,
          zIndex: 210,
          transform: open ? `translateY(${dragOffset}px)` : 'translateY(110%)',
          transition: isDragging
            ? 'none'
            : `transform 520ms ${open ? easeOpen : easeClose}`,
        }}
      >
        {/* Drag notch */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 0 4px',
            touchAction: 'none',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <span
            style={{
              display: 'block',
              width: 40,
              height: 5,
              borderRadius: 9999,
              background: 'rgba(255,255,255,0.85)',
            }}
          />
        </div>

        {/* Sheet body */}
        <div
          style={{
            background: '#F2F3F7',
            borderRadius: '24px 24px 0 0',
            maxHeight: 'calc(90vh - 44px)',
            overflowY: 'auto',
            overscrollBehavior: 'contain',
          }}
        >
          <div style={{ padding: '20px 12px 12px' }}>
            <h2
              style={{
                margin: '0 0 16px',
                fontSize: 18,
                fontWeight: 700,
                color: '#0e0e0e',
                letterSpacing: '-0.18px',
                fontFamily: 'inherit',
              }}
            >
              Apply Coupon
            </h2>

            {/* ── Coupon cards ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {SHEET_COUPONS.map((coupon) => (
                <div
                  key={coupon.code}
                  style={{
                    background: '#ffffff',
                    borderRadius: 16,
                    padding: '14px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {/* Dashed code chip */}
                  <div
                    style={{
                      border: '1.5px dashed #0076FF',
                      borderRadius: 8,
                      padding: '7px 10px',
                      flexShrink: 0,
                      minWidth: 80,
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#0076FF',
                        letterSpacing: 1,
                        fontFamily: 'monospace',
                        lineHeight: '16px',
                      }}
                    >
                      {coupon.code}
                    </span>
                  </div>

                  {/* Info */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 3,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#0e0e0e',
                        letterSpacing: '-0.13px',
                        lineHeight: '17px',
                      }}
                    >
                      {coupon.headline}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: '#7e859b',
                        letterSpacing: '-0.11px',
                        lineHeight: '14px',
                        fontWeight: 400,
                      }}
                    >
                      {coupon.terms}
                    </span>
                  </div>

                  {/* Apply button */}
                  <button
                    type="button"
                    onClick={() => onApply(coupon.code, coupon.headline)}
                    style={{
                      flexShrink: 0,
                      height: 34,
                      padding: '0 14px',
                      borderRadius: 8,
                      border: '1.5px solid #0076FF',
                      background: 'transparent',
                      fontSize: 13,
                      fontWeight: 700,
                      color: '#0076FF',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>

            {/* ── Manual entry ─────────────────────────────────────────── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: '16px 0 12px',
              }}
            >
              <div style={{ flex: 1, height: 1, background: '#DADCE3' }} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: '#7e859b',
                  letterSpacing: '-0.11px',
                  whiteSpace: 'nowrap',
                }}
              >
                or enter code manually
              </span>
              <div style={{ flex: 1, height: 1, background: '#DADCE3' }} />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={manualInput}
                onChange={(e) => onManualChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onManualApply()}
                placeholder="Enter coupon code"
                autoCapitalize="characters"
                autoCorrect="off"
                spellCheck={false}
                style={{
                  flex: 1,
                  height: 44,
                  padding: '0 12px',
                  border: '1.5px solid #EAECF0',
                  borderRadius: 10,
                  fontSize: 14,
                  fontFamily: 'inherit',
                  color: '#0e0e0e',
                  background: '#ffffff',
                  outline: 'none',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              />
              <button
                type="button"
                onClick={onManualApply}
                style={{
                  height: 44,
                  padding: '0 20px',
                  borderRadius: 10,
                  border: 0,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  background: manualInput.trim() ? '#0076FF' : '#DADCE3',
                  color: manualInput.trim() ? '#ffffff' : '#7e859b',
                  transition: 'background 0.15s, color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                Apply
              </button>
            </div>

            {manualError && (
              <p
                style={{
                  margin: '6px 0 0',
                  fontSize: 12,
                  color: '#dc2626',
                  letterSpacing: '-0.12px',
                  fontFamily: 'inherit',
                }}
              >
                {manualError}
              </p>
            )}
          </div>

          {/* iOS home indicator spacer */}
          <div style={{ height: 34 }} />
        </div>
      </div>
    </>
  );
}
