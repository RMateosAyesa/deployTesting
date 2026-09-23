import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    title: 'Tooltip content',
    children: <span>Hover me</span>
  },
}

export const WithLongText: Story = {
  args: {
    title: 'This is a longer tooltip text that might wrap',
    children: <button>Hover for long text</button>
  },
}

export const Multiline: Story = {
  args: {
    title: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>Primera línea</span>
        <span>Segunda línea</span>
        <span>Tercera línea</span>
      </div>
    ),
    children: <span>Hover para multilínea</span>,
  },
}