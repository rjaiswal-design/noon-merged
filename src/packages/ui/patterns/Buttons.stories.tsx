import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/Buttons',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_Button_Primary: S = { name: 'M-Button-Primary', args: { name: 'M-Button-Primary' } };
export const M_Button_Secondary: S = { name: 'M-Button-Secondary', args: { name: 'M-Button-Secondary' } };
export const M_Button_Secondary_Neutral: S = { name: 'M-Button-Secondary-Neutral', args: { name: 'M-Button-Secondary-Neutral' } };
export const M_Button_Neutral: S = { name: 'M-Button-Neutral', args: { name: 'M-Button-Neutral' } };
export const M_Button_Round_Neutral: S = { name: 'M-Button-Round-Neutral', args: { name: 'M-Button-Round-Neutral' } };
export const M_Button_Text_Blue: S = { name: 'M-Button-Text-Blue', args: { name: 'M-Button-Text-Blue' } };
export const M_Button_Text_Neutral: S = { name: 'M-Button-Text-Neutral', args: { name: 'M-Button-Text-Neutral' } };
export const M_IconButton: S = { name: 'M-IconButton', args: { name: 'M-IconButton' } };
