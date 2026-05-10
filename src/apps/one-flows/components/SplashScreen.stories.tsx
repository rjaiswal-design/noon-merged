import type { Meta, StoryObj } from '@storybook/react-vite';
import SplashScreen from './SplashScreen';

const meta: Meta<typeof SplashScreen> = {
  title: 'OneFlows/SplashScreen',
  component: SplashScreen,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof SplashScreen>;

export const Default: Story = {
  args: { onDone: () => console.log('splash done') },
};
