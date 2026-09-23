import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Accordion } from './Accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: 'select', 
      options: ['default', 'primary'],
      description: 'Color variant for the expand icon'
    },
    items: {
      control: 'object',
      description: 'Array of accordion items'
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  args: {
    items: [
      {
        key: '1',
        label: 'Acordeon 1',
        children: 'Prueba usage info',
      },
      {
        key: '2',
        label: 'Acordeon 2',
        children: 'Prueba 2 usage info',
      },
    ],
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    items: [
      {
        key: '1',
        label: 'Acordeon Primary 1',
        children: 'Prueba usage info',
      },
      {
        key: '2',
        label: 'Acordeon Primary 2',
        children: 'Prueba 2 usage info',
      },
    ],
  },
}