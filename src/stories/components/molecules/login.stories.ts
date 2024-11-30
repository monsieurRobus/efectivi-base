
import LoginForm from '@/components/molecules/login-form';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';



const meta = {
    title: 'Molecules/LoginForm',
    component: LoginForm,
    parameters: {
      layout: 'centered',
    },
    tags: ['autodocs'],


  } satisfies Meta<typeof LoginForm>;
  
  export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        label:'Switch',
    },
  };