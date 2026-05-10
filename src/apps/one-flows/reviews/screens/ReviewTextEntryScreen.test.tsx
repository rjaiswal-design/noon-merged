import { render, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import ReviewTextEntryScreen from './ReviewTextEntryScreen';
import { useReviewStore } from '../store/reviewStore';

afterEach(cleanup);

beforeEach(() => {
  // The screen short-circuits to null if no shipment is active. Seed the
  // store with a real shipment id so render exercises the actual tree.
  useReviewStore.getState().resetFlow();
  useReviewStore.getState().markActive('ship-1');
});

describe('ReviewTextEntryScreen', () => {
  // Trip-wire: future splits into review-text-entry/* must keep this
  // screen mounting. Not a behavioral test — a smoke check.
  it('mounts without throwing', () => {
    const { container } = render(<ReviewTextEntryScreen />);
    expect(container.firstChild).toBeTruthy();
  });
});
