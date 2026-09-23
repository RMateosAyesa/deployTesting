import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Card } from './Card'
import { Text } from '../Text/Text'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    background: { control: 'select', options: ['low', 'high'] },
    padding: { control: 'select', options: ['none', 'xl', 'card'] },
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
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    background: 'high',
    padding: 'card',
    children: <Text variant="bodyLarge" color="#FFFFFF">Card Content</Text>,
  },
}


export const BackgroundLow: Story = {
  args: {
    background: 'low',
    padding: 'card',
    children: <Text variant="bodyLarge" color="#FFFFFF">Low Background</Text>,
  },
}

export const PaddingXl: Story = {
  args: {
    background: 'high',
    padding: 'xl',
    children: <Text variant="bodyLarge" color="#FFFFFF">Paddind XL</Text>,
  },
}
