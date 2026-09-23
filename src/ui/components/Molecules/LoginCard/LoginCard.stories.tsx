import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'
import { fn } from 'storybook/test'
import styled from 'styled-components'
import { theme } from '../../../../styles/theme'
import { LoginCard } from './LoginCard'

const Preview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 720px;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.backgroundHigh};
`

const meta: Meta<typeof LoginCard> = {
  title: 'Molecules/LoginCard',
  component: LoginCard,
  tags: ['autodocs'],
  argTypes: {
    emailValue: { control: 'text' },
    passwordValue: { control: 'text' },
    loading: { control: 'boolean' },
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
        <Preview>
          <Story />
        </Preview>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LoginCard>

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
