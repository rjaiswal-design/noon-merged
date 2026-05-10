import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { cn } from '../lib/cn'
import { Squircle } from '../components/Squircle'
import { useSheetOpen } from '@state/uiStore'
// Co-locate the Tailwind directives + reset with the component so any host
// (e.g. supermall's Home page) gets them without having to mount the
// share-address app first.
import '../index.css'

type ToggleOption = 'address' | 'locker'

type AddressItem = {
  id: string
  title: string
  selected?: boolean
  distance: string
  address: string
  contactName: string
  contactPhone: string
  verified: boolean
}

const initialAddresses: AddressItem[] = [
  {
    id: 'work',
    title: 'Work',
    selected: true,
    distance: '24 m',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    contactName: 'Ahmed Ali,',
    contactPhone: '+971-50 789 3456',
    verified: true,
  },
  {
    id: 'ayush-home',
    title: "Ayush's Home",
    distance: '24 km',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    contactName: 'Ahmed Ali,',
    contactPhone: '+971-50 789 3456',
    verified: true,
  },
  {
    id: 'ayush-home-2',
    title: "Ayush's Home 02",
    distance: '24 m',
    address: 'Burj Khalifa, 1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
    contactName: 'Ahmed Ali,',
    contactPhone: '+971-50 789 3456',
    verified: true,
  },
]

type AddressBottomSheetProps = {
  open: boolean
  onClose: () => void
}

const sheetEaseOpen = 'cubic-bezier(0.22, 1.22, 0.42, 1)'
const sheetSpringOpen = { type: 'spring' as const, damping: 28, stiffness: 320, mass: 0.9 }
const sheetTweenClose = {
  type: 'tween' as const,
  duration: 0.34,
  ease: [0.32, 0.72, 0, 1] as [number, number, number, number],
}

type SecondaryView = 'menu' | 'confirm-delete'
type SecondaryState = { view: SecondaryView; addressId: string } | null

export function AddressBottomSheet({ open, onClose }: AddressBottomSheetProps) {
  useSheetOpen(open)
  const [tab, setTab] = useState<ToggleOption>('address')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string>('work')
  const [secondary, setSecondary] = useState<SecondaryState>(null)
  const [tabSqueezing, setTabSqueezing] = useState(false)
  const [addressList, setAddressList] = useState<AddressItem[]>(initialAddresses)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const secondaryTarget =
    secondary !== null ? addressList.find((a) => a.id === secondary.addressId) ?? null : null

  const confirmDelete = () => {
    if (!secondary) return
    const target = secondary.addressId
    setSecondary(null)
    setDeletingId(target)
    window.setTimeout(() => {
      setAddressList((prev) => prev.filter((a) => a.id !== target))
      setDeletingId(null)
    }, 420)
  }

  const changeTab = (next: ToggleOption) => {
    if (next === tab) {
      // Same tab tapped again — squeeze for feedback, don't switch
      setTabSqueezing(true)
      window.setTimeout(() => setTabSqueezing(false), 160)
      return
    }
    // Different tab — slide only, no squeeze
    setTab(next)
  }

  const anyOpen = open

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 z-40 bg-black/70 transition-opacity duration-[420ms]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      {/* iOS home indicator — pinned to viewport bottom, on top of all sheets */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 z-[80] flex h-8 items-end justify-center pb-2 transition-opacity duration-[420ms]',
          anyOpen ? 'opacity-100' : 'opacity-0',
        )}
      >
        <span className="block h-1 w-[134px] rounded-full bg-neutral-white" />
      </div>

      <SheetShell open={open} onDragClose={onClose}>
        <div
          className="flex flex-col gap-3 p-3 overflow-y-auto overscroll-contain"
          style={{ maxHeight: 'calc(100vh - 120px)' }}
        >

          <div
            role="tablist"
            className="relative flex h-10 w-full items-center rounded-32 bg-blue-gray-200 p-1"
            style={{ boxShadow: 'inset 0 0 4px 0 rgba(14,14,14,0.06)' }}
          >
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] transition-transform duration-[280ms]"
              style={{
                transform: tab === 'address' ? 'translateX(0%)' : 'translateX(100%)',
                transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
              }}
            >
              <span
                className="block h-full w-full rounded-32 border-[0.5px] border-blue-gray-100 bg-neutral-white shadow-[0_1px_3px_rgba(34,34,34,0.06)] transition-transform duration-[160ms] ease-out"
                style={{ transform: tabSqueezing ? 'scaleX(0.94)' : 'scaleX(1)' }}
              />
            </span>
            <SegmentButton label="Address" selected={tab === 'address'} onClick={() => changeTab('address')} />
            <SegmentButton label="Locker/ Pickup" selected={tab === 'locker'} onClick={() => changeTab('locker')} />
          </div>

          <Squircle
            cornerRadius={16}
            cornerSmoothing={0.6}
            className="bg-neutral-white"
          >
            <div className="flex h-12 items-center gap-3 px-3">
              <img src="/share-address/icons/search.svg" alt="" className="h-4 w-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your building, area..."
                className="flex-1 bg-transparent text-label-3 font-medium text-blue-gray-1000 placeholder:font-medium placeholder:text-blue-gray-600 focus:outline-none"
              />
            </div>
          </Squircle>

          <Squircle
            cornerRadius={16}
            cornerSmoothing={0.6}
            className="bg-neutral-white"
            onClick={() => undefined}
          >
            <div className="flex w-full items-center gap-3 px-3.5 py-3.5">
              <span className="flex size-5 items-center justify-center">
                <img
                  src="/share-address/icons/plus.svg"
                  alt=""
                  className="h-3 w-3"
                  style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(2300%) hue-rotate(202deg)' }}
                />
              </span>
              <span className="flex-1 text-left text-b14 font-semibold text-neutral-black">
                Add new Address
              </span>
              <span className="flex size-5 items-center justify-center">
                <img
                  src="/share-address/icons/chevron-left.svg"
                  alt=""
                  className="h-2.5 w-1.5 rotate-180"
                  style={{ filter: 'brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(2300%) hue-rotate(202deg)' }}
                />
              </span>
            </div>
          </Squircle>

          <div className="flex flex-col gap-3">
            {addressList.map((a) => (
              <AddressCard
                key={a.id}
                item={a}
                isSelected={selectedId === a.id}
                isDeleting={deletingId === a.id}
                onSelect={() => setSelectedId(a.id)}
                onMore={() => setSecondary({ view: 'menu', addressId: a.id })}
              />
            ))}
          </div>
        </div>

        <SecondarySheet
          view={secondary?.view ?? null}
          target={secondaryTarget}
          onClose={() => setSecondary(null)}
          onShowDeleteConfirm={() =>
            setSecondary((prev) => (prev ? { ...prev, view: 'confirm-delete' } : null))
          }
          onConfirmDelete={confirmDelete}
        />
      </SheetShell>

    </>
  )
}

// ─── SheetShell ──────────────────────────────────────────────────────────────

type SheetShellProps = {
  open: boolean
  children: React.ReactNode
  zClass?: string
  bgClass?: string
  borderColor?: string
  showNotch?: boolean
  insetClass?: string
  bottomSpacerClass?: string
  bottomOffsetClass?: string
  onDragClose?: () => void
  /** 'slide' (default) slides up from below the viewport.
   *  'scale' grows in place — used for secondary sheets that emerge from inside the main sheet. */
  enterMode?: 'slide' | 'scale'
}

function SheetShell({
  open,
  children,
  zClass = 'z-50',
  bgClass = 'bg-blue-gray-100',
  borderColor,
  showNotch = true,
  insetClass = 'left-3 right-3',
  bottomSpacerClass = 'h-[34px]',
  bottomOffsetClass = 'bottom-0',
  onDragClose,
  enterMode = 'slide',
}: SheetShellProps) {
  const dragStartY = useRef<number | null>(null)
  const [stretchPx, setStretchPx] = useState(0)
  const dragY = useMotionValue(0)

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!onDragClose) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragStartY.current = e.clientY
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartY.current === null) return
    const delta = e.clientY - dragStartY.current
    if (delta < 0) {
      setStretchPx(Math.min(60, -delta * 0.3))
      dragY.set(0)
    } else {
      dragY.set(delta)
      setStretchPx(0)
    }
  }

  const endDrag = () => {
    if (dragStartY.current === null) return
    const offset = dragY.get()
    dragStartY.current = null
    if (offset > 80 && onDragClose) {
      onDragClose()
    }
    dragY.set(0)
    setStretchPx(0)
  }

  const slideVariants = {
    initial: { y: '110%' },
    animate: { y: 0, transition: sheetSpringOpen },
    exit: { y: '110%', transition: sheetTweenClose },
  }
  const scaleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { ...sheetSpringOpen, opacity: { duration: 0.32, ease: 'easeOut' as const } },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.32, ease: [0.32, 0.72, 0, 1] as [number, number, number, number] },
    },
  }
  const variants = enterMode === 'scale' ? scaleVariants : slideVariants

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={cn('absolute', bottomOffsetClass, insetClass, zClass)}
          style={{ transformOrigin: 'center bottom' }}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div style={{ y: enterMode === 'slide' ? dragY : 0 }}>
            {showNotch ? (
              <div
                className="flex touch-none justify-center py-2"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                <span className="block h-1 w-10 rounded-full bg-neutral-white/90" />
              </div>
            ) : null}
            <div
              className={cn('relative overflow-hidden rounded-24', bgClass)}
              style={borderColor ? { boxShadow: `0 0 0 1px ${borderColor}` } : undefined}
            >
              {children}
              <div
                style={{
                  height: stretchPx,
                  transition: dragStartY.current !== null ? 'none' : `height 420ms ${sheetEaseOpen}`,
                }}
              />
            </div>
            <div className={cn('w-full', bottomSpacerClass)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type SegmentButtonProps = {
  label: string
  selected: boolean
  onClick: () => void
}

function SegmentButton({ label, selected, onClick }: SegmentButtonProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className="relative z-10 flex h-8 flex-1 items-center justify-center px-3 outline-none"
      style={{ transform: 'translateZ(0)' }}
    >
      <span
        className={cn(
          'whitespace-nowrap text-b14',
          selected ? 'font-semibold text-ink' : 'font-medium text-ink-secondary',
        )}
      >
        {label}
      </span>
    </button>
  )
}

type AddressCardProps = {
  item: AddressItem
  isSelected: boolean
  isDeleting?: boolean
  onSelect: () => void
  onMore: () => void
}

function AddressCard({ item, isSelected, isDeleting = false, onSelect, onMore }: AddressCardProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        // Card keeps its space during slide; collapse happens via DOM removal
        // after the animation completes, avoiding the sheet's bottom area
        // appearing to shift while the card is sliding.
      }}
    >
      <div
        style={{
          transform: isDeleting ? 'scale(0.92)' : 'scale(1)',
          opacity: isDeleting ? 0 : 1,
          transition:
            'transform 420ms cubic-bezier(0.32, 0.72, 0, 1), opacity 380ms ease-out',
        }}
      >
    <Squircle
      cornerRadius={16}
      cornerSmoothing={0.6}
      borderColor={isSelected ? '#D0E3FF' : undefined}
      className="bg-neutral-white"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect()
          }
        }}
        className={cn(
          'flex w-full cursor-pointer items-center gap-2 py-2 pl-2 pr-1 outline-none',
          isSelected ? 'bg-blue-50' : 'bg-blue-gray-100',
        )}
      >
        <Squircle
          cornerRadius={8}
          cornerSmoothing={0.6}
          borderColor={isSelected ? '#D0E3FF' : undefined}
          className={cn('size-7', isSelected ? 'bg-neutral-white' : 'bg-blue-gray-100')}
        >
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={isSelected ? '/share-address/icons/briefcase-blue.svg' : '/share-address/icons/briefcase-gray.svg'}
              alt=""
              className="h-4 w-4"
            />
          </div>
        </Squircle>
        <span
          className={cn(
            'font-primary text-b14 text-neutral-black',
            isSelected ? 'font-semibold' : 'font-medium',
          )}
        >
          {item.title}
        </span>
        <Squircle cornerRadius={6} cornerSmoothing={0.6} className="bg-neutral-white">
          <div
            className={cn(
              'flex min-w-9 items-center justify-center whitespace-nowrap pb-1 pl-1.5 pr-1.5 pt-0.5 font-primary text-tiny font-bold',
              isSelected ? 'text-blue-600' : 'text-blue-gray-700',
            )}
          >
            {item.distance}
          </div>
        </Squircle>
        <div className="ml-auto flex items-center gap-2 text-blue-gray-700">
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="flex size-6 items-center justify-center"
            aria-label="Share"
          >
            <img src="/share-address/icons/upload.svg" alt="" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onMore()
            }}
            className="flex size-6 items-center justify-center"
            aria-label="More"
          >
            <img src="/share-address/icons/more-vertical.svg" alt="" className="h-4 w-0.5" />
          </button>
        </div>
      </div>

      <div className="px-3 pt-2 pb-2">
        <p className="text-label-3 font-medium text-blue-gray-700">
          {item.address}
        </p>
      </div>

      <div className="mx-3 border-t border-dashed border-blue-gray-300" />

      <div className="flex items-center gap-1.5 px-3 py-2.5">
        <span className="text-label-3 font-medium text-blue-gray-700">
          {item.contactName}
        </span>
        <span className="text-label-3 font-medium text-blue-gray-700">
          {item.contactPhone}
        </span>
        <img
          src={item.verified ? '/share-address/icons/verified.svg' : '/share-address/icons/unverified.svg'}
          alt=""
          className="h-3.5 w-3.5"
        />
      </div>
    </Squircle>
      </div>
    </div>
  )
}

type SecondarySheetProps = {
  view: SecondaryView | null
  target: AddressItem | null
  onClose: () => void
  onShowDeleteConfirm: () => void
  onConfirmDelete: () => void
}

const actionMenuItems: { id: 'edit' | 'share' | 'verify' | 'delete'; icon: string; label: string }[] = [
  { id: 'edit', icon: '/share-address/icons/action-edit-pen.svg', label: 'Edit' },
  { id: 'share', icon: '/share-address/icons/action-share.svg', label: 'Share' },
  { id: 'verify', icon: '/share-address/icons/action-verify.svg', label: 'Verify' },
  { id: 'delete', icon: '/share-address/icons/action-delete.svg', label: 'Delete' },
]

function SecondarySheet({
  view,
  target,
  onClose,
  onShowDeleteConfirm,
  onConfirmDelete,
}: SecondarySheetProps) {
  const open = view !== null
  const renderedView = view ?? 'menu'

  const menuRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)

  // Sync wrapper height to the ACTIVE variant's natural height.
  // useLayoutEffect runs synchronously after DOM mutation but before paint, so
  // the height is set before the user sees anything (preventing the first
  // frame from clipping the menu's top row). ResizeObserver keeps it in sync
  // if the content's height changes later (e.g. fonts loading, target swap).
  useLayoutEffect(() => {
    const el = renderedView === 'confirm-delete' ? confirmRef.current : menuRef.current
    if (!el) return
    const update = () => setContentHeight(el.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [renderedView, target])

  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          'absolute inset-0 z-[60] bg-black/35 transition-opacity duration-[420ms]',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />
      <SheetShell
        open={open}
        zClass="z-[70]"
        bgClass="bg-neutral-white"
        borderColor="#F2F3F7"
        showNotch={false}
        insetClass="left-[9px] right-[9px]"
        bottomSpacerClass="h-0"
        bottomOffsetClass="bottom-2"
      >
        <div
          className="relative overflow-hidden"
          style={{
            height: contentHeight ?? undefined,
            transition: 'height 620ms cubic-bezier(0.32, 0.72, 0, 1)',
          }}
        >
          {/* Action menu */}
          <div
            ref={menuRef}
            className="absolute inset-x-0 top-0 origin-center"
            style={{
              opacity: renderedView === 'menu' ? 1 : 0,
              transform:
                renderedView === 'menu' ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(-12px)',
              pointerEvents: renderedView === 'menu' ? 'auto' : 'none',
              transition:
                'opacity 360ms ease-out, transform 520ms cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            <div className="flex flex-col p-4">
              {actionMenuItems.map((item, idx) => (
                <div key={item.id} className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (item.id === 'delete') {
                        onShowDeleteConfirm()
                      } else {
                        onClose()
                      }
                    }}
                    className="flex w-20 items-center gap-4 py-2 outline-none"
                  >
                    <span className="flex size-5 items-center justify-center">
                      <img src={item.icon} alt="" className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-primary text-b12 font-semibold text-blue-gray-900">
                      {item.label}
                    </span>
                  </button>
                  {idx < actionMenuItems.length - 1 ? (
                    <div className="my-1 w-full border-t border-dashed border-blue-gray-200" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Delete confirmation */}
          <div
            ref={confirmRef}
            className="absolute inset-x-0 top-0"
            style={{
              opacity: renderedView === 'confirm-delete' ? 1 : 0,
              pointerEvents: renderedView === 'confirm-delete' ? 'auto' : 'none',
              transition: 'opacity 320ms ease-out 80ms',
            }}
          >
            <div className="flex flex-col gap-4 p-3">
              {/* Top section — drops in from above */}
              <div
                className="flex flex-col gap-2 px-0.5"
                style={{
                  transform:
                    renderedView === 'confirm-delete' ? 'translateY(0)' : 'translateY(-32px)',
                  transition:
                    'transform 560ms cubic-bezier(0.32, 0.72, 0, 1) 120ms',
                }}
              >
                <p className="font-primary text-a17 font-bold leading-6 text-blue-gray-900">
                  Delete this address?
                </p>
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={0.6}
                  borderColor="#F2F3F7"
                  className="bg-bluegray-50"
                >
                  <div className="flex flex-col gap-1.5 p-3">
                    <p className="font-primary text-label-3p font-semibold text-blue-gray-900">
                      {target?.title ?? 'Address'}
                    </p>
                    <p className="font-primary text-label-4p text-blue-gray-700">
                      {target?.address ?? ''}
                    </p>
                  </div>
                </Squircle>
              </div>

              {/* Bottom CTAs — rise up from below */}
              <div
                className="flex items-stretch gap-3"
                style={{
                  transform:
                    renderedView === 'confirm-delete' ? 'translateY(0)' : 'translateY(32px)',
                  transition:
                    'transform 560ms cubic-bezier(0.32, 0.72, 0, 1) 120ms',
                }}
              >
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={0.6}
                  borderColor="#EAECF0"
                  className="flex-1 bg-blue-gray-100"
                  onClick={onClose}
                >
                  <div className="flex h-11 items-center justify-center px-6 text-b14 font-semibold text-ink">
                    Cancel
                  </div>
                </Squircle>
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={0.6}
                  className="flex-1 bg-red-700"
                  onClick={onConfirmDelete}
                >
                  <div className="flex h-11 items-center justify-center px-6 text-b14 font-semibold text-neutral-white">
                    Yes
                  </div>
                </Squircle>
              </div>
            </div>
          </div>
        </div>
      </SheetShell>
    </>
  )
}
