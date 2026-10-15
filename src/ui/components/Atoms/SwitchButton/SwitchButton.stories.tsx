import type { Meta, StoryObj } from '@storybook/react'
import { SwitchButton } from './SwitchButton'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'

const Background = styled.div`
  background-color: ${theme.colors.backgroundHigh};
  padding: 24px;
`

const meta: Meta<typeof SwitchButton> = {
  title: 'Atoms/SwtichButton',
  component: SwitchButton,
  tags: ['autodocs'],
  args: {
    defaultChecked: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Background>
          <Story />
        </Background>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SwitchButton>

export const Default: Story = {}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    defaultChecked: true,
    disabled: true,
  },
}