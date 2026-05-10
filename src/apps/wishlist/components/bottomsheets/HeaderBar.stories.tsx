import type { Meta, StoryObj } from '@storybook/react-vite';
import HeaderBar from './HeaderBar';
import productImg from '../../assets/sku/product.png';
import airpodsImg from '../../assets/sku/airpods.png';
import phonecaseImg from '../../assets/sku/phonecase.png';

const meta: Meta<typeof HeaderBar> = {
  title: 'Wishlist/BottomSheets/HeaderBar',
  component: HeaderBar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ width: 375, padding: 16, background: '#f2f3f7' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HeaderBar>;

const items = [{ src: productImg }, { src: airpodsImg }, { src: phonecaseImg }];

export const Default: Story = { args: { title: 'Move 3 items', items } };
export const WithBack: Story = { args: { title: 'Move 3 items', items, showBack: true } };
