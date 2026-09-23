import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import dayjs from 'dayjs'
import { theme } from '../../../../styles/theme'
import { DatePicker } from './DatePicker'

const meta: Meta<typeof DatePicker> = {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    hasError: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  args: {
    placeholder: 'dd/mm/yyyy - hh:mm',
    showTime: true,
  },
}

export const WithError: Story = {
  args: {
    placeholder: 'Date with error',
    hasError: true,
    value: dayjs(),
  },
}

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width date picker',
    fullWidth: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled date picker',
    disabled: true,
  },
}