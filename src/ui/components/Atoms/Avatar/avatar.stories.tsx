import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Avatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    size: { control: 'number' },
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
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    name: 'Optima Dones',
  },
}

export const CustomName: Story = {
  args: {
    name: 'Test Optima Dones',
  },
}

export const Small: Story = {
  args: {
    name: 'Test Optima Dones',
    size: 24,
  },
}

export const Large: Story = {
  args: {
    name: 'Test Otro Dones',
    size: 64,
  },
}
