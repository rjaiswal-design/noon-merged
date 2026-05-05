import { useEffect, useRef, useState } from 'react';
import './BottomNav.css';

const HIDE_AFTER_PX = 24;
const DELTA_PX = 6;

type Tab = 'home' | 'categories' | 'account' | 'cart';

type Props = {
  active?: Tab;
  /** Cart badge count. Pass 0/undefined to hide. */
  cartCount?: number;
};

function HomeIcon({ active }: { active: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" aria-hidden="true">
      <path
        d="M11.36 3.45a1 1 0 0 1 1.28 0l8 6.65a1 1 0 0 1 .36.77V20a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-5h-3.5v5a1 1 0 0 1-1 1H4.5a1 1 0 0 1-1-1v-9.13a1 1 0 0 1 .36-.77l7.5-6.65Z"
        fill="#0F61FF"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <path
        d="M3.86 10.1 12 3.45l8.14 6.65V20a1 1 0 0 1-1 1h-4.5v-6h-5.28v6h-4.5a1 1 0 0 1-1-1v-9.9Z"
        stroke="#1D2539"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CategoriesIcon({ active }: { active: boolean }) {
  const fill = active ? '#0F61FF' : 'none';
  const stroke = active ? '#0F61FF' : '#1D2539';
  return (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.8" fill={fill} stroke={stroke} strokeWidth="1.6" />
      <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.8" fill={fill} stroke={stroke} strokeWidth="1.6" />
      <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.8" fill={fill} stroke={stroke} strokeWidth="1.6" />
      <rect x="13" y="13" width="7.5" height="7.5" rx="1.8" fill={fill} stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

function AccountIcon({ active }: { active: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" aria-hidden="true">
      <circle cx="12" cy="8.5" r="4" fill="#0F61FF" />
      <path d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6v.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V20Z" fill="#0F61FF" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.6" stroke="#1D2539" strokeWidth="1.6" />
      <path d="M4 20c0-3.6 3.6-6 8-6s8 2.4 8 6" stroke="#1D2539" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  return active ? (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" aria-hidden="true">
      <path
        d="M3 4.5a1 1 0 0 1 1-1h2.05a1 1 0 0 1 .98.81l.32 1.69H21a1 1 0 0 1 .97 1.24l-1.85 7.4a1.5 1.5 0 0 1-1.46 1.13H8.4l.32 1.73h10.78a1 1 0 0 1 0 2H8.05a1.5 1.5 0 0 1-1.47-1.22L4.45 5.5H4a1 1 0 0 1-1-1Z"
        fill="#0F61FF"
      />
      <circle cx="9.5" cy="20" r="1.6" fill="#0F61FF" />
      <circle cx="17.5" cy="20" r="1.6" fill="#0F61FF" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="bottom-nav__icon" fill="none" aria-hidden="true">
      <path
        d="M3 4.5h2.7l2.1 11.5h11.4l2-7.5H7.5"
        stroke="#1D2539"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="9.5" cy="20" r="1.5" stroke="#1D2539" strokeWidth="1.6" />
      <circle cx="17" cy="20" r="1.5" stroke="#1D2539" strokeWidth="1.6" />
    </svg>
  );
}

export function BottomNav({ active, cartCount = 0 }: Props) {
  const [hidden, setHidden] = useState(false);
  const lastTopsRef = useRef(new WeakMap<Element, number>());

  useEffect(() => {
    let ticking = false;
    function onScroll(e: Event) {
      const target = e.target as Element | null;
      if (!target || target.nodeType !== 1) return;
      const top =
        (target as Element & { scrollTop?: number }).scrollTop ??
        (target as unknown as Document).documentElement?.scrollTop ??
        0;
      const lastTops = lastTopsRef.current;
      const last = lastTops.get(target) ?? 0;
      const dy = top - last;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (Math.abs(dy) > DELTA_PX) {
            if (dy > 0 && top > HIDE_AFTER_PX) setHidden(true);
            else if (dy < 0) setHidden(false);
            lastTops.set(target, top);
          } else if (top <= HIDE_AFTER_PX) {
            setHidden(false);
            lastTops.set(target, top);
          }
          ticking = false;
        });
      }
    }
    document.addEventListener('scroll', onScroll, true);
    return () => document.removeEventListener('scroll', onScroll, true);
  }, []);

  const itemClass = (tab: Tab) =>
    `bottom-nav__item${active === tab ? ' bottom-nav__item--active' : ''}`;

  return (
    <nav className={`bottom-nav${hidden ? ' bottom-nav--hidden' : ''}`}>
      <a href="/supermall" className={itemClass('home')}>
        <HomeIcon active={active === 'home'} />
        <span className="bottom-nav__label">Home</span>
      </a>

      <a href="/supermall/shop" className={itemClass('categories')}>
        <CategoriesIcon active={active === 'categories'} />
        <span className="bottom-nav__label">Categories</span>
      </a>

      <button type="button" className="bottom-nav__brand" aria-label="noon">
        <span className="bottom-nav__brand-mark">noon</span>
      </button>

      <a href="/supermall/account" className={itemClass('account')}>
        <AccountIcon active={active === 'account'} />
        <span className="bottom-nav__label">Account</span>
      </a>

      <a href="/supermall/cart" className={itemClass('cart')}>
        <span className="bottom-nav__cart-wrap">
          <CartIcon active={active === 'cart'} />
          {cartCount > 0 && (
            <span className="bottom-nav__badge">{cartCount > 99 ? '99+' : cartCount}</span>
          )}
        </span>
        <span className="bottom-nav__label">Cart</span>
      </a>
    </nav>
  );
}
