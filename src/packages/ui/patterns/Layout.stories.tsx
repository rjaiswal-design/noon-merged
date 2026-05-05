import type { Meta, StoryObj } from '@storybook/react-vite';
import { PatternDoc } from './PatternDoc';

const meta: Meta<typeof PatternDoc> = {
  title: 'Field DS Patterns/Layout & structure',
  component: PatternDoc,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'white' } },
};

export default meta;
type S = StoryObj<typeof PatternDoc>;

export const M_Accordion: S = { name: 'M-Accordion', args: { name: 'M-Accordion' } };
export const M_Divider: S = { name: 'M-Divider', args: { name: 'M-Divider' } };
export const M_List_Item: S = { name: 'M-List-Item', args: { name: 'M-List-Item' } };
export const M_PageHeader: S = { name: 'M-PageHeader', args: { name: 'M-PageHeader' } };
export const M_ActionBar: S = { name: 'M-ActionBar', args: { name: 'M-ActionBar' } };
export const M_Bottomnav: S = { name: 'M-Bottomnav', args: { name: 'M-Bottomnav' } };
