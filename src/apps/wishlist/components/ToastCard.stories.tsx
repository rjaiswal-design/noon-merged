import type { Meta, StoryObj } from '@storybook/react-vite';
import ToastCard from './ToastCard';

const meta: Meta<typeof ToastCard> = {
  title: 'Wishlist/ToastCard',
  component: ToastCard,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 343, padding: 16, background: '#0E0E0E', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastCard>;

export const Removed: Story = { args: { variant: 'removed' } };
export const Moved: Story = { args: { variant: 'moved' } };
export const Copied: Story = { args: { variant: 'copied' } };
export const SavedWishlist: Story = { args: { variant: 'saved-wishlist' } };
export const SavedCollection: Story = { args: { variant: 'saved-collection' } };
