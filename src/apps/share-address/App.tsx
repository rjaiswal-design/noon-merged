import { Retune } from 'retune'
import './index.css'
import { EntryScreen } from './screens/EntryScreen'
import { AppShell } from './AppShell'

export default function App() {
  return (
    <>
      <AppShell>
        <EntryScreen />
      </AppShell>
      <Retune force position="top-right" hotkey="alt+e" />
    </>
  )
}
