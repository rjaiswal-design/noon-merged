import './HomeRecChips.css';

export type HomeRecChip<TKey extends string = string> = {
  label: TKey;
  icon: string;
};

export type HomeRecChipsProps<TKey extends string = string> = {
  chips: ReadonlyArray<HomeRecChip<TKey>>;
  activeKey: TKey;
  onChange?: (key: TKey) => void;
  ariaLabel?: string;
};

export function HomeRecChips<TKey extends string = string>({
  chips,
  activeKey,
  onChange,
  ariaLabel,
}: HomeRecChipsProps<TKey>) {
  return (
    <div className="home-rec__chips" role="tablist" aria-label={ariaLabel}>
      {chips.map((c) => {
        const isActive = c.label === activeKey;
        return (
          <button
            key={c.label}
            role="tab"
            aria-selected={isActive}
            className={`home-rec__chip${isActive ? ' home-rec__chip--active' : ''}`}
            onClick={() => onChange?.(c.label)}
          >
            <img src={c.icon} alt="" className="home-rec__chip-icon" />
            <span className="home-rec__chip-label">{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
