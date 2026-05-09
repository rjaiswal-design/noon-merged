import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/Form controls',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_Checkbox: S = { name: 'M-Checkbox', args: { name: 'M-Checkbox' } };
export const M_Radio: S = { name: 'M-Radio', args: { name: 'M-Radio' } };
export const M_Toggle: S = { name: 'M-Toggle', args: { name: 'M-Toggle' } };
export const M_Input_Text: S = { name: 'M-Input-Text', args: { name: 'M-Input-Text' } };
export const M_Input_Textarea: S = { name: 'M-Input-Textarea', args: { name: 'M-Input-Textarea' } };
