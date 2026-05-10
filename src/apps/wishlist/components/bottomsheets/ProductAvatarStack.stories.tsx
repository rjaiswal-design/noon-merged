import type { Meta, StoryObj } from '@storybook/react-vite';
import ProductAvatarStack from './ProductAvatarStack';
import productImg from '../../assets/sku/product.png';
import airpodsImg from '../../assets/sku/airpods.png';
import phonecaseImg from '../../assets/sku/phonecase.png';

const meta: Meta<typeof ProductAvatarStack> = {
  title: 'Wishlist/BottomSheets/ProductAvatarStack',
  component: ProductAvatarStack,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ProductAvatarStack>;

export const Single: Story = { args: { items: [{ src: productImg }] } };
export const Three: Story = { args: { items: [{ src: productImg }, { src: airpodsImg }, { src: phonecaseImg }] } };
export const Overflow: Story = {
  args: {
    items: [
      { src: productImg },
      { src: airpodsImg },
      { src: phonecaseImg },
      { src: productImg },
      { src: airpodsImg },
      { src: phonecaseImg },
    ],
  },
};
