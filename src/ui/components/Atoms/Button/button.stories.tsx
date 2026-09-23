import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'filled', 'outlined', 'text'] },
    fontSize: { control: 'select', options: ['default', 'small'] },
    buttonSize: { control: 'select', options: ['default', 'form'] },
    iconName: { control: 'select', options: ['arrowUUpLeft', 'lightning', 'clock', 'gear', 'plus', 'x'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
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
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    disabled: false,
    loading: false,
  },
}

export const Solid: Story = {
  args: {
    children: 'Solid Button',
    variant: 'solid',
  },
}

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
  },
}

export const Filled: Story = {
  args: {
    children: 'Filled Button',
    variant: 'filled',
  },
}

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
}

export const Icon: Story = {
  args: {
    variant: 'filled',
    iconName: 'arrowUUpLeft',
    iconSize: 'xl',
    iconColor: 'primary',
    'aria-label': 'Go back',
  },
}

export const SolidSmall: Story = {
  args: {
    children: 'Small Button',
    variant: 'solid',
    fontSize: 'small',
  },
}

export const OutlinedSmall: Story = {
  args: {
    children: 'Small Outlined',
    variant: 'outlined',
    fontSize: 'small',
  },
}

export const FilledSmall: Story = {
  args: {
    children: 'Small Filled',
    variant: 'filled',
    fontSize: 'small',
  },
}

export const TextSmall: Story = {
  args: {
    children: 'Small Text',
    variant: 'text',
    fontSize: 'small',
  },
}

export const LoadingSmall: Story = {
  args: {
    children: 'Loading Small',
    variant: 'solid',
    fontSize: 'small',
    loading: true,
  },
}

export const SolidDisabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'solid',
    disabled: true,
  },
}

export const OutlinedDisabled: Story = {
  args: {
    children: 'Disabled Outlined',
    variant: 'outlined',
    disabled: true,
  },
}

export const FilledDisabled: Story = {
  args: {
    children: 'Disabled Filled',
    variant: 'filled',
    disabled: true,
  },
}

export const TextDisabled: Story = {
  args: {
    children: 'Disabled Text',
    variant: 'text',
    disabled: true,
  },
}
