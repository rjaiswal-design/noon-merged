import type { Meta, StoryObj } from '@storybook/react-vite';
import CollectionCard from './CollectionCard';
import productImg from '../assets/sku/product.png';
import airpodsImg from '../assets/sku/airpods.png';
import phonecaseImg from '../assets/sku/phonecase.png';

const meta: Meta<typeof CollectionCard> = {
  title: 'Wishlist/CollectionCard',
  component: CollectionCard,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof CollectionCard>;

export const Default: Story = {
  args: {
    name: 'Electronics',
    itemCount: 5,
    assets: { front: productImg, middle: airpodsImg, back: phonecaseImg },
  },
};

export const SingleItem: Story = {
  args: { name: 'Saved later', itemCount: 1, assets: { front: airpodsImg } },
};

export const FrontOnly: Story = {
  args: { name: 'Wishlist', itemCount: 12, assets: { front: productImg } },
};
