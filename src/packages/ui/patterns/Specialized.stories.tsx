import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/Specialized',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_BillLineItem: S = { name: 'M-BillLineItem', args: { name: 'M-BillLineItem' } };
export const M_BillSummary: S = { name: 'M-BillSummary', args: { name: 'M-BillSummary' } };
export const M_Rating_Badge: S = { name: 'M-Rating-Badge', args: { name: 'M-Rating-Badge' } };
export const M_Rating_Input: S = { name: 'M-Rating-Input', args: { name: 'M-Rating-Input' } };
