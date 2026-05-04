import { StrictMode, lazy, Suspense, type ComponentType } from 'react'
import { createRoot } from 'react-dom/client'

const path = window.location.pathname

const apps: Record<string, () => Promise<{ default: ComponentType }>> = {
  '/supermall':     () => import('./apps/supermall/App'),
  '/share-address': () => import('./apps/share-address/App'),
  '/one-flows':     () => import('./apps/one-flows/App'),
  '/wishlist':      () => import('./apps/wishlist/App'),
}

const match = Object.keys(apps).find((p) => path === p || path.startsWith(p + '/'))
const Component = lazy(match ? apps[match] : () => import('./shell/Hub'))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  </StrictMode>,
)
