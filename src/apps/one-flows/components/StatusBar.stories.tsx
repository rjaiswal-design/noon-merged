import type { Meta, StoryObj } from '@storybook/react-vite';
import StatusBar from './StatusBar';

const meta: Meta<typeof StatusBar> = {
  title: 'OneFlows/StatusBar',
  component: StatusBar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: 375, height: 60, background: '#fff', margin: '24px auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StatusBar>;

export const Default: Story = {};
