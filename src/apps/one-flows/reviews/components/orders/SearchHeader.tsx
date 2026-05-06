import ChevronLeftIcon from "../../icons/ChevronLeftIcon"
import SearchIcon from "../../icons/SearchIcon"

// Header row below status bar: back button + pill search input.
export default function SearchHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex w-full items-center gap-2 px-3 py-2">
      <BackButton onClick={onBack} />
      <SearchPill />
    </div>
  )
}

function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Back"
      onClick={onClick}
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-border-subtle bg-surface-primary"
    >
      <ChevronLeftIcon size={20} />
    </button>
  )
}

function SearchPill() {
  return (
    <div className="flex h-10 flex-1 items-center gap-2 self-start rounded-full border border-border-subtle bg-surface-primary px-3 py-2">
      <SearchIcon size={18} color="#666D85" />
      <span className="text-[14px] font-medium leading-[18px] text-text-primary">
        Search all orders
      </span>
    </div>
  )
}
