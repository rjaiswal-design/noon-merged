import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/Information display',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_InfoBanner_Rounded: S = { name: 'M-InfoBanner-Rounded', args: { name: 'M-InfoBanner-Rounded' } };
export const M_InfoBanner_Partial: S = { name: 'M-InfoBanner-Partial', args: { name: 'M-InfoBanner-Partial' } };
export const M_Tooltip: S = { name: 'M-Tooltip', args: { name: 'M-Tooltip' } };
export const M_Switch: S = { name: 'M-Switch', args: { name: 'M-Switch' } };
