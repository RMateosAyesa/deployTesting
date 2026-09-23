import type { Meta, StoryObj } from '@storybook/react-vite'
import { ThemeProvider } from 'styled-components'

import { theme } from '../../../../styles/theme'
import { SystemStatusCard } from './SystemStatusCard'

const meta: Meta<typeof SystemStatusCard> = {
  title: 'Molecules/SystemStatusCard',
  component: SystemStatusCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ width: '420px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof SystemStatusCard>

export const RestartCounter: Story = {
  args: {
    iconName: 'radioButton',
    title: 'Restart counter',
    label: 'Value',
    value: 23,
    unit: 'Restarts',
  },
}