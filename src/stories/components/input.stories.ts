import { Input } from '@/components/atoms/input';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';


const meta = {
    title: 'Atoms/Input',
    component: Input,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
  } satisfies Meta<typeof Input>;
  
  export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {

    },
  };
  