import type { Meta, StoryObj } from '@storybook/react-vite';
import StoryBubbles from './StoryBubbles';
import airpodsImg from '../assets/sku/airpods.png';
import productImg from '../assets/sku/product.png';
import phonecaseImg from '../assets/sku/phonecase.png';

const meta: Meta<typeof StoryBubbles> = {
  title: 'Wishlist/StoryBubbles',
  component: StoryBubbles,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 375, margin: '0 auto', padding: '12px 0', background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StoryBubbles>;

export const Default: Story = {
  args: {
    bubbles: [
      { id: 'live-sale',     label: 'Live sale',     thumb: airpodsImg,   ringColor: '#ff3b30', emoji: '🔥' },
      { id: 'price-drop',    label: 'Price drop',    thumb: productImg,   ringColor: '#0076ff', emoji: '📉' },
      { id: 'low-stock',     label: 'Low stock',     thumb: phonecaseImg, ringColor: '#ff9500', emoji: '⚡' },
      { id: 'back-in-stock', label: 'Back in stock', thumb: airpodsImg,   ringColor: '#34c759', emoji: '✨' },
    ],
  },
};
