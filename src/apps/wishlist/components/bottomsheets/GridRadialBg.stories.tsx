import type { Meta, StoryObj } from '@storybook/react-vite';
import GridRadialBg from './GridRadialBg';

const meta: Meta<typeof GridRadialBg> = {
  title: 'Wishlist/BottomSheets/GridRadialBg',
  component: GridRadialBg,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 351, height: 480, margin: '24px auto', overflow: 'hidden', borderRadius: 16, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GridRadialBg>;

export const Default: Story = { args: { height: 480 } };
export const FewerCells: Story = { args: { height: 320, cells: 56 } };
