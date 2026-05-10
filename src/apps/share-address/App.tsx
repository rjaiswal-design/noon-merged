import { DevRetune } from '@/shell/DevRetune'
import './index.css'
import { EntryScreen } from './screens/EntryScreen'
import { AppShell } from './AppShell'

export default function App() {
  return (
    <>
      <AppShell>
        <EntryScreen />
      </AppShell>
      <DevRetune position="top-right" hotkey="alt+e" />
    </>
  )
}
