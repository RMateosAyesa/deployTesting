import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    variant: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'info'] },
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
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    text: 'Badge text',
    variant: 'success',
  },
}

export const Success: Story = {
  args: {
    text: 'Success',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    text: 'Warning',
    variant: 'warning',
  },
}
