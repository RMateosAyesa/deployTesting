import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LithiumSystemCard } from './LithiumSystemCard'

const meta: Meta<typeof LithiumSystemCard> = {
  title: 'Molecules/LithiumSystemCard',
  component: LithiumSystemCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    unit: { control: 'text' },
    variant: {
      control: 'select',
      options: ['standard', 'valve'],
    },
    iconName: { control: 'text' },
    count: { control: 'number' },
    countItems: { control: 'object' },
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
type Story = StoryObj<typeof LithiumSystemCard>

export const Default: Story = {
  args: {
    title: 'Temperature Sen.  #1',
    value: 251,
    unit: 'Cº',
  },
}

export const Valve: Story = {
  args: {
    variant: 'valve',
    title: 'Valve sensors',
    iconName: 'engine',
    count: 4,
    countItems: ['Position', 'Leakage', 'Status', 'Fin carrera'],
    metrics: [
      { label: 'Position:', value: '3 voltios' },
      { label: 'Leakage:', value: 'False' },
      { label: 'Status:', value: 'Open' },
      { label: 'Fin carrera:', value: 'False' },
    ],
  },
}
