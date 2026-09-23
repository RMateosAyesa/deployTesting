import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { fn } from 'storybook/test'
import { theme } from '../../../../styles/theme'
import { LoginTemplate } from './LoginTemplate'

const meta: Meta<typeof LoginTemplate> = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
  tags: ['autodocs'],
  argTypes: {
    emailValue: { control: 'text' },
    passwordValue: { control: 'text' },
    loading: { control: 'boolean' },
    backgroundImageSrc: { control: 'text' },
  },
  args: {
    onEmailChange: fn(),
    onPasswordChange: fn(),
    onSubmit: fn(),
    onForgotPasswordClick: fn(),
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
type Story = StoryObj<typeof LoginTemplate>

export const Default: Story = {}

export const Filled: Story = {
  args: {
    emailValue: 'operator@optima-dones.com',
    passwordValue: '12345678',
  },
}

export const Loading: Story = {
  args: {
    emailValue: 'operator@optima-dones.com',
    passwordValue: '12345678',
    loading: true,
  },
}
