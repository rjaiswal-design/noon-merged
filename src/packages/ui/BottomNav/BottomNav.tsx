import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HomeDefault, HomeSelected,
  CategoriesDefault, CategoriesSelected,
  DealsDefault, DealsSelected,
  ProfileDefault, ProfileSelected,
  CartDefault, CartSelected,
} from './BottomNavIcons';
import './BottomNav.css';

const HIDE_AFTER_PX = 24;
const DELTA_PX = 6;

export type Tab = 'home' | 'categories' | 'deals' | 'profile' | 'cart';

export type BottomNavProps = {
  activeTab?: Tab;
  showDeals?: boolean;
  cartCount?: number;
  onTabChange?: (tab: Tab) => void;
};

const COLOR_ACTIVE = 'var(--color-text-action, #0f61ff)';
const COLOR_DEFAULT = 'var(--color-text-tertiary, #666d85)';

function TabIcon({ id, active }: { id: Tab; active: boolean }) {
  const color = active ? COLOR_ACTIVE : COLOR_DEFAULT;
  switch (id) {
    case 'home': return active ? <HomeSelected color={color} /> : <HomeDefault color={color} />;
    case 'categories': return active ? <CategoriesSelected color={color} /> : <CategoriesDefault color={color} />;
    case 'deals': return active ? <DealsSelected color={color} /> : <DealsDefault color={color} />;
    case 'profile': return active ? <ProfileSelected color={color} /> : <ProfileDefault color={color} />;
    case 'cart': return active ? <CartSelected color={color} /> : <CartDefault color={color} />;
  }
}

const TABS: Tab[] = ['home', 'categories', 'deals', 'profile', 'cart'];
const TAB_LABELS: Record<Tab, string> = {
  home: 'Home',
  categories: 'Categories',
  deals: 'Deals',
  profile: 'Profile',
  cart: 'Cart',
};

const iconTransition = { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const };

export function BottomNav({
  activeTab = 'home',
  showDeals = true,
  cartCount = 0,
  onTabChange,
}: BottomNavProps) {
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

  const tabs = showDeals ? TABS : TABS.filter((t) => t !== 'deals');

  return (
    <nav className={`bottom-nav${hidden ? 'bottom-nav--hidden' : ''}`}>
      <div className="bottom-nav__bar">
        {tabs.map((id) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              type="button"
              className={`bottom-nav__tab${isActive ? 'bottom-nav__tab--active' : ''}`}
              onClick={() => onTabChange?.(id)}
              aria-label={TAB_LABELS[id]}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Highlight bar — animate in/out */}
              <motion.div
                className="bottom-nav__highlight"
                animate={{
                  scaleX: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                initial={false}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                style={{ originX: 0.5 }}
              />

              <div className="bottom-nav__content">
                {/* Icon — cross-fade between default/selected */}
                <div className="bottom-nav__icon">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={`${id}-${isActive}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={iconTransition}
                      style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {id === 'cart' && cartCount > 0 ? (
                        <span className="bottom-nav__badge-wrap">
                          <TabIcon id={id} active={isActive} />
                          <span className="bottom-nav__badge">
                            {cartCount > 99 ? '99+' : cartCount}
                          </span>
                        </span>
                      ) : (
                        <TabIcon id={id} active={isActive} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Label — animate color + weight */}
                <motion.span
                  className="bottom-nav__label"
                  animate={{
                    color: isActive
                      ? 'var(--color-text-action, #0f61ff)'
                      : 'var(--color-text-tertiary, #666d85)',
                    fontWeight: isActive ? 700 : 500,
                  }}
                  initial={false}
                  transition={{ duration: 0.25 }}
                >
                  {TAB_LABELS[id]}
                </motion.span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="bottom-nav__home-bar">
        <div className="bottom-nav__home-bar-pill" />
      </div>
    </nav>
  );
}
