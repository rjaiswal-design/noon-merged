import type { Preview } from '@storybook/react-vite';
import { Retune } from 'retune';
import '../src/packages/tokens/index.css';
import './preview.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <Story />
        <Retune />
      </>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'app',
      values: [
        { name: 'app', value: '#F9F9FB' },
        { name: 'white', value: '#FFFFFF' },
        { name: 'dark', value: '#101628' },
      ],
    },
    a11y: { test: 'todo' },
  },
};

export default preview;
