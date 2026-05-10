import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryTabs } from './CategoryTabs';
import { mockCategories } from '../../../data/mockProducts';

const meta: Meta<typeof CategoryTabs> = {
  title: 'Shop/PLP/CategoryTabs',
  component: CategoryTabs,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof CategoryTabs>;

export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState(mockCategories[0]?.id ?? 'all');
    return <CategoryTabs categories={mockCategories} activeId={activeId} onSelect={setActiveId} />;
  },
};
