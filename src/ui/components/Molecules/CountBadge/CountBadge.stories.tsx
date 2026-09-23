import type { Meta, StoryObj } from '@storybook/react-vite'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../../../../styles/theme'
import { CountBadge } from './CountBadge'

const StoryPreview = styled.div`
  display: inline-flex;
  background-color: ${({ theme }) => theme.colors.backgroundMid};
  padding: ${({ theme }) => theme.spacing.sm};
`

const meta: Meta<typeof CountBadge> = {
  title: 'Molecules/CountBadge',
  component: CountBadge,
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
type Story = StoryObj<typeof CountBadge>

export const Default: Story = {
  args: {
    count: 3,
    items: ['IOC-Temp-01', 'IOC-Press-02', 'IOC-Elec-01'],
    placement: 'rightTop',
  },
  render: (args) => (
    <StoryPreview>
      <CountBadge {...args} />
    </StoryPreview>
  ),
}
