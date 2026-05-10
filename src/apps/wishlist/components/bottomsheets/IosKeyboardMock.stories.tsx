import type { Meta, StoryObj } from '@storybook/react-vite';
import IosKeyboardMock from './IosKeyboardMock';

const meta: Meta<typeof IosKeyboardMock> = {
  title: 'Wishlist/BottomSheets/IosKeyboardMock',
  component: IosKeyboardMock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 375, margin: '0 auto', background: '#d1d5db' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof IosKeyboardMock>;

export const Default: Story = {};
