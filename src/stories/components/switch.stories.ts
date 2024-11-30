import Switch from '@/components/atoms/switch';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


const meta = {
    title: 'Atoms/Switch',
    component: Switch,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],


  } satisfies Meta<typeof Switch>;
  
  export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label:'Switch',
    },
  };