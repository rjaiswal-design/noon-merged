import StatusBar from "../primitives/StatusBar"
import SearchHeader from "./SearchHeader"

// Top-of-screen header region: status bar + search row, grouped as one unit.
export default function Header({ onBack }: { onBack?: () => void }) {
  return (
    <header className="flex shrink-0 flex-col">
      <StatusBar />
      <SearchHeader onBack={onBack} />
    </header>
  )
}
