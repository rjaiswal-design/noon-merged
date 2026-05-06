import { create } from "zustand"
import type { Rating } from "../utils/ratingColors"

export type Screen = "orders" | "review-text"

// Review-text screen has two steps: typing the review, then attaching
// photos. Stored separately from `screen` so the on-screen transition
// animates within ReviewTextEntryScreen rather than swapping screens.
export type ReviewStep = "text" | "photos"

// Captured rects for the explicit morph: source positions of the active
// shipment's product image and 5 stars (in viewport coords). The MorphLayer
// flies copies of these from source to target while both source and target
// elements are hidden underneath.
export interface MorphSources {
  productImage: DOMRect
  stars: DOMRect[]
}

export type MorphPhase = "idle" | "flying"

interface ReviewState {
  // Per-card rating state — keyed by shipment id.
  ratings: Record<string, 0 | Rating>
  setRating: (shipmentId: string, rating: Rating) => void

  // Current screen + the shipment whose review is in progress. The morph
  // from OrdersScreen → ReviewTextEntryScreen reads `activeShipmentId` to
  // know which product image / rating cluster to share via layoutId.
  // `markActive` runs the moment a star is tapped so the source layoutIds
  // exist during the shimmer; `goToReview` flips the screen after the
  // shimmer settles.
  screen: Screen
  activeShipmentId: string | null
  markActive: (shipmentId: string) => void
  goToReview: () => void
  goBackToOrders: () => void

  // Sub-step within the review-text screen.
  reviewStep: ReviewStep
  goToPhotos: () => void
  goBackToText: () => void

  // Draft review text — populated on ReviewTextEntryScreen.
  reviewText: string
  setReviewText: (s: string) => void

  // Explicit morph orchestration. After the rating shimmer settles, the
  // active shipment captures its product image + star rects and calls
  // startMorph; that renders the flying overlay. completeMorph fires once
  // the springs settle, flips to the review screen, and clears morph state.
  morphPhase: MorphPhase
  morphSources: MorphSources | null
  startMorph: (sources: MorphSources) => void
  completeMorph: () => void

  // Hard reset — clears ratings, draft text, and screen state so each
  // entry from the host app's My Orders tap starts fresh.
  resetFlow: () => void
}

export const useReviewStore = create<ReviewState>((set) => ({
  ratings: {},
  setRating: (shipmentId, rating) =>
    set((state) => ({ ratings: { ...state.ratings, [shipmentId]: rating } })),

  screen: "orders",
  activeShipmentId: null,
  markActive: (shipmentId) => set({ activeShipmentId: shipmentId }),
  goToReview: () => set({ screen: "review-text" }),
  goBackToOrders: () =>
    set({ screen: "orders", activeShipmentId: null, reviewStep: "text" }),

  reviewStep: "text",
  goToPhotos: () => set({ reviewStep: "photos" }),
  goBackToText: () => set({ reviewStep: "text" }),

  reviewText: "",
  setReviewText: (s) => set({ reviewText: s }),

  morphPhase: "idle",
  morphSources: null,
  startMorph: (sources) => set({ morphPhase: "flying", morphSources: sources }),
  completeMorph: () => set({ morphPhase: "idle", morphSources: null, screen: "review-text" }),

  resetFlow: () =>
    set({
      ratings: {},
      screen: "orders",
      activeShipmentId: null,
      reviewStep: "text",
      reviewText: "",
      morphPhase: "idle",
      morphSources: null,
    }),
}))
