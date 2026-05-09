import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBar } from './StatusBar';

const meta: Meta<typeof StatusBar> = {
  title: 'Surface/StatusBar',
  component: StatusBar,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['dark', 'light'] },
    time: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBar>;

export const Dark: Story = {
  args: { tone: 'dark', time: '9:41' },
};

export const Light: Story = {
  args: { tone: 'light', time: '9:41' },
  decorators: [
    (S) => (
      <div style={{ background: '#2A88FF', minHeight: 100 }}>
        <S />
      </div>
    ),
  ],
};
