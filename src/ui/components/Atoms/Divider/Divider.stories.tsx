import type { Meta, StoryObj } from '@storybook/react'
import styled, { ThemeProvider } from 'styled-components'
import { Divider } from './Divider'
import { theme } from '../../../../styles/theme'

const Container = styled.div`
  padding: 24px;
  background-color: ${theme.colors.backgroundHigh};
`

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Container>
          <Story />
        </Container>
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Divider>

export const Horizontal: Story = {}

export const Vertical: Story = {
  render: () => (
    <Row>
      <span>Item</span>
      <Divider orientation="vertical" length="24px" />
      <span>Item</span>
    </Row>
  ),
}

export const CustomLength: Story = {
  args: {
    length: '50%',
  },
}