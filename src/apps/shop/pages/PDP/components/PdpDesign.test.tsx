import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import PdpDesign from './PdpDesign';

afterEach(cleanup);

describe('PdpDesign', () => {
  // Trip-wire: refactors that split this 1,365-line file into pdp-sections/*
  // must keep the screen mounting without throwing. Not a behavioral test —
  // a smoke check.
  it('mounts without throwing', () => {
    const { container } = render(
      <MemoryRouter>
        <PdpDesign />
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
