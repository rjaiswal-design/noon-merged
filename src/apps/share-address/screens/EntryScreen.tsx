import { useState } from 'react'
import { AddressBottomSheet } from './AddressBottomSheet'

const SHOP_URL = '/'

export function EntryScreen() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        src={sheetOpen ? '/share-address/images/entry-screen-no-bar.png' : '/share-address/images/entry-screen.png'}
        alt="Home"
        className="absolute inset-0 h-full w-full select-none object-cover"
        draggable={false}
      />

      {/* Tap target over the "super mall" tile in the top services row.
          Opens the deployed supermall prototype in a new tab so the user
          can return to this entry flow. */}
      <button
        type="button"
        onClick={() => { window.location.assign(SHOP_URL); }}
        aria-label="Open shop"
        className="absolute z-10 rounded-16 outline-none transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-700/60 hover:ring-2 hover:ring-blue-700/40"
        style={{ left: 88, top: 64, width: 80, height: 82 }}
      />

      {/* Tap target over the address bar in the design */}
      <button
        type="button"
        onClick={() => setSheetOpen(true)}
        aria-label="Open address selector"
        className="absolute left-3 right-3 z-10 rounded-12 outline-none focus-visible:ring-2 focus-visible:ring-blue-700/60"
        style={{ top: 116, height: 56 }}
      />

      <AddressBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  )
}
