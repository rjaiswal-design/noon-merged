import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SkeletonGate } from './Skeleton';

afterEach(cleanup);

describe('SkeletonGate', () => {
  it('renders the skeleton initially', () => {
    render(
      <SkeletonGate
        skeleton={<div data-testid="skel">loading</div>}
        ready={false}
      >
        <div data-testid="content">done</div>
      </SkeletonGate>,
    );
    expect(screen.getByTestId('skel')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });

  it('reveals children once held AND ready', async () => {
    render(
      <SkeletonGate
        holdMs={0}
        fadeMs={0}
        ready={true}
        skeleton={<div data-testid="skel">loading</div>}
      >
        <div data-testid="content">done</div>
      </SkeletonGate>,
    );
    expect(await screen.findByTestId('content')).toBeInTheDocument();
  });

  it('keeps skeleton mounted while external ready stays false', async () => {
    render(
      <SkeletonGate
        holdMs={0}
        fadeMs={0}
        ready={false}
        skeleton={<div data-testid="skel">loading</div>}
      >
        <div data-testid="content">done</div>
      </SkeletonGate>,
    );
    expect(screen.getByTestId('skel')).toBeInTheDocument();
    expect(screen.queryByTestId('content')).not.toBeInTheDocument();
  });
});
