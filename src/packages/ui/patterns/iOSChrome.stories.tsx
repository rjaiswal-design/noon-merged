import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/iOS chrome',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_Status_bar: S = { name: 'M-Status-bar', args: { name: 'M-Status-bar' } };
export const M_Home_bar: S = { name: 'M-Home-bar', args: { name: 'M-Home-bar' } };
