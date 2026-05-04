import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-full items-start justify-center">
      <div
        className="relative overflow-hidden bg-neutral-white shadow-[0_8px_48px_rgba(0,0,0,0.18)]"
        style={{ width: 375, height: 812 }}
      >
        {children}
      </div>
    </div>
  )
}
