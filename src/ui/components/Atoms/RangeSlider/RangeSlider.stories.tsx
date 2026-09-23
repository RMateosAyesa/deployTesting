import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { RangeSlider } from './RangeSlider'

const meta: Meta<typeof RangeSlider> = {
  title: 'Atoms/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    showInput: { control: 'boolean' },
    inputWidth: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    placeholder: { control: 'text' },
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
type Story = StoryObj<typeof RangeSlider>

export const Default: Story = {
  args: {
    placeholder: "min",
    showInput: true,
    max: 60,
  },
}

export const WithoutInput: Story = {
  args: {
    showInput: false,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "min",
  },
}