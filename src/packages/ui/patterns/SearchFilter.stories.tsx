import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/Search & filter',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_SearchBar: S = { name: 'M-SearchBar', args: { name: 'M-SearchBar' } };
export const M_SearchPill: S = { name: 'M-SearchPill', args: { name: 'M-SearchPill' } };
export const M_Chip_Filter: S = { name: 'M-Chip-Filter', args: { name: 'M-Chip-Filter' } };
