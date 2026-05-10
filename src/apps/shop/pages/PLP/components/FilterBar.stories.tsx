import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterBar } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Shop/PLP/FilterBar',
  component: FilterBar,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState<string[]>([]);
    return (
      <FilterBar
        activeFilters={active}
        onChipClick={(id) =>
          setActive((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
        }
      />
    );
  },
};

export const WithActive: Story = {
  args: { activeFilters: ['filter', 'sort'] },
};
