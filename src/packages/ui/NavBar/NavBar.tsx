import type { ReactNode } from 'react';
import { ChevronLeft } from '../icons';
import './NavBar.css';

export type NavBarAction = {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
};

export type NavBarVariant = 'solid' | 'overlay';

export type NavBarProps = {
  variant?: NavBarVariant;
  title?: string;
  actions?: NavBarAction[];
  onBack?: () => void;
  className?: string;
};

export function NavBar({
  variant = 'solid',
  title,
  actions = [],
  onBack,
  className = '',
}: NavBarProps) {
  const base = `nav-bar nav-bar--${variant}`;

  return (
    <header className={`${base} ${className}`.trim()} role="navigation">
      <button
        type="button"
        className="nav-bar__btn"
        onClick={onBack}
        aria-label="Go back"
      >
        <ChevronLeft
          size={24}
          color={variant === 'solid' ? 'var(--grey-900)' : 'var(--grey-900)'}
        />
      </button>

      {variant === 'solid' && title && (
        <h1 className="nav-bar__title">{title}</h1>
      )}

      <div className="nav-bar__actions">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            className="nav-bar__btn"
            onClick={action.onClick}
            aria-label={action.label}
          >
            {action.icon}
          </button>
        ))}
      </div>
    </header>
  );
}
